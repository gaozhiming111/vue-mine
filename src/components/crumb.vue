<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="crumb in crumbs" :key="crumb.index">{{ crumb.name }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
import { reactive } from 'vue';
import emitter from '../utils/bus';
export default {
    setup() {
        let crumbs = reactive([]);
        //监听左侧菜单传递数据
        emitter.on('setCrumb', (val) => { 
            crumbs.length = 0;
            if (val.length > 0) {
                val.forEach(item => { 
                    crumbs.push(item);
                });
            }
        }); 
        return {
            crumbs
        }
    }
}
</script>

<style scoped>
</style>