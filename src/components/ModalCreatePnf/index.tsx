import { FC, MouseEventHandler, useEffect, useMemo } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { setter } from '../../@types/utils';
import { TextField } from '@mui/material';
import './styles.css';
import axios from 'axios';
import { createNewEntity, objType, validationSchema } from './utils';
interface IProps {
  open: boolean;
  setOpen: setter<boolean>;
  params?: XMLChild[];
  url?: string;
}
const ModalCreatePnf: FC<IProps> = ({ open, setOpen, params }) => {
  const fields = useMemo(() => {
    return (
      params
        ?.find((a) => a.name === 'java-attributes')
        ?.children?.filter((a) => a.attributes.type === 'java.lang.String') ??
      []
    );
  }, [params]);

  const formik = useFormik({
    initialValues: fields.reduce((acc, item) => {
      if (!acc[item.attributes.name]) {
        acc[item.attributes.name] = '';
      }
      return acc;
    }, {} as objType),
    onSubmit: (values) => {
      formik
        .validateForm(formik.values)
        .then((val) =>
          createNewEntity({ value: val, values: formik.values, params })
        );
    },
    validationSchema: yup.object(
      fields.reduce((acc, item) => {
        if (!!item.attributes?.required) {
          //@ts-ignore
          acc[item.attributes.name] = yup
            .string()
            .required(`${item.attributes.name} is required`);
        }
        return acc;
      }, {})
    ),
    validateOnChange: false,
  });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>Create new Pnf</DialogTitle>

      <DialogContent>
        <form>
          <div className='form__wrapper'>
            {fields?.map(({ attributes }) => (
              <TextField
                className='mt-16'
                key={attributes.name}
                id={attributes.name}
                name={attributes.name}
                label={attributes.name}
                onChange={formik.handleChange}
                variant='outlined'
                error={
                  formik.touched[attributes.name] &&
                  Boolean(formik.errors[attributes.name])
                }
                helperText={
                  formik.touched[attributes.name] &&
                  formik.errors[attributes.name]
                }
              />
            ))}
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={formik.handleSubmit as any} autoFocus type='submit'>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ModalCreatePnf;
