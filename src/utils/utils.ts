export type resType = {
  res: XMLChild;
};
export const searchPnf = (data: XMLChild, res: resType) => {
  if (data?.children?.length) {
    for (const child of data.children) {
      if (child?.attributes?.name?.includes('Pnf')) {
        res.res = child;
      }
      searchPnf(child, res);
    }
  }
};
