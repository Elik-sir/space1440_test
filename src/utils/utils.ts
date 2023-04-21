export type resType = {
  res: XMLChild;
};
export const traverse = (data: XMLChild, res: resType) => {
  if (data?.children?.length) {
    for (const child of data.children) {
      if (child?.attributes?.name?.includes('Pnf')) {
        res.res = child;
      }
      traverse(child, res);
    }
  }
};
