<template>
  <nuxt-link to="/posts/postOne" class="d-block">
    <div class="post_gallery_play">
      <div class="bg-image">
        <img :src="datas.image_url" alt="" />
      </div>
      <div class="post__gallery_play_content" style="z-index: 10">
        <div class="post-meta">
          <div class="meta-categories">
            <!-- <a href="#">{{ datas.categoryIds[0].category_id.name }}</a> -->
          </div>
          <div class="meta-date">
            <span>{{ getLocalTime(datas.updated_at) }}</span>
          </div>
        </div>
        <h2 class="title">
          <a href="#">{{ datas.title }}</a>
        </h2>
        <p>
          <!-- The property, complete with a 30-seat screening room, a 100-seat
          amphitheater and a swimming pond with sandy beach and outdoor shower… -->
        </p>
      </div>
      <!-- <div class="post_play_btn" @click.prevent="$store.dispatch('toggleVideo')">
        <a class="video-popup" href="https://www.youtube.com/watch?v=4mGyYNuG6us" a>
          <i class="fas fa-play"></i>
        </a>
      </div> -->
    </div>
  </nuxt-link>
</template>

<script>
import { getLocalTime } from '../../../utils/format'

export default {
  props: ["datas"],
  methods: {
    getLocalTime,
  }
};
</script>

<style scoped>
img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
