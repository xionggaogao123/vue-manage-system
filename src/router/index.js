import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                },{
                    path: '/investList',
                    component: resolve => require(['../components/page/investList.vue'], resolve), //投资列表
                },
                {
                    path: '/platformList',
                    component: resolve => require(['../components/page/PlatformList.vue'], resolve), //平台列表
                },
                {
                    path: '/createInvest',
                    component: resolve => require(['../components/page/CreateInvest.vue'], resolve), //新建投资计划
                },{
                    path: '/createPlatform',
                    component: resolve => require(['../components/page/CreatePlatform.vue'], resolve), //新建投资计划
                },{
                    path: '/createIncome',
                    component: resolve => require(['../components/page/CreateIncome.vue'], resolve), //添加平台收益
                },{
                    path: '/updatePlatform',
                    component: resolve => require(['../components/page/PlatformEdit.vue'], resolve), //添加平台收益
                },{
                    path: '/platformData',
                    component: resolve => require(['../components/page/PlatformData.vue'], resolve), //数据
                },{
                    path: '/consumeList',
                    component: resolve => require(['../components/page/ConsumeList.vue'], resolve), //数据
                },{
                    path: '/createConsume',
                    component: resolve => require(['../components/page/CreateConsume.vue'], resolve), //新增消费
                },{
                    path: '/eachMonthConsume',
                    component: resolve => require(['../components/page/EachMonthConsumeList.vue'], resolve), //新增消费
                },{
                    path: '/friendList',
                    component: resolve => require(['../components/page/FriendList.vue'], resolve), //新增消费
                },{
                    path: '/createUser',
                    component: resolve => require(['../components/page/CreateUser.vue'], resolve), //新增联系人
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
