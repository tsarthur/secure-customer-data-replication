import { getCustomersWithAnonymousFields } from '../utils';

export async function fullReindex(customerModel: any, customerAnonymizedModel: any): Promise<void> {
  try {
    const customersCount = await customerModel.find({}, '+_id -__v').count().lean().exec();
    if (!Number(customersCount)) {
      return;
    }

    const numberIterations = Math.round(Number(customersCount) / 1000);
    const count = { value: 0 };
    const limit = { value: 1000 };
    const skip = { value: 0 };

    while (count.value < numberIterations) {
      const existingCustomers = await customerModel
        .find({}, '+_id -__v')
        .skip(skip.value)
        .limit(limit.value)
        .lean()
        .exec();

      if (!existingCustomers.length) {
        continue;
      }

      skip.value = existingCustomers.length;

      const customersWithAnonymousFields = getCustomersWithAnonymousFields(existingCustomers);
      try {
        await customerAnonymizedModel.insertMany(customersWithAnonymousFields, { ordered: false });
      } catch (error) {
        console.error(error);
      }

      count.value++;
    }
  } catch (err) {
    console.error(err);
  }
}
