<template>
  <header class="header-area">
    <top-bar />
    <div class="header-centerbar">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-4">
            <div class="logo">
              <router-link to="/">
                <img :src="require(`@/assets/images/` + image)" alt="feature" />
              </router-link>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="header-centerbar-ad">
              <a href="#">
                <img src="@/assets/images/ads/one_ad.png" alt="" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="header-menubar">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8 col-sm-3 col-3">
            <svg class="menu-drawer" style="cursor: pointer" @click.prevent="hideSidebar"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" fill="currentColor" height="24">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M3 4h18v2H3V4zm6 7h12v2H9v-2zm-6 7h18v2H3v-2z"></path>
            </svg>
            <!-- <div
              :class="[
                'newspark-header-main-menu',
                darkClass && 'menuItem' in darkClass ? darkClass.menuItem : '',
              ]"
            >
              <ul v-if="nav_items">
                <li v-for="(item, index) in nav_items" :key="index">
                  <a
                    >{{ item.linkText }}
                    <i v-if="item.child" class="fal fa-angle-down"></i
                  ></a>
                  <ul v-if="item.child" class="sub-menu">
                    <li v-for="(lvlTwo, index) in item.submenu" :key="index">
                      <router-link :to="`${lvlTwo.link}`">
                        {{ lvlTwo.linkText }}
                        <i v-if="lvlTwo.child" class="fal fa-angle-down"></i
                      ></router-link>
                      <ul v-if="lvlTwo.child" class="sub-menu">
                        <li
                          v-for="(lvlThree, index) in lvlTwo.third_menu"
                          :key="index"
                        >
                          <router-link :to="`${lvlThree.link}`">{{
                            lvlThree.linkText
                          }}</router-link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </div> -->
            <nav-items :darkClass="darkClass" />
          </div>
          <div class="col-lg-4 col-sm-9 col-9">
            <div class="header-menu-rightbar">
              <div class="header-menu-search" @click="connectWallet">
                <a href="#">链接钱包</a>
              </div>
              <div class="nice-select-item" style="cursor: pointer">
                <select class="select-lang">
                  <option data-display="English">English</option>
                  <option value="1">简体中文</option>
                  <option value="2">繁体中文</option>
                </select>
              </div>
              <div class="header-temperature">
                <div class="icon">
                  <img src="@/assets/images/temperature-icon.svg" alt="" />
                </div>
                <div class="temperature-content text-center">
                  <h5 class="title">
                    13 <sup>0<sub>C</sub></sup>
                  </h5>
                  <p>San Francisco</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import TopBar from "./TopBar.vue";
import NavItems from "../Common/NavItems.vue";
export default {
  components: { TopBar, NavItems },
  props: {
    image: {
      type: String,
      default: "logo.png",
    },
    darkClass: {
      type: Object,
    },
  },
  data: () => ({
    value: null,
    options: ["English", "Bangla", "Hinde"],
    walletAddress: ''
  }),
  mounted() {
    // let web3Contract = new this.Web3.eth.Contract(this.Config.con_abi, this.Config.con_addr)
    // console.log(web3Contract)
  },
  methods: {
    loginWithIdentityToken(walletAddress, identityToken) {
      this.$authApi.loginWithIdentityToken({ wallet_address: walletAddress, identity_token: identityToken }).then(res => {
        console.log('登录状态', res)
      }).catch(err => {
        console.log('err', err)
      })
    },
    contractSaveToken(contractToken) {
      let web3Contract = new this.Web3.eth.Contract(this.Config.con_abi, this.Config.con_addr)
      return web3Contract.methods.saveToken(contractToken).call()
    },
    showConfirmBox() {
      let _self = this
      this.$confirm('是否确认登录?', '是否登录', {
        closeOnClickModal: false,
        closeOnPressEscape: false,
        beforeClose: async function (action, instance, done) {
          if (action === 'cancel' || action === 'close') {
            done()
          } else {
            instance.confirmButtonText = '正在登录...'
            const { contract_token, identity_token } = await _self.$authApi.getLoginToken({ wallet_address: _self.walletAddress })
            const contractResult = await _self.contractSaveToken(contract_token)
            console.log('contract_token', contract_token, identity_token)
            console.log('contractResult', contractResult)
            _self.loginWithIdentityToken(window.ethereum.selectedAddress, identity_token)
            // _self.getLoginToken()
          }
        },
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'info',
        center: true
      }).then(() => {
        // this.getLoginToken()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    handleConnect() {

    },
    async connectWallet() {
      try {
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        })
        this.showConfirmBox()
        this.walletAddress = accounts[0]
      } catch (error) {
        console.error(error)
      }
    },
    hideSidebar(e) {
      this.$emit("toggleSidebar", e);
    },
  },
};
</script>
<style>
.select-lang {
  border: 1px solid #bababa;
  width: 100px;
  padding: 2px;
  color: #17191d;
  outline: none;
  border-radius: 7px;
}
</style>
