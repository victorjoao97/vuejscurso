<template>
    <div>
        <md-table md-card v-if="!load">
            <md-table-toolbar>
                <Title texto="Professores" />
                <md-field>
                    <label>Nome do professor</label>
                    <md-input
                        v-model="nome"
                        v-on:keyup.enter="addProfessor()"
                        placeholder="Digite o nome do professor"
                    ></md-input>
                </md-field>
                <md-button
                    class="md-primary"
                    type="button"
                    v-on:click.prevent="addProfessor()"
                    v-bind:disabled="nome.length === 0 ? true : false"
                    >Adicionar</md-button
                >
            </md-table-toolbar>

            <md-table-row v-if="professores.length">
                <md-table-head>Código</md-table-head>
                <md-table-head>Nome</md-table-head>
                <md-table-head>Alunos</md-table-head>
            </md-table-row>

            <md-table-row v-else>
                <md-table-cell>Nenhum professor encontrado</md-table-cell>
            </md-table-row>

            <md-table-row
                v-for="(professor, index) in professores"
                :key="index"
                v-on:click="irParaAlunos(professor.id)"
                style="cursor: pointer"
            >
                <md-table-cell>{{ professor.id }}</md-table-cell>
                <md-table-cell>{{ professor.nome }}</md-table-cell>
                <md-table-cell>{{ professor.qtdAlunos }}</md-table-cell>
            </md-table-row>
        </md-table>
        <md-progress-bar
            v-else-if="!fail"
            md-mode="indeterminate"
        ></md-progress-bar>
        <md-empty-state
            v-else
            class="md-accent"
            md-icon="error"
            md-label="Sem conexão"
            md-description="Por favor, tente mais tarde."
        >
        </md-empty-state>
    </div>
</template>

<script>
import Title from "../_share/Title";
export default {
    components: {
        Title
    },
    data() {
        return {
            nome: "",
            professores: [],
            alunos: [],
            load: true,
            fail: false
        };
    },
    created() {
        this.$http
            .get("aluno")
            .then(res => res.json())
            .then(alunos => {
                this.alunos = alunos;
                this.carregarProfessores();
                this.load = false;
            })
            .catch(() => {
                this.fail = true;
            });
    },
    props: {},
    methods: {
        remover(professor) {
            this.$http.delete("professor/" + professor.id).then(() => {
                let indice = this.professores.indexOf(professor);
                this.professores.splice(indice, 1);
            });
        },
        addProfessor() {
            let _professor = {
                nome: this.nome
            };

            this.$http
                .post("professor", _professor)
                .then(res => res.json())
                .then(professor => this.professores.push(professor));
            this.nome = "";
        },
        pegarQtdAlunosPorProfessor() {
            this.professores.forEach((professor, index) => {
                professor = {
                    id: professor.id,
                    nome: professor.nome,
                    qtdAlunos: this.alunos.filter(
                        aluno => aluno.professor?.id == professor.id
                    ).length
                };
                this.professores[index] = professor;
            });
        },
        carregarProfessores() {
            this.$http
                .get("professor")
                .then(res => res.json())
                .then(professores => {
                    this.professores = professores;
                    this.pegarQtdAlunosPorProfessor();
                });
        },
        irParaAlunos(professor) {
            this.$router.push("alunos/" + professor);
        }
    }
};
</script>

<style></style>
