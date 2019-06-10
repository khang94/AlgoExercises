import DiscountBase from "./DiscountBase";

export default class PercentageBaseDiscount extends DiscountBase {
  constructor(object) {
    super();
    this.setAttributes(object);
  }

  setAttributes(object) {
    const { description, percentDiscount } = object;
    this.description = description;
    this.percentDiscount = percentDiscount;
  }

  /* getDescription() {
    return this.description;
  }

  getPercentDiscount() {
    return this.percentDiscount;
  } */
}
