<template>
    <div
        class="searchBox flex"
        v-if="(model.list || model.btn) && (model.list.length !== 0 || model.btn.length !== 0)"
    >
        <div
            class="searchBox__item"
            v-for="(item, index) in model.list"
            :key="`comSearchList__${index}`"
            :class="item.type === 'daterange'?'searchBox__item-data':''"
        >
            <el-input
                v-if="item.type === 'input'"
                v-model="obj[item.key]"
                :placeholder="item.placeholder"
            ></el-input>
            <el-select
                v-if="item.type === 'select'"
                v-model="obj[item.key]"
                :placeholder="item.placeholder"
            >
                <el-option
                    v-for="(items, indexs) in item.option"
                    :key="`${items}${indexs}`"
                    :label="items.name"
                    :value="items.id"
                ></el-option>
            </el-select>
            <el-date-picker
              v-if="item.type === 'daterange'"
              v-model="obj[item.key]"
              type="daterange"
              range-separator="~"
              :start-placeholder="item.placeholder ? item.placeholder[0] : '开始日期'"
              :end-placeholder="item.placeholder ? item.placeholder[1] : '结束日期'"
              value-format="yyyy-MM-dd"
              :picker-options="item.dataOptions"
            >
            </el-date-picker>
        </div>
        <div
            style="width: 50px;"
            v-if="model.list && model.btn && model.list.length !== 0 && model.btn.length !== 0"
        ></div>
        <el-button
            :type="item.btnType || 'primary'"
            class="searchBox__btn"
            @click="btnClick(item.type)"
            v-for="(item, index) in model.btn"
            :key="`comSearchBtn__${index}`"
        >{{item.label}}</el-button>

        <slot></slot>

    </div>
</template>
<script>
// dataOptions: {
//     disabledDate: (time) => {
//         // 选择今天之前time.getTime() > Date.now() - 8.64e7
//         // 选择今天之后time.getTime() < Date.now() - 8.64e7
//         return time.getTime() > Date.now() - 8.64e7;
//     }
// }
export default {
  props: {
    model: {
      type: Object,
      default: {
        list: [],
        btn: []
      }
    }
  },
  data() {
    return {
      obj: {}
    };
  },
  mounted(){
    let selList = this.model.list;
    let initObj = {};
    for(let x in selList){
      /**x默认选中第一个 */
      if(selList[x].key == 'acountStatus' || selList[x].key == "roleStatus"){
        initObj[selList[x].key] = selList[x].option[0].id
      }else{
        initObj[selList[x].key] = "";
      }
      
    }
    this.obj = initObj;
  },
  methods: {
    btnClick(type) {
      this.$emit('callback', { type, data: this.obj });
    }
  }
};
</script>
<style lang="less" scoped>
.searchBox {
  margin-top: 0;
  background-color: white;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;
  &__item {
    max-width: 200px;
    margin-right: 10px;
    &-data {
      min-width: 350px;
    }
  }
  &__btn {
    margin-right: 10px;
    vertical-align: middle;
    padding: 0 20px;
    color: white;
    background: @themecolor;
    font-size: 14px;
    line-height: 40px;
  }
}
</style>


