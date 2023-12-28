<template>
  <div>
    <div v-if="USER?.user_id">
      <span>
        <img :src="USER?.user_picture" width="20"/>
      </span>
    </div>
    <div v-else @click="doGoogleLogin()">로그인</div>
    <Nuxt />
  </div>
</template>

<script>
//  MUTATIONS_LOGIN
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'IndexLayout',
  data() {
    return {
      isInit: false,
      isSignIn: false,
      search: '',

      headerMenuShow: false,

      options: [{
        value: 'ko',
        label: '한국어'
      }, {
        value: 'en',
        label: '영어'
      }, {
        value: 'ch',
        label: '중국어'
      }, {
        value: 'jp',
        label: '일본어'
      }],
      lang: '한국어',
    }
  },
  head() {
    return {
      script: [
        {
          src: 'https://accounts.google.com/gsi/client',
          async: true,
          defer: true,
        },
        {
          src: 'https://apis.google.com/js/platform.js',
          async: true,
          defer: true,
        },
      ]
    }
  },
  computed: {
    ...mapState(['VIEW_TEXT','USER'])
  },
  created() {
    // const that = this;
    // const checkGauthLoad = setInterval(function () {
    //   that.isInit = that.$gAuth.isInit;
    //   that.isSignIn = that.$gAuth.isAuthorized;
    //   if (that.isInit) clearInterval(checkGauthLoad);
    // }, 1000);
  },
  mounted() {
    // 로그인 체크
    this.$nextTick(() => {
      const id = sessionStorage.getItem('loginId')
      if (id) {
        const params = {
          user_id: id,
          mode : 'loginChk'
        }
        this.ACTION_LOGIN_CHECK(params)
      }
    })
  },
  methods: {
    ...mapMutations(['MUTATIONS_LANGAGE_SET']),
    ...mapActions(['ACTION_LOGIN_CHECK']),
   doGoogleLogin() {
     const url ='https://accounts.google.com/o/oauth2/v2/auth?scope=email profile&include_granted_scopes=true&state=state_parameter_passthrough_value&redirect_uri=http://localhost:9001/login&response_type=token&client_id=326804284084-no57a7j7m7ifgund1ukiut04bkhdm6q4.apps.googleusercontent.com'
      location.href= url
    },

  },
}
</script>

<style lang="scss"></style>
