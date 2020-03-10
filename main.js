import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAgloUZh2Rba0RBLHaO_J-A_EEIQlG3m1A",
    libraries: "places" // necessary for places input
  }
});
new Vue({
  el: '#app',
  render: h => h(App)
})
