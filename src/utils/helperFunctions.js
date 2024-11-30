import _ from "lodash";

import { camelCaseToSpace } from "./textFormatUtils";

import { format, set } from 'date-fns';

export function objectValueToArray(objArray, key) {
  return _.uniqBy(objArray, key)?.map(item => item?.[key]);
}

export function objToValueLabel(obj) {
  const converted = _.map(obj, (value, label) => ({label: value, value: label}))
  return converted;
}

export const arrayToValueLabel = (array) => {
  if (!_.isArray(array)) return;
  const obj = _.map(array, item => ({ value: item, label: camelCaseToSpace(item || '') }));
  return obj;
}

/**
 * Replaces objects in an array based on a key and an array of replacement objects or a single replacement object.
 * @param {Array} array - The original array of objects.
 * @param {string} key - The key to match for replacement.
 * @param {Array|Object} replacements - The replacement object(s). Can be a single object or an array of objects.
 * @returns {Array} - A new array with the specified replacements.
 */
export function replaceObjectsInArray(array, key, replacements) {
  // Ensure replacements is an array for consistency
  if (!_.isArray(replacements)) {
      replacements = [replacements];
  }

  // Create a map of replacement objects for quick lookup
  const replacementsMap = _.keyBy(replacements, key);

  // Replace objects in the array
  return _.map(array, obj => {
      if (replacementsMap[obj[key]]) {
          return replacementsMap[obj[key]];
      }
      return obj;
  });
}


export const isEqualCommonData = (obj1, obj2) => {
  // Get keys of both objects
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);

  // Find common keys
  const commonKeys = _.intersection(keys1, keys2);

  // Compare values for common keys
  return _.isEqual(_.pick(obj1, commonKeys), _.pick(obj2, commonKeys));
};


export const kanbanDataToList = (
  data = [],
  listKey = '',
) => {
  const list = _.map(data, item => (
    item?.[listKey]
  ));

  return _.flatten(list);
}

export const setDateTimeSame = (targetDate, sourceDate) => {
  const source = new Date(sourceDate);  // Ensure sourceDate is a Date object
  const target = new Date(targetDate);  // Ensure targetDate is a Date object

  // Extract hours and minutes from sourceDate
  const hours = source.getHours();
  const minutes = source.getMinutes();

  // Set hours and minutes in targetDate
  target.setHours(hours);
  target.setMinutes(minutes);

  const formatString = "yyyy-MM-dd'T'HH:mm:ss";
  return format(target, formatString);
};