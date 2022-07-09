const fromObjetToArray = (object) => Object.entries(object).map(([key, value]) => ([key, value]));

export default fromObjetToArray