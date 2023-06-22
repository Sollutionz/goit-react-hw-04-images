import HTTPClient from "./config";
import { API_KEY } from "./config";


export const fetchImages = async (query,page) => {
   return await HTTPClient.get(`/?q=${query}&page=${page}`, {
     params: {
       key: API_KEY,
       image_type: 'photo',
       orientation: 'horizontal',
       per_page: '12',
     },
   })
     .then(response => {
       return response.data;
     })
     .then(data => {
       const images = data.hits.map(
         ({ id, tags, webformatURL, largeImageURL }) => ({
           id: id,
           alt: tags,
           img: webformatURL,
           modalImages: largeImageURL,
         })
       );
       return { images };
     });
}
