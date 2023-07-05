import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = () => ({
    language: 'zh_cn'
});

const mutations = {
    setLanguage(state, value) {
        state.language = value
    },
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
