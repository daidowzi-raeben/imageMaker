<template>
  <div class="wrap">
    <div v-if="IS_LOADING" style="position:fixed;width:100%;height:100%;top:0;left:0;background:#000; opacity: 0.5;"></div>
    <div style="height:500px">
    <div v-for="(v,i) in CHAT.LIST" :key="i" style="margin-bottom:20px;">
    <p v-html="v?.data?.choices[0]?.message?.content"></p>
    </div>
  </div>
  
    <!-- 이름 : <input type="text" v-model="user"  style="border:1px solid #000; padding:10px;"/><br> -->
    내용 : <input type="text" v-model="chatTxt" :disabled="IS_LOADING" @change="onChangeIsLoad"  @keypress.enter="onClickChat" style="border:1px solid #000; padding:10px;"/>
    <el-button type="primary" :disabled="IS_LOADING" @click="onClickChat">Primary</el-button>
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
      chatTxt: '',
      user: ''
    }
  },
  head() {
    return {
      title: '퀴즈'
    }
  },
  computed: {
    ...mapState(['CHAT','IS_LOADING']),
  },
  created() {


  },
  mounted() {
  },
  unmounted() {
    // document.removeEventListener('scroll', this.handlerScrollEvents);
  },
  methods: {
    ...mapMutations(['MUTATIONS_IS_LOADING']),
    ...mapActions(['ACTION_CHAT_BOT']),
    onChangeIsLoad() {
      console.log('??')
    },
    onClickChat() {
      this.MUTATIONS_IS_LOADING(true)
      const params = {
        model: "gpt-3.5-turbo",
        messages: [
        ],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      }
      const list = this.CHAT.LIST
      params.messages = [
        {
          role: "system",
          content: this.chatTxt
        },
        {
          role: "user",
          content: this.user
        }
      ]
      list.forEach((v,i) => {
        params.messages.push(v?.data?.choices[0]?.message)
      });


      
      this.chatTxt = ''

      this.ACTION_CHAT_BOT(params)
    }

  }
}
</script>

<style lang="scss"></style>
