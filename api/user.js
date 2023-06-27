export default ($axios) => {
    return {
        getLoginToken: (params) => $axios.get('/api/users/token', { params }),
        loginWithIdentityToken: data => $axios.post('/api/users/login/token', data),
        getUserBlogs: (params) => $axios.get('api/users/blogs', { params })
        //   getData: params => $axios.get('/api/get_index_data', {params})
    }
}

