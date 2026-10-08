export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  token: string;
}

export type ActivityType = "SERVICO" | "COMERCIO" | "MISTO";

export interface Mei {
  id: string;
  cnpj: string;
  companyName: string;
  fantasyName: string | null;
  ownerName: string;
  cpf: string;
  state: string;
  city: string;
  mainActivityCNAE: string;
  activityType: ActivityType;
  hasAccountant: boolean;
}

export interface Accountant {
  id?: string;
  name: string;
  email: string | null;
  phone: string | null;
  createdAt?: string;
}

export interface FormActionState {
  success: boolean;
  error: string;
  message?: string;
  redirectTo?: string;
}

export type RevenueCategory = "VENDA" | "SERVICO" | "OUTROS";

export interface RevenueType {
  id: string;
  meiId?: string;
  amount: string;
  date: string;
  type: RevenueCategory;
  note: string | null;
  createdAt: string;
}
