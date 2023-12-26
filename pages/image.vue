<template>
    <div class="wrap">
        <div>
            <el-input v-model="txt" type="textarea" :autosize="{ minRows: 4, maxRows: 4 }" :disabled="IS_LOADING"
                placeholder="Please input">
            </el-input>
            <el-button type="primary" :disabled="IS_LOADING" @click="onClickImageLoad">Primary</el-button>
        </div>
        {{ IMAGE }}
        <div v-if="IMAGE?.data" style="text-align: center;">
            <img :src="IMAGE?.data?.data[0]?.url"/>
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
            txt: 'A sunlit indoor lounge area with a pool containing a flamingo',
        }
    },
    head() {
        return {
            title: '퀴즈'
        }
    },
    computed: {
        ...mapState(['IMAGE', 'IS_LOADING']),
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
        ...mapActions(['ACTION_IMAGE_BOT']),
        onChangeIsLoad() {
            console.log('??')
        },
        onClickImageLoad() {
            this.MUTATIONS_IS_LOADING(true)
            const parmas = {
                model: "dall-e-2",
                prompt: this.txt,
                n: 1,
                size: "512x512"
            }
            this.ACTION_IMAGE_BOT(parmas)
        }

    }
}
</script>

<style lang="scss"></style>
