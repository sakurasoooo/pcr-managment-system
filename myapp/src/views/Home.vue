<template>
  <div class="home">
    <div v-if="status == false" ><Login/></div>
    <div v-else ><UserView/></div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import UserView from  '@/components/userinfo.vue'
import Login from  '@/components/login.vue'
import Store from '@/store/store.vue'
export default {
  name: 'Home',
  data:()=>({
    status: Store.status,
  }),
  components: {
    Login,
    UserView
  }
}
</script>
