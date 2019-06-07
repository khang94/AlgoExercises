export default class Customer {
  constructor(object) {
    this.setAttributes(object);
  }

  setAttributes(object) {
    const { fullName, category, dateJoinService } = object;
    this.fullName = fullName;
    this.category = category;
    this.dateJoinService = dateJoinService;
  }
}
