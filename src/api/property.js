import { request, api, BASEURL } from "@/utils/request";

const URL = `${BASEURL}/property`;
export const findAll = () => request(URL, "get");
export const upload = (data) => request(`${URL}/upload`, "post", data);
// export const uploadURL = () => `${URL}/upload`;

// export const create = (data) => request(`${BASE_URL}`, "post", data);
export const create = (data) => api.post(`${URL}`, data);
export const findOne = (id) => api.get(`${URL}/${id}`, {});
