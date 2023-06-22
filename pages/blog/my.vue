<template>
    <div>
        <about />
        {{ blogs }}
    </div>
</template>
  
<script>
import About from "../../components/About/index";
export default {
    components: { About },
    data() {
        return {
            blogs: []
        }
    },
    async asyncData({ $userApi }) {
        const { data } = await $userApi.getUserBlogs()
        console.log(data)
        // return { blogs: data.docs }
    }
};
</script>
  
<style></style>
  