import Ticket from "../schemas/ticketSchema.js";
import asyncHandler from "express-async-handler";

export const dailyReport = asyncHandler(async (req, res) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const tickets = await Ticket.find({
    status: "COMPLETED",
    exitTime: { $gte: startOfDay, $lte: endOfDay },
  });

  const totalVehicles = tickets.length;
  const totalAmount = tickets.reduce(
    (sum, ticket) => sum + ticket.amount,
    0
  );

  res.status(200).json({
    success: true,
    date: startOfDay.toDateString(),
    totalVehicles,
    totalAmount,
  });
});


export const dateWiseReport = async (req, res) => {
  try {
    const { date } = req.query; // YYYY-MM-DD

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required (YYYY-MM-DD)",
      });
    }

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const tickets = await Ticket.find({
      status: "COMPLETED",
      exitTime: { $gte: startOfDay, $lte: endOfDay },
    });

    const totalVehicles = tickets.length;
    const totalAmount = tickets.reduce(
      (sum, ticket) => sum + ticket.amount,
      0
    );

    return res.status(200).json({
      success: true,
      date,
      totalVehicles,
      totalAmount,
    });
  } catch (error) {
    console.error("Date-wise report error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const monthlyReport = async (req, res) => {
  try {
    const { year, month } = req.query;
    // month: 1–12

    if (!year || !month) {
      return res.status(400).json({
        success: false,
        message: "Year and month are required (year=2026&month=1)",
      });
    }

    const startOfMonth = new Date(year, month - 1, 1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date(year, month, 0);
    endOfMonth.setHours(23, 59, 59, 999);

    const tickets = await Ticket.find({
      status: "COMPLETED",
      exitTime: { $gte: startOfMonth, $lte: endOfMonth },
    });

    const totalVehicles = tickets.length;
    const totalAmount = tickets.reduce(
      (sum, ticket) => sum + ticket.amount,
      0
    );

    return res.status(200).json({
      success: true,
      month,
      year,
      totalVehicles,
      totalAmount,
    });
  } catch (error) {
    console.error("Monthly report error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};