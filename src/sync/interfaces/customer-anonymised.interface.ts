import { ObjectId } from 'mongoose';

export interface ICustomerAnonymised {
  firstName: string;
  lastName: string;
  email: string;
  address: {
    line1: string;
    line2: string;
    postcode: string;
    city: string;
    state: string;
    country: string;
  };
  createdAt: Date;
}

export interface ICustomerAnonymisedCreate {
  insertOne: {
    document: ICustomerAnonymised;
  };
}

export interface ICustomerAnonymisedUpdate {
  updateOne: {
    filter: {
      _id: ObjectId;
    };
    update: ICustomerAnonymised;
  };
}
