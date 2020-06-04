import Vue from "vue";
import App from "./App.vue";
import VueResource from "vue-resource";

import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default-dark.css";

Vue.config.productionTip = false;
Vue.use(VueMaterial);
Vue.use(VueResource);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
