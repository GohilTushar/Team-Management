import { IUser } from '../models/user.model';

export {};

declare global {
  namespace Express {
    interface User extends IUser{
        _id: any;
        currentWorkSpace:any
    }
  }      
}