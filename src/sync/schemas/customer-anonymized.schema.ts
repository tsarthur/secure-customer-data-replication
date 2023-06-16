import { Schema } from 'mongoose';
import { ICustomerAnonymised } from '../interfaces';

export const CustomerAnonymisedSchema = new Schema<ICustomerAnonymised>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      line1: String,
      line2: String,
      postcode: String,
      city: String,
      state: String,
      country: String,
    },
    createdAt: Date,
  },
  {
    collection: 'customers_anonymised',
    versionKey: false,
  }
);
