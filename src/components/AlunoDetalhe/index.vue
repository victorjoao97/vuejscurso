<template>
    <div>
        <div v-if="!load">
            <md-toolbar :md-elevation="1">
                <span class="md-title" style="flex: 1">Aluno</span>
                <md-button @click="$router.back()">Voltar</md-button>
                <md-switch v-model="editarDados">
                    {{ !editarDados ? "Editar" : "Salvar" }} Campos
                </md-switch>
            </md-toolbar>

            <md-list>
                <md-subheader class="md-primary">Dados do aluno</md-subheader>

                <md-list-item>
                    <md-field>
                        <label>Nome</label>
                        <md-input
                            v-model="aluno.nome"
                            :readonly="!editarDados"
                        ></md-input>
                    </md-field>
                </md-list-item>
                <md-list-item>
                    <md-field>
                        <label>Sobrenome</label>
                        <md-input
                            v-model="aluno.sobrenome"
                            :readonly="!editarDados"
                        ></md-input>
                    </md-field>
                </md-list-item>
                <md-list-item>
                    <md-field>
                        <label>Data de Nascimento</label>
                        <md-input
                            v-model="aluno.dataNasc"
                            :readonly="!editarDados"
                        ></md-input>
                    </md-field>
                </md-list-item>

                <md-divider></md-divider>
                <md-subheader class="md-primary"
                    >Dados do professor</md-subheader
                >

                <md-list-item>
                    <md-field>
                        <label for="professor">Professor</label>
                        <md-select
                            v-model="aluno.professor.id"
                            name="professor"
                            id="professor"
                            placeholder="Selecione um professor"
                            :disabled="!editarDados"
                        >
                            <md-option
                                v-for="(professor, index) in professores"
                                :key="index"
                                v-bind:value="professor.id"
                                >{{ professor.nome }}</md-option
                            >
                        </md-select>
                    </md-field>
                </md-list-item>
            </md-list>
            <md-button
                @click="salvarCamposBtn()"
                class="md-raised md-primary"
                v-show="editarDados"
                >Salvar</md-button
            >
            <md-button
                @click="cancelarCampos()"
                class="md-raised"
                v-show="editarDados"
                >Cancelar</md-button
            >
        </div>
        <md-progress-bar v-else md-mode="indeterminate"></md-progress-bar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            aluno: { id: this.$route.params.alunoId, nome: "", professor: {} },
            professor: {},
            editarDados: false,
            professores: [],
            load: true
        };
    },
    created() {
        this.$http
            .get("aluno/" + this.aluno.id)
            .then(res => res.json())
            .then(aluno => {
                this.aluno = aluno;
                this.onLoad();
            });

        this.$http
            .get("professor")
            .then(res => res.json())
            .then(professores => {
                this.professores = professores;
            });
    },
    methods: {
        habilitaCampos() {
            this.cancelarCampos();
        },
        salvarCampos() {
            this.$http
                .put("aluno/" + this.aluno.id, this.aluno)
                .then(res => res.json())
                .then(aluno => (this.aluno = aluno));
        },
        salvarCamposBtn() {
            this.salvarCampos();
            this.cancelarCampos();
        },
        cancelarCampos() {
            this.editarDados = !this.editarDados;
        },
        onLoad() {
            this.load = !this.load;
        }
    },
    watch: {
        editarDados() {
            if (!this.editarDados) {
                this.salvarCampos();
            }
        }
    }
};
</script>

<style scoped></style>
