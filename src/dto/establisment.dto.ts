export interface EstablishmentBase {
  code: string;
  name: string;
  city: string;
  street: string;
}

export interface EstablishmentDto extends EstablishmentBase {
  id: number;
}

export type DataFormType = EstablishmentBase;

export type CombinedDataFormType = EstablishmentDto | DataFormType;
