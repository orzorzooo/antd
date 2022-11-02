import { LOGIN, ROUTES } from "@/services/api";
import { request, METHOD, removeAuthorization } from "@/utils/request";
import axios from "axios";
/**
 * 登录服务
 * @param name 账户名
 * @param password 账户密码
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function login(email, password) {
  const { data } = await axios.post("https://api.orzorzooo.com/auth/login", {
    email: "admin@panda.com",
    password: "admin",
  });
  console.log(data);
  // return request(LOGIN, METHOD.POST, {
  //   // name: name,
  //   email: "admin@panda.com",
  //   password: "admin",
  // });
}

export async function getRoutesConfig() {
  return request(ROUTES, METHOD.GET);
}

/**
 * 退出登录
 */
export function logout() {
  localStorage.removeItem(process.env.VUE_APP_ROUTES_KEY);
  localStorage.removeItem(process.env.VUE_APP_PERMISSIONS_KEY);
  localStorage.removeItem(process.env.VUE_APP_ROLES_KEY);
  localStorage.removeItem("t");
  removeAuthorization();
}
export default {
  login,
  logout,
  getRoutesConfig,
};
