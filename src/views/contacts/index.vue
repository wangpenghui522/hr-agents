<style lang="less" rel="stylesheet/less">
.contacts {
  .header {
    height: 132px;
    padding: 42px 12px 18px 12px;
    border: 1px solid #707070;
    background: #6f50ff 0% 0% no-repeat padding-box;

    .inline-box {
      display: flex;
      justify-content: space-between;
      align-items: center;

      height: 26px;
      .menu-icon {
        width: 26px;
        height: 18px;
      }
      .contacts {
        width: 106px;
        height: 26px;

        font: 20px/26px Futura;
        color: #fff;
      }
      .user-icon {
        width: 18px;
        height: 18px;
      }
    }

    .search {
      width: 100%;
      height: 36px;
      margin-top: 15px;
      border-radius: 5px;
      text-align: center;
      font: 14px/16px Arial;
    }
  }
  .list {
    box-shadow: 0px 3px 6px #00000029;
    background: #fff 0% 0% no-repeat padding-box;
    .item + .item {
      border-top: 1px solid #ccc;
    }
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 30px;
      padding-right: 18px;
      height: 90px;

      .text {
        .first-text {
          display: flex;
          align-items: center;
          color: #5d5d5d;
          font: 20px/26px Futura;

          .status {
            margin-left: 14px;
            padding: 4px 10px;

            color: #fff;
            font: 10px/12px Futura;
            border-radius: 10px;
            background: #b152d5 0% 0% no-repeat padding-box;
          }
        }
        .second-text {
          font: 16px/20px Futura;
          color: #9b9b9b;
        }
      }

      .phone {
        width: 24px;
        height: 24px;
      }
      .email {
        width: 30px;
        height: 24px;
        margin-left: 24px;
      }
    }
  }
}
</style>

<template>
  <section class="contacts">
    <header class="header">
      <div class="inline-box">
        <img class="menu-icon" src="images/menu.png" />
        <div class="contacts">CONTACTS</div>
        <img class="user-icon" src="images/head.png" />
      </div>
      <input v-model="search" @input="nameFilter" class="search" type="text" placeholder="Search Contact" />
    </header>
    <ul class="list">
      <li class="item" @click="toPage(item)" v-for="item in showList" :key="item.name">
        <div class="text">
          <div class="first-text">
            <p>{{ item.name }}</p>
            <p v-if="item.status" class="status">{{ item.status }}</p>
          </div>
          <p class="second-text">{{ item.email }}</p>
        </div>
        <div>
          <img class="phone" src="images/feather-phone-outgoing.svg" />
          <img class="email" src="images/email.png" />
        </div>
      </li>
    </ul>
  </section>
</template>

<script type="text/babel">
// 组件
export default {
  name: "contacts",
  components: {},
  data() {
    return {
      search: "",
      showList: []
    }
  },
  created() {
    this.contactList = [
      { name: "John Chan", status: "New", email: "john@gmail.com" },
      { name: "Amy Gee", email: "Amygee@yahoo.com" }
    ]
    this.showList = JSON.parse(JSON.stringify(this.contactList))
  },
  methods: {
    nameFilter() {
      if (this.search) {
        this.showList = this.contactList.filter(item => item.name.toLowerCase().indexOf(this.search.toLowerCase()) === 0)
        console.log(this.showList);
      } else {
        this.showList = JSON.parse(JSON.stringify(this.contactList))
      }
    },
    toPage(item) {
      if (item.status) {
        sessionStorage.setItem("user", "John Chan")
        this.$router.push({ path: "/singleContact/testSingleContact",
          query: {
            name: "John Chan",
            callStatus: "Open",
            contactList: JSON.stringify({
              Email: "john@gmail.com",
              Phone: "09969712111"
            }),
            callRecordList: JSON.stringify([
              { img: "images/ionic-md-add-circle-outline.svg", status: "New contact created", details: ["12/12/2019 10:59:30am"] },
              { img: "images/awesome-wpforms.svg", status: "Form filled", details: ["12/12/2019 10:59:00am"] }
            ]),
          },
        })
      }
    }
  }
}
</script>
