<template>
  <div
    class="wrapper"
    :style="{
      backgroundImage: 'url(' + bodobj + ')',
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
      position: 'fixed',
    }"
  >
    <div class="drag">
      <div class="headTab">
        <iframe
          class="iframe"
          name="weather_inc"
          src="http://i.tianqi.com/index.php?c=code&id=111"
          width="64%"
          height="100"
          frameborder="0"
          marginwidth="0"
          marginheight="0"
          scrolling="no"
        ></iframe>
      </div>

      <div class="welcome">
        <!-- <img src="http://129.204.226.230/images/rabbit.png" alt /> -->
        <span>欢迎使用-LinkTools </span>
      </div>
      <div class="head">
        <template>
          <el-tabs :tab-position="tabPosition" class="tab">
            <el-tab-pane
              v-for="(tabinfo, index1) in tapvalue"
              :key="index1"
              :label="tabinfo.typeName"
            >
              <div>
                <el-card
                  @mouseenter.native="mouseOver(index1, index2)"
                  @mouseleave.native="mouseLeave(index1, index2)"
                  v-for="(info, index2) in tabinfo.linkList"
                  :key="index2"
                  :style="info.style"
                  class="infocard"
                  shadow="hover"
                >
                  <div style="width: 100px; height: 47px">
                    <img
                      :src="
                        info.linkImage == ''
                          ? 'http://img.netbian.com/file/2020/0828/24f6fab40f7cb88c6ab720e5182bbe2f.jpg'
                          : info.linkImage
                      "
                      :title="info.linkName"
                      style="width: 100%; height: 100%; margin-left: 30%"
                    />
                  </div>
                  <a
                    style="
                      text-align: center;
                      display: block;
                      margin-top: 5px;
                      font-family: 宋体;
                      font-size: 16px;
                    "
                    @click="go(info.linkUrl)"
                    target="_blank"
                    :title="info.linkName"
                    >{{ info.linkName }}</a
                  >
                </el-card>
              </div>
            </el-tab-pane>
          </el-tabs>
        </template>
        <img
          id="img5"
          src="http://106.12.159.112:9000/picture/%E9%A3%8E%E8%BD%A6.png"
          class="fengche"
          title="换个背景"
          @click="changebj"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";
export default {
  props: {},
  data() {
    return {
      userName: "",
      loginSate: true, //true 未登录状态/false已登录状态
      mouserState: false,
      popup: false,
      register: false,
      tabPosition: "left",
      tapvalue: [],
      ip: "",
      area: "",
      brower: "",
      os: "",
      bodobj: "",
      active: "",
      background: [
        {
          img:
            "http://106.12.159.112:9000/picture/1574774120247.jpeg",
        },
        {
          img:
            "http://www.4kbizhi.com/d/file/2020/09/05/small16585880eMw1599296338.jpg",
        },
      ],
      sjs: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
    getLoginStae() {
      var ses = window.localStorage;
      var user = ses.getItem("token");
      var account = ses.getItem("account");
      if (user != null && user !== "") {
        this.loginSate = false;
        this.userName = account;
      } else {
        this.loginSate = true;
      }
    },
    go(path) {
      window.location.href = path;
    },
    loginOut() {
      var ses = window.localStorage;
      ses.removeItem("token");
      this.getLoginStae();
    },
    mouserIn() {
      this.mouserState = true;
    },
    mouserOut() {
      this.mouserState = false;
    },
    //打开登录页面
    showLoginPopup() {
      this.popup = true;
    },
    //打开注册页面
    showRegisterPopup() {
      this.popup = true;
      this.register = true;
    },
    //关闭活动规则页面
    closepopup() {
      this.popup = false;
      this.register = false;
    },
    getLjxx: function () {
      // 为给定 ID 的 user 创建请求
      axios.get("/api/link/getLink").then((res) => {
        console.log(res);
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].linkList.forEach((item) => {
            item.style = "";
          });
        }
        this.tapvalue = res.data;
      });
    },
    backgroundImg: function () {
      var sjsz = Math.ceil(Math.random() * this.background.length);
      if (this.sjs == sjsz) {
        if (sjsz > 1) {
          sjsz = sjsz - 1;
        } else {
          sjsz = sjsz + 1;
        }
      }
      this.sjs = sjsz;
      this.bodobj = this.background[sjsz - 1].img;
    },
    mouseOver: function (index1, index2) {
      let r, g, b;
      r = Math.floor(Math.random() * 256);
      g = Math.floor(Math.random() * 256);
      b = Math.floor(Math.random() * 256);
      this.tapvalue[index1].linkList[index2].style =
        "background-color:rgb(" +
        r +
        "," +
        g +
        "," +
        b +
        ");transform: scale(1);transition: all 0.5s linear;";
    },
    mouseLeave: function (index1, index2) {
      this.tapvalue[index1].linkList[index2].style = "";
    },
    bjxz: function () {
      $("#img5").rotate({
        angle: 0,
        animateTo: 360,
        callback: this.bjxz,
        easing: function (x, t, b, c, d) {
          // t: current time, b: begInnIng value, c: change In value, d: duration
          return c * (t / d) + b;
        },
      });
    },
    changebj: function () {
      this.backgroundImg();
    },
    openCenter(content, type) {
      this.$message({
        message: content,
        center: true,
        type: type,
      });
    },
  },
  created() {},
  mounted() {
    this.getLjxx();
    this.backgroundImg();
    //this.bjxz();
    //this.getLoginStae();
  },
};
</script>
<style lang="less" scoped>
@import "../assets/css/rlstyle.css";
@import "../assets/css/sy.css";

.rule {
  position: absolute;
  width: 0.82rem;
  height: 0.36rem;
  top: 0.08rem;
  right: 0rem;
  background: #111111;
}
.login {
  position: fixed;
  font-size: 24px;
  height: 500px;
  width: 700px;
  background-color: rgb(207, 189, 189);
  border-radius: 0.25rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
.over {
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 0.7; //透明度为70%
  filter: alpha(opacity=70);
  top: 0;
  left: 0;
  z-index: 999;
  background-color: #111111;
}
</style>
