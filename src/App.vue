<template>
  <div id="app">
    <Header v-if="this.$route.meta.isheadershow"></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/header";

export default {
  name: "App",
  components: {
    Header: Header,
  },
  mounted() {
    const token = localStorage.getItem('login_token');
    if(token)  this.$store.dispatch('getInfo');
  }
};
</script>
<style lang="less" >
@import url("./assets/css/base.css");
</style>
