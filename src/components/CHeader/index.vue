<!--顶部header组件-->
<template>
  <header class="header">
    <div class="back-arrow" @click="$router.go(-1)"></div>
    <div class="title">{{ title }}</div>
  </header>
</template>

<script type="text/babel">
/**
 * @props 参数 title: 标题文本 （String 默认:'标题'）
 */
export default {
  name: "CHeader",
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
.header {
  display: flex;
  align-items: baseline;
  height: 85px;

  padding: 44px 12px 17.38px 14px;

  font: 20px/27px Futura;

  text-align: center;
  background: #6f50ff 0% 0% no-repeat padding-box;

  .back-arrow {
    width: 14px;
    height: 14px;
    border-bottom: 2px solid #fff;
    border-left: 2px solid #fff;
    transform: rotate(45deg);
  }
  .title {
    color: #fff;
    flex: 1 1 auto;
  }
}
</style>
