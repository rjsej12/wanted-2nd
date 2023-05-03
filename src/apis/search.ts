import axios from 'axios';

const fetchByKeyword = async (keyword: string) => {
  const result = await axios.get(`/api/?name=${keyword}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return result.data;
};

export const searchAPI = {
  fetchByKeyword,
};
