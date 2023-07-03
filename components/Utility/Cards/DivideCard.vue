<template>
  <div v-if="stype === 'row'" class="row">
    <div class="col-lg-6 col-md-6">
      <div class="business-post-thumb" style="width: 350px; height: 250px;">
        <img :src="datas.image_url" alt="post" />
      </div>
    </div>
    <div class="col-lg-6 col-md-6">
      <div class="trending-news-item">
        <div class="trending-news-content">
          <div class="post-meta">
            <div class="meta-categories">
              <nuxt-link to="/buisness">{{
                datas.categoryIds && datas.categoryIds.length > 0 && datas.categoryIds &&
                datas.categoryIds[0].category_id.name
              }}</nuxt-link>
            </div>
            <div class="meta-date">
              <span>{{ getLocalTime(datas.updated_at) }}</span>
            </div>
          </div>
          <h3 class="title">
            <nuxt-link to="/posts/postOne">{{ datas.title }}</nuxt-link>
          </h3>
          <p class="text">
            Lotto Zheng
          </p>
          <a v-if="readMore" href="#">Read more</a>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="stype === 'row-style-2'" class="bussiness-post-item">
    <div class="bussiness-post-thumb">
      <img :src="datas.image_url" alt="business" />
    </div>
    <div class="bussiness-post-content">
      <h3 class="title">
        <nuxt-link to="/posts/postOne">{{ datas.title }}</nuxt-link>
      </h3>
      <div class="meta-date-link">
        <span>{{ getLocalTime(datas.updated_at) }}</span>
        <ul>
          <li>
            <a href="#"><i class="fal fa-bookmark"></i></a>
          </li>
          <li>
            <a href="#"><i class="fas fa-share"></i></a>
          </li>
        </ul>
      </div>
      <p>
        {{ datas.article }}
      </p>
      <a href="#">LEARN MORE <img src="@/assets/images/arrow-2.svg" alt="" /></a>
    </div>
  </div>
  <div v-else-if="stype === 'col'" class="trending-news-item">
    <div class="trending-news-thumb" style="width: 350px; height: 250px;">
      <img :src="datas.image_url" alt="post" />
      <div v-if="datas.action === 'trending'" class="icon">
        <a href="#"><i class="fas fa-bolt"></i></a>
      </div>
    </div>
    <div class="trending-news-content">
      <div class="post-meta">
        <div class="meta-categories">
          <a href="#">{{ datas.categoryIds && datas.categoryIds.length > 0 && datas.categoryIds[0].category_id.name }}</a>
        </div>
        <div class="meta-date">
          <span>{{ getLocalTime(datas.updated_at) }}</span>
        </div>
      </div>
      <h3 class="title">
        <nuxt-link to="/posts/postOne">{{ datas.title }}</nuxt-link>
      </h3>
      <p class="text">
        Lotto Zheng
      </p>
      <a v-if="readMore" href="#">Read more</a>
    </div>
  </div>
  <div v-else-if="stype === 'col-style-2'" class="finance-item">
    <div class="finance-thumb">
      <img :src="datas.image_url" alt="finance" />
      <div class="finance-date">
        <span>{{ datas.categoryIds && datas.categoryIds.length > 0 && datas.categoryIds[0].category_id.name }}</span>
      </div>
    </div>
    <div class="finance-content">
      <h3 class="title">
        <nuxt-link to="/posts/postOne">{{ datas.title }}</nuxt-link>
      </h3>
      <p class="line-clumb">
        Lotto Zheng
      </p>
      <ul>
        <li>
          <a href="#"><i class="far fa-eye"></i> 53,346</a>
        </li>
        <li>
          <a href="#"><i class="far fa-heart"></i> 53,346</a>
        </li>
        <li>
          <a href="#"><i class="fas fa-share"></i> 53,346</a>
        </li>
      </ul>
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
    readMore: {
      type: Boolean,
      default: false,
    },
    stype: {
      type: String,
    },
  },
  methods: { getLocalTime }

};
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
