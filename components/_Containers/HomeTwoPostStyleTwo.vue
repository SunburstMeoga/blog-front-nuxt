<template>
  <section class="post-news-2-area">
    <div class="container custom-container">
      <div class="row">
        <div class="col-lg-6">
          <div class="post_gallery_play post_gallery_play-2 mt-40">
            <div class="bg-image"></div>
            <div
              class="post__gallery_play_content"
              style="position: relative; z-index: 10"
            >
              <h2 class="title">
                <a href="#" tabindex="0"
                  >Japan’s virus success has puzzled the world. Is its luck
                  running out?</a
                >
              </h2>
              <p>
                The property, complete with a 30-seat screening room, a 100-seat
                amphitheater and a swimming pond with sandy beach and outdoor
                shower…
              </p>
              <div class="post-meta">
                <div class="meta-categories">
                  <a href="#" tabindex="0">TECHNOLOGY</a>
                </div>
                <div class="meta-date">
                  <span>March 26, 2020</span>
                </div>
              </div>
            </div>
            <div
              class="post_play_btn"
              @click.prevent="$store.dispatch('toggleVideo')"
            >
              <a
                class="video-popup"
                href="https://www.youtube.com/watch?v=4mGyYNuG6us"
                a=""
                tabindex="0"
                ><i class="fas fa-play"></i
              ></a>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="post-news-list mt-40">
            <template v-for="(item, index) in datas.slice(0, 5)">
              <div :key="index" class="gallery_item populer_item-style">
                <div class="gallery_item_thumb">
                  <img
                    :src="require(`@/assets/images/post-news/${item.image}`)"
                    alt="populer"
                  />
                </div>
                <div class="gallery_item_content">
                  <h4 class="title">
                    <a href="#">{{ item.title }}</a>
                  </h4>
                  <span>{{ item.category.name }}</span>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="post-news-item-2 mt-40">
            <div class="post-news-thumb">
              <img src="@/assets/images/post-news-thumb-1.png" alt="" />
            </div>
            <div class="post-news-content">
              <h3 class="title">
                <a href="#"
                  >Japan’s virus success puzzled the world luck running out?</a
                >
              </h3>
              <p>
                The property, complete with 30-seat screening from room, a
                100-seat amphitheater and a swimming pond with sandy shower…
              </p>
              <div class="meta-post-2-style">
                <div class="meta-post-categores">
                  <a href="#">TECHNOLOGY</a>
                </div>
                <div class="meta-post-date">
                  <span>April 26, 2020</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    datas: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
</style>