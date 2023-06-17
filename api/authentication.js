export default ($axios) => {
    return {
        getLoginToken: (params) => $axios.get('/api/users/token', { params }),

        loginWithIdentityToken: data => $axios.post('/api/users/login/token', data),
        //   getData: params => $axios.get('/api/get_index_data', {params})
    }
}

