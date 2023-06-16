import * as randomstring from 'randomstring';
import { ICustomerAnonymised } from '../interfaces';
import { ICustomer } from '../schemas';

export const randomize = (): string => {
  return randomstring.generate({ length: 8, charset: 'alphabetic' });
};

export function getCustomersWithAnonymousFields(customers: ICustomer[]): ICustomerAnonymised[] | any {
  const anonymizeCustomer = customers.map((customer) => {
    const { email, address: { line1, line2, postcode } = {} } = customer;
    const [_, emailDomain] = email ? email?.split('@') : [];

    return {
      ...customer,
      firstName: randomize(),
      lastName: randomize(),
      email: email ?? `${randomize()}@${emailDomain}`,
      address: {
        ...customer.address,
        line1: line1 ?? randomize(),
        line2: line2 ?? randomize(),
        postcode: postcode ?? randomize(),
      },
    };
  });

  return anonymizeCustomer;
}
