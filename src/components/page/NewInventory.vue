<template>
	<div class="index-warp">
		<p class="title">成品库存</p>
        <div class="menu">
            <el-button type="primary" @click="newInventory" >添加成品</el-button>
            <el-button type="primary" @click="finishedProduct">制作成品</el-button>
        </div>
        <el-dialog title="添加成品" :visible.sync="newInventorySwitch" width="30%">
            <el-form :model="formNewInventory"  :rules="rules1"  ref="formNewInventory" >
                <el-form-item prop="name" label="成品名称" :label-width="formLabelWidth">
                  <el-input v-model="formNewInventory.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="unit" label="单位" :label-width="formLabelWidth">
                  <el-input v-model="formNewInventory.unit" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="newInventorySwitch = false">取 消</el-button>
                <el-button type="primary" @click="submitNewInventory('formNewInventory')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="成品制作页面" :visible.sync="finishedProductSwitch" width="45%">
            <el-form  :model="formFinishedProduct"  ref="formFinishedProduct" class="demo-form-inline">
                <el-form-item  prop="name" label="产品名称" :label-width="formLabelWidth" class="pname" :rules="[
                    {type:'number',required: true, message: '请选择产品', trigger: 'change' }
                ]">
                    <el-select v-model="formFinishedProduct.name" clearable placeholder="请选择产品" class="">
                        <el-option
                            v-for="item in optionsAll"
                            :key="item.index"
                            :label="item.goodsName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="pnum" label="数量" :label-width="formLabelWidth" class="pnum" :rules="[
                    { required: true, message: '请输入产品数量', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1到 10 个字符', trigger: 'blur' }
                ]">
                     <el-input v-model="formFinishedProduct.pnum" auto-complete="off" clearable></el-input>
                </el-form-item>
                <div>
                    <div class="ul-l">
                        <el-form-item v-for="(name, index) in formFinishedProduct.material"
                        label="原料名称" :label-width="formLabelWidth"
                        :key="name.key"
                        :prop="'material.' + index + '.id'"
                        :rules="{type:'number',required: true, message: '请选择原料', trigger: 'change'}" class="material" width="50%">
                        <el-select v-model="name.id" clearable placeholder="请选择产品" class="">
                           <el-option
                             v-for="item in optionsMaterial"
                             :key="item.value"
                             :label="item.materialName"
                             :value="item.id">
                           </el-option>
                        </el-select>
                </el-form-item>
                    </div>
                    <div class="ul-r">
                         <el-form-item v-for="(num, index) in formFinishedProduct.material"
                         label="原料数量" :label-width="formLabelWidth"
                        :key="num.key"
                        :prop="'material.' + index + '.materialQuantity'"
                        :rules="[
                        { required: true, message: '请输入原料数量', trigger: 'blur' },
                        { min: 1, max: 10, message: '长度在 1到 10 个字符', trigger: 'blur' }]" class="materialNum">
                        <el-input v-model="num.materialQuantity" auto-complete="off" clearable></el-input>
                </el-form-item>
                    </div>
               <div class="ul-r">
                    <el-form-item  v-for="(v, index) in formFinishedProduct.material">
                        <el-button type="danger" @click="delMaterial(v)">删除原料</el-button>
                    </el-form-item>
               </div>
                </div>
               
            </el-form>
           <el-button type="primary" @click="addMaterial">添加原料</el-button>
            <div slot="footer" class="dialog-footer">
                <el-button @click="finishedProductSwitch = false">取 消</el-button>
                <el-button type="primary" @click="submitFormFinishedProduct('formFinishedProduct')">确 定</el-button>
            </div>
        </el-dialog>
        <!-- <el-form-item label="姓名选择" prop="typeId">
            <el-select v-model="formFinishedProduct.typeId" placeholder="请选择">
                <el-option v-for="item in items" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item> -->

		<el-table :data="inventoryData" border style="width: 100%" ref="indexTable" class="InventoryTable">
            <el-table-column type="index" label="序号"  width="250">
            </el-table-column>
			<el-table-column prop="goodsName" label="成品名称"  width="250">
            </el-table-column>
            <el-table-column prop="goodsQuantity" label="库存量"  width="300">
            </el-table-column>
            <el-table-column prop="materialUnit" label="单位" width="260">
            </el-table-column>
            <el-table-column prop="materialPrice" label="单价" width="150">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small"
                            @click="handleEdit(scope.row.id,scope.row.materialName,scope.row.materialQuantity,scope.row.materialPrice)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination   @current-change ="handleCurrentChange"
                   layout="prev, pager, next"
                   :total="listNum">
           </el-pagination>
        </div>
	</div>
</template>
<script>
import API from '../../api/API'
import vIselect from '../common/Inventoryselect.vue'
const api = new API();
export default{
  	data() {
        return {
        	inventoryData: [],
            cur_page: 1,
            select_word:'',
            listNum:null,
            newInventorySwitch:false,
            finishedProductSwitch:false,
            formNewInventory:{
                name: '',
                unit: '',
            },
            optionsAll:[],
            optionsMaterial:[],
            formFinishedProduct:{
                name:'',
                pnum:'',
                material: [{
                    id: '',
                    materialQuantity:'',
                }],
            },
            formLabelWidth: '120px',
            rules1:{
                name:[
                    { required: true, message: '请输入产品名称', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2到 8 个字符', trigger: 'blur' }
                ],
                unit:[
                    { required: true, message: '请输入产品单位', trigger: 'blur' },
                    { min: 1, max: 4, message: '长度在 1 到 4 个字符', trigger: 'blur' }
                ],
            },
        }
    },
 	beforeMount:function(){
        this.getList();
        this.getListAll();
        this.getMaterialAll();
    },
    methods:{
        handleCurrentChange(val){
            this.cur_page = val;
            let self = this;
            let params = {
            api:"/product/goods/query" ,
                param:{
                    pagesNum:self.cur_page
                }
            }
            api.post(params).then(function(res){
               self.inventoryData = res.data.data.goodsStocks;
            })
        },
        newInventory:function(){
            this.newInventorySwitch= true;
            this.formNewInventory.name = this.formNewInventory.unit = '';
        },
        finishedProduct:function(){
            this.finishedProductSwitch = true;

        },
        submitNewInventory:function(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let self = this;
                    let params = {
                        api:"/product/goods/save",
                        param:{
                            goodsName:self.formNewInventory.name,
                            materialUnit:self.formNewInventory.unit
                        }
                    };
                    api.postJson(params).then(function(res){
                        if(res.data.code!=='1'){
                             self.$alert(res.data.message, '信息提示');
                        }else{
                            self.$notify({
                                title: '新增成品成功',
                                message: res.data.message,
                                type: 'success'
                            });
                            self.newInventorySwitch= false;
                            self.getList();
                        }
                    })
                }else {
                    return false;
                }
            })
       },
       submitFormFinishedProduct:function(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let self = this;
                    let params = {
                        api:"/product/goods/make",
                        param:{
                            id:self.formFinishedProduct.name,
                            makeQuantity:self.formFinishedProduct.pnum,
                            materialStocks:self.formFinishedProduct.material
                        }
                    };
                    api.postJson(params).then(function(res){
                        if(res.data.code!=='1'){
                             self.$alert(res.data.message, '信息提示');
                        }else{
                            self.$notify({
                                title: '成品添加成功',
                                message: res.data.message,
                                type: 'success'
                            });
                            self.finishedProductSwitch= false;
                            self.getList();
                        }
                    })
                }else {
                    return false;
                }
            })
       },
        getList:function(){
            let self = this ;
            let params ={
                api:"/product/goods/query",
                param:{
                     pagesNum:self.cur_page
                }
            }   
            api.post(params).then(function(res){
                if(res.data.code!=='1'){
                     self.$alert(res.data.message, '信息提示');
                }else{
                    self.inventoryData = res.data.data.goodsStocks;
                    self.listNum = res.data.data.listNum;
                }
            })
        },
        getListAll:function(){
            let self = this ;
            let params ={
                api:"/product/goods/queryAll",
            }   
            api.post(params).then(function(res){
                if(res.data.code!=='1'){
                     self.$alert(res.data.message, '信息提示');
                }else{
                    self.optionsAll = res.data.data.goodsStocks;
                }
            })
        },
        getMaterialAll:function(){
            let self = this ;
            let params ={
                api:"/product/material/queryAll",
            }   
            api.post(params).then(function(res){
                if(res.data.code!=='1'){
                     self.$alert(res.data.message, '信息提示');
                }else{
                    self.optionsMaterial = res.data.data.materialStock;
                }
            })
        },

        delMaterial:function(item){
             console.log(item,this.formFinishedProduct.material)
            let index = this.formFinishedProduct.material.indexOf(item)
            console.log(index)
            if (index !== -1) {
                this.formFinishedProduct.material.splice(index, 1)
            }
        },
        addMaterial:function(){
            this.formFinishedProduct.material.push({
                id: '',
                materialQuantity:''
            });
        },
    },
    computed:{
    	indexData(){
    		const self = this;
		   	return self.tableData.filter(function(d){
		   		if(d.goodsName.indexOf(self.select_word)>-1){
		   			return d;
		   		}
		   	})
    	}
    },
    components:{
        vIselect
    }
}
</script>
<style lang="scss" scoped="" type="text/css">
	.index-warp{
		h2{
            color: red;
        }
        .title{
            text-align: left;
            font-size: 20px;

        }
        .menu{
            float: left;
            margin: 10px 0 0 40px;
        }
        .pagination{
            text-align: right;
            margin-top: 20px;
        }
        .InventoryTable{
            margin-top: 100px;          
        }
        .ul-l,.pname{
            display: inline-block;
            text-align: left;

        }
        .ul-r,.pnum{
            display: inline-block;
            text-align: right;
        }
	}
</style>