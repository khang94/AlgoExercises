import { load, store } from "./Q1";

describe("Exercise 1 : Transform string to array data ", () => {
  it("should return empty array when string input is undefined or empty", () => {
    const input = undefined;
    expect(load(input)).toEqual([{}]);
  });

  it("should parse string to correct array (1)", () => {
    const input = "key1=value1;key2=value2\nkeyA=valueA";
    const expected = [
      {
        key1: "value1",
        key2: "value2"
      },
      {
        keyA: "valueA"
      }
    ];

    expect(load(input)).toEqual(expected);
  });

  it("should parse string to correct array (2)", () => {
    const input = "key1=value1;key2=value2";
    const expected = [
      {
        key1: "value1",
        key2: "value2"
      }
    ];

    expect(load(input)).toEqual(expected);
  });

  it("should parse string to correct array (3)", () => {
    const input = "key1=value1";
    const expected = [
      {
        key1: "value1"
      }
    ];

    expect(load(input)).toEqual(expected);
  });
});

describe("Ex1 : Transform array data to string respectively", () => {
  it("should return empty string when an array is undefined", () => {
    const input = undefined;
    expect(store(input)).toEqual("");
  });

  it("should transform array into string (1)", () => {
    const input = [
      {
        key1: "value1",
        key2: "value2"
      },
      {
        keyA: "valueA"
      }
    ];
    const expected = "key1=value1;key2=value2\nkeyA=valueA";

    expect(store(input)).toEqual(expected);
  });

  it("should transform array into string (2)", () => {
    const input = [
      {
        key1: "value1",
        key2: "value2"
      }
    ];
    const expected = "key1=value1;key2=value2";

    expect(store(input)).toEqual(expected);
  });

  it("should transform array into string (3)", () => {
    const input = [
      {
        key1: "value1"
      }
    ];
    const expected = "key1=value1";

    expect(store(input)).toEqual(expected);
  });
});
