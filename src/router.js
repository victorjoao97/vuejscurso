import Vue from "vue";
import Router from "vue-router";

import Alunos from "./components/Alunos";
import Professores from "./components/Professores";
import Sobre from "./components/Sobre";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/professores",
      nome: "Professores",
      component: Professores,
    },
    {
      path: "/Alunos",
      nome: "Alunos",
      component: Alunos,
    },
    {
      path: "/sobre",
      nome: "Sobre",
      component: Sobre,
    },
  ],
});
