import { waitForMinimumDuration } from "@shared/async/utils";

export async function runWithLoading(task, loader, MIN_LOADING_TIME = 800) {
  const start = performance.now();
  loader.show();
  try {
    return await task();
  } finally {
    await waitForMinimumDuration(start, MIN_LOADING_TIME);
    loader.hide();
  }
}
