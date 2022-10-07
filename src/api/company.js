import { request, api, BASEURL } from "@/utils/request";

export const URL = `${BASEURL}/company`;
export const findAll = () => request(URL, "get");
// export const upload = (data) => request(`${URL}/upload`, "post", data);
export const create = (data) => api.post(`${URL}`, data);
export const update = (id, data) => api.patch(`${URL}/${id}`, data);
export const findOne = (id) => api.get(`${URL}/${id}`, {});
export const remove = (id) => api.delete(`${URL}/${id}`, {});
