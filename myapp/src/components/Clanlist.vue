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
        <v-subheader>CLANS</v-subheader>
        
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
         <v-btn class ="color= green" text @click="joinclan(item.clanId)">JOIN !</v-btn>
         <v-btn class ="color= red" text @click="removeclan(item.clanId)">DELETE</v-btn>
         <v-btn class ="color= purple" text @click="leftclan(item.clanId)">QUIT</v-btn>

    <v-spacer> </v-spacer>
    <v-btn
            color="blue lighten-2"
            dark
            @click="open(item.clanId)"
          >
            VIEW
          </v-btn>
      



         </v-card-actions>
            </v-card>
          </v-list-item>

      </v-list>
      <v-dialog
        v-model="dialog"
        width="500"
      >

        <v-card>
          <v-card-title class="headline grey lighten-2">
            Members
          </v-card-title>

        <v-list-item
            v-for="(mem, j) in members"
            :key="j"
          >
          <v-card-text>
          {{mem.userName}}
           </v-card-text>
         </v-list-item>
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-container>
</template>

<script>
import EventService from '@/services/EventService.js';
import Store from '@/store/store.vue';
  export default {
    name: 'Clanlist',

    data: () => ({
        dialog:false,
        clanname:null,
        results:[],
        members:[],
        isinclan:false,
    }),
    created() {
    this.getAllclanData(); // NEW - cal l getEventData() when the instance is created
  },
  methods:{
     async open(id){
        await EventService._getclanmembers({clanId:id})
        .then(
            (event => {
            this.$set(this, "members", event);
            }).bind(this)
        );
        alert(JSON.stringify(this.members));
        this.dialog = true
    },
    checkloginstatus(){
        if(Store.status){
            return true;
        }else{
            alert("Please login");
            return false;
        }
    },
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
          if(!this.checkloginstatus()) return;
        if(this.clanname != null){
        await EventService._newclan({clanname:this.clanname});
        //alert("SEND "+ this.clanname);

        await this.getAllclanData();
        }else{
            alert("Enter your clan name")
        }
      },
      async removeclan(id){
        if(!this.checkloginstatus()) return;
        await EventService._removeclan({clanId:id});
        //alert("Remove "+ id);

        await this.getAllclanData();
    },
    async joinclan(id){
        if(!this.checkloginstatus()) return;
        await EventService._isinclan({userName:Store.username,clanId:id})
        .then(
            (event => {
            this.$set(this, "isinclan", event.result);
            }).bind(this)
        );
        //alert(JSON.stringify(this.isinclan));
        if(!this.isinclan){
        await EventService._joinclan({userName:Store.username,clanId:id});
        alert("JOIN SUCCEED");

        await this.getAllclanData();
        }else{
            alert("You already in");
        }
    },

  }
  }
</script>
