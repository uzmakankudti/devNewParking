import mongoose from "mongoose";

const parkingLocationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Super Admin
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
    
  },
  { timestamps: true }
);

// Prevent duplicate parking locations
parkingLocationSchema.index({ name: 1, address: 1 }, { unique: true });

const ParkingLocation = mongoose.model("ParkingLocation",parkingLocationSchema);
export default ParkingLocation;
