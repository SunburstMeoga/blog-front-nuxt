<template>
  <div>
    <video-pop-up />
    <drawer @toggleSidebar="toggleSidebar" :sidebar="sidebar" />
    <header-one image="logo.png" @toggleSidebar="toggleSidebar" />
    <post-gallery />
    <features />
    <trending-news />
    <single-play-post />
    <video-news />
    <home-one-post-area />
    <footer-one />
    <back-to-top />
  </div>
</template>

<script>
import Drawer from "../../Mobile/Drawer.vue";
import VideoPopUp from "../../Utility/VideoPopUp.vue";
import HeaderOne from "../../Utility/Header/index";
import PostGallery from "../PostGallery.vue";
import Features from "../Features.vue";
import TrendingNews from "../TrendingNews.vue";
import SinglePlayPost from "../SinglePlayPost.vue";
import VideoNews from "../VideoNews.vue";
import HomeOnePostArea from "../../_Containers/HomeOnePostArea.vue";
import BackToTop from "../../Helpers/BackToTop.vue";
import FooterOne from "../../Utility/Footer/FooterOne.vue";
export default {
  components: {
    VideoPopUp,
    Drawer,
    HeaderOne,
    PostGallery,
    Features,
    TrendingNews,
    SinglePlayPost,
    VideoNews,
    HomeOnePostArea,
    BackToTop,
    FooterOne,
  },
  data: () => ({
    sidebar: false,
  }),
  methods: {
    toggleSidebar() {
      this.sidebar = !this.sidebar;
    },
  },
};
</script>

<style>
/* play post */
.single-play-post-area .single-play-box {
  padding: 23px 12px !important;
}
</style>