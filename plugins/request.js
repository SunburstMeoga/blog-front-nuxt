// 引入我们刚刚创建的index.js api文件
import blogApi from '@/api/blog.js'
import userApi from '@/api/user.js'


export default function ({ $axios, store }, inject) {
    function axiosConfig($axios) {
        let requestConfig = {}
        // 设置API的域名
        //$axios.setBaseURL(process.env.BASE_URL)
        // 设置请求拦截
        $axios.onRequest((config) => {
            // console.log('process.env.BASE_URL', process.env)
            // 用于调试
            if (process.env.DEBUG) {
                console.log('$axios.onRequest', config)
            }
            requestConfig = {
                baseURL: config.baseURL,
                url: config.url,
                method: config.method,
                data: config.data,
                headers: config.headers,
                params: config.params,
            }

            config.startTime = new Date().getTime()
            config.headers['Content-Type'] = 'application/json'
            /* 如果你需要token */
            // const token = store.state.auth.authToken || ''
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODcxOTkyNWUzZDRkMTFmODk4ODc4NCIsImlhdCI6MTY4NzUxNDU2NSwiZXhwIjoxNjk1MjkwNTY1fQ.rduIGlVjpNInNRIIWf7kX0ATyQULXL3pCtpRimncjMo'
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            console.log('token', token)
            return config
        })
        // 设置响应拦截
        $axios.onResponse((response) => {
            response.config.endTime = new Date().getTime()
            const status = response.status

            if (status === 200) {
                // 打印出每个接口的响应时间
                // console.info(response.config.url, '请求时间', response.config.endTime - response.config.startTime + 'ms')
                // console.info(response)
                // 用于调试
                if (process.env.DEBUG) {
                    console.info('$axios.onResponse', response.data)
                }
                // 返回接口数据
                // console.log(response.data)
                return response.data
            } else {
                // 如果请求失败的，打印出相应的错误信息，更好的修改。
                const responseConfig = response ? response.config : {}
                console.error('响应拦截报错提示： ', {
                    url: responseConfig.baseURL + responseConfig.url,
                    status: response.status,
                    statusText: response.statusText,
                    method: responseConfig.method,
                    headers: responseConfig.headers,
                    data: responseConfig.data,
                    params: responseConfig.params,
                    responseData: response.data,
                })
            }
        })

        // axios错误处理
        $axios.onError((error) => {
            const response = error.response || {}
            const responseConfig = response.config || {}
            console.error('$axios.onError: ', error)
            console.error('错误处理提示 ', {
                url: responseConfig.baseURL + responseConfig.url,
                status: response.status,
                statusText: response.statusText,
                method: responseConfig.method,
                headers: responseConfig.headers,
                data: responseConfig.data,
                params: responseConfig.params,
                responseData: response.data,
                ...requestConfig,
            })

        })
        // 最后返回$axios对象
        return $axios
    }
    inject('blogApi', blogApi(axiosConfig($axios.create())))
    inject('userApi', userApi(axiosConfig($axios.create())))

}

