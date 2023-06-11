export default function ({ $axios, redirect }) {
    // request interceptor
    $axios.interceptors.request.use(
        config => {
            // do something before request is sent
            // console.log('the request is pending')
            return config
        },
        error => {
            // do something with request error
            return Promise.reject(error)
        }
    )
    $axios.onRequest(config => {
        // console.log('Making request to ' + config.url)
    })

    // response interceptor
    $axios.interceptors.response.use(
        /**
         * Determine the request status by custom code
         * Here is just an example
         * You can also judge the status by HTTP Status Code
         */
        response => {
            const res = response
            if (res.data.status === 'success') {
                return res
            } else {
                console.log('res.data.status err', res)
                redirect('/404')
                // if the custom code is not 200, it is judged as an error.
            }
            return Promise.reject(new Error(res.msg || 'Error'))
        },
        error => {
            console.log('err' + error) // for debug

            return Promise.reject(error)
        }
    )

    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        console.log('请求错误', error)
        if (code === 400) {
            redirect('/404')
        } else if (code === 500) {
            redirect('/500')
        }
    })
}