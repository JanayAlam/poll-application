<template>
    <div>
        <div>Explore more</div>
        <el-divider class="my-3 mb-2" />
        <div v-for="item in items" :key="item.name" class="rounded list-item">
            <router-link :to="{ name: item.toComponent }" class="p-2 pe-4">
                <font-awesome-icon :icon="'fa-solid ' + item.icon" />
                <span class="ms-3">{{ item.name }}</span>
            </router-link>
        </div>
    </div>
</template>

<script setup>
const items = [
    {
        name: 'Your polls',
        toComponent: 'home',
        icon: 'fa-bars-progress',
        isAuthNeeded: true,
    },
    {
        name: 'Trending',
        toComponent: 'home',
        icon: 'fa-fire',
        isAuthNeeded: false,
    },
    {
        name: 'Bookmarked',
        toComponent: 'home',
        icon: 'fa-bookmark',
        isAuthNeeded: true,
    },
];
</script>

<style scoped>
.list-item {
    font-size: 1.2rem;
    margin-bottom: 10px;
    padding: 5px 0;
}

.list-item a {
    color: #303133;
    cursor: pointer;
    user-select: none;
}

.list-item a:hover {
    color: #409eff;
    background-color: #e6f2fd;
    border-radius: 10px;
}
</style>
