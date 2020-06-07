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
			name: "Professores",
			component: Professores
		},
		{
			path: "/alunos/:professorId?",
			name: "Alunos",
			component: Alunos
		},
		{
			path: "/sobre",
			name: "Sobre",
			component: Sobre
		},
		{
			path: "/alunoDetalhe/:alunoId",
			name: "Aluno Detalhe",
			component: () => import("./components/AlunoDetalhe")
		},
		{ path: "*", redirect: "/professores" }
	]
});
