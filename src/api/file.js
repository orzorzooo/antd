import { request, api, BASEURL } from "@/utils/request";
export const URL = `${BASEURL}/file`;
export const remove = (id) => api.delete(`${URL}/${id}`, {});
