import { waitForMinimumDuration } from "@shared/async/utils";
import { MIN_LOADING_TIME } from "@shared/loading";

export async function runWithLoading(task, loader) {
  const start = performance.now();
  loader.show();
  try {
    return await task();
  } finally {
    await waitForMinimumDuration(start, MIN_LOADING_TIME);
    loader.hide();
  }
}
