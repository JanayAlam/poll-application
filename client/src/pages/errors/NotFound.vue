<template>
    <div>
        <h1 class="status-code text-danger">404</h1>
        <p class="error-msg"><span class="text-danger">Ops!</span> Page not found. Please enter a valid url.</p>
    </div>
</template>

<script setup>
</script>

<style scoped>
.status-code {
    text-align: center;
    font-size: 15rem;
    font-weight: bold;
}
.error-msg {
    text-align: center;
    font-size: 1.2rem;
    color: #333;
    font-weight: 600;
}
</style>
