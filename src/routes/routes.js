import Views from '@/views/index.js';

export default [
    {
        path: '/',
        name: 'home',
        component: Views.Home,
        meta: {
            title: 'Início'
        }
    },
    {
        path: '/clima/:state/:city',
        name: 'city',
        component: Views.City,
        meta: {
            title: 'Clima'
        }
    }
];