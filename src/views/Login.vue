<template>
  <div id="login">
    <el-col :span="10" :offset="7">
      <el-form :model="form" status-icon :rules="rules"  label-width="100px">
        <el-form-item label="Username" prop="email">
          <el-input type="text" v-model="form.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" type="success" plain @click="submitForm()">提交</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'login',
  methods: {
    async submitForm () {
      this.loading = true
      try {
        await axios.post('/login', this.form)
        this.$router.push('/push')
        this.loading = false
      } catch (err) {
        this.loading = false
      }
    }
  },
  data () {
    let usernameCk = (rule, value, callback) => {
      setTimeout(() => {
        if (!value) callback(new Error('请输入用户名'))
        callback()
      }, 500)
    }
    let passwordCk = (rule, value, callback) => {
      setTimeout(() => {
        if (!value) callback(new Error('请输入密码'))
        callback()
      }, 500)
    }
    return {
      loading: false,
      form: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          {
            validator: usernameCk,
            trigger: 'blur'
          }
        ],
        password: [
          {
            validator: passwordCk,
            trigger: 'blur'
          }
        ]
      }
    }
  }
}
</script>

<style>

</style>
