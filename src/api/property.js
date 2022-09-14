import { request, api } from "@/utils/request";

const BASE_URL = `${process.env.VUE_APP_API_BASE_URL}/property`;
export const findAll = () => request(`${BASE_URL}`, "get");
export const upload = (data) => request(`${BASE_URL}/upload`, "post", data);
export const uploadURL = () => `${BASE_URL}/upload`;

// export const create = (data) => request(`${BASE_URL}`, "post", data);
export const create = (data) => api.post(`${BASE_URL}`, data);
export const findOne = (id) => api.get(`${BASE_URL}/${id}`, {});
