import axios, { AxiosError } from 'axios';

const fetchByKeyword = async (keyword: string) => {
  try {
    console.info('calling api');
    const result = await axios.get(`/api/?name=${keyword}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return result.data;
  } catch (error) {
    if (error instanceof AxiosError) alert(error);
  }
};

export const searchAPI = {
  fetchByKeyword,
};
