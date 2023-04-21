import { useState } from 'react';
import axios from 'axios';
import XMLParser from 'react-xml-parser';
import { Button } from '@mui/material';
import ModalCreatePnf from './components/ModalCreatePnf';
import Data from './assets/aai_oxm_v27.xml';
import './App.css';
import { resType, traverse } from './utils/utils';

function App() {
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState<XMLChild[] | undefined>([]);
  const handleClick = () => {
    axios
      .get(Data, {
        headers: { 'Content-Type': 'application/xml; charset=utf-8' },
      })
      .then(({ data }) => {
        var xml: XMLChild = new XMLParser().parseFromString(data);
        const javaTypes = xml.children[0].children.find(
          (a) => a.name === 'java-types'
        );

        if (javaTypes) {
          let res: resType = {
            res: { children: [] as XMLChild[] } as XMLChild,
          };
          traverse(javaTypes, res);
          const params = res?.res?.children;
          //find URI
          console.log(
            params
              ?.find((a) => a.name === 'xml-properties')
              ?.children.find((item) => item.attributes.name === 'uriTemplate')
              ?.attributes.value
          );
          setFields(
            params
              ?.find((a) => a.name === 'java-attributes')
              ?.children?.filter(
                (a) => a.attributes.type === 'java.lang.String'
              )
          );
          setOpen(true);
        }
      });
  };
  return (
    <div>
      <Button variant='contained' onClick={handleClick}>
        create pnf
      </Button>
      <ModalCreatePnf open={open} setOpen={setOpen} fields={fields} />
    </div>
  );
}

export default App;
