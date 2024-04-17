<template>
  <div class="warp maky">
    <!-- <div v-if="IS_LOADING" style="position:fixed;width:100%; height:100%; background:#000; opacity: 0.7; top:0; left:0; z-index:9999;"></div> -->
    <div class="maky-left">
      <div>
        <div class="block">남은 API : 1,000</div>
        <div class="block" style="margin-top: 20px">
          <span class="demonstration" :format-tooltip="formatTooltip"
            >Guidiance Scale {{ imageOptions2.scale }}</span
          >
          <el-slider
            v-model="imageOptions2.scale"
            :format-tooltip="formatTooltip"
            :max="40"
          ></el-slider>
        </div>
        <div class="block">
          <span class="demonstration"
            >Clip Skip : {{ imageOptions2.clip_skip }}</span
          >
          <el-slider
            v-model="imageOptions2.clip_skip"
            :min="1"
            :max="5"
          ></el-slider>
        </div>
        <div class="block">
          <span class="demonstration">Seed : {{ imageOptions2.seed }}</span>
          <el-slider
            v-model="imageOptions2.seed"
            :min="0"
            :max="999999"
          ></el-slider>
        </div>
        <div class="block">
          <span class="demonstration">Steps : {{ imageOptions2.step }}</span>
          <el-slider
            v-model="imageOptions2.step"
            :min="11"
            :max="50"
          ></el-slider>
        </div>
        <div class="block">
          <span class="demonstration">Width : {{ imageOptions2.width }}px</span>
          <el-slider
            v-model="imageOptions2.width"
            :step="8"
            :min="512"
            :max="1920"
          ></el-slider>
        </div>
        <div class="block">
          <span class="demonstration"
            >Height : {{ imageOptions2.height }}px</span
          >
          <el-slider
            v-model="imageOptions2.height"
            :step="8"
            :min="512"
            :max="1920"
          ></el-slider>
        </div>
        <div class="block">
          <span class="demonstration"
            >Samples : {{ imageOptions2.samples }}개</span
          >
          <el-slider
            v-model="imageOptions2.samples"
            :min="1"
            :max="3"
          ></el-slider>
        </div>
        <div class="block" style="margin-top: 20px">
          <div class="demonstration">Scheduler</div>
          <el-select
            v-model="imageOptions2.schedulerVal"
            placeholder="Select"
            style="width: 100%"
          >
            <el-option
              v-for="(v, i) in imageOptions2.scheduler"
              :key="i"
              :label="v"
              :value="v"
            >
            </el-option>
          </el-select>
        </div>
        <div class="block" style="margin-top: 20px">
          <div class="demonstration">Model ID</div>
          <el-input
            v-model="imageOptions2.model_id"
            placeholder="Please input"
          ></el-input>
        </div>
        <div class="block" style="margin-top: 20px">
          <div class="demonstration">Lora</div>
          <el-input
            v-model="imageOptions2.lora_model"
            placeholder="Please input"
          ></el-input>
        </div>
        <div class="block" style="margin-top: 20px">
          <div class="demonstration">Lora Strength</div>
          <el-input
            v-model="imageOptions2.lora_strength"
            placeholder="Please input"
          ></el-input>
        </div>
        <div class="block" style="margin-top: 20px">
          <div class="demonstration">Embeddings Model</div>
          <el-input
            v-model="imageOptions2.embeddings_model"
            placeholder="Please input"
          ></el-input>
        </div>
        <div class="block" style="margin-top: 20px">
          <div class="demonstration">Seed</div>
          <el-input
            v-model="imageOptions2.seed"
            placeholder="Please input"
          ></el-input>
        </div>

        <!-- <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="Please input"
                        v-model="txtDefault">
                    </el-input> -->
        <!-- <el-button type="primary" :disabled="IS_LOADING" @click="onClickImageLoad">만들기</el-button> -->
      </div>
    </div>

    <div class="maky-content">
      <div class="block">
        <el-switch
          v-model="imageOptions2.safety_checker"
          active-text="Safety Checker"
        >
        </el-switch>
      </div>
      <div class="block" style="margin-top: 20px">
        <div class="demonstration" style="margin-bottom: 5px">Prompt</div>
        <el-input
          v-model="imageOptions2.prompt"
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 10 }"
          placeholder="Please input"
        >
        </el-input>
      </div>
      <div class="block" style="margin-top: 20px">
        <div class="demonstration" style="margin-bottom: 5px">
          Negative Prompt
        </div>
        <el-input
          v-model="imageOptions2.negative_prompt"
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 10 }"
          placeholder="Please input"
        >
        </el-input>
        <div class="block" style="margin-top: 20px">
          <el-button
            type="success"
            style="width: 100%"
            @click="onClickMakerImageSubmit"
            >제작하기</el-button
          >
        </div>
      </div>
    </div>

    <div class="maky-history">
      <div>
        <el-button type="warning" style="width: 100%" @click="onClickReloadData"
          >Reload</el-button
        >
      </div>
      <div
        style="
          margin-top: 20px;
          height: calc(100% - 100px);
          overflow: hidden;
          overflow-y: auto;
        "
      >
        <div
          v-for="(v, i) in SD.LIST?.itemList"
          :key="i"
          style="margin-bottom: 20px"
        >
          <div v-for="(z, x) in v" :key="x" style="text-align: center">
            <!-- <h3>{{ x }}</h3> -->
            <img
              v-if="z.image_link"
              :src="onLoadImage(z.image_link)"
              width="95%"
              @click="onClickLoadImage(z.image_id)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

// import imgpath from '~/static/images/logo.svg';

// const fs = require('fs');
export default {
  name: 'MainPage',
  // layout: 'index',
  data() {
    return {}
  },
  head() {
    return {
      title: '퀴즈',
    }
  },
  computed: {
    ...mapState([
      'SD',
      'IS_LOADING',
      'IMAGE_LOADING',
      'IMAGE_LOADING_QUAL',
      'imageOptions2',
      'USER',
    ]),
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      if (!sessionStorage.getItem('loginId'))
        sessionStorage.setItem('loginId', '114340112481189890320')
      //   const id = sessionStorage.getItem('loginId')
      const id = '114340112481189890320'
      if (id) {
        const params = {
          user_id: id,
          mode: 'loginChk',
        }
        this.ACTION_LOGIN_CHECK(params)
        this.onClickReloadData()
      } else {
        this.doGoogleLogin()
      }
    })
  },
  unmounted() {
    // document.removeEventListener('scroll', this.handlerScrollEvents);
  },
  methods: {
    ...mapMutations([
      'MUTATIONS_IS_LOADING',
      'MUTATIONS_IMAGE_QUAL',
      'MUTATIONS_IMAGE_LIST',
    ]),
    ...mapActions([
      'ACTION_LOGIN_CHECK',
      'ACTION_SD_IMAGE_MAKER',
      'ACTION_SD_IMAGE_MAKER_RELOAD',
      'ACTION_SD_IMAGE_MAKER_SAVE',
    ]),
    formatTooltip(val) {
      return val / 10
    },
    onClickMakerImageSubmit() {
      const formData = new FormData()
      formData.append('mode', 'maker')
      formData.append('user_id', this.USER?.user_id)
      formData.append('seed', this.imageOptions2.seed)
      formData.append('clip_skip', this.imageOptions2.clip_skip)
      formData.append('step', this.imageOptions2.step)
      formData.append('scale', this.imageOptions2.scale)
      formData.append('width', this.imageOptions2.width)
      formData.append('height', this.imageOptions2.height)
      formData.append('samples', this.imageOptions2.samples)
      formData.append('lora_model', this.imageOptions2.lora_model)
      formData.append('lora_strength', this.imageOptions2.lora_strength)
      formData.append('prompt', this.imageOptions2.prompt)
      formData.append('negative_prompt', this.imageOptions2.negative_prompt)
      formData.append('embeddings_model', this.imageOptions2.embeddings_model)
      formData.append('model_id', this.imageOptions2.model_id)
      formData.append(
        'safety_checker',
        this.imageOptions2.safety_checker === true ? 'yes' : 'no'
      )
      formData.append('schedulerVal', this.imageOptions2.schedulerVal)
      this.MUTATIONS_IS_LOADING(true)
      this.$message('이미지를 만드는 중입니다.')
      this.ACTION_SD_IMAGE_MAKER(formData)
    },
    onClickImageSave() {
      const formData = new FormData()
      formData.append('mode', 'imageSave')
      formData.append('idx', this.SD.IMAGE?.metaData[0]?.idx)
      this.MUTATIONS_IS_LOADING(true)
      this.ACTION_SD_IMAGE_MAKER_SAVE(formData)
    },
    onClickReloadData() {
      if (!sessionStorage.getItem('loginId'))
        sessionStorage.setItem('loginId', '111218552737378409552')
      const id = sessionStorage.getItem('loginId')
        ? sessionStorage.getItem('loginId')
        : this.USER?.user_id
      const formData = new FormData()
      formData.append('mode', 'reload')
      formData.append('user_id', id)
      this.MUTATIONS_IS_LOADING(true)
      this.$message('재로드 합니다.')
      this.ACTION_SD_IMAGE_MAKER_RELOAD(formData)
    },
    onLoadImage(v) {
      if (v)
        return process.env.VUE_APP_API.replace('/chatGpt.php', '/ai/maker/') + v
    },
    onClickLoadImage(v) {
      const formData = new FormData()
      formData.append('mode', 'makerOnce')
      formData.append('image_id', v)
      this.MUTATIONS_IS_LOADING(true)
      this.$message('재로드 합니다.')
      this.ACTION_SD_IMAGE_MAKER(formData)
      //  this.$alert(`<img src="${this.onLoadImage(v)}" width=1024>`, 'HTML String', {
      //     dangerouslyUseHTMLString: true
      // });
    },
    doGoogleLogin() {
      const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=email profile&include_granted_scopes=true&state=state_parameter_passthrough_value&redirect_uri=http://localhost:9001/login&response_type=token&client_id=326804284084-no57a7j7m7ifgund1ukiut04bkhdm6q4.apps.googleusercontent.com`
      location.href = url
    },
  },
}
</script>

<style lang="scss" >
html {
  overflow-y: auto;
}
.maky {
  &-left {
    width: 100%;
    background: #354052;
    padding: 10px;
    color: #929daf;
  }

  &-content {
    width: 100%;
    height: 100%;
    background: #edf2f6;
    padding: 10px;
  }

  &-history {
    width: 100%;
    background: #354052;
    padding: 10px;
    color: #929daf;
  }
  &-header {
    margin-left: 600px;
    background: #000;
    height: 40px;
    line-height: 35px;
    padding: 0 20px;
    color: #fff;
  }
}
</style>
