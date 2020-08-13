<template>
  <v-container>
  <v-card class="mx-auto"
            max-width="420"
            outlined>
        <v-card-title>Create a new clan  </v-card-title>
        <v-col cols="12" sm="6">
            <v-text-field
              v-model="clanname"
              label="Your Clan Name"
              outlined
            ></v-text-field>
            <v-btn @click="addnewclan()" text>Create</v-btn>
          </v-col>
        </v-card>
  <v-list shaped>
        <v-subheader>REPORTS</v-subheader>
        
          <v-list-item
            v-for="(item, i) in results"
            :key="i"
          >
            <v-card class="mx-auto"
            max-width="500"
            outlined>

            <v-list-item three-line>
            <v-list-item-content>
            <div class="overline mb-4">Clan Name</div>
            <v-list-item-title class="headline mb-1">{{item.clanName}}</v-list-item-title>
            <v-list-item-subtitle>This is a very looooong description</v-list-item-subtitle>
            </v-list-item-content>
  
        <v-list-item-avatar
          tile
          size="80"
          color="grey"
        >
        <v-img src="../assets/unit/icon_unit_100031.png"> </v-img>
        </v-list-item-avatar>
      </v-list-item>
            <v-card-actions>
         <v-btn class ="color= green" text>JOIN !</v-btn>
         <v-btn class ="color= red" text @click="removeclan(item.clanId)">DELETE</v-btn>
         </v-card-actions>
            </v-card>
          </v-list-item>

      </v-list>
  </v-container>
</template>

<script>
import EventService from '@/services/EventService.js';
  export default {
    name: 'Clanlist',

    data: () => ({
        clanname:null,
        results:[]
    }),
    created() {
    this.getAllclanData(); // NEW - cal l getEventData() when the instance is created
  },
  methods:{
    async getAllclanData() {
      // Use the eventService to call the getEventSingle() method
        EventService._getallclans()
        .then(
            (event => {
            this.$set(this, "results", event);
            }).bind(this)
        );
      },
      async addnewclan(){
        await EventService._newclan({clanname:this.clanname});
        //alert("SEND "+ this.clanname);

        await this.getAllclanData();
      },
      async removeclan(id){
        await EventService._removeclan({clanId:id});
        //alert("Remove "+ id);

        await this.getAllclanData();
    }

  }
  }
</script>
