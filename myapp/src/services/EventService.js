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
  }
}