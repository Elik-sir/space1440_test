import { useState } from 'react';
import axios from 'axios';
import XMLParser from 'react-xml-parser';
import { Button } from '@mui/material';
import ModalCreatePnf from './components/ModalCreatePnf';
import Data from './assets/aai_oxm_v27.xml';
import './App.css';
import { resType, searchPnf } from './utils/utils';

function App() {
  const [open, setOpen] = useState(false);
  const [params, setParams] = useState<XMLChild[] | undefined>([]);
  const handleClickCreatePnf = () => {
    axios
      .get(Data, {
        headers: { 'Content-Type': 'application/xml; charset=utf-8' },
      })
      .then(({ data }) => {
        const xml: XMLChild = new XMLParser().parseFromString(data);
        const javaTypes = xml.children[0].children.find(
          (a) => a.name === 'java-types'
        );
        if (javaTypes) {
          let res: resType = {
            res: { children: [] as XMLChild[] } as XMLChild,
          };
          searchPnf(javaTypes, res);
          setParams(res?.res?.children);
          setOpen(true);
        }
      });
  };
  const handleClickCreateComplex = () => {
    axios
      .get(Data, {
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
        },
      })
      .then(({ data }) => {
        var xml: XMLChild = new XMLParser().parseFromString(data);
        const javaTypes = xml.children[0].children.find(
          (a) => a.name === 'java-types'
        );
        if (javaTypes) {
          setParams(
            javaTypes.children.find((a) => a.attributes.name === 'Complex')
              ?.children
          );
          setOpen(true);
        }
      });
  };
  return (
    <div>
      <Button variant='contained' onClick={handleClickCreatePnf}>
        create pnf
      </Button>
      <Button variant='contained' onClick={handleClickCreateComplex}>
        create complex
      </Button>
      {params?.length !== 0 && (
        <ModalCreatePnf open={open} setOpen={setOpen} params={params} />
      )}
    </div>
  );
}

export default App;
