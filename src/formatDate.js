'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
const month = 'MM';
const day = 'DD';
const yearLong = 'YYYY';
const yearShort = 'YY';

const prevCenturyHalf = '19';
const currCenturyHalf = '20';
const yearCheck = 30;

function formatDate(date, fromFormat, toFormat) {
  const separator = getSeparator(fromFormat);
  const dateObj = makeDateObject(date, fromFormat, separator);
  const newSeparator = getSeparator(toFormat);
  const newDate = [];

  for (let i = 0; i < 3; i++) {
    const toFormatPart = toFormat[i];
    let newPart;

    if (toFormatPart === day || toFormatPart === month) {
      newPart = dateObj[toFormatPart];
    } else if (toFormatPart === yearShort || toFormatPart === yearLong) {
      newPart = normalizeYear(dateObj[yearShort], toFormatPart);
    }

    newDate.push(newPart);
  }

  return newDate.join(newSeparator);
}

function getSeparator(format) {
  // Формат має вигляд ['YYYY', 'MM', 'DD', '-']
  return format.find((el) => ![yearLong, yearShort, month, day].includes(el));
}

function makeDateObject(date, format, separator) {
  const dateParts = date.split(separator);
  const dateObj = {};

  for (let i = 0; i < 3; i++) {
    let part = format[i];

    if (part === yearLong) {
      part = yearShort;
    }

    dateObj[part] = dateParts[i];
  }

  return dateObj;
}

function normalizeYear(year, formatYear) {
  const lengthDiff = year.length - formatYear.length;

  if (lengthDiff === 0) {
    return year;
  } else if (lengthDiff < 0) {
    return (
      (parseInt(year) < yearCheck ? currCenturyHalf : prevCenturyHalf) + year
    );
  } else {
    return year.slice(-2);
  }
}

module.exports = formatDate;
