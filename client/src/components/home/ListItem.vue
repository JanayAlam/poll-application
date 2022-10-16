<template>
    <ul class="list-items-ul">
        <li v-for="i in items" :key="i.name" class="rounded">
            <router-link :to="{ name: 'home' }" class="p-2">
                <font-awesome-icon :icon="'fa-solid ' + i.icon" />
                <span class="ms-3">{{ i.name }}</span>
            </router-link>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'ListItem',
    props: ['items'],
    setup() {},
};
</script>

<style scoped>
.list-items-ul {
    list-style: none;
    padding: 0;
}

.list-items-ul li {
    font-size: 1.2rem;
    margin-bottom: 10px;
    padding: 5px;
}

.list-items-ul li a {
    color: #303133;
    cursor: pointer;
}

.list-items-ul li a:hover {
    color: #409eff;
    background-color: #e6f2fd;
    border-radius: 10px;
}
</style>
