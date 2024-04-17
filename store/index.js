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
      IMAGE_LOADING: false,
      IMAGE_LOADING_QUAL: false,
      CHAT: {
        LIST: [],
      },
      IMAGE: [],
      IMAGE_LIST: [],
      USER: {
        user_id: '',
      },
      SD: {
        IMAGE: {},
        LIST: {},
        SAVE_LIST: {},
      },
      imageOptions: {
        seed: 0,
        clip_skip: 2,
        step: 30,
        scale: 7.5,
        width: 1024,
        height: 768,
        samples: 1,
        lora_model: 'maky-lora-00001',
        embeddings_model: '',
        lora_strength: '0.2',
        // prompt:
        //   'RAW photo,Masterpiece, high quality, best quality, authentic, super detail, interior,mordeninterior,morden living room,couch,table,rug,tv sheft,windows,curtains,daylight, (high detailed :1.2), 8k uhd, dslr, soft lighting, high quality, film grain, Fujifilm XT3  <lora:epi_noiseoffset2:0.3> <lora:add_detail:-0.5>',
        // prompt: 'Step into the realms of an 8k masterpiece wallpaper, a nexus of ultra-detail, high resolution, and impeccable shadow play. Rendered in digital illustration, it bears a semblance to the works of Yoko Honda. Set against the backdrop of a Nayuta Nordic Modern Interior Design room, the scene features a chair, a vase flaunting a white flower, a table, swaying curtains, a luxurious couch, a lamp placed near a window, a cup, a spread-out book, and a vibrant plant. The color temperature bathes the room in golden hues, adding to its charm. In the absence of humans, the setting resonates with profound stillness. Ray tracing, photon mapping, and radiosity merge seamlessly with professional lighting to create an ethereal atmosphere',
        prompt: 'interior,living room with a white sofa and wooden floor, beige blue salmon pastel',
        negative_prompt: '(normal quality), (low quality), (worst quality), paintings, sketches,lowres, text, cropped, worst quality, low quality, normal quality, signature, watermark, username, blurry,skech,logo,blurry, drawing, sketch, poor quality, ugly, low resolution, saturated, high contrast, oversharpened,low quality, bad anatomy, worst quality,deformed,  disfigured, cropped, jpeg artifacts, error, mutation,noise,UnrealisticDream',
        model_id: 'maky-base-00002',
        safety_checker: false,
        schedulerVal: 'DPMSolverMultistepScheduler',
        scheduler: [
          'DDPMScheduler',
          'PNDMScheduler',
          'EulerAncestralDiscreteScheduler',
          'DDIMScheduler',
          'LMSDiscreteScheduler',
          'EulerDiscreteScheduler',
          'DPMSolverMultistepScheduler',
          'HeunDiscreteScheduler',
          'UniPCMultistepScheduler',
          'DPMSolverSinglestepScheduler',
          'LCMScheduler',
        ],
      },
      imageOptions2: {
        seed: 0,
        clip_skip: 2,
        step: 30,
        scale: 7.5,
        width: 768,
        height: 1024,
        samples: 1,
        lora_model: 'maky-anime-00003',
        embeddings_model: '',
        lora_strength: '0.5',
        // prompt:
        //   'RAW photo,Masterpiece, high quality, best quality, authentic, super detail, interior,mordeninterior,morden living room,couch,table,rug,tv sheft,windows,curtains,daylight, (high detailed :1.2), 8k uhd, dslr, soft lighting, high quality, film grain, Fujifilm XT3  <lora:epi_noiseoffset2:0.3> <lora:add_detail:-0.5>',
        // prompt: 'Step into the realms of an 8k masterpiece wallpaper, a nexus of ultra-detail, high resolution, and impeccable shadow play. Rendered in digital illustration, it bears a semblance to the works of Yoko Honda. Set against the backdrop of a Nayuta Nordic Modern Interior Design room, the scene features a chair, a vase flaunting a white flower, a table, swaying curtains, a luxurious couch, a lamp placed near a window, a cup, a spread-out book, and a vibrant plant. The color temperature bathes the room in golden hues, adding to its charm. In the absence of humans, the setting resonates with profound stillness. Ray tracing, photon mapping, and radiosity merge seamlessly with professional lighting to create an ethereal atmosphere',
        prompt: ` 1girl, (masterpiece:1.2), highres, high quality, (perfect face and eyes:1.2), (textured skin:1.2), bus stop, wind, serafuku, school uniform, intense light rays, cute hyperrealistic, full body, detailed clothing, highly detailed, cinematic lighting, stunningly beautiful, intricate, sharp focus, f/1. 8, 85mm, (centered image composition), (professionally color graded), ((bright soft diffused light)), volumetric fog, trending on instagram, trending on tumblr, HDR 4K, 8K`,
        negative_prompt: '((nude)),3d, 3d render, painting, digital painting, watermark, sepia, black & white,NG_DeepNegative_V1_75T,EasyNegative,verybadimagenegative_v1.3, bad_pictures,(worst quality:2), (low quality:2), (normal quality:2), lowres, normal quality, ((monochrome)), ((grayscale)),(ugly:1.33), bad face,bad fingers, bad anatomy,spot',
        model_id: 'maky-base-model-002',
        safety_checker: false,
        schedulerVal: 'DPMSolverMultistepScheduler',
        scheduler: [
          'DDPMScheduler',
          'PNDMScheduler',
          'EulerAncestralDiscreteScheduler',
          'DDIMScheduler',
          'LMSDiscreteScheduler',
          'EulerDiscreteScheduler',
          'DPMSolverMultistepScheduler',
          'HeunDiscreteScheduler',
          'UniPCMultistepScheduler',
          'DPMSolverSinglestepScheduler',
          'LCMScheduler',
        ],
      },
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
      MUTATIONS_IMAGE_LIST_ARRAY(state, payload) {
        state.IMAGE_LIST = payload
      },
      MUTATIONS_IMAGE_LOADING(state, payload) {
        state.IMAGE_LOADING = payload
      },
      MUTATIONS_IMAGE_QUAL(state, payload) {
        state.IMAGE_LOADING_QUAL = payload
      },
      MUTATIONS_USER(state, payload) {
        sessionStorage.setItem('loginId', payload.user_id)
        state.USER = payload
      },
      MUTATIONS_SD_IMAGE_MAKER(state, payload) {
        state.SD.IMAGE = null
        state.SD.IMAGE = payload
      },
      MUTATIONS_SD_IMAGE_MAKER_RELOAD(state, payload) {
        state.SD.LIST = payload
      },
      MUTATIONS_SD_IMAGE_MAKER_SAVE(state, payload) {
        state.SD.SAVE_LIST = payload
      },
    },
    actions: {
      ACTION_SD_IMAGE_MAKER({ commit }, params) {
        this.$axios
          .post(`${process.env.VUE_APP_API}`, params, {
            header: {
              'Context-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            console.log(res.data)
            // res.params = params
            commit('MUTATIONS_SD_IMAGE_MAKER', res.data)
            commit('MUTATIONS_IS_LOADING', false)
          })
          .catch((res) => {
            console.log('AXIOS FALSE', res)
          })
      },

      ACTION_SD_IMAGE_MAKER_RELOAD({ commit }, params) {
        this.$axios
          .post(`${process.env.VUE_APP_API}`, params, {
            header: {
              'Context-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            console.log(res.data)
            // res.params = params
            commit('MUTATIONS_SD_IMAGE_MAKER_RELOAD', res.data)

            commit('MUTATIONS_IS_LOADING', false)
          })
          .catch((res) => {
            console.log('AXIOS FALSE', res)
          })
      },
      ACTION_SD_IMAGE_MAKER_SAVE({ commit }, params) {
        this.$axios
          .post(`${process.env.VUE_APP_API}`, params, {
            header: {
              'Context-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            console.log(res.data)
            // res.params = params
            alert('저장완료')
          })
          .catch((res) => {
            console.log('AXIOS FALSE', res)
          })
      },
      ACTION_LOGIN_CHECK({ commit }, params) {
        this.$axios
          .get(
            `${process.env.VUE_APP_API}`,
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
            commit('MUTATIONS_USER', res.data)
            commit('MUTATIONS_IS_LOADING', false)
          })
          .catch((res) => {
            console.log('AXIOS FALSE', res)
          })
      },
      ACTION_GOOGLE_AUTH({ commit }, params) {
        this.$axios
          .get(
            `/googleApi/oauth2/v1/userinfo`,
            { params },
            {
              header: {
                'Context-Type': 'multipart/form-data',
              },
            }
          )
          .then((res) => {
            console.log(res.data)
            // res.params = params`
            const userParma = res.data
            userParma.mode = 'login'
            this.$axios
              .get(
                `${process.env.VUE_APP_API}?mode=login&id=${userParma.id}&email=${userParma.email}&name=${userParma.name}&picture=${userParma.picture}`,
                userParma,
                {
                  header: {
                    'Context-Type': 'multipart/form-data',
                  },
                }
              )
              .then((res) => {
                console.log(res.data)
                // res.params = params
                commit('MUTATIONS_USER', res.data)
                // commit('MUTATIONS_IMAGE_LOADING', false)
                // commit('MUTATIONS_IMAGE_QUAL', false)
              })
              .catch((res) => {
                console.log('AXIOS FALSE', res)
              })
          })
          .catch((res) => {
            console.log('AXIOS FALSE', res)
          })
      },
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
      ACTION_IMAGE_QUALITY_STEP({ commit }, params) {
        this.$axios
          .get(
            `${process.env.VUE_APP_API}`,
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
            // commit('MUTATIONS_IMAGE_LIST', res.data)
            // commit('MUTATIONS_IMAGE_LOADING', false)
            // commit('MUTATIONS_IMAGE_QUAL', false)
            commit('MUTATIONS_IMAGE_LOADING', true)

            commit('MUTATIONS_IS_LOADING', false)
            params.w = 'makerImage'
            params.mode = 'makerImage'
            params.isNew = 'N'

            params.idx = res.data[0]?.idx
            this.$axios
              .get(
                `${process.env.VUE_APP_API}`,
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
                if (res?.data) {
                  commit('MUTATIONS_IMAGE_LIST', res.data)
                  commit('MUTATIONS_IMAGE_LOADING', false)
                  commit('MUTATIONS_IS_LOADING', false)
                  commit('MUTATIONS_IMAGE_QUAL', false)
                }
              })
              .catch((res) => {
                console.log('AXIOS FALSE', res)
              })
          })
          .catch((res) => {
            console.log('AXIOS FALSE', res)
          })
      },
      ACTION_IMAGE_QUALITY({ commit }, params) {
        this.$axios
          .get(
            `${process.env.VUE_APP_API}`,
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
            commit('MUTATIONS_IMAGE_LIST', res.data)
            commit('MUTATIONS_IMAGE_LOADING', false)
            commit('MUTATIONS_IMAGE_QUAL', false)
          })
          .catch((res) => {
            console.log('AXIOS FALSE', res)
          })
      },
      ACTION_IMAGE_BOT({ commit }, params) {
        console.log('params', params)
        return this.$axios
          .get(
            `${process.env.VUE_APP_API}`,
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
            if (res?.data) {
              // commit('MUTATIONS_IMAGE_LIST', res.data)
              commit('MUTATIONS_IMAGE_LOADING', true)

              commit('MUTATIONS_IS_LOADING', false)
              params.w = 'makerImage'
              params.mode = 'makerImage'
              params.idx = res.data[0]?.idx
              this.$axios
                .get(
                  `${process.env.VUE_APP_API}`,
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
                  if (res?.data) {
                    commit('MUTATIONS_IMAGE_LIST', res.data)
                    commit('MUTATIONS_IMAGE_LOADING', false)
                    // commit('MUTATIONS_IS_LOADING', false)
                  }
                })
                .catch((res) => {
                  console.log('AXIOS FALSE', res)
                })
            }
          })
          .catch((res) => {
            console.log('AXIOS FALSE', res)
          })
      },
      ACTION_IMAGE_BOT_LIST({ commit }, params) {
        return this.$axios
          .get(`${process.env.VUE_APP_API}?mode=aiList`, params, {
            header: {
              'Context-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            console.log(res.data)
            // res.params = params
            if (res?.data) {
              commit('MUTATIONS_IMAGE_LIST_ARRAY', res.data)
              commit('MUTATIONS_IS_LOADING', false)
            }
          })
          .catch((res) => {
            console.log('AXIOS FALSE', res)
          })
      },
      ACTION_IMAGE_BOT_EDIT({ commit }, params) {
        this.$axios
          .post(`https://api.openai.com/v1/images/generations`, params, {
            header: {
              'Context-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            console.log(res.data)
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
