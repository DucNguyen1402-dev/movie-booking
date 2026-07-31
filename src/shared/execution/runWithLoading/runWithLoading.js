import { waitForMinimumDuration } from "./utils";

const runWithLoading = async (task, loader, MIN_LOADING_TIME = 800) => {
  const start = performance.now();
  loader.show();
  try {
    return await task();
  } finally {
    await waitForMinimumDuration(start, MIN_LOADING_TIME);
    loader.hide();
  }
};

export default runWithLoading;
