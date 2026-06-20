
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