<template>
    <div class="row mt-2">
        <div class="col-md-3">
            <list-item />
        </div>
        <div class="col-md-9">
            <el-button type="primary" @click="modalToggle">
                <el-icon>
                    <Plus />
                </el-icon><span class="me-2">Create a new poll</span>
            </el-button>
        </div>

        <el-dialog v-model="isModalOpen" title="Create a new poll" width="40%">
            <div>
                Create poll
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="modalToggle">
                        <el-icon :size="18">
                            <Close />
                        </el-icon>
                        <span class="ms-1">Cancel</span>
                    </el-button>
                    <el-button type="primary">
                        <el-icon :size="18">
                            <Select />
                        </el-icon>
                        <span class="ms-1">Create</span>
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { Close, Plus, Select } from '@element-plus/icons-vue';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import ListItem from '../components/home/ListItem.vue';

document.title = 'Poll application';

const store = useStore();
const user = computed(() => store.getters.GET_USER);
const isAuthenticated = computed(() => store.getters.GET_IS_AUTHENTICATED);

const isModalOpen = ref(false);

const modalToggle = () => {
    isModalOpen.value = !isModalOpen.value
}
</script>

<style scoped>

</style>
