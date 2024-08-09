
import { faker } from "@faker-js/faker";
export default (user,count,PathIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
Path: PathIds[i % PathIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
