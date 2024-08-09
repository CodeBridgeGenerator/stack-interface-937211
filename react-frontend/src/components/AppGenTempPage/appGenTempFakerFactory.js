
import { faker } from "@faker-js/faker";
export default (user,count,AppStackNameIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
AppStackName: AppStackNameIds[i % AppStackNameIds.length],
apptemp: "A",

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
