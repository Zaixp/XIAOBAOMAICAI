<template>
 <van-sku
  v-model="skuShow"
  :sku="sku"
  :goods="goods"
  :goods-id="goodsId"
  @buy-clicked.prevent="onBuyClicked()"
  @add-car.prevent="onAddCartClicked()"
/>
</template>
<script>
export default {
  name:'Sku',
  props:{
   skuShow:Boolean,
   product:Object
  },
  watch:{
 
  }
  ,
  data() {
    return {
      sku: {
        // 数据结构见下方文档
         tree: [
    {
      k: '种类', // skuKeyName：规格类目名称
      v: [
        {
          id: this.product.id, // skuValueId：规格值 id
          name: this.product.name, // skuValueName：规格值名称
          imgUrl: this.product.small_image, // 规格类目图片，只有第一个规格类目可以定义图片
          previewImgUrl: this.product.small_image, // 用于预览显示的规格类目图片
        },
      
      ],
      k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
    }
  ],
  // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
  list: [
    {
      id: 2259, // skuId，下单时后端需要
      price: 100, // 价格（单位分）
      s1: this.product.id, // 规格类目 k_s 为 s1 的对应规格值 id
    
      stock_num: 110 // 当前 sku 组合对应的库存
    }
  ],
    // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
  // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
  list: [
  ],
  price: this.product.price, // 默认价格（单位元）
  stock_num: 227, // 商品总库存
   collection_id: this.product.id, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
  none_sku: true, // 是否无规格商品
  messages: [
    {
      // 商品留言
      datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
      multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
      name: '留言', // 留言名称
      type: 'text', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
      required: '1', // 是否必填 '1' 表示必填
      placeholder: '可以为卖家留言' // 可选值，占位文本
    }
  ],
      },
    
       goodsId: this.product.id
      ,
      goods: {
        // 数据结构见下方文档
          // 商品标题
         
    title: '测试商品',
  // 默认商品 sku 缩略图
  picture: this.product.small_image
      },
  
  // placeholder 配置
  placeholderMap: {
    text: 'xxx',
    tel: 'xxx',
  
      }
    };
  }
   ,methods:{
      onBuyClicked()
      {

        console.log(12);
      },
      onAddCartClicked()
      {
console.log(12);
      }

   }

}
</script>
