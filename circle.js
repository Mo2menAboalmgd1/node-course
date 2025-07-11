const circleArea = (radius) => {
  if (radius < 0) {
    throw new Error("Radius cannot be negative");
  }
  return Math.PI * radius * radius;
}

const circleCircumference = (radius) => {
  if (radius < 0) {
    throw new Error("Radius cannot be negative");
  }
  return 2 * Math.PI * radius;
}

const circleDiameter = (radius) => {
  if (radius < 0) {
    throw new Error("Radius cannot be negative");
  }
  return 2 * radius;
}

module.exports = {
  area: circleArea,
  circumference: circleCircumference,
  diameter: circleDiameter,
};