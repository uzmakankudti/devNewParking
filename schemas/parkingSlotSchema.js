//System automatically assigns the first available slot based on vehicle type.
import mongoose from "mongoose";

const parkingSlotSchema = new mongoose.Schema(
  {
    slotNumber: {
      type: String,
      required: true,
    },

    vehicleType: {
      type: String,
      enum: ["BIKE", "CAR"],
      required: true,
    },

    isOccupied: {
      type: Boolean,
      default: false,
    },

    parkingLocation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParkingLocation",
      required: true,
    },
  },
  { timestamps: true }
);

// IMPORTANT: slotNumber must be unique per location
parkingSlotSchema.index(
  { slotNumber: 1, parkingLocation: 1 },
  { unique: true }
);
const ParkingSlot = mongoose.model("ParkingSlot", parkingSlotSchema);

export default ParkingSlot;