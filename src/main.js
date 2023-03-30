import { createApp } from 'vue'
import Element3 from 'element3';
import 'element3/lib/theme-chalk/index.css';
import App from './App.vue'

import Router from './router/index';
import Store from './store/index';
import Axios from './api/http';
createApp(App)
    .use(Store)
    .use(Router)
    .use(Element3)
    .use(Axios)
    .mount('#app')
