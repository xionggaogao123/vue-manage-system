<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: 'dashboard',
                        title: '系统公告栏'
                    },
                    {
                        icon: 'el-icon-tickets',
                        index: 'table',
                        title: '出借人信息登记中心',
                        subs: [
                            {
                                index: 'investList',
                                title: '我的出借记录'
                            },
                            {
                                index: 'platformList',
                                title: '出借人合同统计'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-date',
                        index: 'table2',
                        title: '还款人信息中心',
                        subs: [
                            {
                                index: 'friendList',
                                title: '真实借款人信息统计'
                            }, {
                                index: 'friendList',
                                title: '资金链路'
                            }
                        ]
                    }, {
                        icon: 'el-icon-date',
                        index: 'table2',
                        title: '数据统计',
                        subs: [
                            {
                                index: 'friendList',
                                title: '真实借款人信息统计'
                            }, {
                                index: 'friendList',
                                title: '资金链路'
                            }
                        ]
                    }, {
                        icon: 'el-icon-date',
                        index: 'table2',
                        title: '数据分析',
                        subs: [
                            {
                                index: 'friendList',
                                title: '假标项目'
                            }, {
                                index: 'friendList',
                                title: '真实项目'
                            }
                        ]
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
