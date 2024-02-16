import { PrismaClient } from '@prisma/client';
import { DataFormType } from '../components/EstablishmentForm';

const prisma = new PrismaClient();
// created by CHATGPT
export async function getEstablishments() {
  //@ts-ignore
  return await prisma.establishment.findMany();
}

export async function createEstablishment(data: DataFormType) {
  return await prisma.establishment.create({ data });
}

export async function deleteEstablishment(id: number) {
  return await prisma.establishment.delete({
    where: {
      id: id,
    },
  });
}

export async function updateEstablishment(id: number, data: DataFormType) {
  return await prisma.establishment.update({
    where: {
      id: id,
    },
    data,
  });
}
