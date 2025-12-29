export const rolePermissions = {
  SUPER_ADMIN: {
    canCreateParkingLocation: true,
    canCreateUser: true,
    canManageSlots: false,
    canCheckIn: false,
    canCheckOut: false,
    canViewReports: true,
  },

  PARKING_ADMIN: {
    canCreateParkingLocation: false,
    canCreateUser: true,
    canManageSlots: true,
    canCheckIn: false,
    canCheckOut: false,
    canViewReports: true,
  },

  ATTENDANT: {
    canCreateParkingLocation: false,
    canCreateUser: false,
    canManageSlots: false,
    canCheckIn: true,
    canCheckOut: true,
    canViewReports: false,
  },
};
