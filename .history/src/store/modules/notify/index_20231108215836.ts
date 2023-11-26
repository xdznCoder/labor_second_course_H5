import { defineStore } from "pinia";

/* function planObj<T>(arg: Array<T>):Array<T> {
    return arg
} */
interface windowNotifyBar {
    isShow: boolean
    text: string
}

export const useNotifyStore = defineStore("useNotifyStore", {
    state: (): windowNotifyBar => {
        return {
            isShow: false,
            text: 'Hello TypeScript!',
        };
    },
    actions: {
        notify(notifyText: string) {
            this.text = notifyText
            this.isShow = true
            let time =
                setTimeout(() => {
                    this.isShow = false
                }, 6 * 1000)
        }
    },
});