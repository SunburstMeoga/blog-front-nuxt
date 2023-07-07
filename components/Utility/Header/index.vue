<template>
  <header class="header-area">
    <top-bar />
    <div class="header-centerbar" style="padding: 10px 0;">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-4">
            <div class="logo">
              <nuxt-link to="/">
                <img :src="require(`@/assets/images/` + image)" alt="feature" />
              </nuxt-link>
            </div>
          </div>
          <div class="col-lg-8">
            <!-- <div class="header-centerbar-ad">
              <a href="#">
                <img src="@/assets/images/ads/one_ad.png" alt="" /></a>
            </div> -->
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
            <nav-items :darkClass="darkClass" />
          </div>
          <div class="col-lg-4 col-sm-9 col-9">
            <div class="header-menu-rightbar">
              <div class="header-menu-search" v-if="$store.state.auth.hasToken && $store.state.auth.walletAddress">
                <el-dropdown size="medium">
                  <el-button type="primary" size="medium">
                    {{ addressFilter($store.state.auth.walletAddress) }}
                    <i class="el-icon-arrow-down el-icon-user-solid"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>我的博客</el-dropdown-item>
                    <el-dropdown-item>
                      <el-badge :value="12" class="item">
                        系统消息
                      </el-badge>
                    </el-dropdown-item>
                    <el-dropdown-item>审核通知</el-dropdown-item>
                    <el-dropdown-item>复制钱包地址</el-dropdown-item>
                    <el-dropdown-item>设置</el-dropdown-item>
                    <el-dropdown-item divided>退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div class="header-menu-search" v-else>
                <el-button type="primary" size="medium" :loading="isLoading" @click="handleLogin">
                  {{ isLoading ? '登录中...' : ($store.state.auth.isConnectWallet ? $t('login.login') :
                    $t('login.connectWallet')) }}</el-button>
              </div>

              <div class="nice-select-item">
                <el-dropdown size="medium">
                  <el-button size="medium">
                    {{ selectValue }}
                    <!-- <i class="el-icon-arrow-down el-icon-user-solid"></i> -->
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="languageChange(item)" v-for="(item, index) in languageOptions"
                      :key="index">
                      {{ item.label }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
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
import { addressFilter } from '../../../utils/format'
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
    isLoading: false
  }),
  mounted() {
    if (localStorage.getItem('language')) {
      this.$i18n.locale = localStorage.getItem('language')
      this.$store.commit('system/setLanguage', localStorage.getItem('language'))
      switch (localStorage.getItem('language')) {
        case 'zh_hk': this.selectValue = '繁體中文'
          break;
        case 'en_us': this.selectValue = 'English'
          break;
        case 'zh_cn': this.selectValue = '简体中文'
      }
    }

  },
  methods: {
    addressFilter,
    languageChange(item) {
      console.log(item)
      localStorage.setItem('language', item.value)
      this.$i18n.locale = item.value
      this.$store.commit('system/setLanguage', localStorage.getItem('language'))
      this.selectValue = item.label
    },
    async handleLogin() {
      this.isLoading = true
      if (this.$store.state.auth.walletAddress) { //已经连接钱包
        console.log('已经连接钱包')
        if (!this.$store.state.auth.authToken) {
          console.log('已经连接钱包并且已经拥有token')
          const { contract_token, identity_token } = await this.$userApi.getLoginToken({ wallet_address: window.ethereum.selectedAddress || this.$store.state.auth.walletAddress })
          this.saveTokenToContract(contract_token, identity_token)
        }
      } else { //未链接钱包
        console.log('未连接钱包')
        this.connectWallet()
      }
    },
    async connectWallet() {
      try {
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        })
        this.$store.commit('auth/setWalletAddress', accounts[0])
        if (!this.$store.state.auto.authToken || localStorage.getItem('token')) {
          this.showConfirmBox()
        }
      } catch (error) {
        console.error(error)
      }
    },
    hideSidebar(e) {
      this.$emit("toggleSidebar", e);
    },
    showConfirmBox() {
      let _self = this
      this.$confirm('连接您的钱包并使用DECME，即表示您同意我们的服务条款和隐私政策。', '欢迎来到DECME', {
        closeOnClickModal: false,
        closeOnPressEscape: false,
        beforeClose: async function (action, instance, done) {
          if (action === 'cancel' || action === 'close') {
            done()
          } else {
            instance.confirmButtonText = '正在登录...'
            if (localStorage.getItem('token')) {
              localStorage.clear('token')
            }
            const { contract_token, identity_token, wallet_address } = await _self.$userApi.getLoginToken({ wallet_address: window.ethereum.selectedAddress || this.$store.state.auth.walletAddress })
            _self.saveTokenToContract(contract_token, identity_token)
            done()
          }
        },
        confirmButtonText: '接受并连接',
        cancelButtonText: '取消',
        // type: 'info',
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
    saveTokenToContract(contractToken, identityToken) {
      let web3Contract = new this.Web3.eth.Contract(this.Config.con_abi, this.Config.con_addr)
      web3Contract.methods.saveToken(contractToken)
        .send({ from: window.ethereum.selectedAddress })
        .on('transationHash', (hash) => {
          // console.log('hash', hash)
        })
        .on('receipt', (receipt) => {
          // console.log('receipt', receipt)
        })
        .then((res) => {
          console.log('保存contractToken成功', res)
          console.log('contract_token', contractToken)
          console.log('identity_token', identityToken)
          console.log('wallet_address', window.ethereum.selectedAddress)
          this.$userApi.loginWithIdentityToken({ wallet_address: window.ethereum.selectedAddress, identity_token: identityToken }).then(userInfo => {
            const { status, data, token } = userInfo
            this.$store.commit('auth/setAuthToken', token)
            this.$store.commit('auth/changeHasTokenStatus', true)
            localStorage.setItem('token', token)
            console.log(status, data, token)
            console.log(userInfo)
            this.isLoading = false
          })
        })
        .catch(err => {
          console.log('保存contractToken失败', err)
          this.isLoading = false
        })
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
