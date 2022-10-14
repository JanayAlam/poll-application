<template>
    <el-affix>
        <nav
            class="navbar navbar-expand-lg navbar-light bg-light navigation-bar"
        >
            <div class="container">
                <router-link
                    :to="{ name: 'home' }"
                    class="align-self-center text-dark navbar-brand py-3"
                >
                    Janay Poll
                </router-link>
                <div v-if="isAuthenticated && user.username">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <div
                                class="d-flex justify-content-center align-items-center"
                            >
                                <el-avatar
                                    :size="30"
                                    :src="profilePhoto"
                                    class="me-2"
                                    type="primary"
                                />
                                <div>
                                    {{ user.username }}
                                    <el-icon class="el-icon--right">
                                        <arrow-down />
                                    </el-icon>
                                </div>
                            </div>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>
                                    <el-icon :size="iconSize">
                                        <User />
                                    </el-icon>
                                    View Profile
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <el-icon :size="iconSize">
                                        <Setting />
                                    </el-icon>
                                    Account Settings
                                </el-dropdown-item>
                                <el-dropdown-item
                                    divided
                                    @click="logoutHandler"
                                >
                                    <el-icon :size="iconSize">
                                        <SwitchButton />
                                    </el-icon>
                                    Logout
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
                <div v-else>
                    <router-link
                        :to="{ name: 'login' }"
                        tag="button"
                        class="me-2"
                    >
                        <el-button
                            type="primary"
                            :text="!isLoginPage"
                            :bg="!isLoginPage"
                        >
                            <el-icon :size="iconSize">
                                <Key />
                            </el-icon>
                            <span class="ms-1">Login</span>
                        </el-button>
                    </router-link>
                    <router-link :to="{ name: 'register' }" tag="button">
                        <el-button
                            type="primary"
                            :text="isLoginPage"
                            :bg="isLoginPage"
                        >
                            <el-icon :size="iconSize">
                                <Plus />
                            </el-icon>
                            <span class="ms-1">Sign up</span>
                        </el-button>
                    </router-link>
                </div>
            </div>
        </nav>
    </el-affix>
</template>

<script setup>
// https://stackoverflow.com/questions/48306392/can-a-navmenu-be-responsive-in-element-ui
import {
    ArrowDown,
    Key,
    Plus,
    Setting,
    SwitchButton,
    User,
} from '@element-plus/icons-vue';
import { ElNotification } from 'element-plus';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const router = useRouter();
const store = useStore();

const iconSize = 18;
const isAuthenticated = computed(() => store.getters.GET_IS_AUTHENTICATED);

const isLoginPage = computed(() => {
    return route.name === 'login' ? true : false;
});

const user = computed(() => store.getters.GET_USER);
const profilePhoto = computed(
    () => store.getters.GET_USER.profile.profilePhoto
);

const logoutHandler = () => {
    try {
        store.dispatch('logout');
        router.push({ name: 'login' });
        ElNotification.success({
            title: 'Logged out',
            message: 'Successfully logged out from the session',
        });
    } catch (error) {
        ElNotification.error({
            title: 'Could not log out',
            message: error.message,
        });
    }
};
</script>

<style scoped>
.navigation-bar {
    border-bottom: 1px solid rgb(209, 209, 209);
}
</style>
