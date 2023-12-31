import request from '@/utils/http/request';
import { getInfoByStuIdResultModel, getInfoByTokenResultModel } from '../types/user';
export interface loginParams {
  username: string;
  password: string;
}

export default {
  /**
   * @param 一个对象，{ username, password }
   * @returns swpu_token
   */
  async login(data: loginParams) {
    return await request({
      url: "/user/login",
      method: "POST",
      data,
    });
  },
  /**
   *
   */
  async yibanLogin() {
    return (window.location.href =
      import.meta.env.VITE_APP_API_BASE_URL +
      `/user/yiban/login?callback=${import.meta.env.VITE_APP_REDIRECT_PATH}`);
  },

  async yibanBind(uid: number) {
    window.location.href = import.meta.env.VITE_APP_API_BASE_URL + '/user/yiban/bind?id=' + uid + '&callback=' + import.meta.env.VITE_APP_YIBANBIND_CALLBACK
  },

  /**
   * 通过token获取用户信息
   * @returns
   */
  async getInfo(token: string) {
    return await Promise.all([
      request.get<getInfoByTokenResultModel>(
        url: "/user/info?type=0", {
        url: "/user/info?type=0",
        params: { token },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }),
      request.get<getInfoByStuIdResultModel>({
        url: "/user/student/user",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          swpu_token: token,
        },
      }),
    ]);
  },
  async getBudge() {
    return await request({
      url: '/curriculum/evaluations/count',
      method: 'GET'
    })
  },
  async logOut() {
    return await request({
      url: "/user/logout",
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },
  async resetPassword(data: { newPassword: string; oldPassword: string }) {
    return await request({
      url: "/user/password",
      method: "post",
      data: data,
    });
  },
  async updateUser(data: {
    id: string | number;
    nickname: string;
    avatar: string;
    sex: number,
    departmentId: number,
    department: string,
    contact: any,
    enrollmentYear: number
  }) {
    return request({
      url: "/user/student/by/student",
      data,
      method: "put",
    });
  },
};