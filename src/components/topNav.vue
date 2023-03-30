<template>
    <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    background-color="transparent"
    text-color="#444444"
    active-text-color="#333333"
    mode="horizontal"
    @select="handleSelect"
    >
    <el-menu-item index="1">处理中心</el-menu-item>
    <el-menu-item index="2">我的工作台</el-menu-item>
    <el-menu-item index="3">消息中心</el-menu-item>
    <el-menu-item index="4">订单管理</el-menu-item>
    </el-menu>
</template>

<script>
import { ref } from 'vue';
export default {
    setup() {
        let activeIndex = ref('1')
        let activeIndex2 = ref('1')

        function handleSelect(key, keyPath) {
            console.log(key, keyPath)
        }

        return {
            activeIndex,
            activeIndex2,
            handleSelect
        }
    }
}
</script>

<style scoped>
</style>