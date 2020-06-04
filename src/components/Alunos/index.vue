<template>
  <div>
    <md-table md-card>
      <md-table-toolbar>
        <Title texto="Aluno" />
        <md-field>
          <label>Nome do aluno</label>
          <md-input
            v-model="nome"
            v-on:keyup.enter="addAluno()"
            placeholder="Digite o nome do aluno"
          ></md-input>
          <md-button
            class="md-primary"
            type="button"
            v-on:click.prevent="addAluno()"
            v-bind:disabled="nome.length === 0 ? true : false"
            >Adicionar</md-button
          >
        </md-field>
      </md-table-toolbar>

      <md-table-row v-if="alunos.length">
        <md-table-head md-numeric>Mat</md-table-head>
        <md-table-head>Nome</md-table-head>
        <md-table-head>Opções</md-table-head>
      </md-table-row>

      <md-table-row v-else>
        <md-table-cell>Nenhum aluno encontrado</md-table-cell>
      </md-table-row>

      <md-table-row v-for="(aluno, index) in alunos" :key="index">
        <md-table-cell md-numeric>{{ aluno.id }}</md-table-cell>
        <md-table-cell>{{ aluno.nome }}</md-table-cell>
        <md-table-cell>
          <md-button class="md-accent" @click="remover(aluno)"
            >Remover</md-button
          >
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import Title from "../_share/Title";
export default {
  components: {
    Title,
  },
  created() {
    this.$http
      .get("http://localhost:3000/alunos")
      .then((res) => res.json())
      .then((alunos) => (this.alunos = alunos));
  },
  props: {},
  data() {
    return {
      titulo: "Alunos",
      nome: "",
      alunos: [],
    };
  },
  methods: {
    remover(aluno) {
      this.$http.delete("http://localhost:3000/alunos/" + aluno.id).then(() => {
        let indice = this.alunos.indexOf(aluno);
        this.alunos.splice(indice, 1);
      });
    },
    addAluno() {
      let _aluno = {
        nome: this.nome,
      };

      this.$http
        .post("http://localhost:3000/alunos", _aluno)
        .then((res) => res.json())
        .then((aluno) => this.alunos.push(aluno));
      this.nome = "";
    },
  },
};
</script>

<style lang="scss" scoped></style>
