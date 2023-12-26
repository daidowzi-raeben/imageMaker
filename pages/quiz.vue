<template>
  <div class="wrap">
    <div class="quiz-wrap">
      <div class="quiz-tit">제목</div>
      <div class="quiz-img">
        <img :src="QUIZ.IMAGE && QUIZ.IMAGE.length > 0 && QUIZ.IMAGE[0]?.thumbnail_url ? QUIZ.IMAGE[0]?.thumbnail_url : ''" alt="" />
      </div>
      <div v-if="QUIZ.ANSWER && QUIZ.ANSWER.length > 0 && QUIZ.ANSWER[isNow - 1] && QUIZ.ANSWER[isNow - 1]?.list" class="btn-list">
        <div v-for="(v, i) in QUIZ.ANSWER[isNow - 1].list" :key="i">
          <el-button type="primary" @click="onClickGameStartInit(i, QUIZ.ANSWER[isNow - 1]?.answer)">{{ QUIZ.LIST[v]?.qz_title }}</el-button>
        </div>
      </div>
      <div class="answer">
        {{ isNow }} / {{ isLimit }}
        <div v-if="isResult === 1" class="o">
          정답
        </div>
        <div v-if="isResult === 2" class="x">
          오답
        </div>
        <!-- <el-button type="primary">다음</el-button> -->
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
      isResult: 0,
      isAnsertResult: -1
    }
  },
  head() {
    return {
      title: '퀴즈'
    }
  },
  computed: {
    ...mapState(['QUIZ']),
  },
  created() {
    this.onClickGameStart()
    
  },
  mounted() {
    this.isLimit = this.$route.query.limit
    this.$nextTick(() => {
      setTimeout(() => {
        this.onClickGameStartInit()
      }, 1000);
    })
  },
  unmounted() {
    // document.removeEventListener('scroll', this.handlerScrollEvents);
  },
  methods: {
    ...mapMutations([]),
    ...mapActions(['ACTION_QUIZ_LIST', 'ACTION_GAME_START', 'ACTION_GAME_IMAGE_SAVE']),
    onClickGameStart() {
      const params = {
        cate: this.$route.query.cate,
        title: encodeURI(this.$route.query.title),
        limit: this.$route.query.limit
      }
      this.ACTION_QUIZ_LIST(params);

    },
    onClickGameStartInit(v, i) {

      setTimeout(() => {
        this.isResult = 0
      }, 1000);


      console.log(v, i)
      this.isStart = false
      const isAnswer = this.QUIZ.ANSWER[this.isNow]?.answer
      const arrayOnce = this.QUIZ.ANSWER[this.isNow]?.list[isAnswer]

      console.log(isAnswer, arrayOnce, this.isNow)

      const params = {
        query: this.QUIZ.LIST[arrayOnce]?.qz_title,
        page: 1,
        size: 5,
      }

      if (v === i) {
        console.log('정답')
        // this.isResult = 1
        this.isAnsertResult++
        const saveParams = {
          idx : this.QUIZ.LIST[arrayOnce]?.idx,
          image: this.QUIZ.IMAGE[0]?.thumbnail_url,
          mode:'save'
        }
        this.ACTION_GAME_IMAGE_SAVE(saveParams)
      }

      


      if (this.isLimit <= this.isNow) {
        return this.$router.push(`/result?q=${this.isAnsertResult}&cate=${this.$route.query.cate}&title=${encodeURI(this.$route.query.title)}&limit=${this.$route.query.limit}`)
      }

      this.ACTION_GAME_START(params)
      this.isNow++
    }
  }
}
</script>

<style lang="scss"></style>
