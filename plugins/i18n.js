import en_us from "../assets/lang/en_us"
import zh_cn from "../assets/lang/zh_cn"
import zh_hk from "../assets/lang/zh_hk"

const i18n = {
    location: ['zh_cn', 'zh_hk', 'en_us'],
    defaultLocale: 'zh_cn',
    vueI18n: {
        fallbackLocale: 'zh_cn',//回退策略，指定的locale中没有找到对应资源的情况下使用的locale
        messages: { //要渲染的信息，有多少语言就添加多少种
            zh_cn: zh_cn,
            zh_hk: zh_hk,
            en_us: en_us
        }
    }
}

export default i18n