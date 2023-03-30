<template>
    <el-row>
        <el-form
        :model="mealForm"
        ref="form"
        label-width="100px"
        label-position="left"
        :inline="true"
        >
            <el-form-item label="餐品名称" prop="category">
                <el-input v-model="mealForm.name" placeholder="请输入餐品名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('mealForm')">查询</el-button>
            </el-form-item> 
        </el-form>
    </el-row>
    <el-row>
        <el-table
        :data="mealData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        >
            <el-table-column prop="idMeal" label="编号" width="180"> </el-table-column>
            <el-table-column prop="strCategory" label="分类" width="180"> </el-table-column>
            <el-table-column prop="strMeal" label="名称"></el-table-column>
            <el-table-column prop="strTags" label="标签">
                <template v-slot="scope">
                    <div v-if="scope.row.strTags">
                        <el-tag v-for="tag in scope.row.strTags.split(',')" type="success">{{tag}}</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="strArea" label="地域"> </el-table-column>
            <el-table-column prop="strMealThumb" label="图片" width="160">
                 <template v-slot="scope">
                    <el-image
                    style="width: 100px; height: 100px"
                    :src="scope.row.strMealThumb"
                    :fit="fit"
                    ></el-image>
                </template>
            </el-table-column>
        </el-table>
    </el-row>
</template>

<script>
import { ref, reactive, getCurrentInstance } from 'vue';
export default {
    setup() { 
        const { proxy } = getCurrentInstance();
        let mealData = reactive([]);
        let mealForm = reactive({
            name: 'Corba'
        });
        getdata('Corba');
        // 查询餐品数据
        function getdata(name) { 
            proxy.$get("/api/json/v1/1/search.php", { s: name }).then((response) => {
                console.log(response);
                let data = response.meals;
                if (data.length > 0) {
                    data.forEach(item => {
                        mealData.push(item);
                    });

                }
            });
        } 
        // 点击
        function submitForm() { 
            mealData.length = 0;
            getdata(mealForm.name);
        }
        function tableRowClassName({ row, rowIndex }) {
            if (rowIndex === 1) {
                return 'warning-row'
            } else if (rowIndex === 3) {
                return 'success-row'
            }
            return '';
        }
        return {
            mealData,
            mealForm,
            tableRowClassName,
            submitForm
        }
    }
}
</script>

<style scoped>
.el-table .warning-row {
    background: oldlace;
}
.el-table .success-row {
    background: #f0f9eb;
}
.el-tag {
    margin-right: 4px;
}
</style>