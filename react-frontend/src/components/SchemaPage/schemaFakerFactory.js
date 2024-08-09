
import { faker } from "@faker-js/faker";
export default (user,count,stackIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
name: faker.lorem.sentence(""),
stack: stackIds[i % stackIds.length],
database: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
