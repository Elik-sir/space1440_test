import axios from 'axios';
import { FormikErrors } from 'formik';
import * as yup from 'yup';
export type objType = { [key in string]: string };

export const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});
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
