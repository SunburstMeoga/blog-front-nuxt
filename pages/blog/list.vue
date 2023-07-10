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
                                        {{ $store.state.system.language === 'zh_cn' ?
                                            item.contents[1].name : item.contents[0].name }}</div>
                                </li>
                            </ul>
                            <div class="tab-content" id="pills-tabContent">
                                <div class="tab-pane show active fade" id="pills-profile" role="tabpanel"
                                    aria-labelledby="pills-profile-tab">
                                    <div class="about-post-items">
                                        <div class="row">
                                            <template v-for="(data, index) in blogsList">
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
                                                                    {{ index + 1 }}
                                                                </nuxt-link>
                                                            </h3>
                                                            <div class="meta-date-link">
                                                                <span>{{ getLocalTime(data.created_at) }}</span>
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
                                            <div class="col-lg-12">
                                                <div class="bussiness-btn">
                                                    <a @click.prevent="handleShowMore" class="main-btn main-btn-2">
                                                        <i v-show="isLoading" class="el-icon-loading"></i>
                                                        {{ loadingFail ? '加载失败，点击重新加载' : (isLoading ? '正在加载...' : '查看更多') }}
                                                    </a>
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
        console.log('blogsData', blogsData)
        return {
            categories: categories.data.docs,
            blogsData: blogsData.data,
            blogsList: blogsData.data.docs
        }
    },
    data: () => ({
        selected: 'all',
        blogsData: {},
        blogsList: [],
        isLoading: false,
        loadingFail: false
    }),
    mounted() {
    },
    methods: {
        getLocalTime,
        handleShowMore() {
            if (this.isLoading) {
                this.$message('正在加载，请稍后...');
                return
            }
            this.loadingFail = false
            console.log('this.blogsData', this.blogsData)
            if (this.blogsData.hasNextPage) {
                this.getBlogs(this.categoryId, this.blogsData.page + 1)
            } else {
                this.$message({
                    message: '无更多数据',
                    type: 'warning'
                });
            }
        },
        loadMoreDatas() {

        },
        getBlogs(categoryId, page) {
            this.isLoading = true
            this.$blogApi.getBlogList({ categoryId: categoryId, page: page })
                .then(res => {
                    this.blogsData = res.data
                    res.data.docs.map(item => {
                        this.blogsList.push(item)
                    })
                    console.log(this.blogsData)
                    this.isLoading = false
                })
                .catch(err => {
                    console.log(err)
                    this.isLoading = false
                    this.loadingFail = true
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
            this.blogsData = {}
            this.blogsList = []
            this.getBlogs(this.categoryId, 1)
        },
        selectTab(item, index) {
            this.selected = index;
            this.categoryId = item.id
            this.blogsData = {}
            this.blogsList = []
            this.getBlogs(this.categoryId, 1)
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
  