<template>
    <div>
         <!-- 1.0 商品的列表 -->
      <div class="goodsListStyle">
        <div v-for="(item,index) in shopcartgoodlist" :key="item.id" class="itemStyle">
          <!-- 开关 -->
          <mt-switch @change="statisticsTotalCountAndTotalPrice" v-model="item.isSelected" class="switchStyle"></mt-switch>
          <!-- 缩略图 -->
          <div class="thumbImageStyle">
            <img :src="item.thumb_path" alt="">
          </div>
          <!-- 商品信息 -->
          <div class="goodsInfoStyle">
            <p class="titleStyle">
              {{item.title}}
            </p>
            <p>
              <span class="priceStyle">{{item.sell_price}}</span>&nbsp;&nbsp;
              <span>商品数量{{item.count}}</span>
            </p>
          </div>
          <!-- 删除按钮 -->
          <mt-button :disabled="!item.isSelected" class="deleteStyle" type="danger" size="small" @click="deleteItem(index)">删 除</mt-button>
        </div>
      </div>

      <!-- 2.0 提示信息 -->
      <div class="statisticsInfoStyle">
        <div class="totalPriceAndCountStyle">
          <h2>
            总计(不含运费)
          </h2>
          <p>
            已经勾选商品&nbsp;<span>{{totalCount}}</span>&nbsp;件,总价&nbsp;<span>{{totalPrice}}</span>&nbsp;
          </p>
        </div>
        <div>
          <mt-button class="payStyle" type="danger" size="normal">去结算</mt-button>
        </div>
      </div>
    </div>
</template>
    <style scoped>
  .itemStyle{
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(92,92,92,0.3);
  }

  .switchStyle{
    margin-left: 8px;
  }

  .thumbImageStyle{
    width: 65px;
    height: 65px;
    border: 1px solid rgba(92,92,92,0.3);
    border-radius: 5px;
    padding: 10px;
    margin-left: 5px;
  }

  .thumbImageStyle img{
    width: 100%;
    height: 100%;
  }

  .deleteStyle{
    margin-right: 10px;
  }

  .goodsInfoStyle{
    flex: 1;
    margin-left: 5px;
  }

  .titleStyle{
    font-size: 16px;
    color:#0094ff;
    overflow:hidden; 
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
  }

  .priceStyle{
    font-size: 14px;
    color: red;
  }

  /** 统计信息相关的样式 */
  .statisticsInfoStyle{
    height: 100px;
    background-color: rgba(92,92,92,0.3);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  h2{
    font-size: 18px;
  }

  .totalPriceAndCountStyle{
    margin-left: 8px;
  }

  .payStyle{
    margin-right: 8px;
  }

  .totalPriceAndCountStyle p span{
    color: red;
    font-size: 16px;
  }

</style>

<script>
import commen from "../../commen/commen.js";
import { MessageBox } from 'mint-ui'
export default {
  data() {
    return {
      shopcartgoodlist: [],
      totalCount:0,
      totalPrice:0

    };
  },
  created() {
    this.getshopcartlist();
  },
  methods: {
    getshopcartlist() {
      //获取原始shuju
      const orignalgoodslist=this.$store.getters.getGoodlist
    //   const orignalgoodslist = [
    //     { goodId: 87, count: 12 },
    //     { goodId: 88, count: 2 },
    //     { goodId: 87, count: 3 }
    //   ];

      if(orignalgoodslist==null || orignalgoodslist.length<=0){
          console.log("购物车中还没有数据")
          return
        }
      const tempobj = {};
      //把原始数据编程临时对象
      orignalgoodslist.forEach(item => {
        if (tempobj[item.goodId]) {
          tempobj[item.goodId] += item.count;
        } else {
          tempobj[item.goodId] = item.count;
        }
      });
      console.log(tempobj);

      //把tempobj中的id放到一个临时数组中
      const tempidArr = [];
      for (var key in tempobj) {
        tempidArr.push(key);
      }
      console.log(tempidArr);
      //把数组中的id变成“，”分割的字符串
      const idarrstr = tempidArr.join(",");
      const url = `${commen.apihost}api/goods/getshopcarlist/${idarrstr}`;
      this.$http.get(url).then(response => {
        // this.shopcartgoodlist=response.body.message
        response.body.message.forEach(item => {
          item.count = tempobj[item.id];
          item.isSelected=true;
        });
        this.shopcartgoodlist = response.body.message;
        this.statisticsTotalCountAndTotalPrice()
      });
    },
    statisticsTotalCountAndTotalPrice(){
         let tempTotalCount = 0
        let tempTotalPrice = 0

        this.shopcartgoodlist.forEach(item=>{
            if(item.isSelected){
                tempTotalCount+=item.count;
                tempTotalPrice+=item.count*item.sell_price
            }
        })
        this.totalCount=tempTotalCount
        this.totalPrice=tempTotalPrice
    },
    deleteItem(index){
        MessageBox.confirm('确定要删除该条数据吗').then(action=>{
          //先删除vuex中对应id的数据
          this.$store.commit('deleteGoodsById',this.shopcartgoodlist[index].id)
          //删除点击索引的数据
          this.shopcartgoodlist.splice(index,1)

           this.statisticsTotalCountAndTotalPrice()

        })
    }
  }
};
</script>