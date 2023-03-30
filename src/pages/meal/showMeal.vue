<template>
    <div class="show-meal">
        <el-tabs type="card" @tab-click="switchTab" v-model="curcate">
            <el-tab-pane v-for="category in categories" 
            :key="category.idCategory" 
            :label="category.strCategory" 
            :name="category.strCategory"> 
            </el-tab-pane>
        </el-tabs>
        <div class="meal-box">
            <div class="meal-list" v-for="(meal, index) in mealData" :key="index">
                <el-card :body-style="{ padding: '0px' }">
                    <img :src="meal.strMealThumb" class="image"/>
                    <div style="padding: 14px;">
                        <span>{{meal.strMeal}}</span>
                        <div class="bottom clearfix">
                            <time class="time">Seafood</time>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive, getCurrentInstance } from 'vue';
export default {
    setup() {
        const { proxy } = getCurrentInstance();
        let mealData = reactive([]);
        let curcate = ref('Lamb');
        let categories = reactive([]);

        getCategory();
        // 餐品分类
        function getCategory() { 
            proxy.$get("/api/json/v1/1/categories.php").then((response) => {
                let data = response.categories;
                console.log(data);
                if (data.length > 0) {
                    data.forEach(item => { 
                        categories.push(item);
                    });
                    curcate = data[3].strCategory;
                    getdata(curcate);
                }
            })
        } 
        // 餐品数据
        function getdata(category) { 
            proxy.$get("/api/json/v1/1/filter.php",{c:category}).then((response)=>{
                let data = response.meals;
                mealData.length = 0;
                if (data.length > 0) {
                    data.forEach(item => { 
                        mealData.push(item);
                    });
                }
            })
        }

        //tab切换
        function switchTab(tab) { 
            mealData.length = 0;
            getdata(tab.name);
        }
        console.log(curcate);
        return {
            mealData,
            categories,
            curcate,
            switchTab
        }
    }
}
</script>

<style scoped>
.meal-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    overflow: auto;
}
.meal-list {
    width: 250px;
    margin-right: 10px;
}
.time {
    font-size: 13px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.button {
    padding: 0;
    float: right;
}

.image {
    width: 100%;
    display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: '';
}

.clearfix:after {
    clear: both;
}
</style>