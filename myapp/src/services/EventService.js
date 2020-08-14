import axios from "axios"

const url = "http://flip1.engr.oregonstate.edu:2333"

export default {
  async getEvents() {
    let res = await axios.get(url+"/events");
    //alert(JSON.stringify(res.data));
    return res.data;
  },
  async getEventSingle(eventId) {
    let res = await axios.get(url+"/events/" + eventId);
    return res.data;
  },

  async sendEvent(item) {
    return await axios.post(url+'/save', item);
  },

  async _signup(item) {
    return await axios.post(url+'/signup', item);
  },
  async _updateUser(item) {
    return await axios.post(url+'update/user', item);
  },
  async _login(username) {
    let res = await axios.get(url+"/login/"+username);
    return res.data;
  },
  async _getallclans() {
    let res = await axios.get(url+"/clanlist");
    return res.data;
  },
  async _newclan(item) {
    return await axios.post(url+'clan/newclan', item);
  },

  async _removeclan(item) {
    return await axios.post(url+'clan/removeclan', item);
  },
  async _isinclan(item){
     let res = await axios.post(url+'/clan/isinclan', item);
     return res.data
  },

  async _joinclan(item) {
    return await axios.post(url+'/clan/joinclan', item);
  },
  async _quitclan(item) {
    return await axios.post(url+'/clan/quit', item);
  },

  async _getclanmembers(item) {
    let res = await axios.post(url+'/clan/clanmembers', item);
    return res.data
  },

}