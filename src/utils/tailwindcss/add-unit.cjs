function addUnit(to = 400, multiple = 4, unit = "px") {
  return Array.from(Array(to)).reduce((acc, _, i) => {
    const value = `${Number(i) * multiple}${unit}`;
    return { ...acc, [value]: value };
  }, {});
}

module.exports = addUnit;
