<template>
  <div class="panel">
    <div class="title">发布问题</div>
    <div class="tags">
      <div class="tip">请添加标签用于描述你的问题。</div>
      <div class="addtag">
        <input
          type="text"
          class="tagInput"
          @keyup.enter="addtag"
          v-model="inputTag"
        />
      </div>
      <div class="err" v-if="isshow">{{ error }}</div>
      <div class="tags-list">
        <span class="tag" v-for="(tag, index) in tags" :key="index" ref="tag"
          >{{ tag }} <i @click="removeTag(index)" class="removeTag">×</i></span
        >
      </div>
    </div>
    <div class="bottom">
      <el-button @click.stop="$emit('cancel')" class="cancel">取消</el-button>
      <el-button type="primary" class="las-submit" @click="publish"
        >发布</el-button
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "addtag",
  data() {
    return {
      tags: [],
      inputTag: "",
      error: "最多只能添加5个标签哦",
      isshow: false,
    };
  },
  components: {},
  created() {},
  methods: {
    addtag() {
      //查重
      if (this.tags.indexOf(this.inputTag) == -1) {
        if (this.tags.length < 5) {
          this.tags.push(this.inputTag);
        } else {
          this.isshow = true;
        }
      }
      this.inputTag = "";
    },
    removeTag(index) {
      console.log(index);
      this.tags.splice(index, 1);
      if (this.tags.length < 5) {
        this.isshow = false;
      }
    },
    publish() {
      this.$bus.$emit("publish", this.tags);
    },
  },
};
</script>
<style lang='less' scoped>
.panel {
  position: relative;
  width: 500px;
  height: 320px;
  border: 1px solid #ddd;
  background-color: #fff;
  .title {
    box-sizing: border-box;
    height: 60px;
    font-size: 20px;
    font-weight: 700;
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    padding-left: 10px;
  }
  .tags {
    margin-top: 10px;
    width: 100%;
    height: 60px;
    // border-bottom: 1px solid #ddd;

    .tip {
      font-size: 14px;
      color: #b6aaaa;
      margin: 10px 40px;
    }
    .addtag {
      width: 90%;
      height: 35px;
      margin: 0 auto;
      box-sizing: border-box;
      border: 1px solid #ddd;
      align-items: center;
      .tagInput {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        outline: none;
      }
    }
    .err {
      font-size: 12px;
      color: red;
      margin: 5px 40px;
    }
    .tags-list {
      margin: 10px 20px;
      .tag {
        cursor: pointer;
        display: inline-block;
        background: #409eff;
        color: #fff;
        border-radius: 5px;
        margin: 3px;
        padding: 3px;
        .removeTag {
          color: #fff;
          padding: 2px;
        }
      }
    }
  }
  .bottom {
    display: flex;
    position: absolute;
    width: 100%;
    height: 60px;
    border-top: 1px solid #ddd;
    top: 250px;
    justify-content: center;
    align-items: center;
    .cancel {
      margin-left: 240px;
    }
    .las-submit {
      margin-left: 30px;
    }
  }
}
</style>
