<template>
  <header class="header-area">
    <top-bar />
    <div class="header-centerbar sm:py-10">
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
              <div class="header-menu-search">
                <el-button type="primary" size="small" :loading="isLoading" @click="handleLogin">
                  {{ isLoading ? '登录中...' : ($store.state.auth.isConnectWallet ? $t('login.login') :
                    $t('login.connectWallet')) }}</el-button>

              </div>
              <div class="nice-select-item">
                <el-select size="small" v-model="selectValue" @change="languageChange" placeholder="请选择">
                  <el-option v-for="item in languageOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
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
    walletAddress: '',
    isLoading: false
  }),
  mounted() {
    localStorage.getItem('language') ? this.$i18n.locale = this.selectValue = localStorage.getItem('language') : ''
    console.log('window.ethereum.selectedAddress', window.ethereum.selectedAddress)
    if (window.ethereum.selectedAddress) {
      this.$store.commit('auth/setWalletAddress', window.ethereum.selectedAddress)
      this.$store.commit('auth/changeConnectWalletStatus', true)
    }
  },
  methods: {
    languageChange(value) {
      console.log('value', value)
      localStorage.setItem('language', value)
      this.$i18n.locale = value
    },
    async handleLogin() {
      this.isLoading = true
      if (window.ethereum.selectedAddress) { //已经连接钱包
        const { contract_token, identity_token } = await this.$authApi.getLoginToken({ wallet_address: window.ethereum.selectedAddress })
        this.saveTokenToContract(contract_token, identity_token)
      } else { //未链接钱包
        this.connectWallet()
      }
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
    async saveTokenToContract(contractToken, identityToken) {
      let web3Contract = new this.Web3.eth.Contract(this.Config.con_abi, this.Config.con_addr)
      web3Contract.methods.saveToken(contractToken)
        .send({ from: window.ethereum.selectedAddress })
        .on('transationHash', (hash) => {
          console.log('hash', hash)
        })
        .on('receipt', (receipt) => {
          console.log('receipt', receipt)
        })
        .then(res => {
          console.log('登录成功', res)
          console.log(window.ethereum.selectedAddress, identityToken)
          const { status, user, token } = this.$authApi.loginWithIdentityToken(window.ethereum.selectedAddress, identityToken).data
          console.log(status, user, token)
          this.$store.state.auth.commit('setAuthToken', token)
          this.$store.state.auth.commit('changeHasTokenStatus', true)
          localStorage.setItem('token', this.$store.state.auth.authToken)
          this.isLoading = false
        })
        .catch(err => {
          console.log('登录失败', err)
          this.isLoading = false

        })
      // web3Contract.methods.saveToken(contractToken).call().then((result) => {
      //   this.Web3.eth.sendTransaction({
      //     to: this.Config.con_addr,
      //     from: window.ethereum.selectedAddress,
      //     value: result,
      //     data: data
      //   })
      //     .on('receipt', (receipt) => {
      //       console.log('receipt', receipt)
      //       const { status, user, token } = _self.$authApi.loginWithIdentityToken(receipt.from, identityToken).data
      //       this.$store.state.auth.commit('setAuthToken', token)
      //       this.$store.state.auth.commit('changeHasTokenStatus', true)
      //       localStorage.setItem('token', _self.$store.state.auth.authToken)
      //     })
      //     .on('error', (error) => {
      //       console.log(error)

      //     })

      // }).catch((err) => {
      //   console.log(err)
      // })
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
            const { contract_token, identity_token, wallet_address } = await _self.$authApi.getLoginToken({ wallet_address: window.ethereum.selectedAddress })
            const { data } = await _self.saveTokenToContract(contract_token, identity_token)
            instance.confirmButtonText = '登录失败，点击重新登录'
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
