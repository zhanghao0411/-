<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: 'index',
                        title: '首页'
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '2',
                        title: '订单管理',
                        subs: [
                            {
                                index: 'unorder',
                                title: '未完成订单'
                            },
                            {
                                index: 'corder',
                                title: '已完成订单'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '3',
                        title: '库存管理',
                        subs: [
                            {
                                index: 'materials',
                                title: '原料库存'
                            },
                            {
                                index: 'inventory',
                                title: '成品库存'
                            },
                          
                        ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'bp',
                        title: '收支管理'
                    },
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style lang="scss" type="text/css">
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        ul{
            height:100%;
            text-align: left;
            background-color: #324157;
            color: #bfcbd9;
            .el-submenu__title, .el-submenu__title i, .el-menu-item{
                color: #bfcbd9;
            }
            .el-menu-item.is-active{
                color: #409EFF;
            }
            .el-menu{
                background-color: #1f2d3d;
            }
            .el-menu-item:hover,.el-submenu__title:hover{
                background-color: #48576a;
            }
            .el-menu-item:focus{
                background-color: #324157;
            }
        }
    }

</style>
