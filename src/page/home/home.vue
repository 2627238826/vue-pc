<template>
  <div class="home">
    <p class="demo">👏使用基于Vue.js的CSR项目模板！</p>
  </div>
</template>

<script>
import { login } from './api';
export default {
  name: 'Home',
  data() {
    return {
      loginForm: {
        telephone: '10001',
        password: '123456',
        userType: 4
      }
    };
  },
  created() {
    this.userLogin();
  },
  methods: {
    userLogin() {
      login(this.loginForm).then(res => {
        // debugger;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  .demo {
    height: 80px;
    background: pink;
    margin: 0 auto;
    line-height: 80px;
    text-align: center;
    font-size: 16px;
    color: white;
  }
}
</style>
