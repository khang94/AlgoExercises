import DiscountBase from "./DiscountBase";

export default class AmountBaseDiscount extends DiscountBase {
  constructor(object) {
    super();
    this.setAttributes(object);
  }

  setAttributes(object) {
    const { description, acceptAmount, percentDiscount } = object;
    this.description = description;
    this.acceptAmount = acceptAmount;
    this.percentDiscount = percentDiscount;
  }
}
