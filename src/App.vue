<template>
  <div class="page-container md-layout-column">
    <md-toolbar class="md-primary">
      <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">Projeto Escola</span>

      <div class="md-toolbar-section-end">
        <md-button @click="showSidepanel = true">Eu</md-button>
      </div>
    </md-toolbar>
    <md-drawer :md-active.sync="showNavigation" md-swipeable>
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Projeto Escola</span>
      </md-toolbar>

      <md-list>
        <md-list-item>
          <span class="md-list-item-text">Professores</span>
          <md-button class="md-icon-button md-list-action" to="/professores">
            <md-icon class="md-primary">move_to_inbox</md-icon>
          </md-button>
        </md-list-item>

        <md-list-item>
          <span class="md-list-item-text">Alunos</span>
          <md-button class="md-icon-button md-list-action" to="/alunos">
            <md-icon class="md-primary">move_to_inbox</md-icon>
          </md-button>
        </md-list-item>
        <md-list-item>
          <span class="md-list-item-text">Sobre</span>
          <md-button class="md-icon-button md-list-action" to="/sobre">
            <md-icon class="md-primary">move_to_inbox</md-icon>
          </md-button>
        </md-list-item>
      </md-list>
    </md-drawer>

    <md-drawer class="md-right" :md-active.sync="showSidepanel">
      <md-app-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Social</span>
      </md-app-toolbar>

      <md-list>
        <md-list-item>
          <span class="md-list-item-text">Github</span>

          <md-button
            class="md-icon-button md-list-action"
            href="//github.com/victorjoao97"
            target="blank"
          >
            <md-icon class="md-primary">emoji_food_beverage</md-icon>
          </md-button>
        </md-list-item>

        <md-list-item>
          <span class="md-list-item-text">Portfólio</span>

          <md-button
            class="md-icon-button md-list-action"
            href="//victorjoao97.github.io"
            target="blank"
          >
            <md-icon class="md-primary">public</md-icon>
          </md-button>
        </md-list-item>
      </md-list>
    </md-drawer>
    <md-content>
      <router-view></router-view>
    </md-content>
  </div>
</template>

<script>
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
export default {
  name: "App",
  data: () => ({
    showNavigation: false,
    showSidepanel: false,
  }),
  watch: {
    $route() {
      this.showNavigation = false;
    },
  },
};
</script>

<style scoped>
.page-container {
  min-height: 300px;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(#000, 0.12);
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}

.md-content {
  padding: 16px;
}
</style>
