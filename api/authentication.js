export default ($axios) => {
    return {
        getLoginToken: (params) => $axios.get('/api/users/token', { params }),

        //   postData: data => $axios.post('/api/get_index_data', data),
        //   getData: params => $axios.get('/api/get_index_data', {params})
    }
}

