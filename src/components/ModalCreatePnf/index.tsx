import { FC } from 'react';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { setter } from '../../@types/utils';
import { TextField } from '@mui/material';
import './styles.css';
interface IProps {
  open: boolean;
  setOpen: setter<boolean>;
  fields: XMLChild[] | undefined;
}

// fields?.reduce((acc, item) => {
//   if (!acc[item.attributes.name]) {
//     acc[item.attributes.name] = '';
//   }
//   return acc;
// }, {}),
const ModalCreatePnf: FC<IProps> = ({ open, setOpen, fields }) => {
  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      console.log(values);
    },
    validateOnChange: false,
  });
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = () => {
    console.log(formik.values);
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
        <form onSubmit={formik.handleSubmit}>
          <div className='form__wrapper'>
            {fields?.map((item) => (
              <TextField
                className='mt-16'
                key={item.attributes.name}
                id={item.attributes.name}
                name={item.attributes.name}
                label={item.attributes.name}
                onChange={formik.handleChange}
                variant='outlined'
              />
            ))}
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onSubmit} autoFocus type='submit'>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ModalCreatePnf;
