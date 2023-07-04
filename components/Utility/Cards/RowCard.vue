<template>
  <nuxt-link :to="{ name: 'blog-id', params: { id: datas.id } }" v-if="category" class="gallery_item">
    <template v-if="datas">
      <div class="gallery_item_thumb" style="width: 100px; height: 77px; overflow: hidden;">
        <img v-if="datas.image_url" :src="datas.image_url" alt="post" />
      </div>
      <div class="gallery_item_content">
        <div class="post-meta">
          <div class="meta-categories">
            <a href="#">{{ datas.categoryIds && datas.categoryIds.length > 0 && datas.categoryIds[0].category_id.name
            }}</a>
          </div>
          <div class="meta-date">
            <span>{{ getLocalTime(datas.updated_at) }}</span>
          </div>
        </div>
        <h4 class="title">
          <a href="#">{{ datas.title }}</a>
        </h4>
      </div>
    </template>
  </nuxt-link>
  <nuxt-link :to="{ name: 'blog-id', params: { id: datas.id } }" v-else-if="countingtwo"
    class="post-gallery-style-2 most-view-style-2">
    <div class="post-gallery-thumb">
      <img v-if="datas.image_url" :src="datas.image_url" alt="post" />
      <span>{{ count }}</span>
    </div>
    <div class="post-gallery-content">
      <h5 class="title">
        <a href="#">{{ datas.title }}</a>
      </h5>
      <div class="meta-post-2-style">
        <div class="meta-post-categores">
          <a href="#">{{ datas.categoryIds && datas.categoryIds.length > 0 && datas.categoryIds[0].category_id.name }}</a>
        </div>
        <div class="meta-post-date">
          <span>{{ getLocalTime(datas.updated_at) }}</span>
        </div>
      </div>
    </div>
  </nuxt-link>
  <nuxt-link :to="{ name: 'blog-id', params: { id: datas.id } }" v-else-if="trending" class="gallery_item">
    <div class="gallery_item_thumb" style="width: 100px; height: 77px;">
      <img img v-if="datas.image_url" :src="datas.image_url" alt="post" />
      <div v-if="datas.trending" class="icon"><i class="fas fa-bolt"></i></div>
    </div>
    <div class="gallery_item_content">
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
      <!-- <span v-if="counting">{{ counting }}</span> -->
    </div>
  </nuxt-link>
  <nuxt-link :to="{ name: 'blog-id', params: { id: datas.id } }" v-else-if="counting"
    class="gallery_item gallery_item-style-2">
    <div class="gallery_item_thumb" style="width: 80px; height: 64px;">
      <img :src="datas.image_url" alt="gallery" />
      <div class="icon"><i class="fas fa-bolt"></i></div>
    </div>
    <div class="gallery_item_content">
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
      <span>{{ count }}</span>
    </div>
  </nuxt-link>
  <nuxt-link :to="{ name: 'blog-id', params: { id: datas.id } }" v-else-if="sports" class="gallery_item">
    <template v-if="datas">
      <div class="gallery_item_thumb" style="width: 100px; height: 78px;">
        <img img v-if="datas.image_url" :src="datas.image_url" alt="post" />
      </div>
      <div class="gallery_item_content">
        <div class="post-meta">
          <div class="meta-categories">
            <a href="#">{{ datas.categoryIds && datas.categoryIds.length > 0 && datas.categoryIds[0].category_id.name
            }}</a>
          </div>
          <div class="meta-date">
            <span>{{ getLocalTime(datas.updated_at) }}</span>
          </div>
        </div>
        <h4 class="title">
          <a href="#">{{ datas.title }}</a>
        </h4>
      </div>
    </template>
  </nuxt-link>
  <nuxt-link :to="{ name: 'blog-id', params: { id: datas.id } }" v-else
    class="single__post d-lg-flex text-center text-lg-left">
    <template v-if="datas">
      <div class="post-thumb mb-3 mb-lg-0" style="width: 100px; height: 77px;">
        <img v-if="datas.image_url" :src="datas.image_url" alt="post" />
      </div>
      <div class="post-content">
        <h4 class="title">
          <a href="#" class="line-clumb">{{ datas.title }}</a>
        </h4>
        <!-- <p class="line-clumb-one">{{ datas.slug }}</p> -->
        <p class="line-clumb-one"> People have been infected in United</p>
        <!-- <div v-html="datas.content"></div> -->
      </div>
    </template>
  </nuxt-link>
</template>

<script>
import { getLocalTime } from '../../../utils/format'

export default {
  props: {
    category: {
      type: Boolean,
    },
    trending: {
      type: Boolean,
    },
    sports: { type: Boolean, default: false },
    datas: {
      type: Object,
    },
    counting: {
      type: Boolean,
    },
    countingtwo: {
      type: Boolean,
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

<style scoped>
img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
