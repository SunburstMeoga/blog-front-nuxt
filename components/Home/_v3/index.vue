<template>
  <div>
    <video-pop-up />
    <drawer @toggleSidebar="toggleSidebar" :sidebar="sidebar" />
    <header-one
      class="header-dark"
      image="logo-2.png"
      :darkClass="{ menuItem: 'newspark-dark-menu-items' }"
      @toggleSidebar="toggleSidebar"
    />
    <single-play-post class="single-play-post-dark-area" />
    <video-news
      :dark="true"
      class="video-news-dark"
      :darkClass="{
        section: 'video-news-box-dark',
        section_2: 'video-news-post-item-dark',
        news_item: 'gallery_item_dark',
      }"
    />
    <trending-news
      :dark="true"
      :darkClass="{
        title: 'section-title-2',
        item: 'trending-news-item-dark',
        news_section: 'trending-news-post-items-dark',
        news_item: 'gallery_item_dark',
      }"
    />
    <features :dark="true" />
    <post-gallery
      class="pt-50"
      :darkClass="{
        section: 'post_gallery_sidebar_dark',
        item: 'gallery_item_dark',
      }"
    />
    <home-one-post-area class="pt-5" />
    <footer-one />
    <back-to-top />
  </div>
</template>

<script>
import Drawer from "../../Mobile/Drawer.vue";
import VideoPopUp from "../../Utility/VideoPopUp.vue";
import HeaderOne from "../../Utility/Header/index";
import BackToTop from "../../Helpers/BackToTop.vue";
import SinglePlayPost from "../SinglePlayPost.vue";
import VideoNews from "../VideoNews.vue";
import TrendingNews from "../TrendingNews.vue";
import Features from "../Features.vue";
import PostGallery from "../PostGallery.vue";
import HomeOnePostArea from "../../_Containers/HomeOnePostArea.vue";
import FooterOne from "../../Utility/Footer/FooterOne.vue";
export default {
  components: {
    VideoPopUp,
    Drawer,
    HeaderOne,
    BackToTop,
    SinglePlayPost,
    VideoNews,
    TrendingNews,
    Features,
    PostGallery,
    HomeOnePostArea,
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