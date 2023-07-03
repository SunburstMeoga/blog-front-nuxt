<template>
  <nuxt-link to="/posts/postOne" v-if="stype === 'small'" class="feature-post d-block">
    <div class="feature-post-thumb">
      <img :src="datas.image_url" alt="feature" />
    </div>
    <div class="feature-post-content">
      <div class="post-meta">
        <div class="meta-categories">
          <a href="#">{{ datas.categoryIds && datas.categoryIds.length > 0 && datas.categoryIds[0].category_id.name }}</a>
        </div>
        <div class="meta-date">
          <span>{{ getLocalTime(datas.updated_at) }}</span>
        </div>
      </div>
      <h4 class="title">
        <a href="#">{{ datas.title }}</a>
      </h4>
    </div>
  </nuxt-link>
  <nuxt-link to="/posts/postOne" v-else-if="stype === 'big'" class="single-play-post-item d-block"
    style="width: 542px; height: 420px;">
    <img :src="datas.image_url" alt="feature" />
    <div class="single-play-post-content">
      <div class="post-meta">
        <div class="meta-categories">
          <a href="#">{{ datas.categoryIds && datas.categoryIds.length > 0 && datas.categoryIds[0].category_id.name }}</a>
        </div>
        <div class="meta-date">
          <span>{{ getLocalTime(datas.updated_at) }}</span>
        </div>
      </div>
      <h3 class="title">
        <a href="#">{{ datas.title }}</a>
      </h3>
    </div>
    <div v-if="datas.action === 'play'" class="play-btn">
      <a class="video-popup" @click.prevent="$store.dispatch('toggleVideo')"><i class="fas fa-play"></i></a>
    </div>
    <div v-if="datas.action === 'trending'" class="trending-btn">
      <a href="#"><i class="fas fa-bolt"></i></a>
    </div>
  </nuxt-link>
</template>

<script>
import { getLocalTime } from '../../../utils/format'
export default {
  props: {
    datas: {
      type: Object,
    },
    stype: {
      type: String,
    },
  },
  methods: {
    getLocalTime
  }
};
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
