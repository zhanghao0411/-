<template>
    <div class="index-warp">
        <h2>大魔王的料理店</h2>
        <div class="menu">
             <el-button type="primary" @click="newOrder" >新增订单</el-button>
        </div>
        <el-dialog title="新增订单" :visible.sync="newOrderSwitch" width="30%">
            <el-form :model="formNewOrder"  :rules="rules"  ref="formNewOrder" >
                <el-form-item prop="name" label="客户姓名" :label-width="formLabelWidth">
                  <el-input v-model="formNewOrder.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="phone" label="手机号" :label-width="formLabelWidth">
                  <el-input v-model="formNewOrder.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="address" label="收货地址" :label-width="formLabelWidth">
                  <el-input v-model="formNewOrder.address" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item  prop="pname" label="产品名称" :label-width="formLabelWidth">
                    <el-select v-model="formNewOrder.pname" clearable placeholder="请选择产品" class="" @change="changeGoodName">
                        <el-option
                          v-for="item in optionsp"
                          :key="item.goodsName"
                          :label="item.goodsName"
                          :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="num" label="数量" :label-width="formLabelWidth">
                    <el-input v-model="formNewOrder.num" auto-complete="off"></el-input>
                </el-form-item>
                 <el-form-item prop="pricetotal" label="总价" :label-width="formLabelWidth">
                    <el-input v-model="formNewOrder.pricetotal" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="data" label="交付日期" :label-width="formLabelWidth">
                    <el-date-picker
                          v-model="formNewOrder.data"
                          type="date"
                          placeholder="选择日期"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item  prop="state" label="状态" :label-width="formLabelWidth">
                    <el-select v-model="formNewOrder.state" clearable placeholder="请选择状态" class="">
                        <el-option
                          v-for="item in optionss"
                          :key="item.index"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="newOrderSwitch = false">取 消</el-button>
                <el-button type="primary" @click="submitnewOrder('formNewOrder')">确 定</el-button>
            </div>
        </el-dialog>
        <p class="title">未完成订单</p> <el-input v-model="select_word" placeholder="筛选产品关键词" class="search"></el-input>
        <el-table :data="indexData" border style="width: 100%" ref="indexTable">
            <el-table-column type="index" label="序号"  width="50">
            </el-table-column>
            <el-table-column prop="customer" label="客户名称"  width="100">
            </el-table-column>
            <el-table-column prop="createdate" label="订单日期"  width="150">
            </el-table-column>
            <el-table-column prop="goodsName" label="产品名称" width="150">
            </el-table-column>
            <el-table-column prop="goodsQuantity" label="数量" width="50">
            </el-table-column>
            <el-table-column prop="goodsPrice" label="总价">
            </el-table-column>
            <el-table-column prop="readydate" label="交付日期" width="150">
            </el-table-column>
            <el-table-column prop="phone" label="手机号" width="100">
            </el-table-column>
            <el-table-column prop="address" label="收货地址">
            </el-table-column>
            <el-table-column prop="logistics" label="物流单号">
            </el-table-column>
            <el-table-column prop="typech" label="状态" >
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small"
                            @click="handleEdit(scope.row.id,scope.row.customer,scope.row.goodsName,scope.row.goodsQuantity,scope.row.goodsPrice,scope.row.readydate,scope.row.phone,scope.row.address,scope.row.logistics,scope.row.type,scope.row.goodsId)">编辑</el-button>
                    <el-button size="small" type="success"
                            @click="handleDone(scope.row.id,scope.row.goodsId,scope.row.goodsQuantity,scope.row.goodsPrice)">完成</el-button>
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
        <el-dialog title="编辑订单" :visible.sync="editOrderSwitch" width="30%">
            <el-form :model="formEditOrder"    ref="formEditOrder" >
                <el-form-item prop="name" label="客户姓名" :label-width="formLabelWidth">
                  <span>{{formEditOrder.name}}</span>
                </el-form-item>
                <el-form-item prop="phone" label="手机号" :label-width="formLabelWidth">
                  <el-input v-model="formEditOrder.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="address" label="收货地址" :label-width="formLabelWidth">
                  <el-input v-model="formEditOrder.address" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item  prop="pname" label="产品名称" :label-width="formLabelWidth">
                    <span>{{formEditOrder.pname}}</span>
                </el-form-item>
                <el-form-item prop="num" label="数量" :label-width="formLabelWidth">
                    <el-input v-model="formEditOrder.num" auto-complete="off"></el-input>
                </el-form-item>
                 <el-form-item prop="pricetotal" label="总价" :label-width="formLabelWidth">
                    <el-input v-model="formEditOrder.pricetotal" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="data" label="交付日期" :label-width="formLabelWidth">
                    <el-date-picker
                          v-model="formEditOrder.data"
                          type="date"
                          placeholder="选择日期"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item  prop="state" label="状态" :label-width="formLabelWidth">
                    <el-select v-model="formEditOrder.state" clearable placeholder="请选择状态" class="">
                        <el-option
                          v-for="item in optionss"
                          :key="item.index"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editOrderSwitch = false">取 消</el-button>
                <el-button type="primary" @click="submitEditOrder('formNewOrder')">确 定</el-button>
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
            tableData: [],
            cur_page: 1,
            select_word:'',
            listNum:null,
            newOrderSwitch: false,
            editOrderSwitch:false,
            formNewOrder:{
                name:'',
                phone:'',
                address:'',
                pname:'',
                gname:'',
                num:'',
                data:'',
                logistics:'',
                pricetotal:'',
                state:'',
            },
            formEditOrder:{
                id:'',
                name:'',
                phone:'',
                address:'',
                pname:'',
                gname:'',
                num:'',
                data:'',
                pricetotal:'',
                logistics:'',
                state:'',
                goodsId:''
            },
            optionsp:[],
            optionss:[{
                    value: '0',
                      label: '未支付，未发货'
                    }, {
                      value: '1',
                      label: '已支付，未发货'
                    }, {
                      value: '2',
                      label: '未支付，已发货'
                    }, {
                      value: '3',
                      label: '已支付，已发货'
                    }],
            optionsss:[{
                    value: '0',
                      label: '未支付，未发货'
                    }, {
                      value: '1',
                      label: '已支付，未发货'
                    }, {
                      value: '2',
                      label: '未支付，已发货'
                    }],        
            formLabelWidth:'120px',
            rules:{
                name:[
                    { required: true, message: '请输入用户名称', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2到 8 个字符', trigger: 'blur' }
                ],
                pname:[
                    {type:'number',required: true, message: '请选择产品', trigger: 'change' }
                ],
                num:[
                    { required: true, message: '请输入数量', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2到 8 个字符', trigger: 'blur' }
                ],
                data:[
                    {"message": "请选择日期","required": 1},
                   {"pattern": null,"type": "string","message": null}
                ],
                pricetotal:[
                    { required: true, message: '请输入总价', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2到 8 个字符', trigger: 'blur' }
                ],
                state:[
                    {required: true, message: '请选择状态', trigger: 'change' }
                ],
            },
        }
    },
    beforeMount:function(){
        this.getList();
        this.getListP();
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
                self.listNum = res.data.data.listNum;
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
                  arr[key].typech="已支付，已发货";
                  break;
                }
            });           
        },
        newOrder(){
            this.formNewOrder.name = this.formNewOrder.phone = this.formNewOrder.address = this.formNewOrder.pname = this.formNewOrder.gname = this.formNewOrder.num =  this.formNewOrder.data =  this.formNewOrder.pricetotal =  this.formNewOrder.state = '';
            this.newOrderSwitch = true;
        },
        submitnewOrder(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let self = this;
                    let params = {
                        api:"/product/order/save",
                        param:{
                            customer:self.formNewOrder.name,
                            readydate:self.formNewOrder.data,
                            goodsName:self.formNewOrder.gname,
                            goodsQuantity:self.formNewOrder.num,
                            goodsPrice:self.formNewOrder.pricetotal,
                            type:self.formNewOrder.state,
                            phone:self.formNewOrder.phone,
                            address:self.formNewOrder.address,
                            logistics:'',
                            goodsId:self.formNewOrder.pname
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
                            self.newOrderSwitch= false;
                            self.getList();
                        }
                    })
                }else {
                    return false;
                }
            })
        },
        handleEdit(id,customer,goodsName,goodsQuantity,goodsPrice,readydate,phone,address,logistics,type,goodsId){
            this.editOrderSwitch=true,
            this.formEditOrder.id = id;
            this.formEditOrder.name = customer;
            this.formEditOrder.phone = phone;
            this.formEditOrder.address = address;
            this.formEditOrder.pname = goodsName;
            this.formEditOrder.gname = goodsId;
            this.formEditOrder.num = goodsQuantity;
            this.formEditOrder.data = readydate;
            this.formEditOrder.pricetotal = goodsPrice;
            this.formEditOrder.state = type;
            this.formEditOrder.logistics = logistics;
        },
        submitEditOrder(){
            let self = this;
            let params = {
                api:"/product/order/update",
                param:{
                    id:self.formEditOrder.id,
                    customer:self.formEditOrder.name,
                    readydate:self.formEditOrder.data,
                    goodsName:self.formEditOrder.pname,
                    goodsQuantity:self.formEditOrder.num,
                    goodsPrice:self.formEditOrder.pricetotal,
                    type:self.formEditOrder.state,
                    phone:self.formEditOrder.phone,
                    address:self.formEditOrder.address,
                    logistics:self.formEditOrder.logistics,
                    goodsId:self.formEditOrder.gname
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
                    self.editOrderSwitch= false;
                    self.getList();
                }
            })
        },
        handleDone(id,goodsId,materialQuantity,materialPrice){
            let self = this;
            let params = {
                api:"/product/order/complete",
                param:{
                    id:id,
                    goodsQuantity:materialQuantity,
                    goodsPrice:materialPrice,
                    goodsId:goodsId
                }
            };
            api.postJson(params).then(function(res){
                if(res.data.code!=='1'){
                     self.$alert(res.data.message, '信息提示');
                }else{
                    self.$notify({
                        title: '订单完成',
                        message: res.data.message,
                        type: 'success'
                    });
                    self.getList();
                }
            })
        },
        handleDelete(id){
            let self = this;
            let params = {
                api:"/product/order/delete",
                param:{
                    id:id
                }
            };
            api.post(params).then(function(res){
                if(res.data.code!=='1'){
                     self.$alert(res.data.message, '信息提示');
                }else{
                    self.$notify({
                        title: '订单删除成功',
                        message: res.data.message,
                        type: 'success'
                    });
                    self.getList();
                }
            })
        },
        getListP:function(){
            let self = this ;
            let params ={
                api:"/product/goods/queryAll",
            }   
            api.post(params).then(function(res){
                if(res.data.code!=='1'){
                     self.$alert(res.data.message, '信息提示');
                }else{
                    self.optionsp = res.data.data.goodsStocks;
                }
            })
        },
        getList:function(){
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
            });
        },
        changeGoodName(id) {
              let obj = {};
              obj = this.optionsp.find((item)=>{
                  return item.id === id;
              });
              this.formNewOrder.gname = obj.goodsName;
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
        .menu{
            text-align: left;
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
    .el-button--small{
        padding: 9px 10px;
    }
</style>