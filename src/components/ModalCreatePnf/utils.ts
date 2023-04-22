import axios from 'axios';
import { FormikErrors } from 'formik';

export type objType = { [key in string]: string };

type paramsType = {
  value: FormikErrors<objType>;
  values: objType;
  params?: XMLChild[];
};

export const createNewEntity = ({ value, values, params }: paramsType) => {
  if (Object.keys(value).length === 0) {
    const url = params
      ?.find((a) => a.name === 'xml-properties')
      ?.children.find((item) => item.attributes.name === 'uriTemplate')
      ?.attributes.value;

    const uniqueProps =
      params
        ?.find((a) => a.name === 'xml-properties')
        ?.children.find((item) => item.attributes.name === 'uniqueProps')
        ?.attributes.value ?? '';
    axios.put(
      window.location.origin +
        url?.replace(/\s*\{.*?\}\s*/g, values[uniqueProps]),
      values,
      { headers: { Authorization: 'Basic QUFJOkFBSQ==' } }
    );
  }
};

export const getInitialValues = (fields: XMLChild[]): objType =>
  fields.reduce((acc, item) => {
    if (!acc[item.attributes.name]) {
      acc[item.attributes.name] = '';
    }
    return acc;
  }, {} as objType);
