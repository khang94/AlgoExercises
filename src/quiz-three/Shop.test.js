import Shop from "./Shop";
import Customer from "./Customer";

import { CUSTOMER_TYPE, CATEGORY_TYPE } from "./Configuration";

describe("Discount based on single conditions ", () => {
  let customer = {};
  let shopCart = {};
  const dateJoin = new Date(2019, 10, 10);
  beforeEach(() => {
    customer = new Customer({
      fullName: "Steve",
      category: "ANONYMOUS",
      dateJoinService: dateJoin
    });
    shopCart = new Shop({
      customer,
      totalCash: 0,
      sellerType: ""
    });
  });
  it("should non-discount when customer is anonymous", () => {
    customer = new Customer({ ...customer, category: "ANONYMOUS" });
    shopCart = new Shop({ ...shopCart, totalCash: 90 });

    const discountAmount = shopCart.getDiscountAmount();
    expect(discountAmount).toEqual(0);

    const netOfPayable = shopCart.getNetOfPayableAmount();
    expect(netOfPayable).toBe(90);
  });

  it("should discount 30% when customer is an employee", () => {
    customer = new Customer({ ...customer, category: CUSTOMER_TYPE.EMPLOYEE });
    shopCart = new Shop({ ...shopCart, customer, totalCash: 90 });
    const discountAmount = shopCart.getDiscountAmount();
    expect(discountAmount).toEqual(0.3 * 90);

    const netOfPayable = shopCart.getNetOfPayableAmount();
    const netOfPayableExpect = shopCart.totalCash - discountAmount;
    expect(netOfPayable).toBe(netOfPayableExpect);
  });

  it("should discount 10% when customer is an affiliate", () => {
    customer = new Customer({ ...customer, category: CUSTOMER_TYPE.AFFILIATE });
    shopCart = new Shop({ ...shopCart, customer, totalCash: 90 });
    const discountAmount = shopCart.getDiscountAmount();
    expect(discountAmount).toEqual(0.1 * 90);

    const netOfPayable = shopCart.getNetOfPayableAmount();
    const netOfPayableExpect = shopCart.totalCash - discountAmount;
    expect(netOfPayable).toBe(netOfPayableExpect);
  });

  it("should discount 10% when customer is an loyalty", () => {
    const dateJoin = new Date(2017, 10, 10);
    customer = new Customer({
      ...customer,
      category: CUSTOMER_TYPE.LOYALTY,
      dateJoinService: dateJoin
    });
    shopCart = new Shop({ ...shopCart, customer, totalCash: 90 });
    const discountAmount = shopCart.getDiscountAmount();
    expect(discountAmount).toEqual(0.05 * 90);

    const netOfPayable = shopCart.getNetOfPayableAmount();
    const netOfPayableExpect = shopCart.totalCash - discountAmount;
    expect(netOfPayable).toBe(netOfPayableExpect);
  });

  it("should discount 5% when bill is greater than 100$", () => {
    customer = new Customer({
      ...customer,
      category: "ANONYMOUS"
    });
    shopCart = new Shop({ ...shopCart, customer, totalCash: 120 });
    const discountAmount = shopCart.getDiscountAmount();
    expect(discountAmount).toEqual(0.05 * 120);

    const netOfPayable = shopCart.getNetOfPayableAmount();
    const netOfPayableExpect = shopCart.totalCash - discountAmount;
    expect(netOfPayable).toBe(netOfPayableExpect);
  });

  it("should non-discount when shop is groceries", () => {
    customer = new Customer({
      ...customer,
      category: "ANONYMOUS"
    });
    shopCart = new Shop({
      ...shopCart,
      customer,
      totalCash: 120,
      sellerType: CATEGORY_TYPE.GROCERY
    });
    const discountAmount = shopCart.getDiscountAmount();
    expect(discountAmount).toEqual(0);

    const netOfPayable = shopCart.getNetOfPayableAmount();
    expect(netOfPayable).toBe(shopCart.totalCash);
  });
});

describe("Choose appropriate discount based on multiple conditions", () => {
  let customer = {};
  let shopCart = {};
  const dateJoin = new Date(2019, 10, 10);
  beforeEach(() => {
    customer = new Customer({
      fullName: "Steve",
      category: "ANONYMOUS",
      dateJoinService: dateJoin
    });
    shopCart = new Shop({
      customer,
      totalCash: 0,
      sellerType: ""
    });
  });
  it("should discount 5% when customer is anonymous and cash is greater than 100$$$", () => {
    customer = new Customer({ ...customer, category: "ANONYMOUS" });
    shopCart = new Shop({ ...shopCart, totalCash: 120 });

    const discountAmount = shopCart.getDiscountAmount();
    expect(discountAmount).toEqual(0.05 * 120);

    const netOfPayable = shopCart.getNetOfPayableAmount();
    const netOfPayableExpected = shopCart.totalCash - discountAmount;
    expect(netOfPayable).toBe(netOfPayableExpected);
  });

  it("should discount 30% when customer is employee and cash is greater than 100$$$", () => {
    customer = new Customer({ ...customer, category: CUSTOMER_TYPE.EMPLOYEE });
    shopCart = new Shop({ ...shopCart, customer, totalCash: 120 });

    const discountAmount = shopCart.getDiscountAmount();
    expect(discountAmount).toEqual(0.3 * 120);

    const netOfPayable = shopCart.getNetOfPayableAmount();
    const netOfPayableExpected = shopCart.totalCash - discountAmount;
    expect(netOfPayable).toBe(netOfPayableExpected);
  });

  it("should not discount when customer is employee and shop retail is grocery", () => {
    customer = new Customer({ ...customer, category: CUSTOMER_TYPE.EMPLOYEE });
    shopCart = new Shop({
      ...shopCart,
      customer,
      totalCash: 120,
      sellerType: CATEGORY_TYPE.GROCERY
    });

    const discountAmount = shopCart.getDiscountAmount();
    expect(discountAmount).toEqual(0);

    const netOfPayable = shopCart.getNetOfPayableAmount();
    expect(netOfPayable).toBe(shopCart.totalCash);
  });

  it("should not discount when loyalty customer join just 1 years", () => {
    const dateJoin = new Date(2018, 10, 10);
    customer = new Customer({
      ...customer,
      category: CUSTOMER_TYPE.LOYALTY,
      dateJoinService: dateJoin
    });
    shopCart = new Shop({
      ...shopCart,
      customer,
      totalCash: 120
    });

    const discountAmount = shopCart.getDiscountAmount();
    expect(discountAmount).toEqual(0);

    const netOfPayable = shopCart.getNetOfPayableAmount();
    expect(netOfPayable).toBe(shopCart.totalCash);
  });
});
