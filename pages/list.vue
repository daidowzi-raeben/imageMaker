<template>
    <div class="wrap">
        <table >
            <tr v-for="(v, i) in IMAGE_LIST" :key="i">
                <td>
                    <img :src="onLoadImage(v?.image)" width="300"/>
                </td>
                <td>{{ v.sampler }}</td>
                <td>{{ v.style_preset }}</td>
            </tr>
        </table>
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
        }
    },
    head() {
        return {
            title: '퀴즈'
        }
    },
    computed: {
        ...mapState(['IMAGE_LIST', 'IS_LOADING']),
    },
    created() {


    },
    mounted() {
        this.ACTION_IMAGE_BOT_LIST()
        // console.log(openai)
    },
    unmounted() {
        // document.removeEventListener('scroll', this.handlerScrollEvents);
    },
    methods: {
        ...mapMutations(['MUTATIONS_IS_LOADING']),
        ...mapActions(['ACTION_IMAGE_BOT_LIST']),
         onLoadImage(v) {
            return process.env.VUE_APP_API.replace('/chatGpt.php', '') + v.replace('./', '/')
        }

    }
}
</script>

<style lang="scss"></style>
