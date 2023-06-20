import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = () => ({
    walletAddress: '',
    authToken: '',
    isConnectWallet: false,
    hasToken: false,
});

const mutations = {
    setWalletAddress(state, value) {
        state.walletAddress = value
    },
    changeConnectWalletStatus(state, value) {
        state.isConnectWallet = value
    },
    changeHasTokenStatus(state, value) {
        state.hasToken = value
    },
    setAuthToken(state, value) {
        state.authToken = value
    }
};

// 存在异步操作使用action，直接调用mutation中的函数
const actions = {
    modifyDate(context, payload) {
        context.commit('modifyDate', payload)
    }
}

export default {
    state,
    mutations,
    actions,
};
