<template>
  <div class="ask">
    <aheader @tranTitle="tranTitle"></aheader>
    <mavonEditor
      style="min-height: 93vh"
      codeStyle="tomorrow-night-bright"
      :ishljs="true"
      @imgAdd="$imgAdd"
      @imgDel="$imgDel"
      ref="md"
      v-model="value"
    ></mavonEditor>
  </div>
</template>

<script>
import Aheader from "../../components/askHeader/index.vue";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { pushlishQue, addTags, imgAdd } from "../../api/ask";
import { mapState } from "vuex";
export default {
  name: "ask",
  components: {
    Aheader,
    mavonEditor,
  },
  data() {
    return {
      value: "",
      title: "",
    };
  },
  
  mounted() { },
  created() {
    // 向全局事件总线添加一个提交问题的全局事件
    this.$bus.$on("publish", async (tags) => {
      const res = await this.pushlishQue();
      // console.log(res.data);
      if (res.data.code == 200) {
        // console.log(tags);
        const result = await this.addTags(res.data.momentId, tags);
        // console.log(result);
        this.$notify({
          title: "发布",
          message: `发布成功,问题ID:${res.data.momentId}`,
          duration: 0,
        });
        this.$router.push("/home");
      }
    });
  },
  beforeDestroy() {
    this.$bus.$off("publish");
  },
  methods: {
    tranTitle(title) {
      this.title = title;
    },
    //发布问题
    async pushlishQue() {
      return await pushlishQue(this.title, this.value);
    },
    //添加标签
    async addTags(momentId, tags) {
      return await addTags(momentId, tags);
    },
    // 绑定@imgAdd event
    async $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append('picture', $file);
      const data = await imgAdd(formdata);
      console.log(data.data);
      this.$refs.md.$img2Url(pos, data.data);
    },
    $imgDel() {

    }
  },
};
</script>

<style lang="less" scoped>
</style>