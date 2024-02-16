import { NextApiRequest, NextApiResponse } from 'next';
import {
  createEstablishment,
  deleteEstablishment,
  updateEstablishment,
} from '../../handlers/databaseHandler';

// created by CHATGPT
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const establishmentData = req.body;
      const newEstablishment = await createEstablishment(establishmentData);
      res.status(201).json(newEstablishment);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error adding establishment to database' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const id = req.query.id as string;
      await deleteEstablishment(parseInt(id));
      res.status(200).json({ message: 'Establishment deleted successfully' });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error deleting establishment from database' });
    }
  } else if (req.method === 'PUT') {
    try {
      const id = req.query.id as string;
      const establishmentData = req.body;
      const updatedEstablishment = await updateEstablishment(
        parseInt(id),
        establishmentData
      );
      res.status(200).json(updatedEstablishment); // Отправляем успешный ответ с обновленными данными учреждения
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error updating establishment in database' }); // Отправляем ошибку в случае возникновения ошибки при обновлении
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
