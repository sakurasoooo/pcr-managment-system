import axios from "axios"

export default {
  async getEvents() {
    let res = await axios.get("http://localhost:2333/events");
    //alert(JSON.stringify(res.data));
    return res.data;
  },
  async getEventSingle(eventId) {
    let res = await axios.get("http://localhost:2333/events/" + eventId);
    return res.data;
  },

  async sendEvent(item) {
    return await axios.post('http://localhost:2333/save', item);
  },

  async _signup(item) {
    return await axios.post('http://localhost:2333/signup', item);
  },
  async _updateUser(item) {
    return await axios.post('http://localhost:2333/update/user', item);
  },
  async _login(username) {
    let res = await axios.get("http://localhost:2333/login/"+username);
    return res.data;
  },
  async _getallclans() {
    let res = await axios.get("http://localhost:2333/clanlist");
    return res.data;
  },
  async _newclan(item) {
    return await axios.post('http://localhost:2333/clan/newclan', item);
  },

  async _removeclan(item) {
    return await axios.post('http://localhost:2333/clan/removeclan', item);
  },
  async _isinclan(item){
     let res = await axios.post('http://localhost:2333/clan/isinclan', item);
     return res.data
  },

  async _joinclan(item) {
    return await axios.post('http://localhost:2333/clan/joinclan', item);
  },

  async _getclanmembers(item) {
    let res = await axios.post('http://localhost:2333/clan/clanmembers', item);
    return res.data
  },

}