import {
  SETTINGS,
  CUSTOMER_TYPE,
  DISCOUNT_BASED_ON_TYPE,
  CATEGORY_TYPE
} from "./Configuration";

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

/**
 * If bill > 100$ then discount 5% of total ,
 * get all data based on configuration & settings
 * @param {*} bill
 */
const getDefaultDiscountPayOnPayment = bill => {
  const {
    DEFAULT_DISCOUNT_BASED_ON_PRICE: { MINIMUM_PRICE, DISCOUNT }
  } = SETTINGS;
  if (bill >= MINIMUM_PRICE) return DISCOUNT;
  return 0;
};

/**
 * Get discount ratio
 * Conditions
 * if (loyalty customer && not qualification) ==> 0%
 * if (seller type is grocery) ==> 0%
 *
 * @param {*} category
 * @param {*} dateJoinService
 * @param {*} sellerType
 */
const getDiscountRatio = (category, dateJoinService, sellerType, bill) => {
  let discountRatio = 0;

  if (
    (category === CUSTOMER_TYPE.LOYALTY &&
      !checkLoyaltyQualification(dateJoinService)) ||
    sellerType === CATEGORY_TYPE.GROCERY
  ) {
    return discountRatio;
  }
  discountRatio =
    DISCOUNT_BASED_ON_TYPE[category] ||
    getDefaultDiscountPayOnPayment(bill) ||
    discountRatio;

  return discountRatio;
};

export { getDiscountRatio };
