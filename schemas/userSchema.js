import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      unique: true,
      trim: true,
      index: true,
      sparse: true,
      match: [
        /^[6-9]\d{9}$/,
        "Phone number must be 10 digits starting with 6, 7, 8, or 9",
      ],
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters long"],
      maxlength: [20, "Password cannot exceed 20 characters"],
      required: true,
    },

    role: {
      type: String,
      enum: ["SUPER_ADMIN", "PARKING_ADMIN", "ATTENDANT"],
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    parkingLocation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParkingLocation",
      default: null, // Super admin won’t have location
    },
  },
  { timestamps: true }
);

/// HASH PASSWORD BEFORE SAVING
userSchema.pre("save", async function () {
  // if password is not modified, do nothing
  if (!this.isModified("password")) return;
  // hash password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare entered password with hashed password in DB
userSchema.methods.comparePassword = async function (enteredPassword) {
  if (!this.password) return false; // No password set
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
