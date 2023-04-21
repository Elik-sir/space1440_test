import { FC } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { setter } from '../../@types/utils';
import { TextField } from '@mui/material';
import './styles.css';
interface IProps {
  open: boolean;
  setOpen: setter<boolean>;
  fields: XMLChild[] | undefined;
}

const ModalCreatePnf: FC<IProps> = ({ open, setOpen, fields }) => {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(fields);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>Create new Pnf</DialogTitle>
      <DialogContent>
        <div className='form__wrapper'>
          {fields?.map((item) => (
            <TextField
              key={item.name}
              className='mt-16'
              id={item.name}
              label={item.attributes.name}
              variant='outlined'
            />
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose} autoFocus>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ModalCreatePnf;
