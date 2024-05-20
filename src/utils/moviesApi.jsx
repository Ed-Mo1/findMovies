const baseUrl = "https://api.themoviedb.org/3/";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWQxMjlhYWEzODhjYWNkOGU0OWU2MmE3MDZmMGIzZSIsInN1YiI6IjY2MGYyOTQ4ZDZkYmJhMDE2MzcxMzBiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C0Hb87JNpYArfq5rOgg7McH7zYIJ54RSu16KKsesDKA`,
};
export const getTrending = async (type, page) => {
  try {
    const resp = await fetch(`${baseUrl}/trending/${type}/day?page=${page}`, {
      method: "GET",
      headers,
    });
    if (!resp.ok) {
      throw new Error("Something went wrong");
    }
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getUpcoming = async (page) => {
  try {
    const resp = await fetch(`${baseUrl}/movie/upcoming?page=${page}`, {
      method: "GET",
      headers,
    });
    if (!resp.ok) {
      throw new Error("Something went wrong");
    }
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getSearchResults = async (searchItem, controller) => {
  try {
    const resp = await fetch(`${baseUrl}/search/multi?query=${searchItem}`, {
      method: "GET",
      headers,
      signal: controller.signal,
    });
    if (!resp.ok) {
      throw new Error("Something went wrong");
    }
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getDetails = async (mediaType, id,controller) => {
  try {
    const resp = await fetch(`${baseUrl}/${mediaType}/${id}`, {
      method: "GET",
      headers,
      signal: controller.signal,
    });
    if (!resp.ok) {
      throw new Error("Something went wrong");
    }
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getCredits = async (mediaType, id, controller) => {
  try {
    const resp = await fetch(`${baseUrl}/${mediaType}/${id}/credits`, {
      method: "GET",
      headers,
      signal: controller.signal,
    });
    if (!resp.ok) {
      throw new Error("Something went wrong");
    }
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
