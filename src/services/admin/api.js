import axios from "axios";

export const api = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api",
  headers: {
    TokenCybersoft: import.meta.env.VITE_CYBERSOFT_TOKEN,
  },
});

