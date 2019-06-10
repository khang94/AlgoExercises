export default class DiscountBase {
  constructor(object = {}) {
    const { description } = object;
    this.description = description;
  }
}
