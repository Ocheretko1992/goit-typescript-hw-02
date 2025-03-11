import axios from "axios";

const getImages = async <T>(setSearchQuery:string, setPage:number):Promise<T> => {
  try {
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: {
        query: setSearchQuery,
        client_id: "jNnEeQDKXr-DtliXEjaHH6okzZMW789HqqFY6RCXqCA",
        page: setPage,
        per_page: 12,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};
export default getImages
