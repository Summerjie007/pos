<template>
  <!-- //Vue 2.0版本需要一个跟组件 -->
  <div class="pos">
    <div>
      <el-row>
        <el-col :span="7" class="pos-order" id="order-list">
          我是订单栏

          <el-tabs>
            <el-tab-pane label="点餐">
              <el-table :data="tableData" border style='width:100%'>
                <el-table-column prop="goodsName" label="商品名称"></el-table-column>
                <el-table-column prop="count" label="数量" width="50"></el-table-column>
                <el-table-column prop="price" label="金额" width="70"></el-table-column>
                <el-table-column prop="操作" label="操作" width="100" fixed="right">

                  <template slot-scope="scope">
                    <el-button type="text" size='small' @click="delGoods(scope.row)">删除</el-button>
                    <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                  </template>

                </el-table-column>
              </el-table>
              <div class="totalDiv">
                <span>数量：{{totalCount}}</span>&nbsp;&nbsp; &nbsp; &nbsp;
                <span> 金额：{{totalMoney}}元</span>

              </div>

              <div class="div-btn">
                <el-button type="warning">挂单</el-button>
                <el-button type="danger" @click="delAllGoods()">删除</el-button>
                <el-button type="success" @click="checkOut">结账</el-button>

              </div>
            </el-tab-pane>
            <el-tab-pane label="挂单"></el-tab-pane>
            <el-tab-pane label="外卖"></el-tab-pane>

          </el-tabs>
        </el-col>
        <!-- 商品展示 -->
        <el-col :span="17">
          我是产品栏

          <div class="often-goods">
            <div class="title">常用商品</div>
            <div class="often-goods-list">
              <ul>
                <li v-for=" (ofgood,index) in oftenGoods" :key=index @click="addOrderList(ofgood)">
                  <span>{{ofgood.goodsName}}</span>
                  <span class="o-price">¥{{ofgood.price}}元
                  </span>

                </li>
              </ul>
            </div>
          </div>
          <!-- 下半部分的布局 -->


          <div class="goods-type">
            <el-tabs>
              <el-tab-pane label="汉堡">
                <!-- 汉堡 -->
                <ul class="cookList">

                  <li v-for="(typegood,index) in type0Goods" :key=index @click="addOrderList(typegood)">
                    <span class="foodImg">
                      <img :src="typegood.goodsImg" width="100%" alt="">
                    </span>
                    <span class="foodName">{{typegood.goodsName}}</span>
                    <span class="foodPrice"> ¥{{typegood.price}}元</span>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="小食">
                <!-- 小食 -->
                <ul class="cookList">

                  <li v-for="(typegood,index) in type1Goods" :key=index @click="addOrderList(typegood)">
                    <span class="foodImg">
                      <img :src="typegood.goodsImg" width="100%" alt="">
                    </span>
                    <span class="foodName">{{typegood.goodsName}}</span>
                    <span class="foodPrice"> ¥{{typegood.price}}元</span>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="炸鸡">
                <!-- 炸鸡 -->
                <ul class="cookList">

                  <li v-for="(typegood,index) in type2Goods" :key=index @click="addOrderList(typegood)">
                    <span class="foodImg">
                      <img :src="typegood.goodsImg" width="100%" alt="">
                    </span>
                    <span class="foodName">{{typegood.goodsName}}</span>
                    <span class="foodPrice"> ¥{{typegood.price}}元</span>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="全家桶">
                <!-- 全家桶 -->
                <ul class="cookList">

                  <li v-for="(typegood,index) in type3Goods" :key=index @click="addOrderList(typegood)">
                    <span class="foodImg">
                      <img :src="typegood.goodsImg" width="100%" alt="">
                    </span>
                    <span class="foodName">{{typegood.goodsName}}</span>
                    <span class="foodPrice"> ¥{{typegood.price}}元</span>
                  </li>
                </ul>
              </el-tab-pane>
            </el-tabs>
          </div>

        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
  import axios from "axios";
  export default {
    name: "Pos",
    data() {
      return {
        totalMoney: 0,
        totalCount: 0,
        oftenGoods: [],
        type0Goods: [],
        type1Goods: [],
        type2Goods: [],
        type3Goods: [],
        tableData: [],
        // tableData: [
        //   {
        //     goodsName: "可口可乐",
        //     price: 8,
        //     count: 1
        //   },
        //   {
        //     goodsName: "香辣鸡腿堡",
        //     price: 15,
        //     count: 1
        //   },
        //   {
        //     goodsName: "爱心薯条",
        //     price: 8,
        //     count: 1
        //   },
        //   {
        //     goodsName: "甜筒",
        //     price: 8,
        //     count: 1
        //   }
        // ]
        //   oftenGoods:[
        //     {
        //         goodsId:1,
        //         goodsName:'香辣鸡腿堡',
        //         price:18
        //     }, {
        //         goodsId:2,
        //         goodsName:'田园鸡腿堡',
        //         price:15
        //     }, {
        //         goodsId:3,
        //         goodsName:'和风汉堡',
        //         price:15
        //     }, {
        //         goodsId:4,
        //         goodsName:'快乐全家桶',
        //         price:80
        //     }, {
        //         goodsId:5,
        //         goodsName:'脆皮炸鸡腿',
        //         price:10
        //     }, {
        //         goodsId:6,
        //         goodsName:'魔法鸡块',
        //         price:20
        //     }, {
        //         goodsId:7,
        //         goodsName:'可乐大杯',
        //         price:10
        //     }, {
        //         goodsId:8,
        //         goodsName:'雪顶咖啡',
        //         price:18
        //     }, {
        //         goodsId:9,
        //         goodsName:'大块鸡米花',
        //         price:15
        //     }, {
        //         goodsId:20,
        //         goodsName:'香脆鸡柳',
        //         price:17
        //     }

        // ],
        //  type0Goods:[
        //     {
        //         goodsId:1,
        //         goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos001.jpg",
        //         goodsName:'香辣鸡腿堡',
        //         price:18
        //     }, {
        //         goodsId:2,
        //         goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos002.jpg",
        //         goodsName:'田园鸡腿堡',
        //         price:15
        //     }, {
        //         goodsId:3,
        //         goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos004.jpg",
        //         goodsName:'和风汉堡',
        //         price:15
        //     }, {
        //         goodsId:4,
        //          goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos003.jpg",
        //         goodsName:'快乐全家桶',
        //         price:80
        //     }, {
        //         goodsId:5,
        //          goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos003.jpg",
        //         goodsName:'脆皮炸鸡腿',
        //         price:10
        //     }, {
        //         goodsId:6,
        //          goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos004.jpg",
        //         goodsName:'魔法鸡块',
        //         price:20
        //     }, {
        //         goodsId:7,
        //          goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos001.jpg",
        //         goodsName:'可乐大杯',
        //         price:10
        //     }, {
        //         goodsId:8,
        //          goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos003.jpg",
        //         goodsName:'雪顶咖啡',
        //         price:18
        //     }, {
        //         goodsId:9,
        //          goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos002.jpg",
        //         goodsName:'大块鸡米花',
        //         price:15
        //     }, {
        //         goodsId:20,
        //          goodsImg:"http://7xjyw1.com1.z0.glb.clouddn.com/pos002.jpg",
        //         goodsName:'香脆鸡柳',
        //         price:17
        //     }

        // ],
      };
    },

    methods: {
      //添加订单列表的方法 
      addOrderList(goods) {
        this.totalMoney = 0;
        this.totalCount = 0;
        let isHave = false;
        //判断这个商品是否已经存在于订单列表 
        for (let i = 0; i < this.tableData.length; i++) {
          console.log(this.tableData[i].goodsId);
          if (this.tableData[i].goodsId == goods.goodsId) {
            isHave = true;
          }
        }
        //根据isHave的值判断订单列表中是否已经有此商品 
        if (isHave) {
          //如果存在就进行数量的增加 
          let arr = this.tableData.filter(a => a.goodsId == goods.goodsId);
          arr[0].count++;
        } else {
          let newGoods = {
            goodsId: goods.goodsId,
            goodsName: goods.goodsName,
            price: goods.price,
            count: 1
          };
          this.tableData.push(newGoods);
        };
        //进行数量和价格的汇总计算 
        this.getAllMoney();

      },
      //  删除单个商品
      delGoods(goods) {
        this.tableData = this.tableData.filter(a => a.goodsId !== goods.goodsId)
        this.getAllMoney();
      },

      // 删除所有的商品 

      delAllGoods() {
        this.tableData = [];
        this.totalMoney = 0;
        this.totalCount = 0;
      },
        // 模拟结账

        checkOut(){
          if(this.totalCount!==0){
            this.tableData=[];
            this.totalCount=0;
            this.totalMoney=0;
            this.$message({
              message:'结账成功,你好棒,你很快就会升职加薪的',
              type:'success'
            })
          }else {
            this.$message.error("不能空结账,老板了解你的急切心情")
          }
        },

      //封装汇总的金额跟数量     
      getAllMoney() {

        this.totalMoney = 0;
        this.totalCount = 0;
        if (this.tableData) {
          this.tableData.forEach(element => {
            this.totalCount += element.count;
            this.totalMoney += element.count * element.price;
          });
        }
      }


    },
    created() {
      axios
        .get("http://jspang.com/DemoApi/oftenGoods.php")
        .then(res => {
          // console.log(res);
          this.oftenGoods = res.data;
        })
        .catch(err => {
          console.log(err);
          alert("网络不能访问");
        });
      axios
        .get("http://jspang.com/DemoApi/typeGoods.php")
        .then(res => {
          console.log(res);
          this.type0Goods = res.data[0];
          this.type1Goods = res.data[1];
          this.type2Goods = res.data[2];
          this.type3Goods = res.data[3];
        })
        .catch(err => {
          console.log(err);
          alert("网络不能访问");
        });
    },
    mounted() {
      var orderHeight = document.body.clientHeight;
      document.getElementById("order-list").style.height = orderHeight + "px";
    }
  };
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

  .title {
    height: 20px;
    border-bottom: 1px solid #d3dce6;
    background-color: #f9fafc;
    padding: 10px;
  }

  .often-goods-list ul li {
    list-style: none;
    float: left;
    border: 1px solid #e5e9f2;
    padding: 10px;
    margin: 5px;
    background-color: #fff;
  }

  .o-price {
    color: #58b7ff;
  }

  .goods-type {
    clear: both;
  }

  .cookList li {
    list-style: none;
    width: 23%;
    border: 1px solid #e5e9f2;
    height: auto;
    background-color: #fff;
    padding: 2px;
    float: left;
    margin: 2px;
  }

  .cookList li span {
    /* display: block; */
    float: left;
  }

  .foodImg {
    width: 40%;
  }

  .foodName {
    font-size: 18px;
    padding-left: 10px;
    color: brown;
  }

  .foodPrice {
    font-siez: 18px;
    padding-left: 10px;
    padding-top: 10px;
  }

  .totalDiv {
    color: wheat;
    background: green;
    padding: 10px;
    border-bottom: 1px solid #fff;
  }
</style>