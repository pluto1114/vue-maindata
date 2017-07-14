<template>
  <div class="menu">
    <div class="container">
      <a v-if="back" @click="handleRetClick" class="myback">
        <i class="fa fa-arrow-left"></i> 返回</a>
      <div style="float:right;" v-if="items.length>0">
        <div v-for="x of items" class="menu-item" :class="x.flash?'flash':''">
          <a @click="handleLinkClick(x)">{{x.name}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'my-menu',
  props: ['items', 'back', 'step', 'customHandler'],
  data() {
    return {
    }
  },
  methods: {
    handleRetClick() {
      console.log('ret')
      this.$store.commit('setDark', false)
      $(".banner").slideDown()
      if (this.step) {
        this.$router.go(this.step)
      } else {
        this.$router.go(-1)
      }
      this.$root.$emit("returnLast")
    },
    handleLinkClick(item) {
      if (item.dark) {
        this.$store.commit('setDark', true)
      }
      if (item.customEvent) {
        this.$emit(item.customEvent, item)
      } else {
        this.$router.push(item.to)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../assets/animate.less';
a {
  //.animated;
  color: white;
}

.menu {
  //background:url(../assets/red-line.png);
  background-size: cover;
  line-height: 3.5em; //min-height:48px;
  color: white;
  position: relative;
  top: -3.5em;
}

.shown-loop(@n, @i: 1) when (@i <=@n) {
  .menu-item:nth-child(@{i}) {
    animation-duration: @i*300ms;
  }
  .shown-loop(@n, (@i + 1));
}

.shown-loop(12);
.menu-item {
  padding-left: 20px;
  float: left;
  .animated;
  .slideInUp;
}

.menu-item a {
  color: white;
}

.menu-item::before {
  padding-right: 20px;
  content: "|";
}

.menu-item:nth-child(1)::before {
  content: "";
}

.flash {
  .flash; //animation-duration: 5000ms; 
  animation-iteration-count: 3;
}
</style>
