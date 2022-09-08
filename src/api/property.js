import { request } from "@/utils/request";

const BASE_URL = `${process.env.VUE_APP_API_BASE_URL}/property`;
export const findAll = () => request(`${BASE_URL}`, "get");
export const upload = (data) => request(`${BASE_URL}/upload`, "post", data);
export const uploadURL = () => `${BASE_URL}/upload`;
