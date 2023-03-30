<template>
    <el-container class="mi-container">
        <!--左侧栏-->
        <el-aside :width="isCollapse ? '65px': '240px'">
            <div class="mi-logo-box">
                <img :src="isCollapse ? logoSmall : logo" alt="logo" class="mi-logo">
            </div>
            <div class="mi-collapse" @click="collapse">
                <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
            </div> 
            <leftNav :collapse="isCollapse"/>
        </el-aside>
        <!--右侧内容区-->
        <el-container class="mi-rbox">
            <!--头部区域-->
            <el-header class="mi-header">
                <div class="mi-date">{{curtime}}</div>
                <div class="mi-topnav">
                    <topNav />
                </div>
                <div class="mi-login-info">
                    <div class="mi-avatar">
                        <el-avatar
                            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                        ></el-avatar>
                    </div>
                    <div class="mi-user">胡歌</div>
                </div>
            </el-header>
            <el-row class="mi-tags">
                <miTags /> <!--tag标签-->
            </el-row>
            <!--主页面区域-->
            <el-main class="mi-main">
                <el-row class="mi-crumb">
                    <el-card class="box-card">
                        <crumb /> <!--面包屑-->
                    </el-card>
                </el-row>
                <el-row>
                    <!--内容区域-->
                    <el-card class="box-card">
                        <router-view></router-view>
                    </el-card>
                </el-row>
            </el-main>
            <!--底部区域-->
            <el-footer>Footer</el-footer>
        </el-container>
    </el-container>
</template>
<script setup>
import { ref } from 'vue';
import formDate from '../utils/formdate';
import week from '../utils/week';
import leftNav from '../components/leftNav.vue';
import topNav from '../components/topNav.vue';
import miTags from '../components/miTags.vue';
import crumb from '../components/crumb.vue';

function miFn() { 
    let isCollapse = ref(false); //是否展开
    let logo = ref('/src/assets/element-logo.svg'); //展开logo
    let logoSmall = ref('/src/assets/element-logo-small.svg'); //收起logo
    let curtime = ref('');
    curtime.value = formDate(new Date(), 'y年m月d日') +' '+ week();
   
    //点击toggle切换
    function collapse() { 
        isCollapse.value = !isCollapse.value;
    }
    return { isCollapse, collapse, logo, curtime, logoSmall }
}

let { isCollapse, collapse, logo, logoSmall, curtime } = miFn();

</script>
<style scoped>
.mi-container {
    width: 100%;
    height: 100%;
}
.el-header,
.el-footer {
    text-align: center;
    line-height: 60px;
}
.el-footer {
    background-color: #eee;
    color: #333;
}
.mi-rbox,
.mi-main {
    position: relative;
}
.mi-tags {
    position: fixed;
    top: 60px;
    z-index: 999;
    background-color: #fff;
}
.mi-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #1fc8db;
    background-image: linear-gradient(140deg, #EADEDB 0%, #BC70A4 50%, #BFD641 75%,#b8d227 100%);
    color: #333;
}
.el-aside {
    background-color: #fff;
    color: #333;
    line-height: 200px;
    transition: all .5s ease-in-out;
}

.el-main {
    background-color: #fff;
    color: #333;
    margin-top: 90px;
}
.mi-logo-box {
    display: flex;
    width: 100%;
    height: 60px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.mi-collapse {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 24px;
    cursor: pointer;
    color: #444;
    background: rgb(226, 239, 251);
}
.mi-login-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
}
.mi-avatar {
    display: flex;
    width: 60px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-left: 15px;
}
.mi-user {
    width: auto;
    padding: 0 5px;
}
.mi-tags {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #ddd;
}
.mi-crumb {
    width: calc(100% - 280px);
    position: fixed;
    top: 110px;
    z-index: 999;
    margin-bottom: 10px;
}
.mi-date {
    font-size: 14px;
    font-weight: 600;
    color: lightcyan;
}
</style>