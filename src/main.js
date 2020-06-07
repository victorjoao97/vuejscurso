import Vue from "vue";
import App from "./App.vue";
import VueMaterial from "vue-material";
import router from "./router";
import VueResource from "vue-resource";
import titleMixin from "./titleMixin";

import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

Vue.config.productionTip = false;

Vue.use(VueResource);
Vue.use(VueMaterial);

Vue.mixin(titleMixin);
router.beforeEach((to, from, next) => {
	document.title = to.name + " - Projeto Escola";
	next();
});

Vue.http.options.root = "https://vuejscurso-api.herokuapp.com/";

new Vue({
	router,
	render: h => h(App)
}).$mount("#app");
