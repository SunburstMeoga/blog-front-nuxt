<template>
  <section class="about-item-area">
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <div class="about-tab-btn mt-10">
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li @click.prevent="selectTab('latest')" class="nav-item" role="presentation">
                <a :class="[selected === 'latest' ? 'active' : '']" class="nav-link" id="pills-home-tab"
                  data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home"
                  aria-selected="true">全部博客</a>
              </li>
              <li @click.prevent="selectTab('publish')" class="nav-item" role="presentation">
                <a :class="[selected === 'publish' ? 'active' : '']" class="nav-link" id="pills-profile-tab"
                  data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile"
                  aria-selected="false">待發佈</a>
              </li>
              <li @click.prevent="selectTab('news')" class="nav-item" role="presentation">
                <a :class="[selected === 'news' ? 'active' : '']" class="nav-link" id="pills-profile-tab"
                  data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile"
                  aria-selected="false">正在審核</a>
              </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
              <div :class="[selected === 'latest' ? 'show active' : '']" class="tab-pane fade" id="pills-home"
                role="tabpanel" aria-labelledby="pills-home-tab">
                <div class="about-post-items">
                  <div class="row">
                    <template v-for="(data, index) in blogs">
                      <div class="col-lg-12">
                        <div class="business-post-item mb-10">
                          <div class="row">
                            <div class="col-lg-6 col-md-6">
                              <div class="business-post-thumb">
                                <img :src="data.image_url" alt="business" />
                              </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                              <div class="trending-news-item">
                                <div class="trending-news-content">
                                  <div class="post-meta">
                                    <div class="meta-categories">
                                      <a href="#">{{ data.categoryIds && data.categoryIds.length > 0 &&
                                        data.categoryIds[0].category_id.name }}</a>
                                    </div>
                                    <div class="meta-date">
                                      <span>March 26, 2020</span>
                                    </div>
                                  </div>
                                  <h3 class="title">
                                    <nuxt-link to="/posts/postOne">
                                      {{ data.title }}
                                    </nuxt-link>
                                  </h3>
                                  <p class="text">
                                    The property, complete with 30-seat screening
                                    from room, a 100-seat amphitheater and a
                                    swimming pond with sandy shower…
                                  </p>
                                  <a href="#">查看詳情</a>
                                  <!-- <el-button size="small" type="primary">查看詳情</el-button> -->
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                    <div class="col-lg-12">
                      <div class="pagination-item">
                        <nav aria-label="Page navigation example">
                          <ul class="pagination">
                            <li class="page-item active">
                              <a class="page-link" href="#">01</a>
                            </li>
                            <li class="page-item">
                              <a class="page-link" href="#">02</a>
                            </li>
                            <li class="page-item">
                              <a class="page-link" href="#">...</a>
                            </li>
                            <li class="page-item">
                              <a class="page-link" href="#">50</a>
                            </li>
                            <li class="page-item">
                              <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true"><i class="fas fa-caret-right"></i></span>
                              </a>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div :class="[selected === 'publish' ? 'show active' : '']" class="tab-pane fade" id="pills-home"
                role="tabpanel" aria-labelledby="pills-home-tab">
                <div class="about-post-items">
                  <div class="row">
                    <template v-for="(data, index) in toBeReleasedBlogs">
                      <div class="col-lg-12">
                        <div class="business-post-item mb-10">
                          <div class="row">
                            <div class="col-lg-6 col-md-6">
                              <div class="business-post-thumb">
                                <img :src="data.image_url" alt="business" />
                              </div>
                            </div>
                            <div class="col-lg-6 col-md-6">
                              <div class="trending-news-item">
                                <div class="trending-news-content">
                                  <div class="post-meta">
                                    <div class="meta-categories">
                                      <a href="#">{{ data.categoryIds && data.categoryIds.length > 0 &&
                                        data.categoryIds[0].category_id.name }}</a>
                                    </div>
                                    <div class="meta-date">
                                      <span>March 26, 2020</span>
                                    </div>
                                  </div>
                                  <h3 class="title">
                                    <nuxt-link to="/posts/postOne">
                                      {{ data.title }}
                                    </nuxt-link>
                                  </h3>
                                  <p class="text">
                                    The property, complete with 30-seat screening
                                    from room, a 100-seat amphitheater and a
                                    swimming pond with sandy shower…
                                  </p>
                                  <!-- <el-button size="small" type="primary">發佈</el-button> -->
                                  <a href="#">發佈</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                    <div class="col-lg-12">
                      <div class="pagination-item">
                        <nav aria-label="Page navigation example">
                          <ul class="pagination">
                            <li class="page-item active">
                              <a class="page-link" href="#">01</a>
                            </li>
                            <li class="page-item">
                              <a class="page-link" href="#">02</a>
                            </li>
                            <li class="page-item">
                              <a class="page-link" href="#">...</a>
                            </li>
                            <li class="page-item">
                              <a class="page-link" href="#">50</a>
                            </li>
                            <li class="page-item">
                              <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true"><i class="fas fa-caret-right"></i></span>
                              </a>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div :class="[selected === 'news' ? 'show active' : '']" class="tab-pane fade" id="pills-profile"
                role="tabpanel" aria-labelledby="pills-profile-tab">
                <div class="about-post-items">
                  <div class="row">
                    <template v-for="(data, index) in underReviewBlogs">
                      <div class="col-lg-12">
                        <div class="bussiness-post-item mb-10">
                          <div class="bussiness-post-thumb">
                            <img :src="data.image_url" alt="business" />
                          </div>
                          <div class="bussiness-post-content">
                            <h3 class="title">
                              <nuxt-link to="/posts/postOne">
                                {{ data.title }}
                              </nuxt-link>
                            </h3>
                            <div class="meta-date-link">
                              <span>April 26, 2020</span>
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
                              She tried for so many years and now she finally
                              pregnant happy and things are going well &amp; it
                              just happens that this pregnancy takes place with
                              this epidemic…
                            </p>
                            <el-button size="small">修改</el-button>
                            <el-button size="small" type="primary">查看</el-button>

                          </div>
                        </div>
                      </div>
                    </template>
                    <div class="col-lg-12">
                      <div class="pagination-item">
                        <nav aria-label="Page navigation example">
                          <ul class="pagination">
                            <li class="page-item active">
                              <a class="page-link" href="#">01</a>
                            </li>
                            <li class="page-item">
                              <a class="page-link" href="#">02</a>
                            </li>
                            <li class="page-item">
                              <a class="page-link" href="#">...</a>
                            </li>
                            <li class="page-item">
                              <a class="page-link" href="#">50</a>
                            </li>
                            <li class="page-item">
                              <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true"><i class="fas fa-caret-right"></i></span>
                              </a>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 mt-10">
          <style-one :datas="blogs" :sharePost="false" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import styleOne from "../Utility/Sidebar/StyleOne.vue";
import aboutDatas from "../Data/About";
import Posts from "../Data/TrendingHomeThree";


export default {
  components: { styleOne },
  data: () => ({
    selected: "latest",
    aboutDatas: aboutDatas.data,
    posts: Posts.data,
  }),
  props: {
    underReviewBlogs: {
      type: Array,
      default: () => []
    },
    blogs: {
      type: Array,
      default: () => []
    },
    toBeReleasedBlogs: {
      type: Array,
      default: () => []
    },
    blogsInfo: {
      type: Object,
      default: () => { }
    },
    toBeReleasedBlogsInfo: {
      type: Object,
      default: () => { }
    },
    underReviewBlogsInfo: {
      type: Object,
      default: () => { }
    },
  },
  methods: {
    selectTab(value) {
      this.selected = value;
    },

  },
};
</script>

<style></style>
