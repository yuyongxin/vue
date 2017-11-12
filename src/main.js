/*
    打包的入口文件、
*/
// Vue 是变量名 vue 是包名
import Vue from 'vue'
import App from './App.vue'
import Mint from 'mint-ui'
import vueRouter from 'vue-router'
import vueResource from 'vue-resource'
import moment from 'moment'
import vuePreview from 'vue-preview'
import Vuex from 'vuex'
    // 集成中间插件  ，都是基于vue的中间件，use以后大部分组件中就不需要引入里
    Vue.use(Mint)
    Vue.use(vueRouter)
    Vue.use(vueResource)
    Vue.use(vuePreview)
    Vue.use(Vuex)
    //导入样式
    //在这里不用写node_modules的路径，它自己会找
    import '../node_modules/mint-ui/lib/style.css'
    import './statics/mui/css/mui.css'
    import './statics/css/site.css'
    

    //全局过滤器
    Vue.filter('dateFm',(input,dateFmString)=>{
        const Fnstring=dateFmString|| 'YYYY-MM-DD HH:mm:ss' //没有传入指定要转换的格式就给它一个默认的格式
        return moment(input).format(Fnstring);
    })
    //导入组件
    import home from './components/home/home.vue'
    import category from './components/category/category.vue'
    import shopcart from './components/shopcart/shopcart.vue'
    import mime from './components/mine/mine.vue'
    import news from './components/news/news.vue'
    import newsInfo from './components/news/newsInfo.vue'
    import photolist from './components/photo/photolist.vue'
    import photoinfo from './components/photo/photoinfo.vue'
    import goodlist from './components/goods/goodlist.vue'
    import goodInfo from './components/goods/goodInfo.vue'
    import pictureandcontext from './components/goods/pictureandcontext.vue'
    import productcomments from './components/goods/productcomments.vue'
    //创建路由对象
    const router=new vueRouter({
        routes:[
            {path:'/',redirect:'/home'},
            {path:'/home',component:home},
            {path:'/category',component:category},
            {path:'/shopcart',component:shopcart},
            {path:'/mine',component:mime},
            {path:'/news/newslist',component:news},
            {path:'/news/newsInfo/:newsId',component:newsInfo},
            {path:'/photo/photolist',component:photolist},
            {path:'/photo/photoinfo/:photoid',component:photoinfo},
            {path:'/goods/goodlist',component:goodlist},
            {path:'/goods/goodInfo/:goodId',component:goodInfo},
            {path:'/test',name:"pictureandcontext",component:pictureandcontext},
            {path:'/goods/productcomments',component:productcomments}

        ]
    })
// Vuex
    const store =new Vuex.Store({
        state:{
            goodslist:[],//每次点击加入购物车存取的是一个个对象包括商品id 购买数量

        },
        getters:{
            //取得存储的数据
            getGoodstoTotalCount(state){
                const goodlist2=state.goodslist
                let totalcount=0;
                goodlist2.forEach(item=>{
                    totalcount+=item.count
                })
                return totalcount;
            },
            getGoodlist(state){
                return state.goodslist
            }
        },
        mutations:{
            savegoods(state,goods){
                //将传入的商品对象 保存到state的数组中
                state.goodslist.push(goods)
                console.log(state.goodslist)
            },
            deleteGoodsById(state,goodsIs){
                for(var i=state.goodslist.length-1;i>=0;i--){
                    console.log(state.goodslist[i])
                    if(state.goodslist[i].goodId==goodsIs){
                        state.goodslist.splice(i,1)
                    }
                }
            }
        },
         actions:{
                aysncsavegoods(context,good){
                    context.commit('savegoods',good)
                }
            }
       

    })



//创建根实例
new Vue({
    el:'#app',
    // render:function(creatElement){
    //     return creatElement(App)
    // }
    router,
    store,
    render:h=>h(App)


})