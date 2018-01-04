// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import routes from './router'
import ElementUI from 'element-ui'
import 'babel-polyfill'
import axios from 'axios'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.use(VueRouter)



const router = new VueRouter({
	routes
})	
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (sessionStorage.getItem('ljwtoken')){ 

            next();
        }
        else {
            next({
                path: '/login',
               // query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})

new Vue({
	router,
}).$mount('#app')