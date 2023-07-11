<template>
  <div>
    <video-pop-up />
    <drawer @toggleSidebar="toggleSidebar" :sidebar="sidebar" />
    <!--====== HEADER PART START ======-->
    <!-- <header-one image="logo.png" @toggleSidebar="toggleSidebar" /> -->
    <!--====== HEADER PART ENDS ======-->

    <!--====== POST PART START ======-->

    <post-part-home-one :blogList="blogList" />

    <!--====== POST PART ENDS ======-->

    <!--====== POST GALLERY PART START ======-->
    <post-gallery :smallPostGallery="blogList" />

    <!--====== POST GALLERY PART ENDS ======-->

    <!--====== FEATURE PART START ======-->
    <!-- <features /> -->

    <!--====== FEATURE PART ENDS ======-->

    <!--====== TRENDING NEWS PART START ======-->
    <trending-news :TrendingPosts="blogList" />

    <!--====== TRENDING NEWS PART ENDS ======-->

    <!--====== SINGLE PLAY POST PART START ======-->
    <!-- <single-play-post :playPostDatas="blogList" /> -->

    <!--====== VIDEO NEWS PART START ======-->

    <!-- <video-news :smallPostGallery="blogList" :videoData="videoData" /> -->

    <!--====== VIDEO NEWS PART ENDS ======-->

    <!--====== ALL POST PART START ======-->

    <home-one-post-area :entertainmentNewsDatas="blogList" />

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
import HeaderOne from "../components/Utility/Header/index";
import PostPartHomeOne from "../components/Home/PostPartHomeOne.vue";
import PostGallery from "../components/Home/PostGallery.vue";
import Features from "../components/Home/Features.vue";
import TrendingNews from "../components/Home/TrendingNews.vue";
import SinglePlayPost from "../components/Home/SinglePlayPost.vue";
import VideoNews from "../components/Home/VideoNews.vue";
import FooterOne from "../components/Utility/Footer/FooterOne.vue";
import Drawer from "../components/Mobile/Drawer.vue";
import VideoPopUp from "../components/Utility/VideoPopUp.vue";
import HomeOnePostArea from "../components/_Containers/HomeOnePostArea.vue";
import BackToTop from "../components/Helpers/BackToTop.vue";
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
    blogList: [],
    videoData: {}
  }),
  methods: {
    toggleSidebar() {
      this.sidebar = !this.sidebar;
    },
  },
  async asyncData({ $blogApi }) {
    const { data } = await $blogApi.getBlogList()
    return { blogList: data.docs, videoData: data.docs[0] }
  },
  // mounted() {
  //   this.$axios.blogApi.getBlogList()
  //     .then(res => {
  //       this.blogList = res.data.docs
  //       this.videoData = res.data.docs[0]
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }
};
</script>

<style scoped>
/* play post */
.single-play-post-area .single-play-box {
  padding: 23px 12px !important;
}
</style>
