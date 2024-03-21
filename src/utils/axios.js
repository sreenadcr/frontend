import axios from "axios";

export const axiosAdmin =  axios.create({
    baseURL:"http://localhost:3000/",
     
  });