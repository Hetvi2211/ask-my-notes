function hierarchicalChunking(
  text,
  parentSize = 1500,
  childSize = 500
) {
  const result = [];

  let parentStart = 0;
  let parentId = 1;

  while (parentStart < text.length) {
    const parentEnd = parentStart + parentSize;

    const parentChunk = text.substring(parentStart, parentEnd);

    const children = [];

    let childStart = 0;
    let childId = 1;

    while (childStart < parentChunk.length) {
      const childEnd = childStart + childSize;

      const childChunk = parentChunk.substring(
        childStart,
        childEnd
      );

      children.push({
        childId,
        content: childChunk,
      });

      childStart += childSize;
      childId++;
    }

    result.push({
      parentId,
      parentChunk,
      children,
    });

    parentStart += parentSize;
    parentId++;
  }

  return result;
}

module.exports = hierarchicalChunking;