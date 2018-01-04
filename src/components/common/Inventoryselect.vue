<template>
    <div :rules="rules1">
        <el-form-item  prop="qname" label="原料" :label-width="formLabelWidth" class="qname">
            <el-select v-model="qname" clearable placeholder="请选择原料"  @change="atQname" >
                <el-option
                  v-for="item in optionsAll"
                  :key="item.index"
                  :label="item.goodsName"
                  :value="item.id">
                </el-option>
            </el-select>
        </el-form-item> 
        <el-form-item  prop="num" label="数量" :label-width="formLabelWidth" class="num">
            <el-input v-model="num" auto-complete="off" clearable @blur="atNum"></el-input>
        </el-form-item>
    </div>
</template>
<script>
export default {
    data() {
        return {
            formLabelWidth: '120px',
            qname:null,
            num:'',
            zjdata:{
                qname:null,
                num:null
            },
            rules1:{ 
                qname:[
                    {type:'number',required: true, message: '请选择产品', trigger: 'change' }
                ],
                num:[
                    { required: true, message: '请输入原料数量', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1到 10 个字符', trigger: 'blur' }
                ],
            },
        }
    },
    props:['optionsAll'],
    methods:{
        atQname:function(){
            zjdata.qname = this.qname;
        },
        atNum:function(){
            zjdata.num = this.num;
        },
        emitData:function(){
            this.$emit('at-qname',zjdata);
        },
    },
}
</script>
<style lang="scss" scoped="">
    .qname,.num{
         text-align: left;
         display: inline-block;
    }
</style>