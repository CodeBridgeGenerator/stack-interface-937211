
import { faker } from "@faker-js/faker";
export default (user,count,schemaGenIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
schemaGen: schemaGenIds[i % schemaGenIds.length],
serviceTemp: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
