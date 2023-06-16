import { Model } from 'mongoose';
import { getCustomersWithAnonymousFields, getTimeout } from '../utils';
import { saveKey } from '../utils/save-key';
import { ICustomerAnonymisedUpdate, ICustomerAnonymisedCreate, ICustomerAnonymised } from '../interfaces';

export const realtimeSync = async (customerAnonymizedModel: any): Promise<void> => {
  try {
    const data: ICustomerAnonymised[] = [];
    const isInsertManyInProgress = { value: false };

    await customerAnonymizedModel.watch().on('change', async (change: any) => {
      try {
        const newData = change.fullDocument;

        data.push(newData);
      } catch (error) {
        console.error(error);
      }
    });

    setInterval(async () => {
      try {
        if (!isInsertManyInProgress.value) {
          isInsertManyInProgress.value = true;

          await customerAnonymizedModel.insertMany(data);

          data.length = 0;

          isInsertManyInProgress.value = false;
        }
      } catch (error) {
        console.error(error);
      }
    }, 1000);
  } catch (err) {
    console.error(err);
  }
};
