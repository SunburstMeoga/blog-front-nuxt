<template>
  <section class="about-item-area">
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <div class="about-tab-btn mt-10">
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li @click.prevent="selectTab('latest')" class="nav-item" role="presentation">
                <a :class="[selected === 'latest' ? 'active' : '']" class="nav-link" id="pills-home-tab"
                  data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">{{
                    $t('myBlogs.allBlogs') }}</a>
              </li>
              <li @click.prevent="selectTab('publish')" class="nav-item" role="presentation">
                <a :class="[selected === 'publish' ? 'active' : '']" class="nav-link" id="pills-profile-tab"
                  data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile"
                  aria-selected="false">{{ $t('myBlogs.toBeReleased') }}</a>
              </li>
              <li @click.prevent="selectTab('news')" class="nav-item" role="presentation">
                <a :class="[selected === 'news' ? 'active' : '']" class="nav-link" id="pills-profile-tab"
                  data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile"
                  aria-selected="false">{{ $t('myBlogs.underReview') }}</a>
              </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
              <div :class="[selected === 'latest' ? 'show active' : '']" class="tab-pane fade" id="pills-home"
                role="tabpanel" aria-labelledby="pills-home-tab">
                <div class="about-post-items">
                  <div class="row">
                    <template v-for="(data, index) in blogsList">
                      <div class="col-lg-12">
                        <div class="business-post-item mb-10">
                          <div class="row">
                            <div class="col-lg-6 col-md-6">
                              <div class="business-post-thumb" style="height: 250px;">
                                <img :src="data.image_url" alt="business" />
                              </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                              <div class="trending-news-item">
                                <div class="trending-news-content">
                                  <div class="post-meta">
                                    <div class="meta-categories">
                                      <!-- <a href="#">{{ data.categoryIds && data.categoryIds.length > 0 &&
                                        data.categoryIds[0].category_id.name }}</a> -->
                                    </div>
                                    <div class="meta-date">
                                      <span>{{ getLocalTime(data.created_at) }}</span>
                                    </div>
                                  </div>
                                  <h3 class="title">
                                    <nuxt-link :to="'/blog/details/' + data.id">
                                      {{ data.title }}
                                    </nuxt-link>
                                  </h3>
                                  <p class="text">
                                    {{ data.excerpt }}
                                  </p>
                                  <nuxt-link :to="'/blog/updata/' + data.id">
                                    {{ $t('operate.modify') }}
                                  </nuxt-link>
                                  <nuxt-link :to="'/blog/details/' + data.id">
                                    {{ $t('operate.check') }}
                                  </nuxt-link>
                                  <!-- <el-button size="small" type="primary">查看詳情</el-button> -->
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                    <div class="col-lg-12">
                      <div class="bussiness-btn">
                        <a @click.prevent="handleShowMore" class="main-btn main-btn-2">
                          {{ $t('operate.seeMore') }}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div :class="[selected === 'publish' ? 'show active' : '']" class="tab-pane fade" id="pills-home"
                role="tabpanel" aria-labelledby="pills-home-tab">
                <div class="about-post-items">
                  <div class="row">
                    <template v-for="(data, index) in toBeReleasedList">
                      <div class="col-lg-12">
                        <div class="business-post-item mb-10">
                          <div class="row">
                            <div class="col-lg-6 col-md-6">
                              <div class="business-post-thumb" style="height: 250px;">
                                <img :src="data.image_url" alt="business" />
                              </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                              <div class="trending-news-item">
                                <div class="trending-news-content">
                                  <div class="post-meta">
                                    <div class="meta-categories">
                                      <!-- <a href="#">{{ data.categoryIds && data.categoryIds.length > 0 &&
                                        data.categoryIds[0].category_id.name }}</a> -->
                                    </div>
                                    <div class="meta-date">
                                      <span>{{ getLocalTime(data.created_at) }}</span>
                                    </div>
                                  </div>
                                  <h3 class="title">
                                    <nuxt-link :to="'/blog/details/' + data.id">
                                      {{ data.title }}
                                    </nuxt-link>
                                  </h3>
                                  <p class="text">
                                    {{ data.excerpt }}
                                  </p>
                                  <!-- <el-button size="small" type="primary">發佈</el-button> -->
                                  <nuxt-link to="" @click.native="handleRelease(data)">
                                    {{ $t('operate.release') }}
                                  </nuxt-link>
                                  <nuxt-link :to="'/blog/updata/' + data.id">
                                    {{ $t('operate.modify') }}
                                  </nuxt-link>
                                  <nuxt-link :to="'/blog/details/' + data.id">
                                    {{ $t('operate.check') }}
                                  </nuxt-link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                    <div class="col-lg-12">
                      <div class="bussiness-btn">
                        <a @click.prevent="handleShowMore" class="main-btn main-btn-2">
                          {{ $t('operate.seeMore') }}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div :class="[selected === 'news' ? 'show active' : '']" class="tab-pane fade" id="pills-profile"
                role="tabpanel" aria-labelledby="pills-profile-tab">
                <div class="about-post-items">
                  <div class="row">
                    <template v-for="(data, index) in underReviewList">
                      <div class="col-lg-12">
                        <div class="bussiness-post-item mb-10 flex items-center">
                          <div class="bussiness-post-thumb"
                            style="width: 320px; height: 220px; border: 1px solid rgba(229, 231, 235, 1);">
                            <img :src="data.image_url" alt="business" />
                          </div>
                          <div class="bussiness-post-content">
                            <h3 class="title">
                              <nuxt-link :to="'/blog/details/' + data.id">
                                {{ data.title }}
                              </nuxt-link>
                            </h3>
                            <div class="meta-date-link">
                              <span>{{ getLocalTime(data.created_at) }}</span>
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
                              {{ data.excerpt }}
                            </p>
                            <nuxt-link :to="'/blog/updata/' + data.id">
                              {{ $t('operate.modify') }}
                            </nuxt-link>
                            <nuxt-link :to="'/blog/details/' + data.id">
                              {{ $t('operate.check') }}
                            </nuxt-link>

                          </div>
                        </div>
                      </div>
                    </template>
                    <div class="col-lg-12">
                      <div class="bussiness-btn">
                        <a @click.prevent="handleShowMore" class="main-btn main-btn-2">
                          {{ $t('operate.seeMore') }}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 mt-10">
          <style-one :datas="blogsData.docs" :sharePost="false" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import styleOne from "../Utility/Sidebar/StyleOne.vue";
import aboutDatas from "../Data/About";
import Posts from "../Data/TrendingHomeThree";
import { getLocalTime } from '../../utils/format'

export default {
  components: { styleOne },
  data: () => ({
    selected: "latest",
    aboutDatas: aboutDatas.data,
    posts: Posts.data,
  }),
  props: {
    blogsData: {
      type: Object,
      default: () => { }
    },
    underReviewData: {
      type: Object,
      default: () => { }
    },
    toBeReleasedData: {
      type: Object,
      default: () => { }
    },
    blogsList: {
      type: Array,
      default: () => []
    },
    underReviewList: {
      type: Array,
      default: () => []
    },
    toBeReleasedList: {
      type: Array,
      default: () => []
    },
  },
  methods: {
    getLocalTime,
    selectTab(value) {
      this.selected = value;
    },
    handleShowMore() {
      this.$emit('handleShowMore', this.selected)
    },
    handleRelease(item) {
      this.$emit('handleRelease', item)
    }
  },
};
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.business-post-thumb {
  border: 1px solid rgba(229, 231, 235, 1);
}

.bussiness-post-content>a:hover {
  border-color: #1091ff !important;
  background: #1091ff;
}

.bussiness-post-content>a {
  border: 2px solid #50585f;
  line-height: 40px;
  padding: 0 15px;
  display: inline-block;
  font-size: 14px;
  font-weight: 400;
  color: #222;
}

.bussiness-post-content>a:hover {
  background: #1091ff;
  border-color: #1091ff;
  color: #fff;
}

.bussiness-post-content>a {
  border: 2px solid #50585f;
  line-height: 40px;
  padding: 0 15px;
  display: inline-block;
  font-size: 14px;
  font-weight: 400;
  color: #222;
  margin-top: 15px;
}

.bussiness-post-content>a:hover {
  background: #1091ff;
  border-color: #1091ff;
  color: #fff;
}
</style>
