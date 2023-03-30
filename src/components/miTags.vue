<template>
    <div class="mitags">
        <div class="leftbtn"><i class="el-icon-d-arrow-left"></i></div>
        <div class="tags-box">
            <el-tag
            v-for="item in tags"
            :key="item.label"
            :type="item.type"
            :effect="item.effect"
            :closable="item.close"
            @click="switchTag(item)"
            @close="closeTag(item)"
            >
            {{ item.label }}
            </el-tag>
        </div>
        <div class="rightbtn"><i class="el-icon-d-arrow-right"></i></div>
    </div>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import emitter from '../utils/bus';

export default {
    setup() {
        const router = useRouter();
        //tag标签
        const tags = reactive([
            { index: '1',type: '', label: '主页', effect: 'dark', close: false, route: '/index' },
        ]);

        //监听左侧菜单传递数据
        emitter.on("putTags", (val) => {
            let has = tags.some(tag => tag.index === val.index);
            let tagtype = createType();
            if (has === true) {
                switchTag({ index: val.index });
            } else { 
                tags.push({
                    index: val.index,
                    type: tagtype,
                    label: val.name,
                    effect: 'dark',
                    close: true,
                    route: val.route
                });
                switchTag({ index: val.index });
            }
        });
        //切换标签
        function switchTag(cur) { 
            tags.forEach(item => { 
                item.effect = 'plain';
                if (cur.index === item.index) { 
                    item.effect = 'dark';
                    router.push(item.route);
                    emitter.emit('setnav',item);
                }
            });
        }
        //关闭标签
        function closeTag(tag) { 
            let prev = null;
            for (let i = tags.length - 1; i >= 0; i--) {
                if (tags[i].index === tag.index) {
                    if (tag.effect === "dark") { 
                        prev = tags[i - 1];
                        switchTag({ index: prev.index });
                    }
                    tags.splice(i, 1);
                }
            }
        }
        //标签type随机生成
        function createType() { 
            let random = Math.floor(Math.random() * 10);
            let tagtype = '';
            if (random === 0 || random === 1) {
                tagtype = '';
            } else if (random === 2 || random === 3) { 
                tagtype = 'success';
            }else if (random === 4 || random === 5) { 
                tagtype = 'info';
            }else if (random === 6 || random === 7) { 
                tagtype = 'warning';
            }else { 
                tagtype = 'danger';
            }
            return tagtype;
        }
        return {
            tags,
            switchTag,
            closeTag
        }
    }
}
</script>

<style scoped>
.mitags {
    display: flex;
    width: 100%;
    height: 40px;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}
.tags-box {
    width: 100%;
    height: 40px;
    line-height: 40px;
}
.el-tag {
    margin-right: 10px;
    cursor: pointer;
}
.leftbtn,
.rightbtn,
.home-tag {
    width: 40px;
    height: 100%;
    text-align: center;
    line-height: 40px;
    font-size: 24px;
    color: #666;
    cursor: pointer;
}
.leftbtn {
    border-right: 1px solid #ddd;
    margin-right: 10px;
}
.rightbtn {
    border-left: 1px solid #ddd;
    margin-left: 10px;
}

</style>