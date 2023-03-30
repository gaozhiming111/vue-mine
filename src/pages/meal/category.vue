<template>
    <el-row>
        <el-table
        :data="mealData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        size="small"
        >
            <el-table-column prop="idCategory" label="编号" width="80"></el-table-column>
            <el-table-column prop="strCategory" label="分类" width="120"></el-table-column>
            <el-table-column prop="strCategoryDescription" label="描述"></el-table-column>
            <el-table-column prop="strCategoryThumb" label="图片" width="160">
                 <template v-slot="scope">
                    <el-image
                    style="width: 100px; height: 100px"
                    :src="scope.row.strCategoryThumb"
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
        let mealData = reactive( []);
        getdata();
        function getdata() { 
            proxy.$get("/api/json/v1/1/categories.php").then((response)=>{
                console.log(response);
                let data = response.categories;
                if (data.length > 0) {
                    data.forEach(item => { 
                        mealData.push(item);
                    });
                   
                }
            })
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
            tableRowClassName
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
</style>