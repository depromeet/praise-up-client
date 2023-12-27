function addUnit(to = 200, multiple = 4, unit = "px") {
  return Array.from(Array(to)).reduce((acc, _, i) => {
    const value = `${Number(i) * multiple}${unit}`;
    return { ...acc, [value]: value };
  }, {});
}

module.exports = addUnit;
