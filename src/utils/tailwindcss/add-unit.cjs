function addUnit(to = 200, multiple = 2, unit = "px") {
  return [...Array(Math.ceil(to / multiple) + 1).keys()].reduce(
    (acc, index) => {
      const key = `${index * multiple}${unit}`;
      return { ...acc, [key]: key };
    },
    {},
  );
}

module.exports = addUnit;
