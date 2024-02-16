import { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';

type DataFormType = {
  code: string;
  name: string;
  city: string;
  street: string;
};

export type EditDataFormType = DataFormType & { id: number };

type CombinedDataFormType = EditDataFormType | DataFormType;

interface Props {
  onSubmit: (formData: DataFormType) => void;
  onClose: () => void;
  establishment?: EditDataFormType;
  mode: 'add' | 'edit';
}

const EstablishmentForm: React.FC<Props> = ({
  onSubmit,
  onClose,
  establishment,
  mode,
}) => {
  const initialFormData = establishment || {
    code: '',
    name: '',
    city: '',
    street: '',
  };
  const [formData, setFormData] =
    useState<CombinedDataFormType>(initialFormData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant='outlined'
            label='Code'
            name='code'
            value={formData.code}
            onChange={handleChange}
            disabled={mode === 'edit'}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant='outlined'
            label='Name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant='outlined'
            label='City'
            name='city'
            value={formData.city}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant='outlined'
            label='Street'
            name='street'
            value={formData.street}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            style={{ marginRight: '8px' }}
          >
            {mode === 'edit' ? 'Edit' : 'Add'}
          </Button>
          <Button onClick={onClose} variant='contained'>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EstablishmentForm;
