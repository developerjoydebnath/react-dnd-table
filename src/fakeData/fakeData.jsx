
import { faker } from '@faker-js/faker';


export const fakeData = ({numberOfRows}) => {
    const data = [];

    for(let i = 0; i < numberOfRows; i++){
        let row = {
            id: faker.string.uuid(),
            account_name: faker.finance.accountName(),
            account_number: faker.finance.accountNumber(16),
            amount: faker.finance.amount(),
            cvv: faker.finance.creditCardCVV(),
            card_number: faker.finance.creditCardNumber(),
        }
        data.push(row);
    }

    return data;
}