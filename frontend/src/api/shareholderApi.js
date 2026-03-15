import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:6060/api"
});

// Fetch shareholders with JWT
export const getShareholders = () => {
  return API.get("/shareholders", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
};