export async function ensureMinDuration(startTime, minDuration) {
  const elapsed = Date.now() - startTime;
  const remaining = Math.max(0, minDuration - elapsed);

  if (remaining > 0) {
    await new Promise((resolve) => setTimeout(resolve, remaining));
  }
}