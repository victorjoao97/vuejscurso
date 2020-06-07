<template>
    <div>
        <md-content>
            <md-card v-if="!load">
                <md-card-media>
                    <img :src="code.avatar_url" alt="People" />
                </md-card-media>

                <md-card-header>
                    <div class="md-title">{{ code.name }}</div>
                    <div class="md-subhead">{{ code.bio }}</div>
                </md-card-header>

                <md-card-expand>
                    <md-card-actions md-alignment="space-between">
                        <div>
                            <md-button class="md-primary" :href="code.html_url"
                                >Github</md-button
                            >
                            <md-button :href="'tel:' + code.email"
                                >Email</md-button
                            >
                        </div>
                    </md-card-actions>
                </md-card-expand>
            </md-card>
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
        </md-content>
    </div>
</template>
<script>
export default {
    data() {
        return { code: "", load: true, fail: false };
    },
    created() {
        this.$http
            .get("https://api.github.com/users/victorjoao97")
            .then(res => res.json())
            .then(res => {
                this.code = res;
                this.load = false;
            })
            .catch((this.fail = true));
    }
};
</script>

<style lang="scss" scoped>
.md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
}
</style>
