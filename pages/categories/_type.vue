<template>
    <category-layout>
        <section class="about-item-area">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="about-author-content pt-15">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="index.html">博客分类</a></li>
                                    <!-- <li class="breadcrumb-item"><a href="#">分类</a></li> -->
                                    <li class="breadcrumb-item active" aria-current="page">
                                        {{ category }}
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <!-- <div class="about-tab-btn mt-40"> -->
                        <div class="about-tab-btn mt-10">
                            <div class="archive-btn">
                                <ul>
                                    <li>
                                        <span>Category: <span>{{ category }}</span></span>
                                    </li>
                                </ul>
                            </div>
                            <div class="about-post-items">
                                <div class="row">
                                    <div class="col-lg-6 col-md-6" v-for="(item, index) in categoryBlogs" :key="index">
                                        <div class="trending-image-post feature-item mt-30">
                                            <img :src="item.image_url" alt="" />
                                            <div class="trending-image-content">
                                                <div class="post-meta">
                                                    <div class="meta-categories">
                                                        <a href="#">{{ item.tags[0] }}</a>
                                                    </div>
                                                    <div class="meta-date">
                                                        <span>March 26, 2020</span>
                                                    </div>
                                                </div>
                                                <h3 class="title">
                                                    <router-link :to="{ name: 'blog-id', params: { id: item.id } }">
                                                        {{ item.title }}
                                                    </router-link>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-lg-12" v-if="categoryBlogs.length > 10">
                                        <div class="pagination-item pt-40">
                                            <nav aria-label="Page navigation example">
                                                <ul class="pagination">
                                                    <li class="page-item">
                                                        <a class="page-link" href="#" aria-label="Next">
                                                            <span aria-hidden="true"><i
                                                                    class="fas fa-caret-left"></i></span>
                                                        </a>
                                                    </li>
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
                    <div class="col-lg-4 post_gallery_sidebar">
                        <!-- <style-one :blogs="posts.slice(1, 6)" /> -->
                        <ul class="nav nav-pills" id="pills-tab" role="tablist">
                            <li class="nav-item" @click.prevent="selectGalleryTab('trendy')">
                                <a :class="['nav-link', selectedGallery === 'trendy' ? 'active' : '']" data-toggle="pill"
                                    role="tab" aria-controls="pills-home" aria-selected="true">最熱文章</a>
                            </li>
                            <li class="nav-item" @click.prevent="selectGalleryTab('latest')">
                                <a :class="['nav-link', selectedGallery === 'latest' ? 'active' : '']" data-toggle="pill"
                                    href="#pills-profile" role="tab" aria-controls="pills-profile"
                                    aria-selected="false">最新文章</a>
                            </li>
                            <li class="nav-item" @click.prevent="selectGalleryTab('popular')">
                                <a :class="['nav-link', selectedGallery === 'popular' ? 'active' : '']" class="nav-link"
                                    data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact"
                                    aria-selected="false">最受歡迎文章</a>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <div :class="[
                                'tab-pane fade',
                                selectedGallery === 'trendy' ? 'show active' : '',
                            ]" role="tabpanel" aria-labelledby="pills-home-tab">
                                <div class="post_gallery_items" v-if="blogs && blogs.length > 0">
                                    <template v-for="(small, index) in blogs.slice(0, 5)">
                                        <row-card :class="[darkClass && 'item' in darkClass ? darkClass.item : '']"
                                            :category="true" :datas="small" :key="index" />
                                    </template>
                                </div>
                            </div>
                        </div>
                        <div class="tab-content">
                            <div :class="[
                                'tab-pane fade',
                                selectedGallery === 'latest' ? 'show active' : '',
                            ]" role="tabpanel" aria-labelledby="pills-home-tab">
                                <div v-if="blogs && blogs.length > 0" class="post_gallery_items">
                                    <template v-for="(small, index) in blogs.slice(0, 5)">
                                        <row-card :category="true" :datas="small" :key="index" />
                                    </template>
                                </div>
                            </div>
                        </div>
                        <div class="tab-content">
                            <div :class="[
                                'tab-pane fade',
                                selectedGallery === 'popular' ? 'show active' : '',
                            ]" role="tabpanel" aria-labelledby="pills-home-tab">
                                <div v-if="blogs && blogs.length > 0" class="post_gallery_items">
                                    <template v-for="(small, index) in blogs.slice(0, 5)">
                                        <row-card :category="true" :datas="small" :key="index" />
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </category-layout>
</template>
  
<script>
import StyleOne from "../../components/Utility/Sidebar/StyleOne.vue";
import CategoryLayout from "../../components/Category/CategoryLayout.vue";
import Posts from "../../components/Data/TrendingHomeThree";
import RowCard from "../../components/Utility/Cards/RowCard.vue";
export default {
    components: { CategoryLayout, StyleOne, RowCard },
    async asyncData({ params, $blogApi }) {
        const categoryBlogs = await $blogApi.getBlogList({ categoryId: params.id })
        const blogs = await $blogApi.getBlogList()
        console.log(categoryBlogs.data.docs)
        console.log(blogs.data.docs)
        return { categoryBlogs: categoryBlogs.data.docs, blogs: blogs.data.docs, category: params.type }
    },
    data: () => ({
        selectedGallery: "trendy",
        posts: Posts.data,
        categoryBlogs: [],
        blogs: [],
        category: '',
        darkClass: {}
    }),
    methods: {
        selectGalleryTab(value) {
            this.selectedGallery = value;
        },
    }
};
</script>
  
<style></style>
  