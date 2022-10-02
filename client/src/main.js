import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createApp } from 'vue';
import App from './App.vue';
import './main.css';

import router from './router';
import store from './store';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

axios.defaults.baseURL = 'http://localhost:8080/api/v1';

import './store/subscriber.js';

library.add(fas);

store
    .dispatch('attempt', localStorage.getItem('token'))
    .then(() => {
        createApp(App)
            .component('font-awesome-icon', FontAwesomeIcon)
            .use(store)
            .use(router)
            .use(ElementPlus)
            .mount('#app');
    })
    .catch((err) => console.log(err));

