const { addToCompare, removeFromCompare } = require("./feature/compare/compareSlice");

export const compareLocalstorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  // Log the action type

  // Store only the compare value in local storage after the actions have been dispatched
  if (
    action.type === addToCompare.type ||
    action.type === removeFromCompare.type
  ) {
    localStorage.setItem("compare", JSON.stringify(store.getState().compare));
  }

  return result;
};
