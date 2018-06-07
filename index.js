// create regExp for parsing data
var dateRegexp = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/;

// the list of values for changing a time
var availableDurations = ['years', 'months', 'days', 'hours', 'minutes'];

// convert "2" => "02"
function addLeadingZero(value) {
  value = String(value);
  return value.length < 2 ? '0' + value : value;
}

function formatDate(date) {
  var res = '';

  res += date.getFullYear();
  res += '-';
  res += addLeadingZero(date.getMonth() + 1);
  res += '-';
  res += addLeadingZero(date.getDate());
  res += ' ';
  res += addLeadingZero(date.getHours());
  res += ':';
  res += addLeadingZero(date.getMinutes());

  return res;
}

// check input parameters
function checkValueAndDuration(value, duration) {
  if (value < 0) {
    throw new TypeError('Value must not be negative');
  }

  if (availableDurations.indexOf(duration) === -1) {
    throw new TypeError('Unappropriate time unit');
  }
}

function changeDate(date, value, duration) {
  switch (duration) {
    case 'years':
      value = date.getFullYear() + value;
      date.setFullYear(value);
      break;
    
    case 'months':
      value = date.getMonth() + value;
      date.setMonth(value);
      break;

    case 'days':
      value = date.getDate() + value;
      date.setDate(value);
      break;

    case 'hours':
      value = date.getHours() + value;
      date.setHours(value);
      break;

    case 'minutes':
      value = date.getMinutes() + value;
      date.setMinutes(value);
      break;
  }
}

/**
 * @param {String} dateStr
 * @returns {Object}
 */
module.exports = function (dateStr) {

  // get match array from data string
  var match = dateStr.match(dateRegexp);

  // create date !!! month begins from 0
  var date = new Date(match[1], match[2] - 1, match[3], match[4], match[5]);

  // create an object with methods for manage of time and return it
  return {
    get value() {
      return formatDate(date);
    },

    add: function (value, duration) {
      checkValueAndDuration(value, duration);
      changeDate(date, value, duration);

      return this;
    },

    subtract: function (value, duration) {
      checkValueAndDuration(value, duration);
      changeDate(date, -1 * value, duration);

      return this;
    }
  }
};











