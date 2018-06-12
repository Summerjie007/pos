<template>
<!-- //Vue 2.0版本需要一个跟组件 -->
  <div class="pos">
    <div>
      <el-row>
        <el-col :span="7" class="pos-order" id="order-list">
          我是订单栏

          <el-tabs>
            <el-tab-pane label="点餐">
              <el-table :data="tableData" border show-summary  style='width:100%'>
                  <el-table-column prop="goodsName" label="商品名称"></el-table-column>
                  <el-table-column prop="count" label="数量" width="50"></el-table-column>
                  <el-table-column prop="price" label="金额" width="70"></el-table-column>
                  <el-table-column prop="操作" label="操作" width="100" fixed="right">

                      <template slot-scope="scope">
                           <el-button type="text" size='small'>删除</el-button>
                           <el-button type="text" size="small">增加</el-button>           
                      </template>

                  </el-table-column>
              </el-table>
                   <div class="div-btn">
                     <el-button type="warning">挂单</el-button>
                     <el-button type="danger">删除</el-button>
                     <el-button type="success">结账</el-button>
                         
                   </div>
            </el-tab-pane>
 <el-tab-pane label="挂单"></el-tab-pane>
 <el-tab-pane label="外卖"></el-tab-pane>
 
          </el-tabs>
        </el-col>
        <!-- 商品展示 -->
        <el-col :span="17">
          我是产品栏
        </el-col>
      </el-row>
      </div> 


  </div>
</template>

<script>
export default {
  name: 'Pos',
  data () {
    return {
      tableData: [{
          
          goodsName: '可口可乐',
          price: 8,
          count:1
        }, {
          
          goodsName: '香辣鸡腿堡',
          price: 15,
          count:1
        }, {
         
          goodsName: '爱心薯条',
          price: 8,
          count:1
        }, {
         
          goodsName: '甜筒',
          price: 8,
          count:1
        }]
    }
  },
  mounted(){
    var orderHeight=document.body.clientHeight;
    document.getElementById('order-list').style.height=orderHeight+'px';
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .pos {
    text-align: center;
    padding-left: 20px;
  }
  .pos-order {
    height: 100vh;
  }

  .div-btn {
    margin-top: 20px;
  }
</style>
