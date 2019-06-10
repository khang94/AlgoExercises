import PercentageBaseDiscount from "./PercentageBaseDiscount";
import AmountBaseDiscount from "./AmountBaseDiscount";

const DISCOUNT_TYPES = {
  EMPLOYEE: "EMPLOYEE",
  AFFILLIATE: "AFFILLIATE",
  LOYALTY_CUSTOMER: "LOYALTY_CUSTOMER",
  AMOUNT: "AMOUNT",
  GROCERIES: "GROCERIES"
};

export { DISCOUNT_TYPES };

export default class DiscountRules {
  constructor(rules) {
    this.rules = this.initializeRules();
  }

  initializeRules() {
    const discountForEmployee = new PercentageBaseDiscount({
      description: "DISCOUNT FOR EMPLOYEE WITH 30%",
      percentDiscount: 0.3
    });

    const discountForAffilliate = new PercentageBaseDiscount({
      description: "DISCOUNT FOR AFFILLIATE WITH 10%",
      percentDiscount: 0.1
    });

    const discountForLoyaltyCustomer = new PercentageBaseDiscount({
      description: "DISCOUNT FOR LOYALTY CUSTOMER WITH 5%",
      percentDiscount: 0.05
    });

    const discountBasedOnAmount = new AmountBaseDiscount({
      description: "DISCOUNT 5% ON BILL IF CASH IS GREATER THAN 100$",
      acceptAmount: 100,
      percentDiscount: 0.05
    });

    const nonDiscountForGroceries = new PercentageBaseDiscount({
      description: "NO DISCOUNT FOR GROCERIES",
      percentDiscount: 0
    });

    return {
      [DISCOUNT_TYPES.EMPLOYEE]: discountForEmployee,
      [DISCOUNT_TYPES.AFFILLIATE]: discountForAffilliate,
      [DISCOUNT_TYPES.LOYALTY_CUSTOMER]: discountForLoyaltyCustomer,
      [DISCOUNT_TYPES.AMOUNT]: discountBasedOnAmount,
      [DISCOUNT_TYPES.GROCERIES]: nonDiscountForGroceries
    };
  }

  getDiscountRules() {
    return this.rules;
  }
}
