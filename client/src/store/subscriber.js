import axios from 'axios';
import store from './index.js';

store.subscribe((mutation) => {
    switch (mutation.type) {
        case 'SET_TOKEN':
            if (mutation.payload) {
                axios.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${mutation.payload}`;
                localStorage.setItem('token', mutation.payload);
            } else {
                axios.defaults.headers.common['Authorization'] = null;
                localStorage.removeItem('token')
            }
            break;
    }
});