<template>
    <div>
        <drawer @toggleSidebar="toggleSidebar" :sidebar="sidebar" />
        <top-bar @toggleSidebar="toggleSidebar" />
        <Nuxt />
    </div>
</template>
  
<script>
import TopBar from '../components/Utility/Header/index.vue'
import Drawer from "../components/Mobile/Drawer.vue";

export default {
    components: { TopBar, Drawer },
    data() {
        return {
            sidebar: false,
        }
    },
    methods: {
        toggleSidebar() {
            this.sidebar = !this.sidebar;
        },
        topToBottom() {
            const result = document.querySelector(".go-top");
            if (
                document.body.scrollTop > window.innerHeight ||
                document.documentElement.scrollTop > window.innerHeight
            ) {
                result.classList.add("active");
            } else {
                result.classList.remove("active");
            }
        },
    },
}
</script>
  