<template>
    <div>
        <about :underReviewBlogs="underReviewBlogs" :blogs="blogs" :toBeReleasedBlogs="toBeReleasedBlogs" />
    </div>
</template>
  
<script>
import About from "../../components/About/index";
export default {
    components: { About },
    data() {
        return {
            blogs: [],
            underReviewBlogs: [],
            toBeReleasedBlogs: []
        }
    },
    async asyncData({ $userApi }) {
        const { data } = await $userApi.getUserBlogs()
        console.log(data)
        let underReviewBlogs = []
        let toBeReleasedBlogs = []
        data.docs.map(item => {
            if (!item.is_approved) { //正在审核
                underReviewBlogs.push(item)
            }
            if (item.is_approved && !item.is_published) { //已审核待发布
                toBeReleasedBlogs.push(item)
            }
        })
        return { blogs: data.docs, underReviewBlogs: underReviewBlogs, toBeReleasedBlogs: toBeReleasedBlogs }
    }
};
</script>
  
<style></style>
  