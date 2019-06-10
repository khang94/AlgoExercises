import {
  SETTINGS,
  CUSTOMER_TYPE,
  DISCOUNT_BASED_ON_TYPE,
  CATEGORY_TYPE
} from "./Configuration";

import DiscountRules, { DISCOUNT_TYPES } from "./DiscountRules";
import { getDiscountRatio, checkLoyaltyQualification } from "./DiscountUtil";

export default class Shop {
  constructor(object) {
    this.setAttributes(object);

    this.discountRules = new DiscountRules().getDiscountRules();
    this.classifyDiscountType();
  }

  setAttributes(object) {
    const { customer, totalCash, sellerType } = object;
    this.customer = customer;
    this.totalCash = totalCash;
    this.sellerType = sellerType;
  }

  classifyDiscountType() {
    if (this.sellerType === CATEGORY_TYPE.GROCERY) {
      this.discountRuleActive = this.discountRules[DISCOUNT_TYPES.GROCERIES];
    } else if (this.customer.category === CUSTOMER_TYPE.EMPLOYEE) {
      this.discountRuleActive = this.discountRules[DISCOUNT_TYPES.EMPLOYEE];
    } else if (this.customer.category === CUSTOMER_TYPE.AFFILIATE) {
      this.discountRuleActive = this.discountRules[DISCOUNT_TYPES.AFFILLIATE];
    } else if (
      this.customer.category === CUSTOMER_TYPE.LOYALTY &&
      checkLoyaltyQualification(this.customer.dateJoinService)
    ) {
      this.discountRuleActive = this.discountRules[
        DISCOUNT_TYPES.LOYALTY_CUSTOMER
      ];
    } else if (this.totalCash >= 100) {
      this.discountRuleActive = this.discountRules[DISCOUNT_TYPES.AMOUNT];
    } else {
      this.discountRuleActive = {};
    }

    return this.discountRuleActive;
  }

  getDiscountAmount() {
    const discountRatio = this.discountRuleActive.percentDiscount
      ? this.discountRuleActive.percentDiscount
      : 0;
    return this.totalCash * discountRatio;
  }

  getNetOfPayableAmount() {
    return this.totalCash - this.getDiscountAmount();
  }
}
