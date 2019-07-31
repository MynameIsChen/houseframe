<template>
  <div class="left">
    <div class="logo">logo</div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-left"
      mode="vertical"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b" style="border: none">
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item style="min-width: 0;padding: 0 20px;" index="2-1">选项1</el-menu-item>
        <el-menu-item style="min-width: 0;padding: 0 20px;" index="2-2">选项2</el-menu-item>
        <el-menu-item style="min-width: 0;padding: 0 20px;" index="2-3">选项3</el-menu-item>
        <el-menu-item style="min-width: 0;padding: 0 20px;" index="2-4">选项4</el-menu-item>
      </el-submenu>
      <el-menu-item index="3">消息中心</el-menu-item>
      <el-menu-item index="4">订单管理</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'HomeLeft',
    data () {
      return {
        activeIndex: '1',
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
        // 两种路由实现方式
        // this.$router.push("/about");
        // this.$router.replace("/about");
      }
    }
  }
</script>

<style scoped>
  .left{
    display: inline-block;
  }
  .left{
    width: 100px;
    height: 100%;
  }

  .logo{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
  }

  .el-menu{
    border-right: none;
  }
  .el-menu-left{
    width: 100px;
    height: 100%;
  }
</style>
