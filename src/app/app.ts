import { model, connect } from 'mongoose';
import { CustomerSchema } from './schemas';
import { getFakeClients, getRandomNumber } from './utils';
import { ICustomer } from './interfaces';

require('dotenv').config();

async function isertFakeClients(): Promise<void> {
  const Customer = model<ICustomer>('Customers', CustomerSchema);

  setInterval(async () => {
    const randomNumber = getRandomNumber(1, 10);
    const customers = getFakeClients(randomNumber);

    await Customer.insertMany(customers);
  }, 200);
}

async function main() {
  try {
    await connect(process.env.DB_URI || '');
    await isertFakeClients();
  } catch (error) {
    console.error(error);
  }
}

main();
