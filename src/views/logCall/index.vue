<style lang="less" rel="stylesheet/less">
.test-log-call {
  .log-call {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 68px;

    background: #fff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    span {
      padding-left: 10px;
      font: 24px/32px Futura;
      color: #7048ff;
    }
  }
  .title {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 14px 20px 6px 20px;
    span:first-child {
      font: 16px/20px Futura;
      color: #646464;
    }
    span:last-child {
      font: 10px/12px Futura;
      color: #918e8e;
    }
  }
  .log {
    position: relative;
    background: #fff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;

    textarea {
      width: 100%;
      height: 364px;
      padding: 28px 20px;
      color: #d6d6d6;
      font: Italic 16px/20px Futura;
      border: none;

      &:focus {
        font: 20px/26px Futura;
        color: #626262;
        outline: none;
      }
    }
  }

  button {
    position: absolute;
    width: 94px;
    height: 32px;

    left: 50%;
    bottom: 20px;
    transform: translateX(-50%);

    border-radius: 16px;

    color: #fff;
    font: 16px/20px Futura;

    box-shadow: 0px 3px 6px #00000029;
    background: #cecece 0% 0% no-repeat padding-box;

    &.active {
      background: #63d21f 0% 0% no-repeat padding-box;
    }
  }
}
</style>

<template>
  <article class="test-log-call">
    <section class="log-call">
      <img src="images/feather-phone-outgoing.svg" />
      <span>Log Call</span>
    </section>
    <section class="title">
      <span>Call Detail</span>
      <span>{{enterPageTime}}</span>
    </section>
    <section class="log">
      <textarea id="js-log-textarea" v-model="inputLog" placeholder="What have you discussed?" @focus="setVisible" />
      <button :class="isEditActive" @click="onSubmitLog">Log</button>
    </section>
  </article>
</template>

<script type="text/babel">
import { formatDate } from "@/utils"
// 组件
export default {
  name: "singleContact",
  components: {},
  data() {
    return {
      inputLog: "",
      enterPageTime: formatDate(new Date())
    }
  },
  computed: {
    isEditActive() {
      return this.inputLog ? "active" : ""
    }
  },
  created() {
    const { inputLog } = this.$route.query;
    this.inputLog = inputLog || ""
  },
  mounted() {

  },
  methods: {
    setVisible() {
      let element = document.getElementById("js-log-textarea")
      element.scrollIntoView()
    },
    onSubmitLog() {
      const { callRecordList, contactList } = this.$route.query;
      let addRecord = [{ img: "images/phone.png", status: "Call", details: [formatDate(new Date()), this.inputLog] },
      ].concat(JSON.parse(callRecordList))
      this.$router.push({ path: "/singleContact/TestCalled",
        query: {
          callStatus: "In Progress",
          contactList,
          callRecordList: JSON.stringify(addRecord),
        } })
    }
  }
}
</script>
