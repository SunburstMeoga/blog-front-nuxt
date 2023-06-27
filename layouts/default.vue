<template>
    <div>
        <drawer @toggleSidebar="toggleSidebar" :sidebar="sidebar" />
        <top-bar @toggleSidebar="toggleSidebar" />
        <Nuxt />
    </div>
</template>
  
<script>
import TopBar from '../components/Utility/Header/index.vue'
import Drawer from "../components/Mobile/Drawer.vue";

export default {
    components: { TopBar, Drawer },
    data() {
        return {
            sidebar: false,
        }
    },
    mounted() {
        if (localStorage.getItem('token')) {
            this.$store.commit('auth/setAuthToken', localStorage.getItem('token'))
            this.$store.commit('auth/changeHasTokenStatus', true)
        }
        window.ethereum.request({
            method: 'eth_accounts'
        })
            .then(accounts => {
                console.log('eth accounts', accounts)
                if (accounts.length !== 0) {
                    this.$store.commit('auth/setWalletAddress', accounts[0])
                    this.$store.commit('auth/changeConnectWalletStatus', true)
                }
            })
            .catch(err => {
                console.log(err)
            })
        console.log('this.$store', this.$store.state.auth)
        console.log('window.ethereum.selectedAddress', window.ethereum)
        console.log('window.ethereum.selectedAddress', window.ethereum.selectedAddress)
    },
    methods: {
        toggleSidebar() {
            this.sidebar = !this.sidebar;
        },
        topToBottom() {
            const result = document.querySelector(".go-top");
            if (
                document.body.scrollTop > window.innerHeight ||
                document.documentElement.scrollTop > window.innerHeight
            ) {
                result.classList.add("active");
            } else {
                result.classList.remove("active");
            }
        },
    },
}
</script>
  