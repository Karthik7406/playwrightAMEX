import { faker } from '@faker-js/faker';
import { FormData } from '../pages/goldCardPage';

// This function generates a fake user data
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function formatPhoneNumber(phoneNumber) {
  // Remove all non-digit characters
  const digitsOnly = phoneNumber.replace(/\D/g, '');

  // Get the last 10 digits
  const lastTenDigits = digitsOnly.slice(-8);

  return "06"+lastTenDigits;
}

export function createUser():FormData {

    let user:FormData =  {
   
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        dateOfBirth: formatDate(faker.date.birthdate()),
        email: faker.internet.email(),
        phoneNumber: formatPhoneNumber(faker.phone.number())
    };

    return user;

}