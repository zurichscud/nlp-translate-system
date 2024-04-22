import VueRouter from "vue-router";
import HomeView from "@/views/HomeView.vue";
export default new VueRouter({
    routes:[
        {
            name:'home',
            path:'/',
            component:HomeView,
        },

    ]
})