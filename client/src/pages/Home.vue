<template>
    <div class="row mt-2">
        <div class="col-md-3">
            <list-item :items="sidebarItems" />
        </div>
        <div class="col-md-9">
            <el-card
                v-show="isAuthenticated"
                shadow="hover"
                class="create-poll-card"
            >
                <div class="create-poll-card-inner">
                    <div>asda</div>
                    <div>asdasd</div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import ListItem from '../components/home/ListItem.vue';

document.title = 'Poll application';

const store = useStore();
const user = computed(() => store.getters.GET_USER);
const isAuthenticated = computed(() => store.getters.GET_IS_AUTHENTICATED);

const sidebarItems = {
    filter: [],
    topic: [],
};
</script>

<style scoped>
.create-poll-card {
    cursor: pointer;
    border-radius: 100px;
    padding: 0;
}
.create-poll-card-inner {
    display: flex;
    gap: 1rem;
}
</style>
