import { faker } from '@faker-js/faker';

export const getFakeClients = (customersNumber: number) => {
  const count = { value: 0 };
  const customers = [];

  while (count.value < customersNumber) {
    const gender = faker.person.sexType();

    const customer = {
      firstName: faker.person.firstName(gender),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      createdAt: new Date(),
      address: {
        line1: faker.location.streetAddress(),
        line2: faker.location.secondaryAddress(),
        postcode: faker.location.zipCode(),
        city: faker.location.city(),
        state: faker.location.state({ abbreviated: true }),
        country: faker.location.countryCode(),
      },
    };

    customers.push(customer);
    count.value++;
  }

  return customers;
};
