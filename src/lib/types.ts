export interface User{
   id: string;
   name: string;
   email: string;
   createAt: string
}

export interface AuthUser{
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
   fantasyName?: string;
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
   email: string;
   phone: string;
   createdAt?: string;
}

export interface FormActionState {
   success: boolean;
   error: string;
   message?: string;
   redirectTo?: string;
}
