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
                                                    <router-link to="/posts/postOne">
                                                        {{ item.title }}
                                                    </router-link>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-lg-12">
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
                    <div class="col-lg-4">
                        <style-one :datas="posts.slice(1, 6)" />
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
export default {
    components: { CategoryLayout, StyleOne },
    async asyncData({ params, $blogApi }) {
        const categoryBlogs = await $blogApi.getBlogList({ categoryId: params.id })
        const blogs = await $blogApi.getBlogList()
        console.log(categoryBlogs.data.docs)
        console.log(blogs.data.docs)
        return { categoryBlogs: categoryBlogs.data.docs, blogs: blogs.data.docs, category: params.type }
    },
    data: () => ({
        posts: Posts.data,
        categoryBlogs: [],
        blogs: [],
        category: ''
    }),
};
</script>
  
<style></style>
  