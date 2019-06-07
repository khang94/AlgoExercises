import {
  SETTINGS,
  CUSTOMER_TYPE,
  DISCOUNT_BASED_ON_TYPE,
  CATEGORY_TYPE
} from "./Configuration";

import { getDiscountRatio } from "./DiscountUtil";

export default class Shop {
  constructor(object) {
    this.setAttributes(object);

    this.getDiscountAmount = this.getDiscountAmount.bind(this);
    this.getNetOfPayableAmount = this.getNetOfPayableAmount.bind(this);
  }

  setAttributes(object) {
    const { customer, totalCash, sellerType } = object;
    this.customer = customer;
    this.totalCash = totalCash;
    this.sellerType = sellerType;
  }

  getDiscountAmount() {
    if (this.sellerType === CATEGORY_TYPE.GROCERY) {
      return 0;
    } else {
      const { category, dateJoinService } = this.customer;
      const discountRatio = getDiscountRatio(
        category,
        dateJoinService,
        this.sellerType,
        this.totalCash
      );
      return this.totalCash * discountRatio;
    }
  }

  getNetOfPayableAmount() {
    return this.totalCash - this.getDiscountAmount();
  }
}
