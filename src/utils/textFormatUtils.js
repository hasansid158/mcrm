import _ from "lodash";

export const lettersOnly = (string) => {
  if (!_.isString(string)) return string;

  const reg = /[^a-zA-Z ]/g;
  return string.replace(reg, '');
};

export const capitalizeFirstLetter = (string) => {
  if (!_.isString(string)) return string;

  return _.capitalize(string);
}

//convert camelCase to capitalized with space
export const camelCaseToSpace = (string) => {
  if (!_.isString(string)) return string;

  return _.startCase(string);
}

export const trimText = (string) => {
  if (!_.isString(string)) return string;

  return string.trim();
}


//Numbers formatters
export const numberOnly = (string) => {
  if (_.isNumber(string)) return string;
  if (!_.isString(string)) return 0;

  const filterNumbers = string.replace(/[^0-9]/g, '');
  return Number(filterNumbers);
};

export const cardNumberOnly = (string) => {
  if (!_.isString(string)) return string;

  const filterNumbers = numberOnly(string);
  return filterNumbers && filterNumbers.match(/.{1,4}/g)?.join(' ');
};

export const toCurrency = (stringNumber, locale = 'en-US', currencyCode = 'USD') => {
  const number = parseFloat(stringNumber);

  if (isNaN(number)) {
    // Handle invalid input if needed
    return 'Invalid number';
  }

  const currencyFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return currencyFormatter.format(number);
};

export const calculatePercentage = (value = 0, percentage = 0) => {
  // Ensure the value and percentage are valid numbers
  if (!_.isNumber(value) || !_.isNumber(percentage)) {
    throw new Error('Invalid input. Please provide valid numbers.');
  }

  // Calculate the percentage
  const result = (value * percentage) / 100;

  return result;
};

export const formRegex = {
  password: /^(?=.*[A-Z])(?=.*\d).{8,}$/g,
  mobile: /^\+?[0-9](?:[0-9] ?){5,13}[0-9]$/,
}