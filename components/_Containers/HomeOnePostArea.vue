 <template>
  <section class="all-post-area">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <entertainment-news v-if="!dark" />
          <entertainment-news
            v-else
            :darkClass="{
              item: 'trending-news-item-dark',
              title: 'section-title-2',
            }"
          />
          <sports-news v-if="!dark" />
          <sports-news
            v-else
            :darkClass="{
              item: 'trending-news-item-dark',
              title: 'section-title-2',
              news_item: 'gallery_item_dark',
            }"
          />
          <!-- <div class="post-add mt-30">
            <a href="#"
              ><img src="@/assets/images/ads/one_ad.png" alt="ad"
            /></a>
          </div> -->
          <buisness-news class="pt-40" v-if="!dark" />
          <buisness-news
            v-else
            class="pt-40"
            :darkClass="{
              item: 'business-post-item-dark',
              title: 'section-title-2',
            }"
          />
        </div>
        <div class="col-lg-4">
          <div class="all-post-sidebar">
            <share-post v-if="!dark" />
            <share-post
              v-else
              :darkClass="{
                title: 'section-title-2',
                item: 'most-share-post-item-dark',
              }"
            />
            <div class="upcoming-matches-post mt-35">
              <div
                :class="[
                  'section-title d-flex justify-content-between align-items-cente',
                  dark ? 'section-title-2' : '',
                ]"
              >
                <h3 class="title">Upcoming Matches</h3>
                <a href="#">ALL SEE</a>
              </div>
              <div class="upcoming-matches-post-items">
                <div
                  :class="[
                    'upcoming-matches-post-item d-flex align-items-center',
                    dark ? 'upcoming-matches-post-item-dark' : '',
                  ]"
                >
                  <div class="upcoming-matches-flag">
                    <img src="@/assets/images/flag/flag-1.png" alt="flag" />
                  </div>
                  <div class="upcoming-matches-content">
                    <span>Germany <span>VS</span> France</span>
                    <ul>
                      <li>Tomorrow</li>
                      <li>22:30 (CST)</li>
                    </ul>
                  </div>
                  <div class="upcoming-matches-circle">
                    <div class="circle-bar">
                      <div class="first circle"></div>
                    </div>
                  </div>
                </div>
                <div
                  :class="[
                    'upcoming-matches-post-item d-flex align-items-center',
                    dark ? 'upcoming-matches-post-item-dark' : '',
                  ]"
                >
                  <div class="upcoming-matches-flag">
                    <img src="@/assets/images/flag/flag-2.png" alt="flag" />
                  </div>
                  <div class="upcoming-matches-content">
                    <span>Spain <span>VS</span> Portugal</span>
                    <ul>
                      <li>Tomorrow</li>
                      <li>22:30 (CST)</li>
                    </ul>
                  </div>
                  <div class="upcoming-matches-circle">
                    <div class="circle-bar">
                      <div class="first circle"></div>
                    </div>
                  </div>
                </div>
                <div
                  :class="[
                    'upcoming-matches-post-item d-flex align-items-center',
                    dark ? 'upcoming-matches-post-item-dark' : '',
                  ]"
                >
                  <div class="upcoming-matches-flag">
                    <img src="@/assets/images/flag/flag-3.png" alt="flag" />
                  </div>
                  <div class="upcoming-matches-content">
                    <span>Russia <span>VS</span> Italy</span>
                    <ul>
                      <li>Tomorrow</li>
                      <li>22:30 (CST)</li>
                    </ul>
                  </div>
                  <div class="upcoming-matches-circle">
                    <div class="circle-bar">
                      <div class="first circle"></div>
                    </div>
                  </div>
                </div>
                <div
                  :class="[
                    'upcoming-matches-post-item d-flex align-items-center',
                    dark ? 'upcoming-matches-post-item-dark' : '',
                  ]"
                >
                  <div class="upcoming-matches-flag">
                    <img src="@/assets/images/flag/flag-4.png" alt="flag" />
                  </div>
                  <div class="upcoming-matches-content">
                    <span>Croatia <span>VS</span> England</span>
                    <ul>
                      <li>Tomorrow</li>
                      <li>22:30 (CST)</li>
                    </ul>
                  </div>
                  <div class="upcoming-matches-circle">
                    <div class="circle-bar">
                      <div class="first circle"></div>
                    </div>
                  </div>
                </div>
                <div
                  :class="[
                    'upcoming-matches-post-item d-flex align-items-center',
                    dark ? 'upcoming-matches-post-item-dark' : '',
                  ]"
                >
                  <div class="upcoming-matches-flag">
                    <img src="@/assets/images/flag/flag-5.png" alt="flag" />
                  </div>
                  <div class="upcoming-matches-content">
                    <span>Germany <span>VS</span> France</span>
                    <ul>
                      <li>Tomorrow</li>
                      <li>22:30 (CST)</li>
                    </ul>
                  </div>
                  <div class="upcoming-matches-circle">
                    <div class="circle-bar">
                      <div class="first circle"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              :class="[
                'newsletter-box mt-45',
                dark ? 'newsletter-box-dark' : '',
              ]"
            >
              <h5 class="title">Newsletter</h5>
              <p>
                Your email address will not be this published. Required fields
                are News Today.
              </p>
              <form action="#">
                <div class="input-box">
                  <input type="text" placeholder="Your email address" />
                  <button type="button">SIGN UP</button>
                </div>
              </form>
              <span>We hate spam as much as you do</span>
            </div>
            <div class="Categories-post mt-40">
              <div
                :class="[
                  'section-title d-flex justify-content-between align-items-center',
                  dark ? 'section-title-2' : '',
                ]"
              >
                <h3 class="title">Categories</h3>
                <a href="#">ALL SEE</a>
              </div>
              <div class="Categories-item">
                <div class="item">
                  <img
                    src="@/assets/images/categories-1.jpg"
                    alt="categories"
                  />
                  <div class="Categories-content">
                    <a href="#">
                      <span>Restaurant</span>
                      <img src="@/assets/images/arrow.svg" alt="" />
                    </a>
                  </div>
                </div>
                <div class="item">
                  <img
                    src="@/assets/images/categories-2.jpg"
                    alt="categories"
                  />
                  <div class="Categories-content">
                    <a href="#">
                      <span>Entertainment</span>
                      <img src="@/assets/images/arrow.svg" alt="" />
                    </a>
                  </div>
                </div>
                <div class="item">
                  <img
                    src="@/assets/images/categories-3.jpg"
                    alt="categories"
                  />
                  <div class="Categories-content">
                    <a href="#">
                      <span>Financial</span>
                      <img src="@/assets/images/arrow.svg" alt="" />
                    </a>
                  </div>
                </div>
                <div class="item">
                  <img
                    src="@/assets/images/categories-4.jpg"
                    alt="categories"
                  />
                  <div class="Categories-content">
                    <a href="#">
                      <span>Business</span>
                      <img src="@/assets/images/arrow.svg" alt="" />
                    </a>
                  </div>
                </div>
                <div class="item">
                  <img
                    src="@/assets/images/categories-5.jpg"
                    alt="categories"
                  />
                  <div class="Categories-content">
                    <a href="#">
                      <span>Scientists</span>
                      <img src="@/assets/images/arrow.svg" alt="" />
                    </a>
                  </div>
                </div>
                <div class="item">
                  <img
                    src="@/assets/images/categories-6.jpg"
                    alt="categories"
                  />
                  <div class="Categories-content">
                    <a href="#">
                      <span>International’s</span>
                      <img src="@/assets/images/arrow.svg" alt="" />
                    </a>
                  </div>
                </div>
              </div>
              <div class="sidebar-add pt-35">
                <a href="#"
                  ><img src="@/assets/images/ads/two_ad.jpg" alt="ad"
                /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BuisnessNews from "../Home/BuisnessNews.vue";
import EntertainmentNews from "../Home/EntertainmentNews.vue";
import SharePost from "../Home/SharePost.vue";
import SportsNews from "../Home/SportsNews.vue";
export default {
  props: {
    dark: {
      type: Boolean,
      default: false,
    },
  },
  components: { EntertainmentNews, SportsNews, BuisnessNews, SharePost },
};
</script>

<style>
</style>