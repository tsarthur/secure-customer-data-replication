import mongoose, { connect } from 'mongoose';
import { ICustomer, ICustomerAnonymised } from './interfaces';
import { fullReindex, realtimeSync } from './mods';
import { getModel } from './utils';

require('dotenv').config();

const syncApp = async () => {
  try {
    mongoose.set('strictQuery', false);
    await connect(process.env.DB_URI || '');

    const CustomerModel = getModel<ICustomer>('Customers');
    const CustomerAnonymisedModel = getModel<ICustomerAnonymised>('Customers_anonymised');

    if (process.argv.includes('--full-reindex')) {
      await fullReindex(CustomerModel, CustomerAnonymisedModel);
      return process.exit(0);
    }

    realtimeSync(CustomerAnonymisedModel);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

syncApp();
