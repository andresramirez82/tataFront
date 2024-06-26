import Axios from "../components/axios/Axios";
import { Tag } from "../models/products";


export const getTags = (): Promise<Tag[]> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<Tag[]>((resolve, reject) => {
        Axios.get(`/tags`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

export const addTags = (newTag: Tag): Promise<Tag> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<Tag>((resolve, reject) => {
        Axios.post(`/tags`,newTag)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};