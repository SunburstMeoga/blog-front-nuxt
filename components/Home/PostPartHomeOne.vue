<template>
  <div class="post-area">
    <div class="container">
      <div class="post-slider" style="position: relative">
        <!-- <span class="prev slick-arrow" style="display: block"
            ><i class="fal fa-angle-left"></i
          ></span> -->
        <slider :settings="settings" ref="postSlider">
          <template v-for="(data, index) in smallPostGallery">
            <row-card :key="index" :datas="data" />
          </template>
        </slider>
        <span @click="next" class="next slick-arrow d-lg-block d-none"><i class="fal fa-angle-right"></i></span>
      </div>
    </div>
  </div>
</template>

<script>
import smallPostGallery from "../Data/NewsRowCard";
import Slider from "../Helpers/Slider.vue";
import RowCard from "../Utility/Cards/RowCard.vue";
export default {
  components: { RowCard, Slider },
  data: () => ({
    smallPostGallery: smallPostGallery.data,
    //post area
    settings: {
      autoplay: true,
      slidesToShow: 3,
      arrows: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: "40px",
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: "40px",
            slidesToShow: 1,
          },
        },
      ],
    },
  }),
  mounted() {
    this.$axios.get('https://blogapi.nickwongon99.top/api/blogs/list').then(res => {
      console.log(res.data);
    });
  },
  methods: {
    //post area
    next() {
      console.log('this', this)
      // this.$refs.postSlider.next();
    },
  },
};
</script>

<style></style>
