<template>
    <div>
        <navigation-vue />
        <div class="container">
            <router-view />
        </div>
    </div>
</template>

<script>
import NavigationVue from './components/layout/Navigation.vue';

export default {
    components: { NavigationVue },
    setup() {
        return {};
    },
};
</script>

<style scoped></style>

