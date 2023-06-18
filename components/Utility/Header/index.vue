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
                <a href="#" class="font-bold">{{ $t('login.connectWallet') }}</a>
              </div>
              <div class="nice-select-item">
                <!-- <select class="select-lang">
                  <option data-display="English">English</option>
                  <option value="1">简体中文</option>
                  <option value="2">繁体中文</option>
                </select> -->
                <el-select size="small" v-model="selectValue" @change="languageChange" placeholder="请选择">
                  <el-option v-for="item in languageOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="header-temperature">
                <!-- <div class="icon">
                  <img src="@/assets/images/temperature-icon.svg" alt="" />
                </div> -->
                <!-- <div class="temperature-content text-center">
                  <h5 class="title">
                    13 <sup>0<sub>C</sub></sup>
                  </h5>
                  <p>San Francisco</p>
                </div> -->
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
    languageOptions: [{
      value: 'zh_cn',
      label: '简体中文'
    }, {
      value: 'zh_hk',
      label: '繁體中文'
    }, {
      value: 'en_us',
      label: 'English'
    }],
    selectValue: '',
    value: null,
    options: ["English", "Bangla", "Hinde"],
    walletAddress: ''
  }),
  mounted() {
    localStorage.getItem('language') ? this.$i18n.locale = this.selectValue = localStorage.getItem('language') : ''
  },
  methods: {
    // loginWithIdentityToken(walletAddress, identityToken) {
    //   this.$authApi.loginWithIdentityToken({ wallet_address: walletAddress, identity_token: identityToken }).then(res => {
    //     console.log('登录状态', res)
    //   }).catch(err => {
    //     console.log('err', err)
    //   })
    // },
    // contractSaveToken(contractToken) {
    //   let web3Contract = new this.Web3.eth.Contract(this.Config.con_abi, this.Config.con_addr)
    //   return web3Contract.methods.saveToken(contractToken).call()
    // },
    languageChange(value) {
      console.log('value', value)
      localStorage.setItem('language', value)
      this.$i18n.locale = value
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
            const { contract_token, identity_token, wallet_address } = await _self.$authApi.getLoginToken({ wallet_address: window.ethereum.selectedAddress })
            let web3Contract = new _self.Web3.eth.Contract(_self.Config.con_abi, _self.Config.con_addr)
            let data = web3Contract.methods.saveToken(contract_token).encodeABI() //gas
            web3Contract.methods.saveToken(contract_token).call().then((result) => {
              _self.Web3.eth.sendTransaction({
                to: _self.Config.con_addr,
                from: window.ethereum.selectedAddress,
                value: result,
                data: data
              })
                .on('receipt', (receipt) => {
                  console.log('receipt', receipt)
                  const { status, user, token } = _self.$authApi.loginWithIdentityToken(receipt.from, identity_token).data
                  console.log('status', status)
                  console.log('user', user)
                  console.log('token', token)
                })
                .on('error', (error) => {
                  console.log(error)
                  instance.confirmButtonText = '登录失败，点击重新登录'
                })

            }).catch((err) => {
              console.log(err)
            })
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
