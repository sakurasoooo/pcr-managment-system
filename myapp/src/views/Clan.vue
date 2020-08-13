<template>
  <div class="clanview">
    <ClanList/>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import ClanList from '@/components/Clanlist.vue'
//import Store from '@/store/store.vue'
export default {
  name: 'CLan',
  data:()=>({
  }),
  components: {
    ClanList
  }
}
</script>
