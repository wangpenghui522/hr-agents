<template>
  <div id="app">
    <CHeader  v-if="showNav" :title="name" />

    <transition :name="direction">

      <router-view class="page" />

    </transition>
  </div>
</template>

<script>
import CHeader from "@/components/CHeader"
export default {
  name: "App",
  components: {
    CHeader
  },
  data() {
    return {
      name: "",
    }
  },
  computed: {
    showNav() {
      return this.name && this.$route.path !== "/"
    },
    // 动态设置过渡样式
    direction: function() {
      const currentPath = this.$route.path
      const localRoute = (window.myVue && window.myVue.localRoute) || []
      // console.log(localRoute, currentPath);
      const index = localRoute.indexOf(currentPath)
      let tranName = ""

      if (localRoute.length === 0) {
        tranName = "fade" // 首页，渐显
      } else if (index >= 0) {
        tranName = "page-back" // 回退，右划
      } else {
        tranName = "page-go" // 进入新页面，左划
      }
      return tranName
    }
  },
  watch: {
    $route(to, from) {
      this.name = sessionStorage.getItem("user");
    }
  },
  created() {
    console.log("欢迎访问...")
  },
  methods: {}
}
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;

  cursor: default;
  font-weight: 500;

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.8s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  .page {
    background: #f4f4f4 0% 0% no-repeat padding-box;
    transition: all 0.8s ease-in-out;
    width: 100%;
    height: 100%;
    position: absolute;

  }
  .page-go-enter-active {
    transform: translate3d(100%, 0, 0);
    // transition: all 0.8s ease-in-out;
  }
  .page-go-enter-to {
    transform: translate3d(0, 0, 0);
    // transition: all 0.8s ease-in-out;
  }
  .page-go-leave-active {
    transform: translate3d(0, 0, 0);
    // transition: all 0.8s ease-in-out;
  }
  .page-go-leave-to {
    transform: translate3d(-100%, 0, 0);
    // transition: all 0.8s ease-in-out;
  }
  .page-back-enter-active {
    transform: translate3d(-100%, 0, 0);
    // transition: all 0.8s ease-in-out;
  }
  .page-back-enter-to {
    transform: translate3d(0, 0, 0);
    // transition: all 0.8s ease-in-out;
  }
  .page-back-leave-active {
    transform: translate3d(0, 0, 0);
    // transition: all 0.8s ease-in-out;
  }
  .page-back-leave-to {
    transform: translate3d(100%, 0, 0);
    // transition: all 0.8s ease-in-out;
  }
}
</style>
