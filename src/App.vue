<template>
	<div class="page-container md-layout-row">
		<md-app>
			<md-app-toolbar class="md-primary">
				<span class="md-title">Projeto Escola</span>
			</md-app-toolbar>

			<md-app-drawer md-permanent="full">
				<md-toolbar class="md-transparent" md-elevation="0">
					Menu
				</md-toolbar>

				<md-list>
					<md-list-item to="/professores" exact
						>Professores</md-list-item
					>
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

<style lang="scss" scoped>
.md-app {
	min-height: 350px;
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
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
	transition: all 0.8s ease;
}
.slide-fade-leave-active {
	opacity: 0.2;
	transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
	transform: translateX(10px);
	opacity: 0;
}
</style>
