import { InferSchemaType, Schema } from 'mongoose';

export type ICustomer = InferSchemaType<typeof CustomerSchema>;

export const CustomerSchema = new Schema(
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
    collection: 'customers',
    versionKey: false,
  }
);
