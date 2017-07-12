<template>
  <!-- Modal -->
  <div class="modal fade" :class="{dark:dark}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" :class="[small?'':'modal-lg']" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title" id="myModalLabel">{{title}}</h4>
        </div>
        <div class="modal-body content">
          <slot>
            没有相关信息。
          </slot>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'my-modal',
  props: {
    option: {
      type: Object,
      default() { return { visable: false } },
      required: true
    },
    title: {
      type: String,
      default: 'Title'
    },
    small: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },
  watch: {
    'option': function (val, oldVal) {
      console.log(val)
      if (val.visable) {
        this.show()
      } else {
        this.hide()
      }


    },
  },
  mounted() {
    this.$root.$on("modalHideAll",p=>{
      this.hide()
    })
    $(this.$el).on('shown.bs.modal', function (e) {

    })
    $(this.$el).on('hidden.bs.modal', function (e) {

    })
  },
  methods: {
    show() {
      $(this.$el).modal()
    },
    hide() {
      $(this.$el).modal('hide')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../assets/animate.less';
.dark {
  .modal-header {
    border-bottom: #999;
    .close {
      color: white;
      opacity: 0.9;
    }
  }
  .modal-content {
    background-color: rgba(40, 40, 40, 0.9);
  }
  .modal-footer {
    border-top: #999;
    .btn-default {
      background-color: rgba(80, 80, 80, 0.8);
      color: #ddd;
    }
  }
}
</style>
