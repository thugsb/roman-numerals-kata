import { convert } from "../src/calc";
describe("test convert function", () => {
  it("should throw an error if the input is neither a number nor numeral", () => {
    expect(() => convert("nan")).toThrow("Please enter a valid number");
  });
  it("should throw an error if the input is more than 3999", () => {
    expect(() => convert("4000")).toThrow("I can't count above 3999!");
    expect(() => convert("100000")).toThrow("I can't count above 3999!");
  });
  it("should convert single digit numbers correctly", () => {
    expect(convert("1")).toBe("I");
    expect(convert("2")).toBe("II");
    expect(convert("3")).toBe("III");
    expect(convert("4")).toBe("IV");
    expect(convert("5")).toBe("V");
    expect(convert("6")).toBe("VI");
    expect(convert("7")).toBe("VII");
    expect(convert("8")).toBe("VIII");
    expect(convert("9")).toBe("IX");
  });
  it("should convert larger numbers correctly", () => {
    expect(convert("10")).toBe("X");
    expect(convert("23")).toBe("XXIII");
    expect(convert("50")).toBe("L");
    expect(convert("69")).toBe("LXIX");
    expect(convert("111")).toBe("CXI");
    expect(convert("500")).toBe("D");
    expect(convert("999")).toBe("CMXCIX");
    expect(convert("2020")).toBe("MMXX");
    expect(convert("3000")).toBe("MMM");
    expect(convert("3999")).toBe("MMMCMXCIX");
  });
  it("should convert roman numerals to arabic numbers", () => {
    expect(convert("m")).toBe(1000);
    expect(convert("mm")).toBe(2000);
    expect(convert("mmm")).toBe(3000);
    expect(convert("mmcm")).toBe(2900);
    expect(convert("cm")).toBe(900);
    expect(convert("MDCCLXIV")).toEqual(1764);
    expect(convert("i")).toBe(1);
  });
});
