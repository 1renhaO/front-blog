<template>
  <div id="post">
    <el-container
    v-loading.fullscreen.lock="loading"
    >
       <el-main>
         <el-col :span="16" :offset="4">
           <el-card v-show="content">
              <div v-html="content"></div>
           </el-card>
         </el-col>
       </el-main>
    </el-container>
    <div class="arrow arrow-left" @click="prePage">
      <i class="el-icon-arrow-left"></i>
    </div>
    <div class="arrow arrow-right" @click="nextPage">
      <i class="el-icon-arrow-right"></i>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'post',
  methods: {
    prePage () {
      this.currentId = this.preId
      this.$router.push(`/article/${this.preId}`)
    },
    nextPage () {
      this.currentId = this.nextId
      this.$router.push(`/article/${this.nextId}`)
    },
    async getBetweenId () {
      this.loading = true
      try {
        let response = await axios.get(`/post/between/${this.currentId}`)
        this.preId = response.data.data.prePostId || response.data.data.max
        this.nextId = response.data.data.nextPostId || response.data.data.min
        this.loading = false
      } catch (err) {
        this.loading = false
      }
    },
    async getPost (id) {
      this.loading = true
      try {
        let response = await axios.get(`/post/info/id/${id || this.currentId}`)
        this.title = response.data.data.title
        this.content = response.data.data.content
        this.loading = false
      } catch (err) {
        this.loading = false
      }
    }
  },
  data () {
    return {
      loading: false,
      currentId: this.$route.params.id || 1,
      nextId: 1,
      preId: 1,
      title: '',
      content: '',
      count: 1
    }
  },
  async beforeRouteUpdate (to, from, next) {
    await this.getPost()
    await this.getBetweenId()
    next()
  },
  async beforeMount () {
    await this.getPost()
    await this.getBetweenId()
  }
}
</script>

<style lang="less">
  #post {
    & > .arrow {
      position: fixed;
      top: 50%;
      transform: translateY(-50%);
      font-size: 36px;
      cursor: pointer;
      color: #eee;
      transition: all 1s;
      &:hover {
        font-size: 48px;
        color: #333;
      }
    }
    & > .arrow-left {
      left: 8%;
    }
    & > .arrow-right {
      right: 8%;
    }
  }
</style>
