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
  const dateObj = makeDateObject(date, fromFormat);
  const separator = toFormat.slice(-1);
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

  return newDate.join(separator);
}

function makeDateObject(date, format) {
  const separator = format.slice(-1);
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
    return (year < yearCheck ? currCenturyHalf : prevCenturyHalf) + year;
  } else {
    return year.slice(-2);
  }
}

module.exports = formatDate;
