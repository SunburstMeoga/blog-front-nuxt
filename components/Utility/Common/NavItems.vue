<template>
  <div :class="[
    'newspark-header-main-menu',
    darkClass && 'menuItem' in darkClass ? darkClass.menuItem : '',
  ]">
    <ul v-if="nav_items">
      <li v-for="(item, index) in nav_items" :key="index" @click="handleNavItem(item, index)">
        <a v-if="item.child">
          {{ item.linkText }}
          <i v-if="item.child" class="fal fa-angle-down" />
        </a>
        <nuxt-link v-else :to="`${item.link}`">
          {{ item.linkText }}
        </nuxt-link>
        <ul v-if="item.child" class="sub-menu">
          <li v-for="(lvlTwo, index) in item.submenu" :key="index">
            <nuxt-link :to="{ name: lvlTwo.name, params: { type: lvlTwo.slug, id: lvlTwo.id } }">
              {{ lvlTwo.linkText }}
              <i v-if="lvlTwo.child" class="fal fa-angle-down" />
            </nuxt-link>
            <!-- <ul v-if="lvlTwo.child" class="sub-menu">
              <li v-for="(lvlThree, index) in lvlTwo.third_menu" :key="index">
                <nuxt-link :to="{ name: 'categories-type', params: { type: lvlThree.slug, id: lvlThree.id } }">
                  {{ lvlThree.linkText }}</nuxt-link>
              </li>
            </ul> -->
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import navItems from "../../Data/NavItems.json";
export default {
  props: {
    darkClass: {
      type: Object,
    },
    // nav_items: {
    //   type: Array,
    //   default: () => []
    // }
  },
  data: () => ({
    // when you have api then delete json file (dir:components/data/) and add your data this variable
    // nav_items: navItems.data,
    // nav_items: [
    //   {
    //     linkText: this.$t('headerNav.home'),
    //     child: false,
    //     icon: "angle-down"
    //   },
    //   {
    //     linkText: this.$t('headerNav.writeBlog'),
    //     link: "/blog/edit",
    //     child: false
    //   },
    //   {
    //     linkText: this.$t('headerNav.blogCategories'),
    //     child: true,
    //     submenu: [],
    //     icon: "angle-down"
    //   },
    //   {
    //     linkText: this.$t('headerNav.latestBlogs'),
    //     link: "/404",
    //     child: false
    //   },
    //   {
    //     linkText: this.$t('headerNav.hottesBlogs'),
    //     link: "/sports",
    //     child: false
    //   }
    // ]
  }),
  computed: {
    nav_items() {
      return [
        {
          linkText: this.$t('headerNav.home'),
          child: false,
          link: '/'
        },
        {
          linkText: this.$t('headerNav.writeBlog'),
          link: "/blog/edit",
          child: false
        },
        {
          linkText: '我的博客',
          link: "/blog/edit",
          child: false
        },
        {
          linkText: this.$t('headerNav.blogCategories'),
          child: true,
          link: 'categories-type',
          icon: "angle-down"
        },
        {
          linkText: this.$t('headerNav.latestBlogs'),
          link: "/404",
          child: false
        },
        {
          linkText: this.$t('headerNav.hottesBlogs'),
          link: "/sports",
          child: false
        }
      ]
    }
  },
  mounted() {
    this.getBlogCategories()
  },
  methods: {
    getBlogCategories() {
      this.$blogApi.getBlogCategories().then(res => {
        console.log('博客分類列表', res)
        const { docs } = res.data
        let submenu = []
        docs.map(item => {
          let obj = {}
          obj.linkText = item.name
          obj.slug = item.slug
          obj.id = item.id
          submenu.push(obj)
        })
        this.nav_items[2].submenu = submenu
        console.log('nav_items', this.nav_items)
      }).catch(err => {
        console.log(err)
      })
    },
    handleNavItem(item) {
      console.log(item)
      // this.$emit('handleNavItem', item)
    }
  }
};
</script>

<style>
.newspark-header-main-menu.header-two ul>li>a {
  color: #ffffff;
}

.newspark-header-main-menu.header-three-nav ul>li>a {
  color: white;
}

.header-three-nav {
  margin-left: 35px;
}
</style>
