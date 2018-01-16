<template>
    <div class="index-warp">
        <h2>收支管理</h2>   
        <div class="title">筛选日期<el-date-picker
          v-model="screenDate"
          type="daterange"
          align="left"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期" 
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions2" style="margin-left:20px;">
            </el-date-picker>
         <el-button type="primary" @click="getList">筛选</el-button>
        </div>
        <div class="bpTable">
            <el-table :data="netProfit" border style="width: 30%" ref="netProfitTable">
                <el-table-column v-bind:label="profitSum">
                    <el-table-column type="index" label="序号"  width="50">
                    </el-table-column>
                    <el-table-column prop="modifyDate" label="日期"  >
                    </el-table-column>
                    <el-table-column prop="goods_name" label="名称"  >
                    </el-table-column>
                    <el-table-column prop="goods_profit" label="金额" >
                    </el-table-column>
                </el-table-column>    
            </el-table>
            <el-table :data="income" border style="width: 30%" ref="incomeTable">
                <el-table-column  v-bind:label="incomeSum">
                    <el-table-column type="index" label="序号"  width="50">
                    </el-table-column>
                    <el-table-column prop="modifyDate" label="日期"  >
                    </el-table-column>
                    <el-table-column prop="goods_name" label="名称" >
                    </el-table-column>
                    <el-table-column prop="goods_price" label="金额" >
                    </el-table-column>
                </el-table-column>    
            </el-table>
            <el-table :data="expenditure" border style="width: 30%" ref="expenditureTable">
                <el-table-column  v-bind:label="costSum">
                    <el-table-column type="index" label="序号"  width="50">
                    </el-table-column>
                    <el-table-column prop="date" label="日期"  >
                    </el-table-column>
                    <el-table-column prop="material_name" label="名称"  >
                    </el-table-column>
                    <el-table-column prop="amount" label="金额" >
                    </el-table-column>
                </el-table-column>    
            </el-table>
        </div>
    </div>
</template>
<script>
import API from '../../api/API'
import axios from 'axios'
const api = new API()
export default{
    data() {
        return {
            screenDate:[],
            pickerOptions2: {
              shortcuts: [{
                text: '最近一周',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近一个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近三个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                  picker.$emit('pick', [start, end]);
                }
              }]
            },
            netProfit:[],
            income:[],
            expenditure:[],
            costSum:'',
            incomeSum:'',
            profitSum:''

         }
    },
    beforeMount:function(){
        this.getList();
    },
    methods:{    
        postProfits() {
            let params ={
                api:"/product/count/profits",
                param: {
                    datefrom:this.screenDate?this.screenDate[0]:'',
                    dateto:this.screenDate?this.screenDate[1]:''
                }
            }  
            return api.post(params);
        },
        postIncome() {
            let params ={
                api:"/product/count/income",
                param: {
                    datefrom:this.screenDate?this.screenDate[0]:'',
                    dateto:this.screenDate?this.screenDate[1]:''
                }
            }  
            return api.post(params);
        },
        postExpenditure() {
            let params ={
                api:"/product/count/cost",
                param: {
                    datefrom:this.screenDate?this.screenDate[0]:'',
                    dateto:this.screenDate?this.screenDate[1]:''
                }
            }  
            return api.post(params);
        },
        getList:function(){
            let self = this ;
            axios.all([self.postProfits(),self.postIncome(),self.postExpenditure()])  
                .then(axios.spread(function(a,b,c){//全部请求正确时候触发  
                    self.netProfit=a.data.data.listMap;
                    self.profitSum ='净利润：'+ a.data.data.profitSum;
                    self.income=b.data.data.listMap;
                    self.incomeSum='收入：'+b.data.data.incomeSum;
                    self.expenditure=c.data.data.listMap;
                    self.costSum = '支出：'+c.data.data.costSum;
                }))  
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
            margin-bottom: 20px;
        }
        .bpTable{
            .el-table{
                float: left;
                padding-left: 1px;
                margin-left: 25px;
            }
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