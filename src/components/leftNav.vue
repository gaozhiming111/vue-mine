<template>
    <el-menu
    :default-active="activeIndex"
    class="el-menu-vertical-demo"
    background-color="#ffffff"
    text-color="#333333"
    active-text-color="#409eff"
    @open="handleOpen"
    @close="handleClose"
    :collapse="collapse"
    @select="selectNav"
    >
    <el-row v-for="list in navs" :key="list.index">
        <!--有子级-->
        <el-submenu v-if="list.children" :index="list.index" >
            <template v-slot:title>
            <i :class="list.icon"></i>
            <span>{{list.name}}</span>
            </template>
            <el-menu-item v-for="item in list.children" :index="item.index" :key="item.index">
            <router-link :to="item.route">{{item.name}}</router-link>
            </el-menu-item>
        </el-submenu>
         <!--无子级-->
        <el-menu-item v-else :index="list.index" :route="{path: list.route}">
            <i :class="list.icon"></i>
            <template v-slot:title>
            <span><router-link :to="list.route">{{list.name}}</router-link></span>
            </template>
        </el-menu-item>
    </el-row>
    </el-menu>
</template>

<script>
import { ref, reactive } from 'vue';
import emitter from '../utils/bus';
export default {
    props: ['collapse'],//接收父级参数
    setup() {
        let navlist = []; //菜单转换列表
        let navPathlist = [];
        let activeIndex = ref('1');
        //菜单树
        const navs = reactive([
            {
                index: '1',
                name: '主页',
                icon: 'el-icon-s-home',
                route: '/index',
            },
            {
                index: '2',
                name: '餐品展示',
                icon: 'el-icon-picture',
                children: [
                    {
                        index: '2-1',
                        name: '餐品',
                        icon: 'el-icon-menu',
                        route: '/showMeal',
                    },
                    {
                        index: '2-2',
                        name: '成分',
                        icon: 'el-icon-menu',
                        route: '/category',
                    },
                    {
                        index: '2-3',
                        name: '根据国家浏览',
                        icon: 'el-icon-menu',
                        route: '/category',
                    },
                    {
                        index: '2-3',
                        name: '根据首字母浏览',
                        icon: 'el-icon-menu',
                        route: '/category',
                    }
                ]
            },
            {
                index: '3',
                name: '餐品分类',
                icon: 'el-icon-menu',
                children: [
                    {
                        index: '3-1',
                        name: '分类管理',
                        icon: 'el-icon-menu',
                        route: '/category',
                    }
                ]
            },
            {
                index: '4',
                name: '餐品管理',
                icon: 'el-icon-s-management',
                children: [
                    {
                        index: '4-1',
                        name: '餐品管理',
                        icon: 'el-icon-menu',
                        route: '/meals',
                    }
                ]
            },
            {
                index: '5',
                name: '关于',
                icon: 'el-icon-user-solid',
                route: '/about'
            },
        ]);
        emitter.emit('setCrumb',[{
            index: "1",
            name: "主页",
            icon: "el-icon-s-home",
            route: "/index"
        }]);
        //监听tag切换
        emitter.on("setnav", (val) => { 
            activeIndex.value = val.index;
        });
        //菜单展开
        function handleOpen(key, keyPath) {
            console.log(key, keyPath)
        }
        //菜单收起
        function handleClose(key, keyPath) {
            console.log(key, keyPath)
        }
        //菜单选择
        function selectNav(index, indexPath) { 
            // console.log(index, indexPath);
            navlist = [];
            navPathlist = [];
            comp(navs);
            compmi(navs);
            let nav = null;
            let navPath = [];
            navlist.forEach(item => { 
                if (item.index === index) { 
                    nav = item;
                }
            }); 
            navPathlist.forEach(item => { 
                indexPath.forEach(item2 => { 
                    if (item.index === item2) { 
                        navPath.push(item);
                    }
                });
            });
            emitter.emit('putTags',nav);
            emitter.emit('setCrumb',navPath);
        }
        //递归转换
        function comp(navs) { 
            navs.forEach(item => {
                if (item.children) { 
                    comp(item.children);
                } else {
                    navlist.push(item);
                }
            });
        }
        //递归转换
        function compmi(navs) { 
            navs.forEach(item => {
                 navPathlist.push({
                    index: item.index,
                    name: item.name,
                    icon: item.icon,
                    route: item.route
                }); 
                if (item.children) {
                    compmi(item.children);
                }
            });
        }
        return {
            navs,
            handleOpen,
            handleClose,
            selectNav,
            activeIndex
        }
    }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 239px;
    min-height: 400px;
}
.el-menu-item * {
    text-decoration: none;
}
.is-active a{
    color: #409eff;
}
</style>