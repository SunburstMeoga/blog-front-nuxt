<template>
    <div>
        this is details page {{ blogId }}
    </div>
</template>

<script>
export default {
    data() {
        return {
            blogId: ''
        }
    },
    asyncData({ params }) {
        return { blogId: params.id }
    }
}
</script>

<style></style>