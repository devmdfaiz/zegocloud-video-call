import { faker } from "@faker-js/faker";

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();

export const auth = {
    session: {
        id: faker.string.uuid(),
        username: faker.internet.username({
            firstName,
            lastName
        }),
        fullName: `${firstName} ${lastName}`,
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        phone: faker.phone.number(),
        createdAt: faker.date.past(),
    }
}