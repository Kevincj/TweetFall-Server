export function extractUrl(url) {
  return url.split("?")[0];
}

export function extractExtension(url) {
  return url.split("?")[0].split(".").pop();
}
