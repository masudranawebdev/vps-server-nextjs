export const compareLoadState = () => {
  try {
    const serializedCart = localStorage.getItem("compare");
    if (serializedCart === null) {
      return undefined;
    }
    return JSON.parse(serializedCart);
  } catch (error) {
    return undefined;
  }
};
