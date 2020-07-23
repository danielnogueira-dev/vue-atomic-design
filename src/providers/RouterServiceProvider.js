import Vue from 'vue'
import Router from 'vue-router'
import UserRoutes from "@/routes/UserRoutes";
import GradientBarsTemplate from "@/templates/GradientBarsTemplate";

Vue.use(Router)

export default new Router({
    mode: 'history',
    linkExactActiveClass: 'active',
    //scrollBehavior () {
    //  return { x: 0, y: 0 };
    //},
    routes: [
        {path: '*', component: () => import('@/pages/NotFound')},
        {
            path: '/',
            component: GradientBarsTemplate,
            children: [
                { path: '/', name: 'homepage', component: () => import('@/pages/HomePage') },
            ]
        },
        ...UserRoutes
    ]
});