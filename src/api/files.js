import { request, api, BASEURL } from "@/utils/request";
export const URL = `${BASEURL}/files`;
export const ASSETS_URL = `${BASEURL}/assets`;

export const findAll = () => api.get(`${URL}`, {});
export const create = (data) => api.post(`${URL}`, data);
export const remove = (id) => api.delete(`${URL}/${id}`, {});
