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
        <!-- <div>
            <div>steps</div>
            <el-input placeholder="Please input" v-model="steps"></el-input>
        </div> -->
        <div>
            <el-button type="primary" :disabled="IS_LOADING" @click="onClickImageLoad">만들기</el-button>
        </div>

        <div >
            <div v-for="(v, i) in IMAGE" :key="i">
                <div v-if="IMAGE_LOADING_QUAL" :style="`width:${paramData.width}px; height:${paramData.height}px;position:absolute;background:#000;opacity:0.7;z-index:2`"></div>
                <img :src="onLoadImage(v?.image_thum)" />
            </div>
            <div v-if="IMAGE && IMAGE.length > 0 && IMAGE[0]?.isQual === 'N'">
                <el-button type="primary" :disabled="IMAGE_LOADING_QUAL" @click="onClickImageLoadQuality(IMAGE[0]?.timestamp)">해상도 보정</el-button>
            </div>
            <div v-if="IMAGE && IMAGE.length > 0 && IMAGE[0]?.isQual === 'Y'">
                <!-- 보정할 프롬퍼티
                 <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="Please input"
                    v-model="textQual">
                </el-input> -->
                <el-button type="primary" :disabled="IMAGE_LOADING_QUAL" @click="onClickImageLoadStep(IMAGE[0]?.timestamp)">퀄리티 보정</el-button>
            </div>
        </div>
        <div v-if="IMAGE_LOADING">
            <el-skeleton :loading="loading" animated>
                <template slot="template">
                    <el-skeleton-item variant="image" :style="`width:${paramData.width}px; height:${paramData.height}px`" />
                </template>
            </el-skeleton>
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
            loading: true,
            txtDefault: 'Asian, beautiful face, young, lovely',
            txt: 'A pure looking woman with long brown hair and a white tight short-sleeved shirt',
            textNot: '',
            textQual: '',
            openai: null,
            cfg_scale: 7,
            seed: 0,
            steps: 10,
            paramData: {
                sampler: 'DDIM',
                style_preset: 'anime',
                hd: '1024x1024',
                width: '512',
                height: '512',
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
                    'anime',
                    '3d-model',
                    'analog-film',
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
        ...mapState(['IMAGE', 'IS_LOADING', 'IMAGE_LOADING','IMAGE_LOADING_QUAL']),
    },
    created() {


    },
    mounted() {
        this.ACTION_IMAGE_BOT()
        this.onLoadMotion()
        // console.log(openai)
    },
    unmounted() {
        // document.removeEventListener('scroll', this.handlerScrollEvents);
    },
    methods: {
        ...mapMutations(['MUTATIONS_IS_LOADING','MUTATIONS_IMAGE_QUAL',]),
        ...mapActions(['ACTION_IMAGE_BOT','ACTION_IMAGE_QUALITY','ACTION_IMAGE_QUALITY_STEP']),
        onClickImageLoadQuality(v, m) {
            const parmas = {
                mode: 'quality',
                timestamp: v
            }
            this.MUTATIONS_IS_LOADING(true)
            this.MUTATIONS_IMAGE_QUAL(true)
            this.ACTION_IMAGE_QUALITY(parmas)
        },
        onClickImageLoadStep(v, m) {
            const parmas = {
                mode: 'step',
                timestamp: v,
                stepType: '50',
            }
            this.MUTATIONS_IS_LOADING(true)
            this.MUTATIONS_IMAGE_QUAL(true)
            this.ACTION_IMAGE_QUALITY_STEP(parmas)
        },
        onClickImageLoad() {
            this.$message('이미지를 만드는 중입니다.');
            this.MUTATIONS_IS_LOADING(true)
            const parmas = {
                sampler: this.paramData.sampler,
                style_preset: this.paramData.style_preset,
                hd: this.paramData.hd,
                text: this.txt,
                txtDefault: this.txtDefault,
                cfg_scale: this.cfg_scale,
                mode: 'maker',
                seed: this.seed,
                steps: this.steps,
                textNot: this.textNot,
                user: 'raeben',
                timestamp: Date.now()

            }
            this.ACTION_IMAGE_BOT(parmas)
        },
        onLoadImage(v) {
            if (v) return process.env.VUE_APP_API.replace('/chatGpt.php', '') + v.replace('./', '/')
        },
        onLoadMotion() {
       
    }

    }
}
</script>

<style lang="scss"></style>
