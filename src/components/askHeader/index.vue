<template>
  <div class="Aheader">
    <input
      type="text"
      class="title"
      placeholder="请输入标题"
      v-model="title"
      @blur="$emit('tranTitle', title)"
    />
    <div class="Hright">
      <div class="publish-box" id="publish">
        <el-button type="primary" class="submit" @click="submit">发布</el-button>
        <div class="triangle" v-show="isactive"></div>
        <addtag class="addtag" v-show="isactive" @cancel="cancel"></addtag>
      </div>
      <img :src="userInfo.avatar_url" alt class="avatar" />
      <span class="userName">{{ userInfo.name }}</span>
    </div>
  </div>
</template>
<script>
import addtag from "../../components/addtag/index.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      isactive: false,
      title: "",
      avatar: ''
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    })
  },
  components: {
    addtag,
  },
  created() {
    //点击非发布窗口时，发布窗口隐藏
    document.addEventListener(
      "click",
      (e) => {
        let typePanel = document.getElementById("publish");
        if (typePanel) {
          if (!typePanel.contains(e.target)) {
            this.isactive = false;
          }
        }
      },
      true
    );

  },
  methods: {
    submit() {
      this.isactive = !this.isactive;
    },
    cancel() {
      this.isactive = false;
    },
  },
};
</script>
<style lang='less' scoped>
.Aheader {
  width: 100%;
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .title {
    width: 70%;
    height: 100%;
    padding: 0;
    font-size: 25px;
    font-weight: 700px;
    outline: none;
    border: 0px;
    overflow: visible;
  }
  .Hright {
    display: flex;
    justify-items: space-between;
    align-items: center;
    .publish-box {
      position: relative;
      .submit {
        width: 90px;
        height: 40px;
        margin-right: 50px;
      }

      .addtag {
        position: absolute;
        z-index: 1501;
        left: -350px;
        top: 60px;
      }
      .triangle {
        position: absolute;
        z-index: 1502;
        width: 20px;
        height: 20px;
        border: 1px solid #ddd;
        background: #fff;
        top: 50px;
        left: 30px;
        border-right: none;
        border-bottom: none;
        transform: rotate(45deg);
      }
    }

    .avatar {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
    .userName {
      margin-left: 15px;
    }
  }
}
</style>
