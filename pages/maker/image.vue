<template>
    <div class="warp maky">
        <!-- <div v-if="IS_LOADING" style="position:fixed;width:100%; height:100%; background:#000; opacity: 0.7; top:0; left:0; z-index:9999;"></div> -->
        <div class="maky-header">
            <span v-if="SD.IMAGE && SD.IMAGE?.metaData && SD.IMAGE?.metaData.length > 0">
            model : {{ SD.IMAGE?.metaData[0]?.model_id }} /
            lora : {{ SD.IMAGE?.metaData[0]?.lora_model }} /
            lora_strength : {{ SD.IMAGE?.metaData[0]?.lora_strength }} /
            image_id : {{ SD.IMAGE?.metaData[0]?.image_id }} /
            Guidiance Scale : {{ SD.IMAGE?.metaData[0]?.guidance_scale }} 
            Scheduler : {{ SD.IMAGE?.metaData[0]?.scheduler }} 
            </span>
        </div>
        <div style="padding:20px; margin-left:600px;">
            <template v-if="SD.IMAGE && SD.IMAGE?.metaData && SD.IMAGE?.metaData.length > 0">
                <div v-for="(v, i) in SD.IMAGE?.metaData" :key="i" style="margin-bottom:20px;">

                    <template v-if="v.image_link && v.image_link.length > 0">
                        <div style="margin-bottom:10px;">
                            이미지 {{ i + 1 }}
                            <el-button type="warning" @click="onClickImageSave">SAVE</el-button>
                        </div>
                        <img :src="onLoadImage(v.image_link)"  :onerror="`this.src='https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/generations/0-11653a82-975d-4d4c-a135-f9f9940c2973.png';`" />
                    </template>
                    <template v-else>
                        <div style="margin-bottom:10px;">
                            이미지 로드 중
                            <el-button type="warning" @click="onClickReloadData">Reload</el-button>
                        </div>
                        <el-skeleton-item v-loading="IS_LOADING" variant="image"
                            :style="`width: ${imageOptions.width}px; height: ${imageOptions.height}px; border:1px solid #eee;`" />
                    </template>
                </div>
            </template>
            <template v-else>
                <div v-for="item in imageOptions.samples" :key="item" style="margin-bottom:20px;">
                    <div style="margin-bottom:10px;">
                        이미지 {{ item }}
                    </div>
                    <el-skeleton-item v-loading="IS_LOADING" variant="image"
                        :style="`width: ${imageOptions.width}px; height: ${imageOptions.height}px; border:1px solid #eee;`" />
                </div>
            </template>
        </div>
        <div class="maky-left">
            <div>

                <div class="block">
                    남은 API : 1,000
                </div>
                <div class="block" style="margin-top:20px;">
                    <span class="demonstration" :format-tooltip="formatTooltip">Guidiance Scale {{ imageOptions.scale
                    }}</span>
                    <el-slider v-model="imageOptions.scale" :format-tooltip="formatTooltip" :max="40"></el-slider>
                </div>
                <div class="block">
                    <span class="demonstration">Clip Skip : {{ imageOptions.clip_skip }}</span>
                    <el-slider v-model="imageOptions.clip_skip" :min="1" :max="5"></el-slider>
                </div>
                <div class="block">
                    <span class="demonstration">Seed : {{ imageOptions.seed }}</span>
                    <el-slider v-model="imageOptions.seed" :min="0" :max="999999"></el-slider>
                </div>
                <div class="block">
                    <span class="demonstration">Steps : {{ imageOptions.step }}</span>
                    <el-slider v-model="imageOptions.step" :min="11" :max="50"></el-slider>
                </div>
                <div class="block">
                    <span class="demonstration">Width : {{ imageOptions.width }}px</span>
                    <el-slider v-model="imageOptions.width" :step="8" :min="512" :max="1024"></el-slider>
                </div>
                <div class="block">
                    <span class="demonstration">Height : {{ imageOptions.height }}px</span>
                    <el-slider v-model="imageOptions.height" :step="8" :min="512" :max="1024"></el-slider>
                </div>
                <div class="block">
                    <span class="demonstration">Samples : {{ imageOptions.samples }}개</span>
                    <el-slider v-model="imageOptions.samples" :min="1" :max="3"></el-slider>
                </div>
                <div class="block" style="margin-top:20px;">
                    <div class="demonstration">Scheduler</div>
                    <el-select v-model="imageOptions.schedulerVal" placeholder="Select" style="width:100%;">
                        <el-option v-for="(v, i) in imageOptions.scheduler" :key="i" :label="v" :value="v">
                        </el-option>
                    </el-select>
                </div>
                <div class="block" style="margin-top:20px;">
                    <div class="demonstration">Model ID</div>
                    <el-input v-model="imageOptions.model_id" placeholder="Please input"></el-input>
                </div>
                <div class="block" style="margin-top:20px;">
                    <div class="demonstration">Lora</div>
                    <el-input v-model="imageOptions.lora_model" placeholder="Please input"></el-input>
                </div>
                <div class="block" style="margin-top:20px;">
                    <div class="demonstration">Lora Strength</div>
                    <el-input v-model="imageOptions.lora_strength" placeholder="Please input"></el-input>
                </div>
                <div class="block" style="margin-top:20px;">
                    <div class="demonstration">Embeddings Model</div>
                    <el-input v-model="imageOptions.embeddings_model" placeholder="Please input"></el-input>
                </div>
                <div class="block" style="margin-top:20px;">
                    <div class="demonstration">Seed</div>
                    <el-input v-model="imageOptions.seed" placeholder="Please input"></el-input>
                </div>


                <!-- <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="Please input"
                        v-model="txtDefault">
                    </el-input> -->
                <!-- <el-button type="primary" :disabled="IS_LOADING" @click="onClickImageLoad">만들기</el-button> -->
            </div>
        </div>
        <div class="maky-content">
            <div class="block">
                <el-switch v-model="imageOptions.safety_checker" active-text="Safety Checker">
                </el-switch>
            </div>
            <div class="block" style="margin-top:20px;">
                <div class="demonstration" style="margin-bottom:5px;">Prompt</div>
                <el-input v-model="imageOptions.prompt" type="textarea" :autosize="{ minRows: 10, maxRows: 10 }"
                    placeholder="Please input">
                </el-input>
            </div>
            <div class="block" style="margin-top:20px;">
                <div class="demonstration" style="margin-bottom:5px;">Negative Prompt</div>
                <el-input v-model="imageOptions.negative_prompt" type="textarea" :autosize="{ minRows: 10, maxRows: 10 }"
                    placeholder="Please input">
                </el-input>
                <div class="block" style="margin-top:20px;">
                    <el-button type="success" style="width:100%;" @click="onClickMakerImageSubmit">제작하기</el-button>
                </div>

            </div>
        </div>

        <div class="maky-history">
            <div>
                <el-button type="warning" style="width:100%;" @click="onClickReloadData">Reload</el-button>
            </div>
            <div style="margin-top:20px; height:calc(100% - 100px); overflow: hidden; overflow-y:auto;">
            <div v-for="(v,i) in SD.LIST?.itemList" :key="i" style="margin-bottom:20px;">
                <el-carousel :interval="5000" arrow="always">
                    <el-carousel-item v-for="(z,x) in v" :key="x">
                        <!-- <h3>{{ x }}</h3> -->
                        <img v-if="z.image_link" :src="onLoadImage(z.image_link)" width="100%" @click="onClickLoadImage(z.image_id)"/>
                    </el-carousel-item>
                </el-carousel>
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
        return {
       
        }
    },
    head() {
        return {
            title: '퀴즈'
        }
    },
    computed: {
        ...mapState(['SD', 'IS_LOADING', 'IMAGE_LOADING', 'IMAGE_LOADING_QUAL','imageOptions']),
    },
    created() {


    },
    mounted() {
        this.onClickReloadData()
    },
    unmounted() {
        // document.removeEventListener('scroll', this.handlerScrollEvents);
    },
    methods: {
        ...mapMutations(['MUTATIONS_IS_LOADING', 'MUTATIONS_IMAGE_QUAL', 'MUTATIONS_IMAGE_LIST']),
        ...mapActions(['ACTION_SD_IMAGE_MAKER','ACTION_SD_IMAGE_MAKER_RELOAD','ACTION_SD_IMAGE_MAKER_SAVE']),
        formatTooltip(val) {
            return val / 10;
        },
        onClickMakerImageSubmit() {
            const formData = new FormData();
            formData.append('mode', 'maker');
            formData.append('seed', this.imageOptions.seed);
            formData.append('clip_skip', this.imageOptions.clip_skip);
            formData.append('step', this.imageOptions.step);
            formData.append('scale', this.imageOptions.scale);
            formData.append('width', this.imageOptions.width);
            formData.append('height', this.imageOptions.height);
            formData.append('samples', this.imageOptions.samples);
            formData.append('lora_model', this.imageOptions.lora_model);
            formData.append('lora_strength', this.imageOptions.lora_strength);
            formData.append('prompt', this.imageOptions.prompt);
            formData.append('negative_prompt', this.imageOptions.negative_prompt);
            formData.append('embeddings_model', this.imageOptions.embeddings_model);
            formData.append('model_id', this.imageOptions.model_id);
            formData.append('safety_checker', this.imageOptions.safety_checker === true ? "yes" : "no");
            formData.append('schedulerVal', this.imageOptions.schedulerVal);
            this.MUTATIONS_IS_LOADING(true)
            this.$message('이미지를 만드는 중입니다.');
            this.ACTION_SD_IMAGE_MAKER(formData)
        },
        onClickImageSave() {
            const formData = new FormData();
            formData.append('mode', 'imageSave');
            formData.append('idx', this.SD.IMAGE?.metaData[0]?.idx);
            this.MUTATIONS_IS_LOADING(true)
            this.ACTION_SD_IMAGE_MAKER_SAVE(formData)
        },
        onClickReloadData() {
            const formData = new FormData();
            formData.append('mode', 'reload');
            this.MUTATIONS_IS_LOADING(true)
            this.$message('재로드 합니다.');
            this.ACTION_SD_IMAGE_MAKER_RELOAD(formData)
            
        },
        onLoadImage(v) {
            if (v) return process.env.VUE_APP_API.replace('/chatGpt.php', '/ai/maker/') + v
        },
        onClickLoadImage(v) {
            
             const formData = new FormData();
            formData.append('mode', 'makerOnce');
            formData.append('image_id', v);
            this.MUTATIONS_IS_LOADING(true)
            this.$message('재로드 합니다.');
            this.ACTION_SD_IMAGE_MAKER(formData)
            //  this.$alert(`<img src="${this.onLoadImage(v)}" width=1024>`, 'HTML String', {
            //     dangerouslyUseHTMLString: true
            // });
        }

    }
}
</script>

<style lang="scss" >
html {
    overflow-y: auto;
}
.maky {
    &-left {
        position: fixed;
        width: 300px;
        height: 100%;
        background: #354052;
        top: 0;
        left: 0;
        padding: 20px;
        color: #929daf;
    }

    &-content {
        position: fixed;
        width: 300px;
        height: 100%;
        background: #edf2f6;
        top: 0;
        left: 300px;
        padding: 20px;
    }

    &-history {
        position: fixed;
        width: 300px;
        height: 100%;
        background: #354052;
        top: 0;
        right: 0;
        padding: 10px;
        color: #929daf;
    }
    &-header {
        margin-left:600px;
        background: #000;
        height:40px;
        line-height:35px;
        padding:0 20px;
        color:#fff;

    }
}
</style>
