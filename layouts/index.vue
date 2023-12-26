<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
//  MUTATIONS_LOGIN
import { mapState, mapMutations } from 'vuex'
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
  computed: {
    ...mapState(['VIEW_TEXT'])
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
    // this.googleInitialize()
  },
  methods: {
     ...mapMutations(['MUTATIONS_LANGAGE_SET']),
    async handleClickSignIn() {
      try {
        const googleUser = await this.$gAuth.signIn()
        if (!googleUser) {
          return null
        }
        console.log('googleUser', googleUser)
        console.log('getId', googleUser.getId())
        console.log('getBasicProfile', googleUser.getBasicProfile())
        console.log('getAuthResponse', googleUser.getAuthResponse())
        console.log(
          'getAuthResponse',
          this.$gAuth.GoogleAuth.currentUser.get().getAuthResponse()
        )
        this.isSignIn = this.$gAuth.isAuthorized
      } catch (error) {
        console.error(error)
        return null
      }
    },
  },
}
</script>

<style lang="scss"></style>
