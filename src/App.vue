<template>
    <md-content class="demo">
        <div class="page-container md-layout-row">
            <md-app>
                <md-app-toolbar class="md-primary">
                    <span class="md-title">Projeto Escola</span>
                </md-app-toolbar>

                <md-app-drawer md-permanent="card">
                    <md-toolbar class="md-transparent" md-elevation="1">
                        Menu
                    </md-toolbar>

                    <md-list>
                        <md-list-item to="/professores" exact>
                            Professores
                        </md-list-item>
                        <md-list-item to="/alunos" exact>Alunos</md-list-item>
                        <md-list-item to="/sobre" exact>Sobre</md-list-item>
                    </md-list>
                </md-app-drawer>

                <md-app-content>
                    <transition name="slide-fade">
                        <router-view :key="$route.fullPath"></router-view>
                    </transition>
                </md-app-content>
            </md-app>
        </div>
        <div class="mobile">
            <md-bottom-bar md-sync-route>
                <md-bottom-bar-item
                    to="/professores"
                    exact
                    md-label="Professores"
                    md-icon="home"
                ></md-bottom-bar-item>
                <md-bottom-bar-item
                    to="/alunos"
                    md-label="Alunos"
                    md-icon="home"
                ></md-bottom-bar-item>
                <md-bottom-bar-item
                    to="/sobre"
                    md-label="Sobre"
                    md-icon="favorite"
                ></md-bottom-bar-item>
            </md-bottom-bar>
        </div>
    </md-content>
</template>

<script>
export default {
    name: "App",
    data: () => ({
        showNavigation: false,
        showSidepanel: false
    }),
    watch: {
        $route() {
            this.showNavigation = false;
        }
    }
};
</script>
<style lang="scss">
.mobile {
    display: none !important;
}
@media (max-width: 600px) {
    .mobile {
        display: block !important;
    }
    .mobile + .mobile-none {
        display: none !important;
    }
}
</style>
<style lang="scss" scoped>
.demo {
    min-height: 86px;
    padding: 16px;
    position: relative;
    // border: 1px solid #616161;
    border-top: 0;
}
.md-bottom-bar.md-type-fixed .md-bottom-bar-item {
    max-width: 100%;
}
.md-app {
    min-height: 350px;
    margin: 0 auto;
    width: 900px;
    max-width: 100%;
    border: 1px solid rgba(#000, 0.12);
}

.md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
}
.phone-viewport {
    width: 100%;
    display: inline-flex;
    justify-content: space-around;
    align-items: flex-end;
    overflow: hidden;
    border: 1px solid rgba(#000, 0.26);
    background: rgba(#000, 0.06);
}

.slide-fade-enter-active {
    transition: all 0.8s ease;
}
.slide-fade-leave-active {
    opacity: 0.2;
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
}
</style>
