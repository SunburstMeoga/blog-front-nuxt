export default ($axios) => {
    return {
        getBlogList: (params) => $axios.get('/api/blogs/list', { params }),
        getBlogDetails: (params) => $axios.get('/api/blogs', { params }),
        getBlogCategories: (params) => $axios.get('api/categories/list', { params }),
        uploadImage: data => $axios.post('/api/image', data),
        createOrUpdateBlogs: data => $axios.post('/api/blogs', data),
        getOptions: (params) => $axios.get('/api/options', { params }),
        publisBlog: data => $axios.post('/api/blogs/publish', data)
        //   postData: data => $axios.post('/api/get_index_data', data),
        //   getData: params => $axios.get('/api/get_index_data', {params})
    }
}

