<template>
  <div id="app">
    <div class="page-container">
      <md-app>
        <md-app-content>
          <Alunos />
        </md-app-content>
      </md-app>
    </div>
  </div>
</template>

<script>
import Alunos from "./components/Alunos";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
export default {
  name: "App",
  components: {
    Alunos,
  },
};
</script>

<style></style>
