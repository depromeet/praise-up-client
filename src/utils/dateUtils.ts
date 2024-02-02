// convert Date type to {year, month, date, day} type
const parseDate = (date: Date) => {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
    day: date.getDay(),
  };
};

export const dateUtils = {
  now: () => parseDate(new Date()),
  parseDate: (date: Date) => parseDate(date),
};
