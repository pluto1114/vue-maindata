<template>
  <div class="container container-table">
      <div class="row vertical-10p">
        <div class="container">
          <div class="text-center col-md-4 col-sm-offset-4">
            <!-- errors -->
            <div v-if=response class="text-red"><p>{{response}}</p></div>

            <!-- login form -->
            <form class="ui form loginForm"  @submit.prevent="checkCreds">

              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                <input class="form-control" name="username" placeholder="Username" type="text" v-model="username">
              </div>

              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                <input class="form-control" name="password" placeholder="Password" type="password" v-model="password">
              </div>
              <button type="submit" v-bind:class="'btn btn-primary btn-lg ' + loading">Submit</button>
            </form>
          </div>
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
      this.$store.dispatch("login",{ username: this.username, password: this.password }).then((resp)=>{ 
        var data=resp.body.itemMap

        
        if (resp.body.errCode=='001') {
          alert("password error")
        } else {
          //  success. Let's load up the dashboard
          console.log(data.token)
          document.cookie="token="+data.token

          // if (window.localStorage) {
          //   window.localStorage.setItem('user', JSON.stringify(data.user))
          //   window.localStorage.setItem('token', data.token) 
          // }

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

<style>

.container-table {
    display: table;
    color: white;
}
.vertical-center-row {
    display: table-cell;
    vertical-align: middle;
}
.vertical-20p {
  padding-top: 20%;
}
.vertical-10p {
  padding-top: 10%;
}
.logo {
  width: 15em;
  padding: 3em;
}
.loginForm .input-group {
  padding-bottom: 1em;
  height: 4em;
}
.input-group input {
  height: 4em;
}
</style>
