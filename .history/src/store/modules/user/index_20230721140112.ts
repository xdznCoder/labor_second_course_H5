import { defineStore } from "pinia"
import { getToken, setToken, removeToken } from "@/utils/auth/auth"
import rq from '@/api/user/user'
import router from '@/router'

interface userInfo {
    token: string | undefined,
    stuInfo: {
        name: string | null,
        sex: string | null,
        student_id: number | null, // 学号
        yiban_id: number | null,
        uId: number | null,        // 报名时候用的这个id
        avatar: string | null,
        enrollment_year: string | null,   // 入学年份
    }

}

export const useUserStore = defineStore('userInfo', {
    state: (): userInfo => {
        return {
            token: getToken(),
            stuInfo: {
                name: null,
                student_id: null,  //学号
                avatar: null,
                yiban_id: null,
                uId: null,
                enrollment_year: null,
                sex: null,
            }
        }
    },
    actions: {
        init(token: string) {
            return new Promise((resolve, reject) => {
                removeToken()
                setToken(token)
                resolve(true)
            })
        },
        clearToken() {
            removeToken()
            this.token = undefined
        },
        initInfo(data: any) {
            return new Promise((resolve, reject) => {
                const { userInfo } = data
                this.username = userInfo.username
                this.avatar = userInfo.avatar
                resolve(true)
            })
        },
        clearState() {
            this.username = null
            this.stuId = null
            this.avatar = null
        },
        logOut() {
            rq.logOut()
                .then(() => {
                    this.clearToken()
                    this.clearState()
                    router.push({ path: '/login?redirect=/' })
                })
        }
    },
    getters: {

    },
    persist: true  // 持久化
})