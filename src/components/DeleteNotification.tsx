import { Button, Snackbar } from '@mui/material';

interface DeleteNotificationProps {
  onConfirm: () => void;
  onCancel: () => void;
  open: boolean;
}

const DeleteNotification = ({
  open,
  onCancel,
  onConfirm,
}: DeleteNotificationProps) => {
  return (
    <Snackbar
      open={open}
      message='Are you sure you want to delete the record?'
      action={
        <>
          <Button color='secondary' onClick={onConfirm}>
            Yes
          </Button>
          <Button color='primary' onClick={onCancel}>
            No
          </Button>
        </>
      }
    />
  );
};

export default DeleteNotification;
