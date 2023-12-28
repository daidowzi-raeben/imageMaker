<template>
    <div class="wrap">
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
            title: '로그인'
        }
    },
    computed: {
        ...mapState(['IMAGE_LIST', 'IS_LOADING','USER']),
    },
    watch: {
        'USER.user_id': {
            handler(value) {
                if (value) {
                    return this.$router.push('/')
                }
            }
        }
    },
    created() {
    },
    mounted() {
        this.$nextTick(() => {
          const params = {
                access_token: location.href.split('access_token=')[1].split('&token_type')[0]
            }
            this.ACTION_GOOGLE_AUTH(params)
      })
        //  await axios.get(
        //     `/oauth2/v1/userinfo?access_token=${accessToken}`
        // );
    },
    unmounted() {
        // document.removeEventListener('scroll', this.handlerScrollEvents);
    },
    methods: {
        ...mapMutations(['MUTATIONS_IS_LOADING']),
        ...mapActions(['ACTION_GOOGLE_AUTH']),

    }
}
</script>

<style lang="scss"></style>
