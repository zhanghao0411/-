<template>
	<div class="index-warp">
		<p class="title">原料管理</p>
        <div class="menu">
        	<el-button type="primary" @click="newMaterials" >新增原料</el-button>
			<el-button type="primary" @click="procurementMaterials">采购原料</el-button>
        </div>
        <el-dialog title="添加原材料" :visible.sync="newMaterialsSwitch" width="30%">
			<el-form :model="formNewMaterials"  :rules="rules"  ref="formNewMaterials" >
			    <el-form-item prop="name" label="原材料名称" :label-width="formLabelWidth">
			      <el-input v-model="formNewMaterials.name" auto-complete="off"></el-input>
			    </el-form-item>
			    <el-form-item prop="region" label="单位" :label-width="formLabelWidth">
			      <el-input v-model="formNewMaterials.region" auto-complete="off"></el-input>
			    </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
			    <el-button @click="newMaterialsSwitch = false">取 消</el-button>
			    <el-button type="primary" @click="submitNewMaterials('formNewMaterials')">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="采购原材料" :visible.sync="procurementMaterialsSwitch" width="30%">
			<el-form :model="formProcurementMaterials"  :rules="rules1"  ref="formProcurementMaterials" >
				<el-form-item  prop="qname" label="原料" :label-width="formLabelWidth">
					<el-select v-model="formProcurementMaterials.qname" clearable placeholder="请选择原料" class="formProcurementMaterialsOtinon">
					    <el-option
					      v-for="item in optionsAll"
					      :key="item.value"
					      :label="item.materialName"
					      :value="item.id">
					    </el-option>
					</el-select>
				</el-form-item>	
				<el-form-item  prop="num" label="数量" :label-width="formLabelWidth">
			      	<el-input v-model="formProcurementMaterials.num" auto-complete="off" clearable></el-input>
			    </el-form-item>
			    <el-form-item prop="total" label="总价" :label-width="formLabelWidth">
			      	<el-input v-model="formProcurementMaterials.total" auto-complete="off" clearable></el-input>
			    </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
			    <el-button @click="procurementMaterialsSwitch = false">取 消</el-button>
			    <el-button type="primary" @click="submitProcurementMaterials('formProcurementMaterials')">确 定</el-button>
			</div>
		</el-dialog>
		<el-table :data="options" border style="width: 100%" ref="options" class="MaterialsTable">
			<el-table-column type="index" label="序号"  width="150">
            </el-table-column>
            <el-table-column prop="materialName" label="原材料名称"  width="300">
            </el-table-column>
            <el-table-column prop="materialQuantity" label="库存量" width="260">
            </el-table-column>
            <el-table-column prop="materialUnit" label="单位" width="250">
            </el-table-column>
            <el-table-column prop="materialPrice" label="单价" width="250">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small"
                            @click="handleEdit(scope.row.id,scope.row.materialName,scope.row.materialQuantity,scope.row.materialPrice)">编辑</el-button>
                    <el-button size="small" type="danger"
                            @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination   @current-change ="handleCurrentChange"
                   layout="prev, pager, next"
                   :total="listNum">
           </el-pagination>
        </div>
       <el-dialog title="编辑原材料" :visible.sync="editMaterialsSwitch" width="30%">
       			<el-form :model="formEditMaterials"  :rules="rules2"  ref="formEditMaterials" >
       				<el-form-item label="原材料名称" :label-width="formLabelWidth">
       			      	<span>{{formEditMaterials.name}}</span>
       			    </el-form-item>
       				<el-form-item prop="num" label="数量" :label-width="formLabelWidth">
       			      	<el-input v-model="formEditMaterials.num" auto-complete="off"></el-input>
       			    </el-form-item>
       			</el-form>
       			<div slot="footer" class="dialog-footer">
       			    <el-button @click="editMaterialsSwitch = false">取 消</el-button>
       			    <el-button type="primary" @click="submitEditMaterials('formEditMaterials')">确 定</el-button>
       			</div>
       		</el-dialog>
	</div>
</template>
<script>
import API from '../../api/API'
const api = new API();
export default{
  	data() {
        return {
        	newMaterialsSwitch: false,
        	procurementMaterialsSwitch:false,
        	editMaterialsSwitch:false,
        	cur_page: 1,
        	formNewMaterials:{
        		name: '',
          		region: '',
        	},
        	listNum:null,
        	/*formProcurementMaterialsOtinon:'',*/
        	formEditMaterialsOtinon:'',
        	formProcurementMaterials:{
        		qname:null,
        		num:null,
        		total:null,	
        	},
        	formEditMaterials:{
        		id:'',
        		oldNum:'',
        		price:'',
        		name:'',
        		num:''
        	},
        	options:[],
        	optionsAll:[],
        	formLabelWidth: '120px',
        	rules:{
				name:[
					{ required: true, message: '请输入产品名称', trigger: 'blur' },
        			{ min: 2, max: 10, message: '长度在 2到 8 个字符', trigger: 'blur' }
				],
				region:[
					{ required: true, message: '请输入产品单位', trigger: 'blur' },
        			{ min: 1, max: 4, message: '长度在 1 到 4 个字符', trigger: 'blur' }
				],
			},
			rules1:{
				qname:[
					{type:'number',required: true, message: '请选择产品', trigger: 'change' }
				],
				num:[
					{ required: true, message: '请输入产品采购数量', trigger: 'blur' },
        			{ min: 1, max: 10, message: '长度在 1到 10 个字符', trigger: 'blur' }
				],
				total:[
					{ required: true, message: '请输入总价', trigger: 'blur' },
        			{ min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' }
				],
			},
			rules2:{
				num:[
					{ required: true, message: '请输入产品数量', trigger: 'blur' },
        			{ min: 1, max: 10, message: '长度在 1到 10 个字符', trigger: 'blur' }
				],
			}
        }
    },
 	beforeMount:function(){
 		this.getList();
 		this.getListAll();
    },
    methods:{
    	handleCurrentChange(val){
            this.cur_page = val;
            let self = this;
            let params = {
            api:"/product/material/query" ,
	            param:{
	               	
	                pagesNum:self.cur_page
	            }
        	}
	        api.post(params).then(function(res){
	            self.options = res.data.data.materialStock;
	           
	        })
        },
       newMaterials:function(){
       		this.newMaterialsSwitch= true;
       		this.formNewMaterials.name = this.formNewMaterials.region = '';
       },
       procurementMaterials:function(){
       		this.procurementMaterialsSwitch = true;
       		this.formProcurementMaterials.qname = '';
       		this.formProcurementMaterials.num = this.formProcurementMaterials.total=''
       },
       handleEdit:function(id,name,oldNum,price){
       		this.editMaterialsSwitch = true;
       		this.formEditMaterials.id = id;
       		this.formEditMaterials.name = name;
       		this.formEditMaterials.oldNum = oldNum;
       		this.formEditMaterials.price  = price;
       		this.formEditMaterials.num = null;
       },
       handleDelete:function(id){
       		let self = this;
       		this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
		         confirmButtonText: '确定',
		         cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	let params = {
						api:"/product/material/delete",
						param:{
							id:id,
						}
					};
					api.post(params).then(function(res){
						if(res.data.code!=='1'){
							 self.$alert(res.data.message, '信息提示');
						}else{
						    self.$notify({
						        title: '删除成功',
						        message: res.data.message,
						        type: 'success'
						    });
						    self.editMaterialsSwitch= false;
						    self.getList();
						}
					})		        	
		         /* this.$message({
		            type: 'success',
		            message: '删除成功!'
		          });*/
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
       		
       },
       submitNewMaterials:function(formName){
			this.$refs[formName].validate((valid) => {
	          	if (valid) {
	          		let self = this;
	          		let params = {
						api:"/product/material/save",
						param:{
							materialName:self.formNewMaterials.name,
							materialUnit:self.formNewMaterials.region
						}
					};
					api.postJson(params).then(function(res){
						if(res.data.code!=='1'){
							 self.$alert(res.data.message, '信息提示');
						}else{
						    self.$notify({
						        title: '新增原料成功',
						        message: res.data.message,
						        type: 'success'
						    });
						    self.newMaterialsSwitch= false;
						    self.getList();
						    self.getListAll();
						}
					})
	          	}else {
		            return false;
		        }
		    })
       },
       submitProcurementMaterials:function(formName){
       		this.$refs[formName].validate((valid) => {
	          	if (valid) {
	          		let self = this;
	          		let params = {
						api:"/product/material/BuyMaterialStock",
						param:{
							id:self.formProcurementMaterials.qname,
							materialQuantity:self.formProcurementMaterials.num,
							price:self.formProcurementMaterials.total
						}
					};
					api.postJson(params).then(function(res){
						if(res.data.code!=='1'){
							 self.$alert(res.data.message, '信息提示');
						}else{
						    self.$notify({
						        title: '购买原材料添加成功',
						        message: res.data.message,
						        type: 'success'
						    });
						    self.procurementMaterialsSwitch= false;
						    self.getList();
						}
					})
	          	}else {
		            return false;
		        }
		    })
       },
       submitEditMaterials:function(formName){
       		this.$refs[formName].validate((valid) => {
	          	if (valid) {
	          		let self = this;
	          		let params = {
						api:"/product/material/update",
						param:{
							id:self.formEditMaterials.id,
							materialOldQuantity:self.formEditMaterials.oldNum,
							price:self.formEditMaterials.price,
							materialQuantity:self.formEditMaterials.num
						}
					};
					api.postJson(params).then(function(res){
						if(res.data.code!=='1'){
							 self.$alert(res.data.message, '信息提示');
						}else{
						    self.$notify({
						        title: '修改原材料成功',
						        message: res.data.message,
						        type: 'success'
						    });
						    self.editMaterialsSwitch= false;
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
	 			api:"/product/material/query",
	 			param:{
	 				 pagesNum:self.cur_page
	 			}
	 		}	
	 		api.post(params).then(function(res){
	 			if(res.data.code!=='1'){
	 				 self.$alert(res.data.message, '信息提示');
	 			}else{
	 				self.options = res.data.data.materialStock;
	 				self.listNum = res.data.data.listNum;
	 			}
	 		})
       },
       	getListAll:function(){
       		let self = this ;
	 		let params ={
	 			api:"/product/material/queryAll",
	 		}	
	 		api.post(params).then(function(res){
	 			if(res.data.code!=='1'){
	 				 self.$alert(res.data.message, '信息提示');
	 			}else{
	 				self.optionsAll = res.data.data.materialStock;
	 			}
	 		})
       	},
    },
    computed:{
    	
    },
   
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
		.el-input{
			max-width: 350px;
		}
		.formProcurementMaterialsOtinon{
			width: 100%;
		}
		.formEditMaterialsOtinon{
			margin-bottom: 22px;
			padding-left: 17%;
			width: 50%;
			max-width: 350px;
		}
		.MaterialsTable{
			margin-top: 100px;			
		}
		
	}
</style>
<style type="text/css">
	.el-form-item__error{
			left: 40px;
		}
</style>