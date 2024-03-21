import axios from "axios";

export const createBlogs = async (data) => {
  console.log(data);
  try {
    const response = await axios.post("http://localhost:3000/blog", data);
  } catch (error) {
    console.log("err", error);
    throw error;
  }
};

export const getBlogs = async (data) => {
  try {
    const response = await axios.get("http://localhost:3000/blog/");
    console.log(response);
    return response;
  } catch (error) {
    console.log("err", error);
    throw error;
  }
};

export const editBlogs = async (data) => {
  try {
    const response = await axios.put(`http://localhost:3000/blog/${data.id}`,data);
    console.log(response);
    return response;
  } catch (error) {
    console.log("err", error);
    throw error;
  }
};

export const deleteBlogs = async (data) => {
    console.log(data)
  try {
    const response = await axios.delete(`http://localhost:3000/blog/${data}`,);
    console.log(response);
    return response;
  } catch (error) {
    console.log("err", error);
    throw error;
  }
};
