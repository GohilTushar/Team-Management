import { IUser } from '../models/user.model';

declare global {
  namespace Express {
    interface User extends IUser{
        _id: any
        currentWorkSpace:any
    }
     interface Request {
      user?: User;
    }
  }      
}

  export {};