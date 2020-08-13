<template>
 <div class="text-center">
<v-card class="mx-auto"
            max-width="500">
  <v-col>
  
  <v-form>
  <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors" :key= "error">{{ error }}</li>
    </ul>
  </p>
    <v-text-field 
    label = "NICKNAME"
    name = "nickname"
    type = "text"
     v-model= "nickname"
     />
     <v-text-field 
    label = "USERNAME"
    name = "username"
    type = "text"
    v-model= "username"
     />
     <v-text-field 
    label = "PASSWORD"
    name = "password"
    type = "password"
    v-model= "password"
     />
  </v-form>
  <v-row>
    <v-btn class="ma-2"
      :loading="loading"
      :disabled="loading"
      color="secondary"
      @click="register()"
    > SIGN UP </v-btn>
    <v-spacer> </v-spacer>
    <v-btn class="ma-2"
      :loading="loading1"
      :disabled="loading1"
      color="secondary"
      @click="login()"
    > LOG IN </v-btn>
  </v-row>
  </v-col>
  </v-card>
  </div>
</template>

<script>
import EventService from '@/services/EventService.js';
import Store from '@/store/store.vue';



  export default {
    name: 'Login',

    data: () => ({
        event:{},
        errors: [],
        nickname: null,
        username: null,
        password: null,
        loader: null,
        loading: false,
        loading1: false,
    }),

    methods:{

    checkForm: function (e) {
      if (this.username && this.nickname && this.password) {
        return true;
      }

      this.errors = [];

      if (!this.nickname) {
        this.errors.push('Nickname required.');
      }
      if (!this.username) {
        this.errors.push('Username required.');
      }
      if (!this.password) {
        this.errors.push('Password required.');
      }

      e.preventDefault();
    },
    async login() {
        if(this.checkForm()){
        this.loader = 'loading1';
        await EventService._login(this.username)
        .then(
            (event => {
            this.$set(this, "event", event);
            }).bind(this)
        );
        var Users = this.event;
        //alert(JSON.stringify(Users[0]));
        if(Users.length === 0){
            this.errors = [];
            this.errors.push(`Username "${this.username}" not found.`);
        }
        else if(Users[0].password!=this.password){
            this.errors = [];
            this.errors.push(`Password is incorrect.`);
        }
        else{
            //alert(Users[0].password)
            Store.status = true;
            Store.nickname = Users[0].nickName;
            //alert(Users[0].nickName)
            Store.username = Users[0].userName;
            //alert(Users[0].userName)
            this.$router.push('clan');
        }
        }
      },
      async register(){
       
        if(this.checkForm()){
        this.loader = 'loading';
        await EventService._signup({
            nickname: this.nickname,
            username: this.username,
            password: this.password
        });
        //alert("SEND ");
        Store.status = true;
        Store.nickname = this.nickname;
        Store.username = this.username;
        this.$router.push('clan');
        }
      }
    },

    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]
        setTimeout(() => (this[l] = false), 3000)
        this.loader = null
      },
    }
  }
</script>
<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
