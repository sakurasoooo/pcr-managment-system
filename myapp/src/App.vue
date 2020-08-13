<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://redive.estertion.win/icon/skill/1002.webp"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="./assets/logo.png"
          width="100"
        />
        
      </div>
      <div id="nav">
      <v-btn >
          <router-link to="/">Home</router-link>
      </v-btn>
      <v-btn >
        <router-link to="/clan">Clan</router-link>
      </v-btn>
      <v-btn >
        <router-link to="/about">About</router-link>
      </v-btn>
      </div>
      <v-spacer></v-spacer>
      
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Github</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
    <router-view/>
    </v-main>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
<style>

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #66ccff;
}

a {  text-decoration: none;}
</style>