<style lang="less" rel="stylesheet/less">
.single-contact {
  .title {
    color: #646464;
    font: 16px/20px Futura;
  }

  .info {
    height: 170px;
    box-shadow: 0px 3px 6px #00000029;
    background: #fff 0% 0% no-repeat padding-box;

    .avatar {
      display: flex;
      align-items: center;

      .icon {
        width: 98px;
        height: 98px;
        margin: 14px 0 14px 26px;
      }
      .name-area {
        & > div:first-child {
          display: flex;
          align-items: center;

          .name {
            padding-right: 20px;
            color: #5d5d5d;
            font: 26px/34px Futura;
          }
          .new {
            padding: 4px 16px;
            color: #fff;
            font: 10px/12px Futura;
            border-radius: 10px;
            background: #b152d5 0% 0% no-repeat padding-box;
          }
        }
      }
      .status {
        display: table-cell;
        padding: 4px 12px;
        border: 2px solid #fdd15b;
        border-radius: 10px;
        margin-top: 8px;
        vertical-align: middle;
        text-align: center;

        color: #6a6a6a;
        font: 10px/12px Futura;

        &.progress {
          border: none;
          background: #fdd35b 0% 0% no-repeat padding-box;
        }
        &.hired {
          padding: 4px 20px;
          color: #fff;
          border: none;
          background: #63d01f 0% 0% no-repeat padding-box;
        }
      }
    }
    .menu-icon {
      display: flex;
      justify-content: space-evenly;
      align-items: baseline;
    }
  }
  .contact-detail {
    box-shadow: 0px 3px 6px #00000029;
    background-color: transparent;
    .title {
      display: flex;
      justify-content: space-between;
      padding: 14px 20px 6px 20px;

      a {
        opacity: 0.5;
        // &:hover{
        //   color:#6f50ff;
        //   opacity: 1;
        // }
      }
    }
    ul {
      padding: 20px;
      text-align: left;
      background-color: #fff;
      box-shadow: 0px 3px 6px #00000029;
      .row {
        display: flex;
        .left {
          width: 80px;
          padding-right: 28px;
          text-align: left;

          color: #646464;
          font: 16px/21px Futura;
        }
        .right {
          text-align: left;
          color: #9b9b9b;
          font: 500 16px/20px Futura;
        }
      }
      .row + .row {
        margin-top: 14px;
      }
    }
  }
  .call-detail {
    background: #fff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    background-color: transparent;
    .title {
      text-align: left;
      padding: 14px 20px 6px 20px;
    }
    .content {
      display: flex;
      position: relative;
      align-items: flex-start;

      padding: 10px 0 18px 0;
      background-color: #fff;

      .icon-area {
        width: 98px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .plus > img {
          width: 28px;
          height: 28px;
        }
        .line {
          position: absolute;
          top: 38px;
          bottom: -10px;
          z-index: 10;
          width: 1px;
          background-color: #7048ff;
        }
      }
      .text-area {
        text-align: left;
        .text-box {
          .status {
            color: #646464;
            font: 16px/20px Futura;
          }
          .date {
            margin-top: 6px;
            text-align: left;
            color: #918e8e;
            font: 10px/12px Futura;
          }
        }
        .text-box + .text-box {
          margin-top: 20px;
        }
      }
    }
  }
}
</style>

<template>
  <article class="single-contact">
    <CDialog v-show="isShowDialog" :actionList="actionList" @onClose="onCloseDialog" @onAction="onAction"  />
    <section class="info">
      <div class="avatar">
        <img class="icon" src="images/avatar.png" />

        <div class="name-area">
          <div>
            <div class="name">John Chan</div>
            <div v-if="$route.params.pageId === 'testSingleContact'" class="new">New</div>
          </div>
          <div :class="stageClass" @click="showDialog($route.query.callStatus)">{{ $route.query.callStatus }}</div>
        </div>
      </div>
      <div class="menu-icon">
        <img v-for="url in menuIconUrls" :key="url" :src="url" @click="toPage(url)" />
      </div>
    </section>
    <section class="contact-detail">
      <h5 class="title"><span >Contact Detail</span><a class="right" @click="toPage('Edit')">Edit</a></h5>
      <ul>
        <li class="row" v-for="(value, key) in contactList" :key="key">
          <div class="left">{{ key }}</div>
          <div class="right">{{ value }}</div>
        </li>
      </ul>
    </section>
    <section class="call-detail">
      <h5 class="title"><span>Activities</span></h5>
      <div class="content" v-for="(item, index) in callRecordList" :key="index">
        <div class="icon-area">
          <div class="plus">
            <img :src="item.img" :style="item.style" />
          </div>
          <div v-if="index !== callRecordList.length - 1" class="line"></div>
        </div>
        <div class="text-area">
          <div class="text-box">
            <div class="status">{{ item.status }}</div>
            <div class="date" v-for="desc in item.details" :key="desc">{{ desc }}</div>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script type="text/babel">
// 组件
import CDialog from "@/components/CDialog"
import { formatDate } from "@/utils"
export default {
  name: "singleContact",
  components: { CDialog },
  props: {
  },
  data() {
    return {
      isShowDialog: false,
      actionList: ["Mark as Hired", "Follow Up"],
      stageClass: ["status"],
      menuIconUrls: ["images/feather-phone-outgoing.svg", "images/email.png", "images/feather-message-square.svg", "images/ionic-ios-calendar.svg", "images/feather-file-plus.svg"],
      callRecordList: [],
      contactList: [],
    }
  },
  computed: {
    isActive() {
      return this.$route.query.callStatus === "In Progress"
    }
  },
  watch: {
    $route(to, from) {
      this.setPage()
    }
  },
  created() {
    this.setPage()
  },
  methods: {
    onAction(type) {
      switch (type) {
        case "Mark as Hired":
          const { callRecordList, contactList } = this.$route.query;
          let addRecord = [{ img: "images/hired.png", style: "width:24px;height:38px;", status: "Hired", details: [formatDate(new Date()), "A quick win!"] }].concat(JSON.parse(callRecordList))
          this.$router.push({
            path: "/singleContact/TestHiredCompleted",
            query: {
              contactList,
              callStatus: "Hired",
              callRecordList: JSON.stringify(addRecord)
            } })
          break;
        default:
          break;
      }
    },
    showDialog(pageId) {
      if (pageId === "In Progress") {
        this.isShowDialog = true
      }
    },
    onCloseDialog() {
      this.isShowDialog = false
    },
    toPage(url) {
      if ((url === this.menuIconUrls[0] || url === "Edit") && !["In Progress", "Hired"].includes(this.$route.query.callStatus)) {
        this.$router.push({
          path: "/logCall/testLogCall",
          query: { ...this.$route.query }
        })
      }
    },
    setPage() {
      const { callRecordList, contactList } = this.$route.query
      this.contactList = contactList ? JSON.parse(contactList) : [];
      this.callRecordList = callRecordList ? JSON.parse(callRecordList) : [];
      switch (this.$route.params.pageId) {
        case "TestCalled": {
          this.stageClass = ["status", "progress"]
          break
        }
        case "TestHiredCompleted": {
          this.stageClass = ["status", "hired"]
          break
        }

        default:
          break
      }
    }
  }
}
</script>
