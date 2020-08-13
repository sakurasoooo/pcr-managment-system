<template>
  <div class="home">
  <p>WELCOME, {{nickname}} </p>
  <v-card>
   <div class="text-center">
<v-container >
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
    label = "NEW PASSWORD"
    name = "newpassword"
    type = "password"
    v-model= "newpassword"
     />
  </v-form>
  <v-row>
    <v-spacer> </v-spacer>
    <v-btn class="ma-2"
      :loading="loading"
      :disabled="loading"
      color="secondary"
      @click="update()"
    > UPDATE </v-btn>
  </v-row>
  </v-col>
  </v-container>
  </div>
  </v-card>
  </div>
  
</template>

<script>
import EventService from '@/services/EventService.js';
import Store from '@/store/store.vue';

export default {
    name: 'userview',
    data:()=>({
        errors:[],
        newpassword:null,
        username: Store.username,
        nickname: Store.nickname,
        loader: null,
        loading:false,
        event:[]
    }),

     methods:{

    checkForm: function (e) {
      if (this.nickname && this.newpassword) {
        return true;
      }

      this.errors = [];

      if (!this.nickname) {
        this.errors.push('Nickname required.');
      }
      if (!this.password) {
        this.errors.push('Password required.');
      }

      e.preventDefault();
    },

      async update(){
       
        if(this.checkForm()){
        this.loader = 'loading';
        await EventService._updateUser({
            nickname: this.nickname,
            username: this.username,
            password: this.newpassword
        });
        //alert("SEND ");
        Store.status = true;
        Store.nickname = this.nickname;
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