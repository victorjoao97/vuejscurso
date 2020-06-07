<template>
    <div>
        <md-table md-card v-if="!load">
            <md-table-toolbar>
                <div>
                    <Title :texto="titulo()" />
                </div>
                <md-field>
                    <label>Nome do aluno</label>
                    <md-input
                        v-model="nome"
                        v-on:keyup.enter="addAluno()"
                        placeholder="Digite o nome do aluno"
                    ></md-input>
                </md-field>
                <md-field v-if="!this.professor">
                    <label for="professores">Professores</label>
                    <md-select
                        v-model="professorId"
                        name="professores"
                        id="professores"
                        placeholder="Selecione um professor"
                    >
                        <md-option
                            v-for="(professor, index) in professores"
                            :key="index"
                            :value="professor.id"
                            >{{ professor.nome }}</md-option
                        >
                    </md-select>
                </md-field>
                <md-button
                    class="md-primary md-raised"
                    type="button"
                    v-on:click.prevent="addAluno()"
                    v-bind:disabled="enableAdd()"
                    >Adicionar</md-button
                >
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
                    <md-button
                        class="md-raised"
                        :to="'/alunoDetalhe/' + aluno.id"
                        >Ver</md-button
                    >
                    <md-button
                        class="md-raised md-accent"
                        @click="showDialogRemove(aluno)"
                        >Remover</md-button
                    >
                </md-table-cell>
            </md-table-row>
        </md-table>
        <md-progress-bar v-else md-mode="indeterminate"></md-progress-bar>
        <md-dialog-confirm
            :md-active.sync="confirmRemove.active"
            md-title="Tem certeza que deseja remover este aluno?"
            md-content="Esta operação não poderá ser desfeita!"
            md-confirm-text="Sim"
            md-cancel-text="Não"
            @md-cancel="onCancel"
            @md-confirm="onConfirm"
        />
    </div>
</template>

<script>
import Title from "../_share/Title";
export default {
    components: {
        Title
    },
    created() {
        this.$http
            .get(
                "alunos" +
                    (this.professorId
                        ? "?professor.id=" + this.professorId
                        : "")
            )
            .then(res => res.json())
            .then(alunos => {
                this.alunos = alunos;
                this.onLoad();
            });

        if (this.professorId) {
            this.carregarProfessor();
        } else {
            this.carregarProfessores();
        }
    },
    props: {},
    data() {
        return {
            nome: "",
            alunos: [],
            professorId: this.$route.params.professorId,
            professor: null,
            professores: [],
            confirmRemove: { active: false, id: null },
            professorAluno: null,
            load: true
        };
    },
    methods: {
        enableAdd() {
            if (!this.professorId) {
                return this.nome.length === 0 || !this.professorAluno
                    ? true
                    : false;
            } else {
                return this.nome.length === 0 ? true : false;
            }
        },
        showDialogRemove(id) {
            this.confirmRemove = { active: true, id };
        },
        remover(aluno) {
            this.$http.delete("alunos/" + aluno.id).then(() => {
                let indice = this.alunos.indexOf(aluno);
                this.alunos.splice(indice, 1);
            });
        },
        addAluno() {
            let _aluno = {
                nome: this.nome
            };

            _aluno.professor = this.professorAluno
                ? this.professorAluno
                : this.professor;

            this.$http
                .post("alunos", _aluno)
                .then(res => res.json())
                .then(aluno => {
                    this.alunos.push(aluno);
                    this.nome = "";
                    this.professorId = null;
                });
        },
        carregarProfessor(callback = false) {
            this.onLoad();
            this.$http
                .get("professores/" + this.professorId)
                .then(res => res.json())
                .then(professor => {
                    if (!callback) {
                        this.professor = professor;
                    } else {
                        callback(professor);
                    }
                    this.onLoad();
                });
        },
        carregarProfessores() {
            this.onLoad();
            this.$http
                .get("professores/")
                .then(res => res.json())
                .then(professores => {
                    this.professores = professores;
                    this.onLoad();
                });
        },
        titulo() {
            return this.professor
                ? "Alunos do(a) Professor: " + this.professor.nome
                : "Alunos";
        },
        alunoDetalhe(id) {
            this.$router.push("/alunoDetalhe/" + id);
        },
        onConfirm() {
            this.remover(this.confirmRemove.id);
        },
        onCancel() {
            this.value = "Disagreed";
        },
        onLoad() {
            this.load = !this.load;
        }
    },
    watch: {
        professorId() {
            if (!this.professorId) return;
            this.carregarProfessor(
                professor => (this.professorAluno = professor)
            );
        }
    }
};
</script>

<style lang="scss" scoped></style>
