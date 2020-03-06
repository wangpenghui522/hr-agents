<!--顶部header组件-->
<template>
  <div class="dialog" @click="$emit('onClose')">
    <ul class="action">
      <li v-for="action in actionList" :key="action" @click="$emit('onAction',action)">{{action}}</li>
    </ul>

    <div class="cancel">Cancel</div>
  </div>
</template>

<script type="text/babel">
/**
 * BaseHeader 顶部header组件
 * @props 参数 title: 标题文本 （String 默认:'标题'）
 */
export default {
  name: "BaseHeader",
  props: {
    onClose: {
      type: Function,
      default: () => {}
    },
    actionList: {
      type: Array,
      default: () => []
    },
    onAction: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  computed: {
    mainTitle() {
      return this.title || (this.$route.meta && this.$route.meta.title)
    }
  },
  methods: {
    handleLeft: function() {
      this.$emit("handle-left")
    },
    handleRight: function() {
      this.$emit("handle-right")
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
.dialog {
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background: #00000066 0% 0% no-repeat padding-box;
  z-index: 100;
  overflow: hidden;

  .action {
    position: absolute;
    background: #f9f9f9c7 0% 0% no-repeat padding-box;
    border-radius: 14px;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    left: 8px;
    right: 8px;
    width: calc(100% - 16px);
    bottom: 122px;
    font: 20px/24px SF Pro Text;
    letter-spacing: -0.48px;
    color: #007aff;
    text-align: center;
    li {
      padding: 16px 0;
    }
    li + li {
      border-top: 1px solid #ccc;
    }
  }

  .cancel {
    position: absolute;
    left: 8px;
    right: 8px;
    bottom: 50px;
    height: 62px;
    line-height: 62px;
    width: calc(100% - 16px);
    background: #ffffff 0% 0% no-repeat padding-box;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font: 20px/24px SF Pro Text;
    letter-spacing: -0.48px;
    color: #007aff;
  }
}
</style>
