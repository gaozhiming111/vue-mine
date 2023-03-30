import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../components/login.vue';
import Home from '../pages/home.vue';
import About from '../pages/about.vue';
import Index from '../pages/index.vue';
import Category from '../pages/meal/category.vue';
import Meals from '../pages/meal/meals.vue';
import ShowMeal from '../pages/meal/showMeal.vue';

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/index',
                name: 'Index',
                component: Index
            },{
                path: '/about',
                name: 'About',
                component: About
            },{
                path: '/category',
                name: 'Category',
                component: Category
            },{
                path: '/meals',
                name: 'Meals',
                component: Meals
            },{
                path: '/showMeal',
                name: 'ShowMeal',
                component: ShowMeal
            }
        ]
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// router.beforeEach(async (to, from, next) => { 
//     let user = 'gzm';
//     if (user) {
//         next();
//     } else { 

//     }
   
// });

// router.afterEach(() => { 
   
// });

export default router;