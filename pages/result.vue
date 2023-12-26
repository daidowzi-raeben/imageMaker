<template>
  <div class="wrap">
    <div class="result">
      <div class="score">
        총 <span class="color">{{ $route.query.limit }}</span>문제중 <span class="color">{{ $route.query.q }}</span>문제 맞췄어요!
      </div>
      <div class="text">내 결과를 공유해보세요</div>
       <textarea v-show="false" id="textArea">{{ isUrl }}</textarea>
      <div class="btn-list">
        <button type="button" class="btn share kakao"></button>
        <button type="button" class="btn share link" @click="copyToClipBoard"></button>
      </div>
      <div class="btn-list">
        <el-button type="primary" @click="onClickRouterPush(true)">다시하기</el-button>
        <el-button type="primary" plain @click="onClickRouterPush(false)">다른퀴즈</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

// import imgpath from '~/static/images/logo.svg';

export default {
  name: 'MainPage',
  layout: 'index',
  data() {
    return {
      isLimit: 10,
      isStart: true,
      isNow: 0,
      list: true,
      isUrl: ''
    }
  },
  head() {
    return {
      title: '퀴즈',
      link: [
         {
          src: 'https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js',
          crossorigin: 'anonymous',
          integrity:
            'sha384-PFHeU/4gvSH8kpvhrigAPfZGBDPs372JceJq3jAXce11bVA6rMvGWzvP4fMQuBGL',
        },
      ]
    }
  },
  computed: {
    ...mapState(['QUIZ']),
  },
  created() {
    // this.onClickGameStart()
  },
  mounted() {
    this.$nextTick(() => {
      this.isUrl = location.href
    })
  },
  unmounted() {
    // document.removeEventListener('scroll', this.handlerScrollEvents);
  },
  methods: {
    ...mapMutations([]),
    ...mapActions(['ACTION_QUIZ_LIST', 'ACTION_GAME_START', 'ACTION_GAME_IMAGE_SAVE']),
    onClickRouterPush(v) {
      if (v) {
        return this.$router.push(`/quiz?&cate=${this.$route.query.cate}&title=${encodeURI(this.$route.query.title)}&limit=${this.$route.query.limit}`)
      } else {
        return this.$router.push('/')
      }
    },
    copyToClipBoard() {
      const content = document.getElementById('textArea');
      content.select();
      document.execCommand('copy');
    },
    onLoadRouter() {
        return location.href
    }
  }
}
</script>

<style lang="scss"></style>
