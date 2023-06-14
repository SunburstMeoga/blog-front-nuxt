export default ($axios) => {
    return {
        getBlogList: () => $axios.get('/api/blogs/list'),
        getBlogDetails: (params) => $axios.get('/api/blogs', { params })

        //   postData: data => $axios.post('/api/get_index_data', data),
        //   getData: params => $axios.get('/api/get_index_data', {params})
    }
}

