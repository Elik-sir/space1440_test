import { searchPnf } from './utils';
import Data from './testingData.json';

test('check pnf', () => {
  let res = {
    res: { children: [] as XMLChild[] } as XMLChild,
  };
  searchPnf(Data as any, res);
  expect(res.res.attributes.name).toEqual('Pnf');
});
