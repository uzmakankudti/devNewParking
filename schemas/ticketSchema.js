import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: String,
      required: true,
      unique: true,
    },

    vehicleNumber: {
      type: String,
      required: true,
      trim: true,
    },

    vehicleType: {
      type: String,
      enum: ["BIKE", "CAR"],
      required: true,
    },

    slot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParkingSlot",
      required: true,
    },

    parkingLocation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParkingLocation",
      required: true,
    },

    entryTime: {
      type: Date,
      required: true,
    },

    exitTime: {
      type: Date,
      default: null,
    },

    amount: {
      type: Number,
      default: 0,
    },

    paymentMode: {
      type: String,
      enum: ["CASH", "ONLINE"],
      default: "CASH",
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID"],
      default: "PENDING",
    },

    status: {
      type: String,
      enum: ["ACTIVE", "COMPLETED"],
      default: "ACTIVE",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Ticket", ticketSchema);
