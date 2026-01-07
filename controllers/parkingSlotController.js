import ParkingSlot from "../schemas/parkingSlotSchema.js";
import User from "../schemas/userSchema.js";
import asyncHandler from "express-async-handler";

/* export const createParkingSlot = asyncHandler(async (req, res) => {
  try {
    if (req.user.role !== "PARKING_ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only Parking Admin can create slots.",
      });
    }

    const { slotNumber, vehicleType, parkingLocation } = req.body;

    if (!slotNumber || !vehicleType || !parkingLocation) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const slot = await ParkingSlot.create({
      slotNumber,
      vehicleType,
      parkingLocation,
    });

    return res.status(201).json({
      success: true,
      message: "Parking slot created successfully",
      data: slot,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Slot already exists for this parking location",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create parking slot",
      error: error.message,
    });
  }
});
❌ You are NOT using JWT
❌ You have NO auth middleware
❌ Nothing is setting req.user */

export const createParkingSlot = asyncHandler(async (req, res) => {
  try {
    const { slotNumber, vehicleType, parkingLocation } = req.body;

    if (!slotNumber || !vehicleType || !parkingLocation) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

       // SAFETY CHECK
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login again.",
      });
    } 

    if (req.user.role !== "PARKING_ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only Parking Admin can create slots.",
      });
    }

    const slot = await ParkingSlot.create({
      slotNumber,
      vehicleType,
      parkingLocation,
    });

    return res.status(201).json({
      success: true,
      message: "Parking slot created successfully",
      data: slot,
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Slot already exists for this parking location",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create parking slot",
      error: error.message,
    });
  }
});

export const getAllParkingSlots = asyncHandler(async (req, res) => {
  try {
    const { parkingLocation } = req.query;

    const filter = parkingLocation ? { parkingLocation } : {};

    const slots = await ParkingSlot.find(filter).populate(
      "parkingLocation",
      "name"
    );

    return res.status(200).json({
      success: true,
      count: slots.length,
      data: slots,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch parking slots",
      error: error.message,
    });
  }
});

export const getParkingSlotById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const slot = await ParkingSlot.findById(id).populate(
      "parkingLocation",
      "name"
    );

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: "Parking slot not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: slot,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch parking slot",
      error: error.message,
    });
  }
});

export const updateParkingSlot = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { slotNumber, vehicleType } = req.body;

    const slot = await ParkingSlot.findByIdAndUpdate(
      id,
      { slotNumber, vehicleType },
      { new: true }
    );

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: "Parking slot not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Parking slot updated successfully",
      data: slot,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update parking slot",
      error: error.message,
    });
  }
});

export const deleteParkingSlot = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const slot = await ParkingSlot.findByIdAndDelete(id);

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: "Parking slot not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Parking slot deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete parking slot",
      error: error.message,
    });
  }
});
