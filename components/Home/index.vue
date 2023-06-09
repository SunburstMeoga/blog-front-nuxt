<template>
  <div>
    <video-pop-up />
    <drawer @toggleSidebar="toggleSidebar" :sidebar="sidebar" />
    <!--====== HEADER PART START ======-->
    <header-one image="logo.png" @toggleSidebar="toggleSidebar" />
    <!--====== HEADER PART ENDS ======-->

    <!--====== POST PART START ======-->

    <post-part-home-one />

    <!--====== POST PART ENDS ======-->

    <!--====== POST GALLERY PART START ======-->
    <post-gallery />

    <!--====== POST GALLERY PART ENDS ======-->

    <!--====== FEATURE PART START ======-->
    <features />

    <!--====== FEATURE PART ENDS ======-->

    <!--====== TRENDING NEWS PART START ======-->
    <trending-news />

    <!--====== TRENDING NEWS PART ENDS ======-->

    <!--====== SINGLE PLAY POST PART START ======-->
    <single-play-post />

    <!--====== VIDEO NEWS PART START ======-->

    <video-news />

    <!--====== VIDEO NEWS PART ENDS ======-->

    <!--====== ALL POST PART START ======-->

    <home-one-post-area />

    <!--====== ALL POST PART ENDS ======-->

    <!--====== FOOTER PART START ======-->
    <footer-one />

    <!--====== FOOTER PART ENDS ======-->

    <!--====== GO TO TOP PART START ======-->
    <back-to-top />
    <!--====== GO TO TOP PART ENDS ======-->
  </div>
</template>
<script>
import HeaderOne from "../Utility/Header/index";
import PostPartHomeOne from "./PostPartHomeOne.vue";
import PostGallery from "./PostGallery.vue";
import Features from "./Features.vue";
import TrendingNews from "./TrendingNews.vue";
import SinglePlayPost from "./SinglePlayPost.vue";
import VideoNews from "./VideoNews.vue";
import FooterOne from "../Utility/Footer/FooterOne.vue";
import Drawer from "../Mobile/Drawer.vue";
import VideoPopUp from "../Utility/VideoPopUp.vue";
import HomeOnePostArea from "../_Containers/HomeOnePostArea.vue";
import BackToTop from "../Helpers/BackToTop.vue";
export default {
  components: {
    HeaderOne,
    PostPartHomeOne,
    PostGallery,
    Features,
    TrendingNews,
    SinglePlayPost,
    VideoNews,
    FooterOne,
    Drawer,
    VideoPopUp,
    HomeOnePostArea,
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

<style scoped>
/* play post */
.single-play-post-area .single-play-box {
  padding: 23px 12px !important;
}
</style>
