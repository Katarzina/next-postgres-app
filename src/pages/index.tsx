import { useState } from 'react';
import Layout from '../components/Layout';
import { TreeView, TreeItem } from '@mui/x-tree-view';
import { Button, Modal, Grid, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import { getEstablishments } from '../handlers/databaseHandler';
import { GetServerSidePropsContext, NextPage } from 'next';
import { EstablismentDto } from '../api/dto/establisment.dto';
import EstablishmentForm, {
  EditDataFormType,
} from '../components/EstablishmentForm';
import DeleteNotification from '../components/DeleteNotification';

interface Props {
  establishments: EstablismentDto[];
}

const HomePage: NextPage<Props> = ({ establishments }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [establishmentsState, setEstablishmentsState] =
    useState<EstablismentDto[]>(establishments);
  const [editEstablishmentData, setEditEstablishmentData] =
    useState<null | EditDataFormType>(null);
  const [openNotification, setOpenNotification] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenAddModal = () => {
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (data) => {
    setIsEditMode(true);
    setEditEstablishmentData(data);
    setIsModalOpen(true);
  };

  const handleOpenDeleteNotification = (data) => {
    setOpenNotification(true);
    setEditEstablishmentData(data);
  };

  const handleAddEstablishment = async (newEstablishmentData) => {
    try {
      const response = await fetch('/api/establishments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEstablishmentData),
      });

      if (!response.ok) {
        throw new Error('Failed to add establishment');
      }

      const updatedEstablishments = await response.json();

      setEstablishmentsState((prevState) => [
        ...prevState,
        updatedEstablishments,
      ]);
    } catch (error) {
      console.error('Error adding establishment:', error.message);
    }
  };

  const handleEditEstablishment = async (
    updatedEstablishmentData: EditDataFormType
  ) => {
    const data = {
      code: updatedEstablishmentData.code,
      name: updatedEstablishmentData.name,
      city: updatedEstablishmentData.city,
      street: updatedEstablishmentData.street,
    };
    try {
      const response = await fetch(
        `/api/establishments?id=${updatedEstablishmentData.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to edit establishment');
      }

      const updatedEstablishment = await response.json();
      setEstablishmentsState((prevState) => {
        return prevState.map((establishment) =>
          establishment.id === updatedEstablishment.id
            ? updatedEstablishment
            : establishment
        );
      });
    } catch (error) {
      console.error('Error editing establishment:', error.message);
    }
  };

  const handleConfirmDelete = () => {
    setOpenNotification(false); // Close notification after submit
    if (editEstablishmentData) {
      handleDeleteEstablishment(editEstablishmentData.id);
    }
  };

  const handleDeleteEstablishment = async (id: number) => {
    try {
      const response = await fetch(`/api/establishments?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete establishment');
      }

      console.log('Establishment deleted successfully');
      setEstablishmentsState((prevState) =>
        prevState.filter((establishment) => establishment.id !== id)
      );
    } catch (error) {
      console.error('Error deleting establishment:', error.message);
    }
  };

  return (
    <Layout>
      <Grid container spacing={3}>
        {/* Left part */}
        <Grid item xs={4}>
          <Grid container spacing={2} alignItems='center'>
            <Grid item xs={9}>
              <Typography variant='h5'>Cities</Typography>
            </Grid>
            <Grid item xs={3} container justifyContent='flex-end'>
              <Button color='primary' onClick={handleOpenAddModal} size='small'>
                <AddIcon />
              </Button>
            </Grid>
          </Grid>
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            {[
              ...new Set(
                establishmentsState.map((establishment) => establishment.city)
              ),
            ].map((city, cityIndex) => (
              // Show unique cities
              <TreeItem key={cityIndex} nodeId={city} label={city}>
                {/* Filter establishments for current city */}
                {establishmentsState
                  .filter((establishment) => establishment.city === city)
                  .map((establishment) => (
                    // Отображаем учреждения для текущего города
                    <TreeItem
                      key={establishment.id}
                      nodeId={establishment.id.toString()}
                      label={
                        establishment.name +
                        ' ' +
                        establishment.street +
                        ' ' +
                        establishment.street
                      }
                    />
                  ))}
              </TreeItem>
            ))}
          </TreeView>
        </Grid>
        {/* Right part */}
        <Grid item xs={8}>
          <Typography variant='h5'>Establishments</Typography>
          {establishmentsState.map((establishment) => {
            return (
              <Grid key={establishment.id} container alignItems='center'>
                <Typography key={establishment.id}>
                  {establishment.name +
                    ' ' +
                    establishment.street +
                    ' ' +
                    establishment.street}
                </Typography>
                <div onClick={() => handleOpenEditModal(establishment)}>
                  <EditIcon />
                </div>
                <div
                  onClick={() => handleOpenDeleteNotification(establishment)}
                >
                  <DeleteIcon />
                </div>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <DeleteNotification
        open={openNotification}
        onCancel={() => setOpenNotification(false)}
        onConfirm={handleConfirmDelete}
      />
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            border: '1px solid #000',
            borderRadius: '8px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            padding: '20px',
            maxWidth: '60%',
          }}
        >
          <h2>{isEditMode ? 'Edit Establishment' : 'Add Establishment'}</h2>
          <EstablishmentForm
            establishment={editEstablishmentData}
            onSubmit={
              isEditMode ? handleEditEstablishment : handleAddEstablishment
            }
            onClose={handleCloseModal}
            mode={isEditMode ? 'edit' : 'add'}
          />
        </div>
      </Modal>
    </Layout>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const establishments = await getEstablishments();

  return {
    props: {
      establishments,
    },
  };
};

export default HomePage;
