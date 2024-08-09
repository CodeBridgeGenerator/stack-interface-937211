
import { faker } from "@faker-js/faker";
export default (user,count,LogoIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
Logo: LogoIds[i % LogoIds.length],
pathToLogo: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
