<template>
  <section class="video-news-area">
    <div class="container custom-container">
      <div :class="[
        'video-news-box',
        darkClass && 'section' in darkClass ? darkClass.section : '',
      ]">
        <div class="row">
          <div class="col-lg-8">
            <div class="video-news-post">
              <div class="section-title section-title-2">
                <h3 class="title">Videos News</h3>
              </div>
              <div :class="[
                'video-news-post-item',
                darkClass && 'section_2' in darkClass
                  ? darkClass.section_2
                  : '',
              ]">
                <div class="video-news-post-thumb" style="width: 730px; height: 410px;">
                  <img :src="videoData.image_url" alt="" style="width: 730px; height: 410px; object-fit: cover; " />
                  <div class="play-btn">
                    <a class="video-popup" @click.prevent="$store.dispatch('toggleVideo')"><i
                        class="fab fa-youtube"></i></a>
                  </div>
                </div>
                <div class="video-news-post-content">
                  <div class="post-meta">
                    <div class="meta-categories">
                      <!-- <a href="#">{{ videoData.categoryIds && videoData.categoryIds.length > 0 &&
                        videoData.categoryIds[0].category_id.name
                      }}</a> -->
                    </div>
                    <div class="meta-date">
                      <span>{{ getLocalTime(videoData.updated_at) }}</span>
                    </div>
                  </div>
                  <h3 class="title">
                    <nuxt-link :to="{ name: 'blog-id', params: { id: videoData.id } }">{{ videoData.title }}</nuxt-link>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="populer-post">
              <div :class="['section-title', dark ? 'section-title-2' : '']">
                <h3 class="title">Popular</h3>
              </div>
              <div class="trending-sidebar-slider position-relative">
                <span @click="tssPrev" class="prev slick-arrow" style="display: block"><i
                    class="fal fa-angle-left"></i></span>
                <slider :settings="videoNewsSlide" ref="trendingSidebarSlide">
                  <div class="post_gallery_items">
                    <template v-for="(small, index) in smallPostGallery.slice(0, 4)">
                      <row-card :class="[
                        'populer_item-style',
                        darkClass && 'news_item' in darkClass
                          ? darkClass.news_item
                          : '',
                      ]" :key="index" :trending="true" :datas="small" />
                    </template>
                  </div>
                  <div class="post_gallery_items">
                    <template v-for="(small, index) in smallPostGallery.slice(0, 4)">
                      <row-card :class="[
                        'populer_item-style',
                        darkClass && 'news_item' in darkClass
                          ? darkClass.news_item
                          : '',
                      ]" :key="index" :trending="true" :datas="small" />
                    </template>
                  </div>
                </slider>
                <span @click="tssNext" class="next slick-arrow" style="display: block"><i
                    class="fal fa-angle-right"></i></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import smallPostGallery from "../Data/NewsRowCard";
import Slider from "../Helpers/Slider.vue";
import RowCard from "../Utility/Cards/RowCard.vue";
import { getLocalTime } from '../../utils/format'

export default {
  components: { Slider, RowCard },
  props: {
    darkClass: {
      type: Object,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    smallPostGallery: {
      type: Array,
      default: () => []
    },
    videoData: {
      type: Object,
      default: () => { }
    }
  },
  data: () => ({
    // smallPostGallery: smallPostGallery.data,
    videoNewsSlide: {
      arrows: false,
      slidesToShow: 1,
      slideToScroll: 1,
    },
  }),
  methods: {
    getLocalTime,
    tssPrev() {
      this.$refs.trendingSidebarSlide.prev();
    },
    tssNext() {
      this.$refs.trendingSidebarSlide.next();
    },
  },
};
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
