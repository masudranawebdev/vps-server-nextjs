import {
  addToPcbuild,
  decrementQuantityFromPcbuild,
  removeFromPcbuild,
} from "./feature/pcbuild/pcbuildSlice";

export const pcbuildLocalstorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  // Store only the compare value in local storage after the actions have been dispatched
  if (
    action.type === addToPcbuild.type ||
    action.type === removeFromPcbuild.type ||
    action.type === decrementQuantityFromPcbuild.type
  ) {
    localStorage.setItem("pcbuild", JSON.stringify(store.getState().pcbuild));
  }

  return result;
};
