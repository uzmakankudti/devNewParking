import Ticket from "../schemas/ticketSchema.js";
import ParkingSlot from "../schemas/parkingSlotSchema.js";
import asyncHandler from "express-async-handler";

//(CREATE TICKET)
export const checkInVehicle = asyncHandler(async (req, res) => {
  try {
    const { vehicleNumber, vehicleType, parkingLocation } = req.body;

    if (!vehicleNumber || !vehicleType || !parkingLocation) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // PREVENT DOUBLE ENTRY (IMPORTANT LOGIC)
    const existingActiveTicket = await Ticket.findOne({
      vehicleNumber,
      status: "ACTIVE",
    });

    if (existingActiveTicket) {
      return res.status(400).json({
        success: false,
        message:
          "Vehicle is already parked. Please check out before re-entering.",
      });
    }

    if (req.user.role !== "ATTENDANT") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only Parking ATTENDANT can check in vehicles.",
      });
    }
    // find FIRST  free slot
    const freeSlot = await ParkingSlot.findOne({
      vehicleType,
      parkingLocation,
      isOccupied: false,
    }).sort({ slotNumber: 1 }); // optional: ordered allocation

    if (!freeSlot) {
      return res.status(400).json({
        success: false,
        message: "No available slot for this vehicle type",
      });
    }

    // occupy slot
    freeSlot.isOccupied = true;
    await freeSlot.save();

    // generate ticket number
    const ticketNumber = `TKT-${Date.now()}`;

    // create ticket
    const ticket = await Ticket.create({
      ticketNumber,
      vehicleNumber,
      vehicleType,
      slot: freeSlot._id,
      parkingLocation,
      entryTime: new Date(),
    });

    return res.status(201).json({
      success: true,
      message: "Vehicle checked in successfully",
      data: ticket,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Check-in failed",
      error: error.message,
    });
  }
});

// CHECK-OUT (CLOSE TICKET)
export const checkOutVehicle = asyncHandler(async (req, res) => {
  try {
    const { ticketNumber } = req.body;

    if (!ticketNumber) {
      return res.status(400).json({
        success: false,
        message: "Ticket number is required",
      });
    }

    // find active ticket
    const ticket = await Ticket.findOne({
      ticketNumber,
      status: "ACTIVE",
    }).populate("slot");

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Active ticket not found",
      });
    }

    // calculate duration
    const exitTime = new Date();
    const durationMs = exitTime - ticket.entryTime;
    const hours = Math.ceil(durationMs / (1000 * 60 * 60));

    const ratePerHour = ticket.vehicleType === "CAR" ? 40 : 20;
    const amount = hours * ratePerHour;

    // update ticket (IMPORTANT FIX)
    ticket.exitTime = exitTime;
    ticket.amount = amount;
    ticket.status = "COMPLETED";
    ticket.paymentStatus = "PAID"; // FIX HERE

    await ticket.save();

    // free slot
    ticket.slot.isOccupied = false;
    await ticket.slot.save();
    
    if (req.user.role !== "ATTENDANT") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only Parking ATTENDANT can check out vehicles.",
      });
    }
    
    return res.status(200).json({
      success: true,
      message: "Vehicle checked out & payment completed",
      data: {
        ticketNumber: ticket.ticketNumber,
        durationInHours: hours,
        amount,
        paymentStatus: ticket.paymentStatus,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Check-out failed",
      error: error.message,
    });
  }
});
