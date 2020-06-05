<template>
  <div>
    <md-table md-card>
      <md-table-toolbar>
        <Title texto="Professores" />
        <md-field>
          <label>Nome do professor</label>
          <md-input
            v-model="nome"
            v-on:keyup.enter="addProfessor()"
            placeholder="Digite o nome do professor"
          ></md-input>
          <md-button
            class="md-primary"
            type="button"
            v-on:click.prevent="addProfessor()"
            v-bind:disabled="nome.length === 0 ? true : false"
            >Adicionar</md-button
          >
        </md-field>
      </md-table-toolbar>

      <md-table-row v-if="professores.length">
        <md-table-head md-numeric>Código</md-table-head>
        <md-table-head>Nome</md-table-head>
        <md-table-head>Alunos</md-table-head>
      </md-table-row>

      <md-table-row v-else>
        <md-table-cell>Nenhum professor encontrado</md-table-cell>
      </md-table-row>

      <md-table-row v-for="(professor, index) in professores" :key="index">
        <md-table-cell md-numeric>{{ professor.id }}</md-table-cell>
        <md-table-cell>
          <md-button to="alunos">
            {{ professor.nome }}
          </md-button>
        </md-table-cell>
        <md-table-cell>3</md-table-cell>
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
  data() {
    return {
      nome: "",
      professores: [],
    };
  },
  created() {
    this.$http
      .get("https://vuejscurso-api.herokuapp.com/professores")
      .then((res) => res.json())
      .then((professores) => (this.professores = professores));
  },
  props: {},
  methods: {
    remover(professor) {
      this.$http
        .delete(
          "https://vuejscurso-api.herokuapp.com/professores/" + professor.id
        )
        .then(() => {
          let indice = this.professores.indexOf(professor);
          this.professores.splice(indice, 1);
        });
    },
    addProfessor() {
      let _professor = {
        nome: this.nome,
      };

      this.$http
        .post("https://vuejscurso-api.herokuapp.com/professores", _professor)
        .then((res) => res.json())
        .then((professor) => this.professores.push(professor));
      this.nome = "";
    },
  },
};
</script>

<style></style>
