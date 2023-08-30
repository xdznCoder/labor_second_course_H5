import { defineStore } from "pinia";
import { getToken, setToken, removeToken } from "@/utils/auth/auth";
import rq from "@/api/user/user";
import router from "@/router";

interface badge {
  EvaluationsCnt: number
}

interface userInfo extends badge {
  token: string | null;
  realName: String | null;  // 真名
  name: string | null;      // 网名
  sex: number | null;
  studentId: string | null; // 学号
  yiBanId: string | null;
  uid: number | null; // 报名时候用的这个id
  avatar: string | null;
  enrollmentYear: string | null; // 入学年份
  contact: object | null;       // 联系方式
  semesterId: number | null;     // 当前学期的ID
}

export const useUserStore = defineStore("userInfo", {
  state: (): userInfo => {
    return {
      token: getToken(),
      realName: null,
      name: null,
      studentId: null, //学号
      avatar: null,
      yiBanId: null,
      uid: null,
      enrollmentYear: null,
      sex: null,
      contact: null,
      semesterId: null,
      EvaluationsCnt: 0
    };
  },
  actions: {
    init(token: string) {
      return new Promise((resolve) => {
        removeToken();
        setToken(token);
        resolve(true);
      });
    },
    clearToken() {
      return new Promise((resolve) => {
        removeToken();
        this.token = null;
        resolve(true)
      })
    },
    initInfo(data: any) {
      console.log("data: ", data)
      return new Promise((resolve) => {
        this.realName = data.name;
        this.name = data.nickname;
        this.studentId = data.studentId;
        this.avatar = data.avatar;
        this.yiBanId = data.yiBanId;
        this.uid = data.userId;
        this.enrollmentYear = data.enrollmentYear;
        this.sex = data.sex;
        this.contact = data.contact;
        resolve(true);
      });
    },
    getEvaluationsCnt(data: number) {
      this.EvaluationsCnt = data
    },
    clearState() { },
    logOut() {
      rq.logOut().then(() => {
        this.clearState();
        this.clearToken()
          .then(() => {
            useUserStore().$reset();
            window.localStorage.clear()
          })
          .finally(() => {
            router.replace({ path: '/', query: { isLogOut: 1 } });
          })
      });
    },
    setSemesterId(id: number) {
      this.semesterId = id;
    },
  },
  getters: {},
  persist: true, // 持久化
});
