export function convert(input: string): string | number {
  const validNumerals = new RegExp(
    /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i
  );

  if (!isNaN(parseInt(input))) {
    // We've been given an arabic number, so we'll convert it to roman numerals
    const num: number = parseInt(input);
    if (num >= 4000) {
      throw new Error("I can't count above 3999!");
    }
    return convertNumberToNumeral(num);
  } else if (validNumerals.test(input)) {
    // We've been given a valid roman numeral, so we'll convert it to an arabic number
    const numeralsArray: string[] = input.toUpperCase().split("");
    const numbersArray = getNumbersArray(numeralsArray);
    return workOutValue(numbersArray);
  } else {
    throw new Error("Please enter a valid number or numeral");
  }
}

function getNumbersArray(numeralsArray: string[]) {
  // I took this algorithm from https://github.com/katie-roberts/romanNumerals/blob/master/script/romannumerals.js
  // It still needed updating to ES6 and converting to TypeScript tho!
  const numbersArray: number[] = [];
  for (var i = 0; i < numeralsArray.length; i++) {
    switch (numeralsArray[i]) {
      case "I":
        numbersArray.push(1);
        break;
      case "V":
        numbersArray.push(5);
        break;
      case "X":
        numbersArray.push(10);
        break;
      case "L":
        numbersArray.push(50);
        break;
      case "C":
        numbersArray.push(100);
        break;
      case "D":
        numbersArray.push(500);
        break;
      case "M":
        numbersArray.push(1000);
        break;
    }
  }
  return numbersArray;
}

function workOutValue(numbersArray: number[]) {
  let total = 0;
  for (let i = 0; i < numbersArray.length; i++) {
    if (i < numbersArray.length - 1) {
      if (numbersArray[i] < numbersArray[i + 1]) {
        total = total - numbersArray[i];
      } else {
        total = numbersArray[i] + total;
      }
    } else {
      total = numbersArray[i] + total;
    }
  }
  return total;
}

function convertNumberToNumeral(num: number) {
  let output: string = "";
  const digits: string[] = String(num).split("");
  const numDigits = digits.length;
  for (let i = 0; i < numDigits; i++) {
    // We'll loop through a number of times equal to the number of digits

    const levels = [
      ["I", "V", "X"],
      ["X", "L", "C"],
      ["C", "D", "M"],
      ["M", "", ""],
    ];

    const lastDigit: number = parseInt(digits.pop() as string);
    // Getting the last digit and working backwards

    let numeralsToPrepend = "";
    switch (lastDigit) {
      case 1:
        numeralsToPrepend += levels[i][0];
        break;
      case 2:
        numeralsToPrepend += levels[i][0] + levels[i][0];
        break;
      case 3:
        numeralsToPrepend += levels[i][0] + levels[i][0] + levels[i][0];
        break;
      case 4:
        numeralsToPrepend += levels[i][0] + levels[i][1];
        break;
      case 5:
        numeralsToPrepend += levels[i][1];
        break;
      case 6:
        numeralsToPrepend += levels[i][1] + levels[i][0];
        break;
      case 7:
        numeralsToPrepend += levels[i][1] + levels[i][0] + levels[i][0];
        break;
      case 8:
        numeralsToPrepend +=
          levels[i][1] + levels[i][0] + levels[i][0] + levels[i][0];
        break;
      case 9:
        numeralsToPrepend += levels[i][0] + levels[i][2];
        break;

      default:
        break;
    }
    output = numeralsToPrepend + output;
  }
  return output;
}
