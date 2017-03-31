<template>
  <div class="app-side">
  	
  	<mu-drawer :open="open">
  	  <mu-appbar class="exmaples-nav-appbar" :zDepth="0">
      <router-link to="/" class="exmaples-appbar-title" style="display:inline-block;">主数据平台</router-link>
  	    <mu-badge content="2017" class="exmaples-version" secondary/>
  	  </mu-appbar>
  	  <mu-divider/>
      <mu-list @change="handleMenuChange" :value="menuVal">
        <mu-list-item :title="'在库物资分析'" toggleNested>
          <mu-icon value="home" slot="left"/>
          <mu-list-item slot="nested" value="#/onstore/storeGoods" :title="'当前库存统计'"/>
          <mu-list-item slot="nested" value="#/onstore/buyGoods" :title="'采购物资统计'"/>
          <mu-list-item slot="nested" value="#/colors" :title="'库存变化分析'"/>
          <mu-list-item slot="nested" value="#/colors" :title="'物资使用分析'"/>
          <mu-list-item slot="nested" value="#/colors" :title="'物资类型分析'"/>
          <mu-list-item slot="nested" value="#/colors" :title="'地域物资比较'"/>
          <mu-list-item slot="nested" value="#/colors" :title="'逻辑库分析'"/>
          <mu-list-item slot="nested" value="#/colors" :title="'排行榜'"/>
        </mu-list-item>

        <mu-list-item :title="'在建物资分析'" toggleNested>
          <mu-icon value="equalizer" slot="left"/>
          <mu-list-item slot="nested" value="#/appbar" title="在建项目物资分析"/>
          <mu-list-item slot="nested" value="#/autoComplete" title="完成项目物资分析"/>
         
          <mu-list-item slot="nested" value="#/pagination" title="归档项目物资分析"/>
          <mu-list-item slot="nested" value="#/picker" title="已用物资跟踪"/>
        </mu-list-item>
        <mu-list-item :title="'历史资源分析'" toggleNested>
          <mu-icon value="timer" slot="left"/>
          <mu-list-item slot="nested" :title="'changeLog'" value="#/changeLog"/>
          <mu-list-item slot="nested" :title="'contributing'" value="#/contributing"/>
        </mu-list-item>
      </mu-list>
    </mu-drawer> 
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'appSide',
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      menuVal:0,

    } 
  },
  methods: {
    handleMenuChange(val){
      this.menuVal = val
      
      
      
      this.$root.$emit('menu-change', val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
@import "../../src/styles/import.less";
.exmaples-drawer{
  box-shadow: none;
  border-right: 1px solid @borderColor;
}

.exmaples-nav-appbar.mu-appbar{
  background-color: @dialogBackgroundColor;
  color: @secondaryTextColor;
}
.exmaples-appbar-title{
  color: @secondaryTextColor;
  text-decoration: none;
  outline: none;
  a:hover{color:#cacdd6;}
}



.my-title{
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
}
.mu-paper-2{
  box-shadow:none;
}
</style>