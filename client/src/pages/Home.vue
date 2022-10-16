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
                    <router-link :to="{ name: 'home' }">
                        <img
                            :src="user.profile.profilePhoto"
                            alt="Profile photo"
                            height="45"
                            class="rounded-circle"
                        />
                    </router-link>
                    <div>
                        <router-link
                            :to="{ name: 'home' }"
                            class="full-name-holder"
                        >
                            {{ user.profile.firstName }}
                            {{ user.profile.lastName }}
                        </router-link>
                        <div class="text-muted create-poll-text">
                            Create a new poll
                        </div>
                    </div>
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

const sidebarItems = [
    {
        name: 'Your polls',
        toComponent: 'home',
        icon: 'fa-book',
    },
    {
        name: 'Trending',
        toComponent: 'home',
        icon: 'fa-fire',
    },
    {
        name: 'Bookmarks',
        toComponent: 'home',
        icon: 'fa-book-bookmark',
    },
];
</script>

<style scoped>
.create-poll-card {
    cursor: pointer;
    padding: 0;
}
.create-poll-card-inner {
    display: flex;
    align-items: center;
    gap: 1rem;
}
.full-name-holder {
    font-size: 1.3rem;
    color: #333;
    margin-bottom: 0;
}
.create-poll-text {
    margin-top: 0;
    font-size: 0.8rem;
}
</style>
