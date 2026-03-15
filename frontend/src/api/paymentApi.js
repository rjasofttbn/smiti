import axios from "axios";

export const getPayments = () => {
  return axios.get("http://localhost:6060/api/payments", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};