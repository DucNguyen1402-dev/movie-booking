import { waitForMinimumDuration } from "@shared/async/utils";
import { MIN_LOADING_TIME } from "@shared/loading";

export async function runWithLoading(task, loader) {
  const start = performance.now();
  loader.show();
  try {
    const result = await task();

    return result;
  } finally {
    await waitForMinimumDuration(start, MIN_LOADING_TIME);
    loader.hide();
  }
}
