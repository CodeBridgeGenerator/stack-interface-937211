
import { faker } from "@faker-js/faker";
export default (user,count,AppNameIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
AppName: AppNameIds[i % AppNameIds.length],
appValidation: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
