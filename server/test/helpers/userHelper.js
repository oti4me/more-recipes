

/* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-unresolved: 0 */
import faker from 'faker';

const fakerObj = {
  users: {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'henryotighe',
    confirmPassword: 'hernyotighe',
    phone: faker.phone.phoneNumber(),
    image: 'image/img.jpg'
  },
  firstUser: {
    firstname: 'faker',
    lastname: 'testmister',
    email: 'factory@email.com',
    password: 'Password4$',
    confirmPassword: 'Password4$',
    phone: '2344566777',
    image: 'image/img.jpg'
  },
  secondUser: {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(6),
    phone: faker.phone.phoneNumber()
  },
  thirdUser: {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(6),
    phone: faker.phone.phoneNumber(),
    image: 'image/img.jpg'
  },
  fourthUser: {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(6),
    phone: faker.phone.phoneNumber(),
    image: 'image/img.jpg'
  },
  wrongUser: {
    firstname: 'testuserone',
    lastname: 'testmister',
    email: 'test@email.com',
    password: '',
    phone: '2344566777',
    image: 'image/img.jpg'
  },
  wrongUser2: {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: '',
    password: faker.internet.password(6),
    phone: faker.phone.phoneNumber(),
    image: 'image/img.jpg'
  },
};

export default fakerObj;