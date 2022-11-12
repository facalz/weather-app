import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;

router.beforeEach((to, from, next) => {
    document.title = `${to.params.state ? `${to.params.city}, ${to.params.state}` : to.meta.title} | Clima`;
    next();
});