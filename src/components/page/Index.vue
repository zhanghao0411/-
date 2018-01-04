<template>
	<div class="index-warp">
		<p class="title">未完成订单</p> <el-input v-model="select_word" placeholder="筛选产品关键词" class="search"></el-input>
		<el-table :data="indexData" border style="width: 100%" ref="indexTable">
			<el-table-column type="index" label="序号"  width="50">
            </el-table-column>
			<el-table-column prop="customer" label="客户名称"  width="150">
            </el-table-column>
            <el-table-column prop="createdate" label="订单日期"  width="150">
            </el-table-column>
            <el-table-column prop="goodsName" label="产品名称" width="200">
            </el-table-column>
            <el-table-column prop="goodsQuantity" label="数量" width="50">
            </el-table-column>
            <el-table-column prop="goodsPrice" label="价格" width="150">
            </el-table-column>
            <el-table-column prop="readydate" label="交付日期" width="200">
            </el-table-column>
            <el-table-column prop="phone" label="手机号" width="150">
            </el-table-column>
            <el-table-column prop="address" label="收货地址" width="200">
            </el-table-column>
            <el-table-column prop="logistics" label="物流单号" width="150">
            </el-table-column>
            <el-table-column prop="typech" label="状态" >
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
const api = new API();
export default{
  	data() {
        return {
        	tableData: [],
            cur_page: 1,
            select_word:'',
            listNum:null
        }
    },
 	beforeMount:function(){
 	let self = this;
    let params = {
            api:"/product/index/orderInfo",
            param:{
                type:'0',
                pagesNum:self.cur_page
            }
        }
        api.post(params).then(function(res){
            self.tableData = res.data.data.order;
            self.listNum = res.data.data.listNum;
            self.changeType(self.tableData);
        })
        
    },
    methods:{
        handleCurrentChange(val){
            this.cur_page = val;
            let self = this;
            let params = {
            api:"/product/index/orderInfo",
	            param:{
	                type:'0',
	                pagesNum:self.cur_page
	            }
        	}
	        api.post(params).then(function(res){
	            self.tableData = res.data.data.order;
	            self.changeType(self.tableData);
	        })
        },
        changeType(e){
        	e.map(function(value,key,arr){
        		switch (value.type)
				{
				case '0':
				  arr[key].typech=  "未支付，未发货";
				  break;
				case '1':
				  arr[key].typech="已支付，未发货";
				  break;
				case '2':
				  arr[key].typech="未支付，已发货";
				  break;
				case '3':
				  arr[key].typech="已支付已发货";
				  break;
				}
        	});
            
        }
    },
    computed:{
    	indexData(){
    		const self = this;
		   	return self.tableData.filter(function(d){
		   		if(d.goodsName.indexOf(self.select_word)>-1){
		   			return d;
		   		}
		   	})
    	},
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
			display: inline-block;
			float: left;
		}
		.search{
			width: 300px;
			float: left;
			margin: 10px 0 0 40px;
		}
		.pagination{
			text-align: right;
			margin-top: 20px;
		}
	}
</style>