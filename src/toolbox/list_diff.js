export default function getNonExistingElements(wholeList, elements) {
  const existingElements = new Set(elements);
  return wholeList.filter((ele) => !existingElements.has(ele));
}
