<template>
    <div>
        <drawer @toggleSidebar="toggleSidebar" :sidebar="sidebar" />
        <!--====== POST LAYOUT 1 PART START ======-->

        <section class="post-layout-1-area pb-80">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="about-author-content">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item" v-for="(item, index) in blogInfo.tags" :key="index">
                                        <a href="index.html">{{ item }}</a>
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="post-layout-top-content">
                            <div class="
                      post-categories
                      d-flex
                      justify-content-between
                      align-content-center
                    ">
                                <div class="categories-item">
                                    <span>{{ blogInfo.tags[0] }}</span>
                                </div>
                                <div class="categories-share">
                                    <ul>
                                        <li><i class="fas fa-comment"></i>45020</li>
                                        <li><i class="fas fa-fire"></i>{{ blogInfo.view_counts }}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="post-content">
                                <h3 class="title">
                                    {{ blogInfo.title }}
                                </h3>
                                <p>
                                    {{ blogInfo.slug }}
                                </p>
                                <div class="thumb">
                                    <img :src="blogInfo.image_url" alt="" />
                                </div>
                            </div>
                            <div class="post-author">
                                <div class="author-info">
                                    <div class="thumb">
                                        <img src="@/assets/images/author1.png" alt="" />
                                    </div>
                                    <h5 class="title">Lotto Zheng</h5>
                                    <ul>
                                        <li>{{ getLocalTime(blogInfo.updated_at) }}</li>
                                    </ul>
                                </div>
                                <div class="author-social">
                                    <ul>
                                        <li>
                                            <a><i class="fab fa-facebook-f"></i></a>
                                        </li>
                                        <li>
                                            <a><i class="fab fa-twitter"></i></a>
                                        </li>
                                        <li>
                                            <a><i class="fab fa-youtube"></i></a>
                                        </li>
                                        <li>
                                            <a><i class="fab fa-instagram"></i></a>
                                        </li>
                                        <li>
                                            <a><i class="fal fa-heart"></i></a>
                                        </li>
                                        <li>
                                            <a><i class="fal fa-bookmark"></i></a>
                                        </li>
                                        <li>
                                            <a><i class="fas fa-ellipsis-v"></i></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div v-html="blogInfo.content" class="mt-10" />

                            <div class="post-tags">
                                <ul>
                                    <li>
                                        <a><i class="fas fa-tag"></i> Tags</a>
                                    </li>
                                    <li><a href="#" v-for="(item, index) in blogInfo.tags" :key="index">{{ item }}</a></li>
                                </ul>
                            </div>
                            <!-- <div class="post-reader-text pt-50">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="post-reader-prev">
                                            <span>PREVIOUS NEWS</span>
                                            <h4 class="title">
                                                <a>Kushner puts himself in middle of white house’s
                                                    chaotic coronavirus response.</a>
                                            </h4>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="post-reader-prev">
                                            <span>NEXT NEWS</span>
                                            <h4 class="title">
                                                <a>C.I.A. Hunts for authentic virus totals in china,
                                                    dismissing government tallies</a>
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div> -->
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <style-one :datas="Posts" :sharePost="false" :trendingShortPost="false" />
                    </div>
                </div>
            </div>
        </section>

        <!--====== POST LAYOUT 1 PART ENDS ======-->

        <!--====== LATEST NEWS PART START ======-->

        <our-latest-news :Posts="Posts" />

        <!--====== LATEST NEWS PART ENDS ======-->

        <!--====== POST FORM PART START ======-->

        <!-- <div class="post-form-area">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-10">
                        <div class="section-title">
                            <h3 class="title">發表评论</h3>
                        </div>
                        <div class="post-form-box">
                            <form action="#">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="input-box">
                                            <input type="text" placeholder="全名" />
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="input-box">
                                            <input type="text" placeholder="電子郵件地址" />
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <div class="input-box">
                                            <textarea name="#" id="#" cols="30" rows="10"
                                                placeholder="告訴我們您的意見……"></textarea>
                                            <button class="main-btn" type="button" @click.prevent="handlePublication">
                                                發表意見
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->

        <!--====== POST FORM PART ENDS ======-->

        <!--====== 發表評論 PART START ======-->

        <!-- <section class="post-comments-area pb-100">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-10">
                        <div class="section-title">
                            <h3 class="title">發表評論</h3>
                        </div>
                        <div class="post-comments-list">
                            <div class="post-comments-item">
                                <div class="thumb">
                                    <img src="@/assets/images/comments-1.png" alt="comments" />
                                </div>
                                <div class="post">
                                    <a>回复</a>
                                    <h5 class="title">Rafiqul islam</h5>
                                    <p>
                                        We’ve invested every aspect of how we serve our users over
                                        the past Pellentesque rutrum ante in nulla suscipit, vel
                                        posuere leo tristique.
                                    </p>
                                </div>
                            </div>
                            <div class="post-comments-item">
                                <div class="thumb">
                                    <img src="@/assets/images/comments-2.png" alt="comments" />
                                </div>
                                <div class="post">
                                    <a>回复</a>
                                    <h5 class="title">Rafiqul islam</h5>
                                    <p>
                                        We’ve invested every aspect of how we serve our users over
                                        the past Pellentesque rutrum ante in nulla suscipit, vel
                                        posuere leo tristique.
                                    </p>
                                </div>
                            </div>
                            <div class="post-comments-item ml-30">
                                <div class="thumb">
                                    <img src="@/assets/images/comments-3.png" alt="comments" />
                                </div>
                                <div class="post">
                                    <a>回复</a>
                                    <h5 class="title">Rafiqul islam</h5>
                                    <p>
                                        We’ve invested every aspect of how we serve our users over
                                        the past Pellentesque rutrum ante in nulla suscipit, vel
                                        posuere leo tristique.
                                    </p>
                                </div>
                            </div>
                            <div class="post-comments-item">
                                <div class="thumb">
                                    <img src="@/assets/images/comments-4.png" alt="comments" />
                                </div>
                                <div class="post">
                                    <a>回复</a>
                                    <h5 class="title">Rafiqul islam</h5>
                                    <p>
                                        We’ve invested every aspect of how we serve our users over
                                        the past Pellentesque rutrum ante in nulla suscipit, vel
                                        posuere leo tristique.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="post-load-btn">
                            <a class="main-btn" href="#">加載更多</a>
                        </div>
                    </div>
                </div>
            </div>
        </section> -->

        <!--====== 發表評論 PART ENDS ======-->

        <!--====== ADD PART ENDS ======-->

        <!-- <div class="add-area text-center">
            <a>
                <img src="@/assets/images/ads/one_ad.png" alt="" />
            </a>
        </div> -->

        <!--====== ADD PART ENDS ======-->

        <footer-one />
        <div class="go-top-area">
            <div class="go-top-wrap">
                <div class="go-top-btn-wrap">
                    <a href="#" class="go-top go-top-btn d-block">
                        <i class="fa fa-angle-double-up"></i>
                        <i class="fa fa-angle-double-up"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "../../../components//Utility/Header/index";
import StyleOne from "../../../components/Utility/Sidebar/StyleOne.vue";
import Posts from "../../../components/Data/NewsRowCard";
import FooterOne from "../../../components/Utility/Footer/FooterOne.vue";
import OurLatestNews from "../../../components/Utility/Common/OurLatestNews.vue";
import { getLocalTime } from '../../../utils/format'
import Drawer from "../../../components/Mobile/Drawer.vue";
export default {
    components: { Header, StyleOne, FooterOne, OurLatestNews, Drawer },
    data: () => ({
        Posts: Posts.data,
        sidebar: false,
        blogId: '',
        blogInfo: {},
        Posts: []
    }),
    async asyncData({ params, $blogApi }) {
        const blogs = await $blogApi.getBlogList()
        const { data } = await $blogApi.getBlogDetails({ id: params.id })
        console.log(data)
        return { blogId: params.id, blogInfo: data, Posts: blogs.data.docs }
    },
    mounted() {
        document.addEventListener("scroll", this.topToBottom);
    },
    methods: {
        getLocalTime,
        handlePublication() {
            this.leaveComment()
        },
        leaveComment() {

        },
        toggleSidebar() {
            this.sidebar = !this.sidebar;
        },
        topToBottom() {
            const result = document.querySelector(".go-top");
            if (
                document.body.scrollTop > window.innerHeight ||
                document.documentElement.scrollTop > window.innerHeight
            ) {
                result.classList.add("active");
            } else {
                result.classList.remove("active");
            }
        },
    },

}
</script>

<style></style>