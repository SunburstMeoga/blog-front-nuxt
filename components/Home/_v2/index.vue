<template>
  <div>
    <video-pop-up />
    <drawer @toggleSidebar="toggleSidebar" :sidebar="sidebar" />
    <header-one image="logo.png" @toggleSidebar="toggleSidebar" />
    <trending-news />
    <features class="pb-40" />
    <post-gallery />
    <single-play-post />
    <video-news />
    <home-one-post-area />
    <footer-one />
    <back-to-top />
  </div>
</template>

<script>
import BackToTop from "../../Helpers/BackToTop.vue";
import Drawer from "../../Mobile/Drawer.vue";
import FooterOne from "../../Utility/Footer/FooterOne.vue";
import HeaderOne from "../../Utility/Header/index";
import VideoPopUp from "../../Utility/VideoPopUp.vue";
import HomeOnePostArea from "../../_Containers/HomeOnePostArea.vue";
import Features from "../Features.vue";
import PostGallery from "../PostGallery.vue";
import SinglePlayPost from "../SinglePlayPost.vue";
import TrendingNews from "../TrendingNews.vue";
import VideoNews from "../VideoNews.vue";
export default {
  components: {
    VideoPopUp,
    Drawer,
    HeaderOne,
    TrendingNews,
    Features,
    PostGallery,
    SinglePlayPost,
    VideoNews,
    HomeOnePostArea,
    FooterOne,
    BackToTop,
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