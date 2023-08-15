<template>
  <div class="most-share-post-item">
    <div class="post-meta">
      <div class="meta-categories">
        <!-- <a href="#">{{ datas.categoryIds && datas.categoryIds.length > 0 && datas.categoryIds[0].category_id.name
        }}</a> -->
      </div>
      <div class="meta-date">
        <span>{{ getLocalTime(datas.updated_at) }}</span>
      </div>
    </div>
    <h3 class="title">
      <nuxt-link to="/posts/postOne">{{ datas.title }}</nuxt-link>
    </h3>
    <ul>
      <li><i class="fab fa-twitter"></i> 2.2K</li>
      <li><i class="fab fa-facebook-f"></i> 3.5K</li>
    </ul>
    <div class="count">
      <span>{{ count }}</span>
    </div>
  </div>
</template>

<script>
import { getLocalTime } from '../../../utils/format'

export default {
  props: {
    datas: {
      type: Object,
    },
    count: {
      type: Number,
    },
  },
  methods: {
    getLocalTime
  }
};
</script>

<style></style>
