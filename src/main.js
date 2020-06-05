import Vue from "vue";
import App from "./App.vue";
import VueMaterial from "vue-material";
import router from "./router";
import VueResource from "vue-resource";

import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default-dark.css";

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(VueMaterial);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
