import ParkingLocation from "../schemas/parkingLocationSchema.js";
import User from "../schemas/userSchema.js";
import asyncHandler from "express-async-handler";

export const createParkingLocation = asyncHandler(async (req, res) => {
  try {
    const { name, address, createdBy } = req.body;

    // Basic validation
    if (!name || !address || !createdBy) {
      return res.status(400).json({
        success: false,
        message: "Name, address and createdBy are required",
      });
    }

    // Check if user exists
    const user = await User.findById(createdBy);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Role validation
    if (user.role !== "SUPER_ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Only SUPER_ADMIN can create parking locations",
      });
    }

    // Check duplicate parking location
    const existingLocation = await ParkingLocation.findOne({
      name: name.trim(),
      address: address.trim(),
    });

    if (existingLocation) {
      return res.status(409).json({
        success: false,
        message: "Parking location already exists for this address",
      });
    }

    // Create parking location
    const parkingLocation = await ParkingLocation.create({
      name: name.trim(),
      address: address.trim(),
      createdBy: user._id,
    });

    const populatedLocation = await ParkingLocation.findById(
      parkingLocation._id
    ).populate("createdBy", "name");

    return res.status(201).json({
      success: true,
      message: "Parking location created successfully",
      data: populatedLocation,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create parking location",
      error: error.message,
    });
  }
});

export const getAllParkingLocations = asyncHandler(async (req, res) => {
  try {
    const locations = await ParkingLocation.find().populate(
      "createdBy",
      "name email role"
    );

    return res.status(200).json({
      success: true,
      count: locations.length,
      data: locations,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch parking locations",
      error: error.message,
    });
  }
});

// GET SINGLE PARKING LOCATION
export const getParkingLocationById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const location = await ParkingLocation.findById(id).populate(
      "createdBy",
      "name email role"
    );

    if (!location) {
      return res.status(404).json({
        success: false,
        message: "Parking location not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: location,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch parking location",
      error: error.message,
    });
  }
});

// UPDATE PARKING LOCATION
export const updateParkingLocation = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address } = req.body;

    const location = await ParkingLocation.findByIdAndUpdate(
      id,
      { name, address },
      { new: true }
    );

    if (!location) {
      return res.status(404).json({
        success: false,
        message: "Parking location not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Parking location updated successfully",
      data: location,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update parking location",
      error: error.message,
    });
  }
});

// DELETE PARKING LOCATION
export const deleteParkingLocation = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const location = await ParkingLocation.findById(id);

    if (!location) {
      return res.status(404).json({
        success: false,
        message: "Parking location not found",
      });
    }

    location.isDeleted = true;
    location.deletedAt = new Date();
    await location.save();

    return res.status(200).json({
      success: true,
      message: "Parking location deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete parking location",
      error: error.message,
    });
  }
});
