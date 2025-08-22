// Role-based access control utility for SREYAS platform

export const USER_ROLES = {
  DEVOTEE: 'devotee',
  INMATE: 'inmate', 
  COUNSELLOR: 'counsellor',
  HOD: 'hod',
  TEMPLE_PRESIDENT: 'temple-president'
};

export const ADMIN_ROLES = [
  USER_ROLES.COUNSELLOR,
  USER_ROLES.HOD,
  USER_ROLES.TEMPLE_PRESIDENT
];

export const DATA_ACCESS_LEVELS = {
  OWN_DATA: 'own_data',
  COUNSELLEE_DATA: 'counsellee_data',
  DEPARTMENT_DATA: 'department_data',
  ALL_DATA: 'all_data'
};

/**
 * Check if user has admin privileges for service management
 */
export const hasAdminAccess = (userRole) => {
  return ADMIN_ROLES.includes(userRole);
};

/**
 * Get data access level based on user role
 */
export const getDataAccessLevel = (userRole) => {
  switch (userRole) {
    case USER_ROLES.DEVOTEE:
    case USER_ROLES.INMATE:
      return DATA_ACCESS_LEVELS.OWN_DATA;
    case USER_ROLES.COUNSELLOR:
      return DATA_ACCESS_LEVELS.COUNSELLEE_DATA;
    case USER_ROLES.HOD:
      return DATA_ACCESS_LEVELS.DEPARTMENT_DATA;
    case USER_ROLES.TEMPLE_PRESIDENT:
      return DATA_ACCESS_LEVELS.ALL_DATA;
    default:
      return DATA_ACCESS_LEVELS.OWN_DATA;
  }
};

/**
 * Check if user can view specific user's data
 */
export const canViewUserData = (viewerRole, targetUserId, viewerId, assignedCounsellees = []) => {
  const accessLevel = getDataAccessLevel(viewerRole);
  
  switch (accessLevel) {
    case DATA_ACCESS_LEVELS.OWN_DATA:
      return targetUserId === viewerId;
    case DATA_ACCESS_LEVELS.COUNSELLEE_DATA:
      return targetUserId === viewerId || assignedCounsellees.includes(targetUserId);
    case DATA_ACCESS_LEVELS.DEPARTMENT_DATA:
      // HOD can see all except Temple President
      return true; // Implementation would check if target is not Temple President
    case DATA_ACCESS_LEVELS.ALL_DATA:
      return true;
    default:
      return false;
  }
};

/**
 * Check if user can manage services (create, assign, edit, delete)
 */
export const canManageServices = (userRole) => {
  return hasAdminAccess(userRole);
};

/**
 * Check if user can create availability sheets
 */
export const canCreateAvailabilitySheets = (userRole) => {
  return hasAdminAccess(userRole);
};

/**
 * Check if user can transfer admin privileges
 */
export const canTransferAdminRights = (userRole) => {
  return [USER_ROLES.HOD, USER_ROLES.COUNSELLOR, USER_ROLES.TEMPLE_PRESIDENT].includes(userRole);
};

/**
 * Get role display name
 */
export const getRoleDisplayName = (role) => {
  const roleNames = {
    [USER_ROLES.DEVOTEE]: 'Devotee',
    [USER_ROLES.INMATE]: 'Inmate',
    [USER_ROLES.COUNSELLOR]: 'Counsellor',
    [USER_ROLES.HOD]: 'HOD',
    [USER_ROLES.TEMPLE_PRESIDENT]: 'Temple President'
  };
  return roleNames[role] || 'Unknown Role';
};

/**
 * Get role badge variant for UI
 */
export const getRoleBadgeVariant = (role) => {
  const variants = {
    [USER_ROLES.DEVOTEE]: 'default',
    [USER_ROLES.INMATE]: 'secondary',
    [USER_ROLES.COUNSELLOR]: 'success',
    [USER_ROLES.HOD]: 'warning',
    [USER_ROLES.TEMPLE_PRESIDENT]: 'destructive'
  };
  return variants[role] || 'default';
};

export default {
  USER_ROLES,
  ADMIN_ROLES,
  DATA_ACCESS_LEVELS,
  hasAdminAccess,
  getDataAccessLevel,
  canViewUserData,
  canManageServices,
  canCreateAvailabilitySheets,
  canTransferAdminRights,
  getRoleDisplayName,
  getRoleBadgeVariant
};