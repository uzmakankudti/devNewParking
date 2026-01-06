import Ticket from "../schema/ticketSchema.js";
import asyncHandler from "../utils/asyncHandler.js";

export const dailyReport = asyncHandler(async (req, res) => {
  // Only Parking Admin
  if (req.user.role !== "PARKING_ADMIN") {
    return res.status(403).json({
      success: false,
      message: "Only parking admin can view reports",
    });
  }

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

  return res.status(200).json({
    success: true,
    date: startOfDay.toDateString(),
    totalVehicles,
    totalAmount,
  });
});
