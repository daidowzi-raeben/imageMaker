import axios from 'axios'
import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import ASEETS_STORE from './modules/assetsStore.js'
import JOIN_STORE from './modules/joinStore.js'
// import LOCATION_DATA from '~/static/json/location.json'
// import TEXT_LIST_DATA from '~/static/json/textList.json'
// import { randListAnswer } from '~/js/util'

Vue.use(Vuex)
const instance = axios.create()

// axios.interceptors.request.use(
//   function (config) {
//     console.log('=============요청전==========')
//     config.headers['Authorization'] = 'Bearer '
//     return config
//   },
//   function (error) {
//     return Promise.reject(error)
//   }
// )

instance.interceptors.request.use(
  function (config) {
    console.log('=============요청전==========')
    // 요청 성공 직전 호출됩니다.
    // axios 설정값을 넣습니다. (사용자 정의 설정도 추가 가능)
    // config.headers.Authorization = 'KakaoAK 1f64fd2b5f780ced81e4e045f034fe9c'
    return config
  },
  function (error) {
    // 요청 에러 직전 호출됩니다.
    return Promise.reject(error)
  }
)

// const apiUrl = {
//   apiMain: '/student.php?type=main&smt_idx=1&sms_idx=1',
// }
// const LOCALSTORAGE = localStorage.getItem('STUDENT')
// console.log('LOCALSTORAGE', LOCALSTORAGE)

const createStore = () => {
  return new Store({
    state: {
      IS_LOADING: false,
      CHAT: {
        LIST: [],
      },
      IMAGE: {},
    },
    getters: {},
    mutations: {
      // ----------- intro
      MUTATIONS_CHAT_LIST(state, payload) {
        // state.CHAT.LIST.unshift(payload)
        state.CHAT.LIST.push(payload)
        console.log(payload)
      },
      MUTATIONS_IS_LOADING(state, payload) {
        state.IS_LOADING = payload
      },
      MUTATIONS_IMAGE_LIST(state, payload) {
        state.IMAGE = payload
      },
    },
    actions: {
      ACTION_CHAT_BOT({ commit }, params) {
        this.$axios
          .post(`https://api.openai.com/v1/chat/completions`, params, {
            header: {
              'Context-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            console.log(res.data)
            // res.params = params
            commit('MUTATIONS_CHAT_LIST', res)
            commit('MUTATIONS_IS_LOADING', false)
          })
          .catch((res) => {
            console.log('AXIOS FALSE', res)
          })
      },
      ACTION_IMAGE_BOT({ commit }, params) {
        this.$axios
          .post(`https://api.openai.com/v1/images/generations`, params, {
            header: {
              'Context-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            console.log(res.data)
            // res.params = params
            commit('MUTATIONS_IMAGE_LIST', res)
            commit('MUTATIONS_IS_LOADING', false)
            this.$axios
              .get(
                `${process.env.VUE_APP_API}?mode=aiImage`,
                { params },
                {
                  header: {
                    'Context-Type': 'multipart/form-data',
                  },
                }
              )
              .then((res) => {
                console.log(res.data)
                // res.params = params
                // commit('MUTATIONS_CHAT_LIST', res)
                // commit('MUTATIONS_IS_LOADING', false)
              })
              .catch((res) => {
                console.log('AXIOS FALSE', res)
              })
          })
          .catch((res) => {
            console.log('AXIOS FALSE', res)
          })
      },
    },
    modules: {
      foo: {
        namespaced: true,
        modules: {
          assetsStore: ASEETS_STORE,
          joinStore: JOIN_STORE,
        },
      },
    },
  })
}

export default createStore
