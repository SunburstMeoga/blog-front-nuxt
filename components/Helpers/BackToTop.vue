<template>
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
</template>

<script>
export default {
  mounted() {
    window.document.addEventListener("scroll", this.topToBottom);
  },
  methods: {
    topToBottom() {
      const result = window.document.querySelector(".go-top");
      if (
        window.document.body.scrollTop > window.innerHeight ||
        window.document.window.documentElement.scrollTop > window.innerHeight
      ) {
        result.classList.add("active");
      } else {
        result.classList.remove("active");
      }
    },
  },
};
</script>

<style></style>