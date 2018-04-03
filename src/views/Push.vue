<template>
  <div id="push">
    <el-container>
      <el-main>
        <el-col :span="10" :offset="7">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="Title">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="Picture">
              <el-upload
                action="/common/file/store"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :show-file-list="true"
                :file-list="fileList"
                :on-success="handleSuccess"
                list-type="picture"
                accept="image/*"
              >
               <el-button size="small" type="primary" plain>Upload</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="Content">
              <el-input type="textarea" v-model="form.content"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button  :loading="loading" type="success" plain @click="onSubmit">Push</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'push',
  data () {
    return {
      loading: false,
      form: {},
      fileList: []
    }
  },
  methods: {
    async onSubmit () {
      try {
        this.loading = true
        await axios.put('/post/add', this.form)
        this.loading = false
        this.form = {}
        this.fileList = []
        this.$message({
          message: 'Push Success!',
          type: 'success'
        })
      } catch (err) {
        this.loading = false
        console.log(err)
      }
    },
    handleSuccess (response, file, fileList) {
      this.fileList = fileList.map(file => {
        return {
          name: response.data.url,
          url: response.data.url
        }
      })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    }
  }
}
</script>

<style lang="less">
  // #push {
  //   display: flex;
  //   width: 100%;
  //   justify-content: center;
  //   .el-container {
  //     // flex-basis: 50%;
  //     width: 50%;
  //   }
  // }
</style>
