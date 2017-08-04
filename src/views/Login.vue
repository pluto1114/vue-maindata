<template>
  <div class=" login">
    
    
    
    <div class="container container-login">
      <div class="text-center col-md-4 col-sm-offset-4">
        <!-- errors -->
        <div v-if=response  class="text-danger">
          <p>{{response}}</p>
        </div>
  
        <!-- login form -->
        <form class="ui form loginForm" @submit.prevent="checkCreds">
  
          <div class="input-group">
            <span class="input-group-addon">
              <i class="fa fa-envelope"></i>
            </span>
            <input class="form-control" name="username" placeholder="用户名" type="text" v-model="username">
          </div>
  
          <div class="input-group">
            <span class="input-group-addon">
              <i class="fa fa-lock"></i>
            </span>
            <input class="form-control" name="password" placeholder="密码" type="password" v-model="password">
          </div>
          <button type="submit" v-bind:class="'btn btn-primary btn-lg ' + loading">登 录</button>
        </form>
      </div>
    </div>
    
     
    
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: function (router) {
    return {
      section: 'Login',
      loading: '',
      username: '',
      password: '',
      response: ''
    }
  },
  methods: {
    checkCreds: function () {
      //  Change submit button
      var self = this



      //  Login
      this.$store.dispatch("login", { username: this.username, password: this.password }).then((resp) => {
        var data = resp.body.itemMap


        if (resp.body.errCode == '001') {
          this.response="password error"
        } else {
          //  success. Let's load up the dashboard
          console.log(data.token)
          // document.cookie="token="+data.token

          if (window.localStorage) {
            // window.localStorage.setItem('user', JSON.stringify(data.user))
            window.localStorage.setItem('token', data.token)
          }

          this.$router.push("/")
        }

      })
    },
    toggleLoading: function () {
      this.loading = (this.loading === '') ? 'loading' : ''
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  background: url('/static/img/login_bg.jpg');
  background-size:auto 100%;
  background-position: center 0;
  background-repeat: no-repeat;
  min-height:1000px;
  margin:0 auto;
  
}

.container-login {
  // margin-top:16em;
  padding-top: 24em;
}

.vertical-center-row {
  display: table-cell;
  vertical-align: middle;
}

.loginForm .input-group {
  padding-bottom: 1em;
  height: 4em;
}

.input-group input {
  height: 4em;
}

header,footer{
  text-align: center;
  position: relative;
}
header{
  top:180px;
  font-size: 22px;
  font-weight: bold;
}
footer{
  top: 440px;
  font-size: 16px;
  color: white;
  left:-400px;
}
</style>
