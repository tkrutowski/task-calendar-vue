import Vue from 'vue';
import Router from 'vue-router';
// import CalculateSalary from "@/components/hr/CalculateSalary";
import HrCalculateSalaryView from "@/views/HrCalculateSalaryView";
import AddWorkTime from "@/components/hr/AddWorkTime";
import HrMain from "@/views/HrCalculateSalaryView";
import Home from "@/views/Home";

Vue.use(Router);

const RouterVue = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/hr',
            name: 'HrMain',
            component: HrMain
        },
        {
            path: '/hr/CalculateSalary',
            name: 'CalculateSalary',
            component: HrCalculateSalaryView,
            props: true
        },
        {
            path: '/hr/WorkTime',
            name: 'AddWorkTime',
            component: AddWorkTime,
            props: true
        }
    ]
});

export default RouterVue;