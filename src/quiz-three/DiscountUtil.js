import { SETTINGS } from "./Configuration";

/**
 * Check qualification of loyalty customer
 * @param {*} dateJoin
 */
const checkLoyaltyQualification = dateJoin => {
  const { LOYALTY_YEARS_TO_DISCOUNT } = SETTINGS;

  const currentYear = new Date().getFullYear();
  const yearJoin = dateJoin.getFullYear();
  if (currentYear - yearJoin >= LOYALTY_YEARS_TO_DISCOUNT) {
    return true;
  }
  return false;
};

export { checkLoyaltyQualification };
