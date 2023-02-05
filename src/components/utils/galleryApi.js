import axios from 'axios';

// export const getGalleryItems = async (search, page, perPage) => {
//   const URL = `https://pixabay.com/api/?q=${search}&page=${page}&key=31865177-941795f6a9b4b09e4f4c303b4&image_type=photo&orientation=horizontal&per_page=${perPage}`;
//   const { data } = await axios.get(URL);
//   console.log('MY DATA', data);
//   return data;
// };

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/?',
  params: {
    key: '31865177-941795f6a9b4b09e4f4c303b4',
    image_type: 'photo',
    orientation: 'horizontal',
  },
});

export const getGalleryItems = async (q, page, per_page) => {
  const { data } = await instance.get('/', {
    params: {
      q,
      page,
      per_page,
    },
  });
  return data;
};
