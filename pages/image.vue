<template>
    <div class="wrap">
        <div>
            기본 키워드 설정 (미리 설정하는 카테고리 등)
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="Please input"
                v-model="txtDefault">
            </el-input>
        </div>
        <div>
            <el-select v-model="paramData.sampler" placeholder="Select">
                <el-option v-for="item in options.sampler" :key="item" :label="item" :value="item">
                </el-option>
            </el-select>
            <el-select v-model="paramData.style_preset" placeholder="Select">
                <el-option v-for="item in options.style_preset" :key="item" :label="item" :value="item">
                </el-option>
            </el-select>
            <el-select v-model="paramData.hd" placeholder="Select">
                <el-option v-for="item in options.hd" :key="item" :label="item" :value="item">
                </el-option>
            </el-select>
        </div>
        <div>

            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 6 }" placeholder="Please input" v-model="txt">
            </el-input>
        </div>
        <div>

            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 6 }" placeholder="제외키워드" v-model="textNot">
            </el-input>
        </div>
        <div>
            <div>내용의 엄격도 0 ~ 35</div>
            <el-input placeholder="Please input" v-model="cfg_scale"></el-input>
        </div>
        <div>
            <div>seed</div>
            <el-input placeholder="Please input" v-model="seed"></el-input>
        </div>
        <div>
            <div>steps</div>
            <el-input placeholder="Please input" v-model="steps"></el-input>
        </div>
        <div>
            <el-button type="primary" :disabled="IS_LOADING" @click="onClickImageLoad">만들기</el-button>
        </div>

        <div>
            <div v-for="(v,i) in IMAGE" :key="i">
                <img :src="onLoadImage(v?.image)" width="100%"/>
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
    layout: 'index',
    data() {
        return {
            txtDefault: 'Asian, beautiful face, young, lovely',
            txt: 'A pure looking woman with long brown hair and a white tight short-sleeved shirt',
            textNot: 'multi arms,multi legs,bad arm anatomy,bad leg anatomy,bad hand anatomy,bad finger anatomy, bad detailed background,unclear architectural outline,non-linear background,lowres, worst quality, low quality, blurry',
            openai: null,
            cfg_scale: 7,
            seed:0,
            steps:30,
            paramData: {
                sampler: 'DDIM',
                style_preset: '3d-model',
                hd:'1024x1024'
            },
            options: {
                sampler: [
                    'DDIM',
                    'DDPM',
                    'K_DPMPP_2M',
                    'K_DPMPP_2S_ANCESTRAL',
                    'K_DPM_2',
                    'K_DPM_2_ANCESTRAL',
                    'K_EULER',
                    'K_EULER_ANCESTRAL',
                    'K_HEUN',
                    'K_LMS',],
                style_preset: [
                    '3d-model',
                    'analog-film',
                    'anime',
                    'cinematic',
                    'comic-book',
                    'digital-art',
                    'enhance',
                    'fantasy-art',
                    'isometric',
                    'line-art',
                    'low-poly',
                    'modeling-compound',
                    'neon-punk',
                    'origami',
                    'photographic',
                    'pixel-art',
                    'tile-texture'
                ],
                hd: [
                     "1024x1024",
                     "1152x896",
                     "1216x832",
                     "1344x768",
                     "1536x640",
                     "640x1536",
                     "768x1344",
                     "832x1216",
                     "896x1152",
                ]

            }
        }
    },
    head() {
        return {
            title: '퀴즈'
        }
    },
    computed: {
        ...mapState(['IMAGE','IS_LOADING']),
    },
    created() {


    },
    mounted() {
        this.ACTION_IMAGE_BOT()
        // console.log(openai)
    },
    unmounted() {
        // document.removeEventListener('scroll', this.handlerScrollEvents);
    },
    methods: {
        ...mapMutations(['MUTATIONS_IS_LOADING']),
        ...mapActions(['ACTION_IMAGE_BOT']),
        onClickImageLoad() {
            this.MUTATIONS_IS_LOADING(true)
            const parmas = {
                sampler : this.paramData.sampler,
                style_preset: this.paramData.style_preset,
                hd: this.paramData.hd,
                text: this.txt,
                txtDefault: this.txtDefault,
                cfg_scale: this.cfg_scale,
                mode: 'maker',
                seed: this.seed,
                steps: this.steps,
                textNot: this.textNot,
                timestamp: Date.now()
                
            }
            this.ACTION_IMAGE_BOT(parmas)
        },
        onLoadImage(v) {
            return process.env.VUE_APP_API.replace('/chatGpt.php','') + v.replace('./', '/')
        }

    }
}
</script>

<style lang="scss"></style>
