import App from '../App'

const login = r => require.ensure([], () => r(require('../components/page/Login')), 'login')
const home = r => require.ensure([], () => r(require('../components/common/Home')), 'home')
const index = r => require.ensure([], () => r(require('../components/page/Index')), 'index')
const corder = r => require.ensure([], () => r(require('../components/page/CompletedOrder')), 'corder')
const inventory = r => require.ensure([], () => r(require('../components/page/NewInventory')), 'inventory')
const materials = r => require.ensure([], () => r(require('../components/page/Materials')), 'materials')
const unorder = r => require.ensure([], () => r(require('../components/page/UnfilledOrder')), 'unorder')
const bp = r => require.ensure([], () => r(require('../components/page/BalancPayments')), 'bp')
export default [{
    path: '/',
    component: App, 
    children: [
       {
            path: '',
            redirect: '/login'
        },
        {
            path: '/login',
            component: login
        },
        {
            path: '/index',
            meta: {
	            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
	        },
            component: home,
            children:[
	            {
	            	path: '/',
	            	component: index,
	            	meta: {
			            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
			        },
	            },
	            {
	            	path: '/corder',
	            	component: corder,
	            	meta: {
			            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
			        },
	            },
	            {
	            	path: '/unorder',
	            	component: unorder,
	            	meta: {
			            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
			        },
	            },
	            {
	            	path: '/inventory',
	            	component: inventory,
	            	meta: {
			            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
			        },
	            },
	            {
	            	path: '/materials',
	            	component: materials,
	            	meta: {
			            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
			        },
	            },
	            {
	            	path: '/bp',
	            	component: bp,
	            	meta: {
			            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
			        },
	            }
            ]
        },
    ] 
}]