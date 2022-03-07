<template>
  <div class="detail">
    <div class="drawingboard">
      <!-- 主页 -->
      <div class="shell">
        <!-- 文章标题 -->
        <div class="title">
          <h1>{{ momentInfo.title }}</h1>
        </div>
        <!-- 内容 -->
        <div class="userText">
          <!-- 作者区域 -->
          <div class="userTopHeader">
            <div class="userMessage">
              <div class="headerImg" href="#">
                <img :src="user.avatar" alt />
              </div>
              <div class="nameTime">
                <a href="#">
                  <span>{{ user.name }}</span>
                </a>
                <span class="time">{{ date }}</span>
              </div>
            </div>
            <div class="userButton">
              <div class="btn02">关注</div>
            </div>
          </div>
          <!-- 内容展示 -->
          <mavonEditor
            style="min-height: 600px; background-color: #fff"
            :subfield="false"
            codeStyle="lightfair"
            defaultOpen="preview"
            :toolbarsFlag="false"
            :ishljs="true"
            :boxShadow="false"
            :value="momentInfo.content"
          ></mavonEditor>
          <!-- 问题标签 -->
          <div class="setting">
            <span>标签：</span>
            <span v-for="label in labels" :key="label.id" class="label">
              {{
                label.name
              }}
            </span>
          </div>
        </div>
        <!-- 回答区域 -->
        <div class="comment">
          <!-- 回答问题 -->
          <div class="pushcomment">
            <div class="commenthead">回答</div>
            <div class="commentbody">
              <div class="headerImg">
                <img :src="user.avatar" alt />
              </div>
              <div class="textinput">
                <el-input
                  type="textarea"
                  :placeholder="`回答问题最多只能输入${textareaMaxChar}个字`"
                  v-model:value="pushCommentMess"
                  autosize
                  resize="none"
                  :autosize="{ minRows: 3 }"
                  :maxlength="textareaMaxChar"
                ></el-input>
                <button v-on:click="PushComment()">回答问题</button>
              </div>
            </div>
          </div>
          <!-- 所有回答 -->
          <div class="fullcomment">
            <div class="commenthead">所有回答</div>
            <div class="usercomment" v-for="answer in answerList" :key="answer.id">
              <div class="userimage">
                <img :src="answer.user.avatar" alt />
              </div>
              <div class="usercomment-body">
                <div class="username">
                  <span>{{ answer.user.name }}</span>
                </div>
                <div class="usercomment-comment">
                  <span>{{ answer.content }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 右边栏 -->
      <div class="rightsidebar">
        <div class="siderTop">
          <div class="userMessage">
            <div class="headerImg">
              <img :src="user.avatar" />
            </div>
            <div class="message">
              <span class="userName">{{ user.name }}</span>
              <div class="userType">前端 后端</div>
            </div>
          </div>
          <div class="userFriend">
            <div class="heart">
              <i class="fa fa-heart"></i>
              <span>粉丝: 2088</span>
            </div>
            <div class="pen">
              <i class="fa fa-pencil"></i>
              <span>创作: 30</span>
            </div>
          </div>
        </div>
        <div class="siderBottom">
          <div class="siderBottomContent">
            <h2>热门收藏</h2>
            <div class="siderLine"></div>
            <div class="siderContentShell">
              <div class="siderContent">
                <span>标题</span>
                <div>
                  <span>点赞: 228</span>
                  <span>评论: 11</span>
                </div>
              </div>
            </div>
            <div class="siderContentShell">
              <div class="siderContent">
                <span>标题</span>
                <div>
                  <span>点赞: 228</span>
                  <span>评论: 11</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 浮动按钮栏 -->
        <div class="flexbuttons">
          <div
            class="funbutton"
            :class="{ funbutton_active: isLikeQues, funbutton_noactive: !isLikeQues }"
            v-on:click="LikeThis()"
          >
            <div class="button_icon">
              <div class="imgshow"></div>
            </div>
            <span>{{ momentInfo.likeNumber }}</span>
          </div>
         
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { getQuestionDetail } from "../../api/detail";
import moment from "moment";

export default {
  data() {
    return {
      // 输入框最大的字符输入限制
      textareaMaxChar: 500,
      // 问题信息
      momentInfo: {},
      // 标签
      labels: [],
      // 回答列表
      answerList: [],
      // 用户信息
      user: {},
      // 回答问题框的数据
      pushCommentMess: "",
      // 是否点赞
      isLikeQues: false,
      // 获取的文章id
      thisMomentId: this.$route.query.momentId || 1,
    };
  },
  computed: {
    //问题发布日期的转化
    date() {
      var date = new Date(this.momentInfo.createTime);
      var datetime = moment(date).format("YYYY-MM-DD HH:mm:ss");
      return datetime;
    },
  },
  components: {
    mavonEditor,
  },
  watch: {
  },
  created() {
    //获取问题详情
    getQuestionDetail(this.thisMomentId).then((res) => {
      if (res.data.code == 200) {
        this.momentInfo = res.data.data;
        this.user = res.data.data.user;
        this.labels = res.data.data.labelList;
      }
    });
  },
  mounted() {
    // 获取用户点赞情况
    this.GetUserLikeMoment();
    // 获取回答列表
    this.GetAnswerList();
    // 配置节流函数
    this.LikeThis = this.throttle(this.LikeThis, 2000);
    this.PushComment = this.throttle(this.PushComment, 2000);
  },
  methods: {
    // 点击点赞按钮弹出的函数
    async LikeThis() {
      // 用户点过赞了
      if (this.isLikeQues) {
        let result = await this.$API.reqCancelLike({ momentId: this.thisMomentId });
        // console.log(result);
        if (200 == result.status) {
          // 侧边弹出框
          this.$notify({
            title: "取消点赞",
            message: result.data,
            duration: 3000,
          });
          if ("取消点赞成功" == result.data) {
            this.momentInfo.likeNumber--;
            this.GetUserLikeMoment();
          }
        }
      }
      // 用户为未点赞
      else {
        // 向服务器发送请求,调用点赞接口
        let result = await this.$API.reqMomentLike({ momentId: this.thisMomentId });
        // console.log(result);
        if (200 == result.status) {
          // 侧边弹出框
          this.$notify({
            title: "点赞",
            message: result.data,
            duration: 3000,
          });
          if ("点赞成功" == result.data) {
            this.momentInfo.likeNumber++;
            this.isLikeQues = true;
          }
        }
        else {
          this.$notify({
            title: "点赞",
            message: "出现未知错误,点赞失败!",
            duration: 3000,
          })
        }
      }

    },
    // 按下回答问题按钮调用接口,回答问题
    async PushComment() {
      let token = localStorage.getItem('login_token');
      if(token){
        if (this.textareaMaxChar < this.pushCommentMess.length) {
                this.$notify({
                  title: "回答",
                  message: "回答字数超过上限,发表失败!",
                  duration: 3000,
                })
              }
              else if (0 >= this.pushCommentMess.length) {
                this.$notify({
                  title: "回答",
                  message: "回答不能为空",
                  duration: 3000,
                })
              }
              else {
                let result = await this.$API.reqPushComment({ content: this.pushCommentMess, momentId: this.thisMomentId });
                this.pushCommentMess = "";
                if (200 == result.status) {
                  this.$message({
                    type: "success",
                    message: "回答成功!",
                  })
                  this.GetAnswerList();
                }
                else {
                  this.$message({
                    type: "error",
                    message: "未知原因,回答失败!",
                  })
                }
              }
      }else{
        this.$router.push('/login');
      }
     
    },
    // 获取回答列表
    async GetAnswerList() {
      // 获取回答列表
      let result = await this.$API.reqAnswerList(this.thisMomentId);
      // console.log(result);
      if (200 == result.status) {
        this.answerList = result.data.data.reverse();
      }
    },
    // 获取用户的点赞信息
    async GetUserLikeMoment() {
      let result = await this.$API.reqUserLikeMoment(this.thisMomentId);
      console.log(result);
      if (200 == result.status) {
        this.isLikeQues = result.data.isLike;
      }
    },
    // 节流
    throttle(infun, timecounter) {
      let isOpen = true;
      return (...args) => {
        if (isOpen) {
          isOpen = false;
          infun.apply(this, args);
          setTimeout(() => {
            isOpen = true;
          }, timecounter);
        }
      }
    }
  },
};
</script>

<style lang='less' scoped>
.detail {
  display: flex;
  width: auto;
  .drawingboard {
    display: flex;
    margin: 0px auto;
    .shell {
      display: inline;
      width: 60vw;
      padding-top: 1px;
      background-color: #fff;
      .title {
        margin: 30px 0 0 30px;
      }
      .userText {
        // height: 100%;
        // height : 800px;
        height: auto;
        background-color: #fff;
        .userTopHeader {
          height: 15%;
          width: 90%;
          display: flex;
          margin: 0 30px;
          .userMessage {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            .headerImg {
              display: inline-block;
              width: 50px;
              height: 50px;
              border-radius: 50%;
              background-color: rgb(138, 138, 138);
              overflow: hidden;
              img {
                width: 50px;
                height: 50px;
              }
            }
            .nameTime {
              display: flex;
              flex-direction: column;
              margin-left: 15px;
              .time {
                margin-top: 5px;
                color: rgb(146, 146, 146);
              }
            }
          }
          .userButton {
            width: 300px;
            height: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            div {
              width: 80px;
              height: 30px;
              background-color: #fff;
              text-align: center;
              line-height: 30px;
              border-radius: 5px;
            }
            .btn01 {
              border: solid 1px rgb(184, 184, 184);
            }
            .btn02 {
              border: solid rgb(18, 141, 255) 1px;
              background-color: rgba(18, 141, 255, 0.3);
              color: blue;
            }
          }
        }

        .contentText {
          height: 70vh;
        }
        .setting {
          display: flex;
          width: 500px;
          height: 50px;
          margin-left: 10px;
          overflow-y: hidden;
          span {
            height: 50px;
            line-height: 50px;
            justify-content: center;
            text-align: center;
          }
          .label {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            text-align: center;
            padding: 0 5px;
            margin: auto 5px;
            border-radius: 3px;
            background-color: #eaf2ff;
            color: #1e80ff;
          }
        }
      }
      .comment {
        height: auto;
        // border : red 1px solid;
        margin-left: 20px;
        .pushcomment {
          display: flex;
          flex-direction: column;
          min-height: 200px;
          width: 100%;
          .commenthead {
            font-size: 22px;
            font-weight: 600;
            margin: 20px 0px;
          }
          .commentbody {
            display: flex;
            width: 100%;
            .headerImg {
              display: inline-block;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              background-color: rgb(138, 138, 138);
              overflow: hidden;
              margin-right: 15px;
              flex-shrink: 0;
              flex-grow: 0;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .textinput {
              display: flex;
              flex-direction: column;
              align-items: flex-end;
              width: 85%;
              height: 150px;
              font-size: 22px;
              /deep/ textarea {
                overflow-y: hidden;
              }
              button {
                width: 90px;
                line-height: 36px;
                font-size: 14px;
                border-radius: 4px;
                color: #fff;
                background-color: #1e80ff;
                margin-top: 10px;
              }
            }
          }
        }
        .fullcomment {
          height: auto;
          width: 100%;
          // border : purple 1px solid;
          margin: 20px 0px;
          .commenthead {
            font-size: 22px;
            font-weight: 600;
            margin: 15px 0px;
          }
          .usercomment {
            display: flex;
            flex-direction: row;
            min-height: 100px;
            width: 100%;
            // border : blue 1px solid;

            .userimage {
              display: inline-block;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              background-color: rgb(138, 138, 138);
              overflow: hidden;
              margin-right: 15px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .usercomment-body {
              width: 90%;
              .username {
                font-size: 15px;
                margin: 10px 0px;
                color: rgb(37, 41, 51);
              }
              .usercomment-comment {
                width: 100%;
                // height : 200px;
                overflow: hidden;
                font-size: 14px;
                color: #515767;
                span {
                  word-break: normal;
                  width: 100%;
                  display: block;
                  white-space: pre-wrap;
                  word-wrap: break-word;
                  overflow: hidden;
                }
              }
            }
          }
        }
      }
    }
    .rightsidebar {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 300px;
      // position: relative;
      // right: 0;
      // display : inline-block;
      height: 700px;
      margin-left: 10px;
      background-color: #f4f5f5;
      // border : 1px solid saddlebrown;
      .siderTop {
        position: relative;
        background-color: #fff;
        height: 40%;
        width: 100%;
        // border: 1px solid red;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .userMessage {
          display: flex;
          align-items: center;
          margin: 24px 0 0 23px;
          .headerImg {
            display: inline-block;
            height: 50px;
            width: 50px;
            border-radius: 50%;
            background-color: rgb(116, 116, 116);
            img {
              height: 100%;
              width: 100%;
            }
          }
          .message {
            display: flex;
            flex-direction: column;
            font-size: 18px;
            margin-left: 13px;
            span {
              font-size: 22px;
            }
            div {
              color: rgb(153, 153, 153);
              font-size: 13px;
            }
          }
        }
        .userFriend:before {
          position: absolute;
          content: "";
          display: block;
          width: 95%;
          height: 1px;
          background-color: rgb(160, 160, 160);
          top: 42%;
          margin-left: 5px;
        }
        .userFriend {
          display: flex;
          flex-direction: column;
          margin-top: 25px;
          margin-left: 10px;
          div {
            margin-left: 20px;
            height: 70px;
            line-height: 70px;
            display: flex;
            i {
              margin-top: 20px;
              font-size: 34px;
              color: rgb(56, 123, 248);
            }
            span {
              margin-left: 10px;
              font-size: 17px;
              color: #999;
            }
          }
        }
      }
      .siderBottom {
        height: 50%;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        // border : 1px solid blue;
        .siderBottomContent {
          margin: 20px 0 0 10px;
          h2 {
            font-weight: 00;
          }
          .siderLine {
            display: inline-block;
            width: 97%;
            height: 1px;
            background-color: #000;
          }
          .siderContentShell {
            display: flex;
            flex-direction: column;
            margin-top: 10px;
            .siderContent {
              margin-left: 7px;
              margin-top: 10px;
              span {
                font-size: 20px;
              }
              div {
                margin-top: 10px;
                span {
                  margin-left: 10px;
                  color: #999;
                  font-size: 9px;
                }
              }
            }
          }
        }
      }
      .flexbuttons {
        display: flex;
        flex-direction: row;
        width: auto;
        // 与浏览器的浮动定位
        // position : fixed;
        // top : 300px;
        // height : 70px;
        // margin-left : 61vw;
        border-radius: 8px;
        margin-top: 5px;

        // background-color : white;

        .funbutton {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: white;
          border: solid 2px #fff;
          .button_icon {
            .imgshow {
              width: 28px;
              height: 28px;
            }
          }
          span {
            font-size: 12px;
            color: rgb(80, 80, 80);
            text-align: center;
          }
        }
        .funbutton_active {
          .button_icon {
            .imgshow {
              background-image: url("./images/good_1.png");
              background-size: 100%;
              background-repeat: no-repeat;
            }
          }
          span {
            color: #1e80ff;
          }
        }
        .funbutton_noactive {
          .button_icon {
            .imgshow {
              background-image: url("./images/good_2.png");
              background-size: 100%;
              background-repeat: no-repeat;
            }
          }
          span {
            // color : #1e80ff;
          }
        }
        .funbutton_noactive:hover {
          border: solid 2px #1e80ff;
        }
        .button_font {
          display: flex;
          font-size: 14px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: solid 2px #fff;
          margin-left: 5px;
          span {
            height: 50px;
            width: 50px;
            line-height: 50px;
            justify-content: center;
            text-align: center;
            color: rgb(0, 0, 0);
          }
        }
        .button_font_active {
          background-color: #1e80ff;
          span {
            color: #fff;
          }
        }
        .button_font_noactive {
          background-color: white;
          span {
            color: rgb(0, 0, 0);
          }
        }
        .button_font_noactive:hover {
          border: solid 2px #1e80ff;
        }
      }
    }
  }
}
@media screen and (max-width: 1500px) {
  .detail .shell {
    width: 60vw;
  }
}
@media screen and (max-width: 1050px) {
  .detail .drawingboard .shell {
    width: 100vw;
  }
  .detail .shell .rightsidebar {
    display: none;
  }
}
.v-note-panel {
  background-color: #fff !important;
}
</style>
