<template>
  <div>
    <footer class="footer-area">
      <div class="container">
        <div class="footer-topbar">
          <div class="row align-items-center">
            <div class="col-lg-7 col-md-5">
              <div class="footer-logo">
                <a href="#"><img src="@/assets/images/logo-2.png" alt="" /></a>
                <ul>
                  <li>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                  </li>
                  <li>
                    <a href="#"><i class="fab fa-facebook-f"></i></a>
                  </li>
                  <li>
                    <a href="#"><i class="fab fa-youtube"></i></a>
                  </li>
                  <li>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-5 col-md-7">
              <div class="footer-newaletter">
                <div class="input-box">
                  <input type="text" :placeholder="$t('message.email')" />
                  <button type="button">{{ $t('footer.signUp') }}</button>
                </div>
                <p>{{ $t('message.spam') }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-widget-area">
          <div class="row">
            <div class="col-lg-8">
              <div class="footer-widget-right-border">
                <div class="row">
                  <div class="col-lg-6 col-md-6">
                    <div class="widget widget-list">
                      <div class="section-title section-title-2">
                        <h3 class="title">{{ $t('footer.categoriesOfNews') }}</h3>
                      </div>
                      <div class="list d-flex justify-content-between">
                        <ul>
                          <li><a href="#">{{ $t('footer.politics') }}</a></li>
                          <li><a href="#">{{ $t('footer.business') }}</a></li>
                          <li><a href="#">{{ $t('footer.technology') }}</a></li>
                          <li><a href="#">{{ $t('footer.science') }}</a></li>
                          <li><a href="#">{{ $t('footer.health') }}</a></li>
                          <li><a href="#">{{ $t('footer.sports') }}</a></li>
                          <li><a href="#">{{ $t('footer.entertainment') }}</a></li>
                        </ul>
                        <ul>
                          <li><a href="#">{{ $t('footer.education') }}</a></li>
                          <!-- <li><a href="#">訃告</a></li> -->
                          <li><a href="#">{{ $t('footer.todayNews') }}</a></li>
                          <li><a href="#">{{ $t('footer.correction') }}</a></li>
                          <li><a href="#">{{ $t('footer.food') }}</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6">
                    <div class="widget widget-list widget-list-2">
                      <div class="section-title section-title-2">
                        <h3 class="title">{{ $t('footer.liveStreaming') }}</h3>
                      </div>
                      <div class="list d-flex justify-content-between">
                        <ul>
                          <li><a href="#">{{ $t('footer.crossword') }}</a></li>
                          <li><a href="#">{{ $t('footer.food') }}</a></li>
                          <li><a href="#">{{ $t('footer.car') }}</a></li>
                          <li><a href="#">{{ $t('footer.education') }}</a></li>
                          <li><a href="#">{{ $t('footer.health') }}</a></li>
                          <li><a href="#">{{ $t('footer.magazine') }}</a></li>
                          <li><a href="#">{{ $t('footer.wedding') }}</a></li>
                        </ul>
                        <ul>
                          <li><a href="#">{{ $t('footer.classifiedAds') }}</a></li>
                          <li><a href="#">{{ $t('footer.photography') }}</a></li>
                          <li><a href="#">{{ $t('footer.theNewYorkTimesStore') }}</a></li>
                          <li><a href="#">{{ $t('footer.journalism') }}</a></li>
                          <li><a href="#">{{ $t('footer.publicEditor') }}</a></li>
                          <li><a href="#">{{ $t('footer.toolsAndServices') }}</a></li>
                          <li><a href="#">{{ $t('footer.myAccount') }}</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="footer-twitter-post">
                  <div class="row">
                    <div class="col-lg-5 col-md-5">
                      <div class="widget widget-list">
                        <div class="section-title section-title-2">
                          <h3 class="title">{{ $t('footer.view') }}</h3>
                        </div>
                        <div class="list">
                          <ul>
                            <li><a href="#">{{ $t('footer.todayView') }}</a></li>
                            <li><a href="#">{{ $t('footer.columnContribution') }}</a></li>
                            <li><a href="#">{{ $t('footer.contributingWriters') }}</a></li>
                            <li><a href="#">{{ $t('footer.businessNews') }}</a></li>
                            <li><a href="#">{{ $t('footer.collections') }}</a></li>
                            <li><a href="#">{{ $t('footer.todayNews') }}</a></li>
                            <li><a href="#">{{ $t('footer.saturdayReview') }}</a></li>
                            <li><a href="#">{{ $t('footer.productReview') }}</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-7 col-md-7">
                      <div class="widget widget-twitter-post">
                        <div class="twitter-post" v-for="(iten, index) in 2">
                          <div class="icon">
                            <i class="fab fa-twitter"></i>
                          </div>
                          <div class="twitter-content">
                            <p>
                              Here is the advertising space Here is the advertising space
                              Here is the advertising space
                              Here is the advertising space
                              <a href="#">@Decme #technology
                                https://decme.com/</a>
                            </p>
                            <span>March 26, 2020</span>
                          </div>
                        </div>
                        <!-- <div class="twitter-post">
                          <div class="icon">
                            <i class="fab fa-twitter"></i>
                          </div>
                          <div class="twitter-content">
                            <p>
                              Here is the advertising space Here is the advertising space
                              Here is the advertising space
                              Here is the advertising space
                              <a href="#">@Decme #technology
                                https://decme.com/</a>
                            </p>
                            <span>March 26, 2020</span>
                          </div>
                        </div> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="footer-rightbar mt-16">
                <div class="row">
                  <div class="col-lg-12 col-md-6">
                    <div class="widget widget-news">
                      <!-- <div class="section-title section-title-2">
                        <h3 class="title">{{ $t('headerNav.blogCategories') }}</h3>
                      </div>
                      <div class="footer-news">
                        <div class="
                            gallery_item gallery_item-style-2
                            footer_gallery_item
                          ">
                          <div class="gallery_item_content">
                            <div class="post-meta">
                              <div class="meta-categories">
                                <a href="#" tabindex="0">TECHNOLOGY</a>
                              </div>
                              <div class="meta-date">
                                <span>March 26, 2020</span>
                              </div>
                            </div>
                            <h4 class="title">
                              <a href="#" tabindex="0">Nancy zhang a chinese busy woman and dhaka</a>
                            </h4>
                            <span>1</span>
                          </div>
                        </div>
                        <div class="
                            gallery_item gallery_item-style-2
                            footer_gallery_item
                          ">
                          <div class="gallery_item_content">
                            <div class="post-meta">
                              <div class="meta-categories">
                                <a href="#" tabindex="0">TECHNOLOGY</a>
                              </div>
                              <div class="meta-date">
                                <span>March 26, 2020</span>
                              </div>
                            </div>
                            <h4 class="title">
                              <a href="#" tabindex="0">Success is not a good teacher failure makes you
                                humble</a>
                            </h4>
                            <span>2</span>
                          </div>
                        </div>
                        <div class="
                            gallery_item gallery_item-style-2
                            footer_gallery_item
                          ">
                          <div class="gallery_item_content">
                            <div class="post-meta">
                              <div class="meta-categories">
                                <a href="#" tabindex="0">TECHNOLOGY</a>
                              </div>
                              <div class="meta-date">
                                <span>March 26, 2020</span>
                              </div>
                            </div>
                            <h4 class="title">
                              <a href="#" tabindex="0">Cheap smartphone sensor could help you old food
                                safe</a>
                            </h4>
                            <span>3</span>
                          </div>
                        </div>
                        <div class="
                            gallery_item gallery_item-style-2
                            footer_gallery_item
                          ">
                          <div class="gallery_item_content">
                            <div class="post-meta">
                              <div class="meta-categories">
                                <a href="#" tabindex="0">TECHNOLOGY</a>
                              </div>
                              <div class="meta-date">
                                <span>March 26, 2020</span>
                              </div>
                            </div>
                            <h4 class="title">
                              <a href="#" tabindex="0">Class property employ ancho red multi humble</a>
                            </h4>
                            <span>4</span>
                          </div>
                        </div>
                        <div class="
                            gallery_item gallery_item-style-2
                            footer_gallery_item
                          ">
                          <div class="gallery_item_content">
                            <div class="post-meta">
                              <div class="meta-categories">
                                <a href="#" tabindex="0">TECHNOLOGY</a>
                              </div>
                              <div class="meta-date">
                                <span>March 26, 2020</span>
                              </div>
                            </div>
                            <h4 class="title">
                              <a href="#" tabindex="0">Best garden wing supplies for the horticu
                                ltural</a>
                            </h4>
                            <span>5</span>
                          </div>
                        </div>
                      </div> -->
                    </div>
                  </div>
                  <div class="col-lg-12 col-md-6">
                    <div class="widget wedget-service" style="border:none; padding: 0; margin: 0;">
                      <div class="section-title section-title-2">
                        <h3 class="title">{{ $t('footer.newsService') }}</h3>
                      </div>
                      <div class="service-item">
                        <ul>
                          <li>
                            <a href="#"><i class="fal fa-mobile-android-alt"></i> {{ $t('footer.onYourPhone') }}</a>
                          </li>
                          <li>
                            <a href="#"><i class="fal fa-microphone-alt"></i> {{ $t('footer.about') }}</a>
                          </li>
                          <li>
                            <a href="#"><i class="fal fa-envelope"></i> {{ $t('footer.contactDecmeNews') }}</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <div class="footer-copyright">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="
                copyright-item
                d-block d-md-flex
                justify-content-between
                align-items-center
              ">
              <p>© Copyright 2020, All Rights Reserved</p>
              <ul>
                <li><a href="#">{{ $t('footer.about') }}</a></li>
                <li><a href="#">{{ $t('footer.advertise') }}</a></li>
                <li><a href="#">{{ $t('footer.privacyPolicy') }}</a></li>
                <li><a href="#">{{ $t('footer.contactus') }}</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
