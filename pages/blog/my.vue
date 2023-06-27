<template>
    <div>
        <about :blogsData="blogsData" :underReviewData="underReviewData" :toBeReleasedData="toBeReleasedData" />
    </div>
</template>
  
<script>
import About from "../../components/About/index";
export default {
    components: { About },
    data() {
        return {
            blogsData: {},
            underReviewData: {},
            toBeReleasedData: {},
        }
    },
    async asyncData({ $userApi }) {
        // const { data } = await $userApi.getUserBlogs({ perPage: 6, is_approved: true })
        // const { data } = await $userApi.getUserBlogs({ perPage: 6, is_published: true })
        let blogsData = {}
        let underReviewData = {}
        let toBeReleasedData = {}
        await $userApi.getUserBlogs({ perPage: 6 }) //blogs
            .then(res => {
                console.log(res)
                blogsData = res.data
            })
        await $userApi.getUserBlogs({ perPage: 6, is_approved: false, is_published: false }) //正在审核
            .then(res => {
                underReviewData = res.data
            })
        await $userApi.getUserBlogs({ perPage: 6, is_approved: true, is_published: false }) //待发布
            .then(res => {
                toBeReleasedData = res.data
            })
        return { blogsData: blogsData, underReviewData: underReviewData, toBeReleasedData: toBeReleasedData }
        // return { blogs: [] }
    }
};
</script>
  
<style></style>
  