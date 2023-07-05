<template>
    <div>
        <section class="about-item-area">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="about-tab-btn mt-40">
                            <ul class="nav nav-pills mb-3">
                                <li class="nav-item" @click.prevent="selectAll">
                                    <div :class="[selected === 'all' ? 'active' : '']" class="nav-link" id="pills-home-tab">
                                        全部博客
                                    </div>
                                </li>
                                <li class="nav-item" v-for="(item, index) in categories" :key="index"
                                    @click.prevent="selectTab(item, index)">
                                    <div :class="[selected === index ? 'active' : '']" class="nav-link" id="pills-home-tab">
                                        {{ $store.state.system.language === 'zh_hk' ?
                                            item.contents[0].name : item.contents[1].name }}</div>
                                </li>
                            </ul>
                            <div class="tab-content" id="pills-tabContent">
                                <div class="tab-pane show active fade" id="pills-profile" role="tabpanel"
                                    aria-labelledby="pills-profile-tab">
                                    <div class="about-post-items">
                                        <div class="row">
                                            <template v-for="(data, index) in blogsData.docs">
                                                <div class="col-lg-12">
                                                    <div class="bussiness-post-item mb-40">
                                                        <div class="bussiness-post-thumb"
                                                            style="width: 320px; height: 220px; border: 1px solid rgba(229, 231, 235, 1);">
                                                            <img :src="data.image_url" />
                                                        </div>
                                                        <div class="bussiness-post-content">
                                                            <h3 class="title">
                                                                <nuxt-link
                                                                    :to="{ name: 'blog-id', params: { id: data.id } }">
                                                                    {{ data.title }}
                                                                </nuxt-link>
                                                            </h3>
                                                            <div class="meta-date-link">
                                                                <span>{{ getLocalTime(data.created_at) }}</span>
                                                                <!-- <ul>
                                                                    <li>
                                                                        <a href="#"><i class="fal fa-bookmark"></i></a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="#"><i class="fas fa-share"></i></a>
                                                                    </li>
                                                                </ul> -->
                                                            </div>
                                                            <p>
                                                                {{ data.excerpt }}
                                                            </p>
                                                            <nuxt-link :to="{ name: 'blog-id', params: { id: data.id } }">
                                                                VIEW MORE
                                                            </nuxt-link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </template>
                                            <div class="col-lg-12" v-show="totalPages > 1">
                                                <div class="pagination-item">
                                                    <nav aria-label="Page navigation example">
                                                        <ul class="pagination">
                                                            <li class="page-item active" v-for="(item, index) in 4">
                                                                <a class="page-link" href="#">{{ index + 1 }}</a>
                                                            </li>
                                                            <li class="page-item" v-show="hasNextPage">
                                                                <a class="page-link" href="#" aria-label="Next">
                                                                    <span aria-hidden="true"><i
                                                                            class="fas fa-caret-right"></i></span>
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
                </div>
            </div>
        </section>
        <footer-one />
    </div>
</template>
  
<script>

import styleOne from "../../components/Utility/Sidebar/StyleOne.vue";
import FooterOne from "../../components/Utility/Footer/FooterOne.vue";
import { getLocalTime } from '../../utils/format'

export default {
    components: { styleOne, FooterOne },
    async asyncData({ $blogApi }) {
        let categories = await $blogApi.getBlogCategories()
        let blogsData = await $blogApi.getBlogList({ perPage: 10 })
        return {
            categories: categories.data.docs,
            blogsData: blogsData.data,
            totalPages: blogsData.totalPages,
            nextPage: blogsData.nextPage,
            hasNextPage: blogsData.hasNextPage,
            hasPrevPage: blogsData.hasPrevPage,
            page: blogsData.page,
        }
    },
    data: () => ({
        selected: 'all',
        // aboutDatas: aboutDatas.data,
        // posts: Posts.data,
        blogsData: {},
        underReviewData: {},
        toBeReleasedData: {},
        categories: [],
        categoryId: '',
        totalPages: 0,
        nextPage: 0,
        hasNextPage: false,
        hasPrevPage: false,
        page: 0,
    }),
    // props: {
    //     blogsData: {
    //         type: Object,
    //         default: () => { }
    //     },
    //     underReviewData: {
    //         type: Object,
    //         default: () => { }
    //     },
    //     toBeReleasedData: {
    //         type: Object,
    //         default: () => { }
    //     },
    // },
    mounted() {
        // this.getCategories()
    },
    methods: {
        getLocalTime,
        getBlogs() {
            this.$blogApi.getBlogList({ categoryId: this.categoryId })
                .then(res => {
                    this.blogsData = res.data
                    this.totalPages = res.data.totalPages
                    this.nextPage = res.data.nextPage
                    this.hasNextPage = res.data.hasNextPage
                    this.hasPrevPage = res.data.hasPrevPage
                    this.page = res.data.page
                    console.log(this.blogsData)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        getCategories() {
            this.$blogApi.getBlogCategories()
            then(res => {
                this.categories = res.data.docs
                console.log(this.categories)
            })
                .catch(err => {
                    console.log(err)
                })
        },
        selectAll() {
            this.selected = 'all';
            this.categoryId = ''
            this.getBlogs()
        },
        selectTab(item, index) {
            this.selected = index;
            this.categoryId = item.id
            this.getBlogs()
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
  