import { addToStore } from "./feature/recentview/recentViewSlice";

export const recentlyViewLocalstorageMiddleware =
  (store) => (next) => (action) => {
    const result = next(action);

    // Store only the recently view value in session storage after the actions have been dispatched
    if (action.type === addToStore.type) {
      localStorage.setItem(
        "recentView",
        JSON.stringify(store.getState().recentView)
      );
    }

    return result;
  };
