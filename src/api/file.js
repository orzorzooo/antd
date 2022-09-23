import { request, api, BASEURL } from "@/utils/request";
export const URL = `${BASEURL}/file`;
export const UPLOAD_URL = `${BASEURL}/file/upload`;
export const remove = (id) => api.delete(`${URL}/${id}`, {});
export const upload = (data) => request(`${URL}/upload`, "post", data);
