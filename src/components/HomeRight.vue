<template>
  <div class="right">
    <el-menu
      router
      :default-active="activeIndex"
      class="el-menu-right"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b" style="border: none">
      <el-menu-item index="/">首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="/house">房间规划</el-menu-item>
      <el-menu-item index="/about">关于</el-menu-item>
    </el-menu>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'HomeRight',
    data () {
      return {
        activeIndex: '1',
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
        this.$emit("dialog")
      },
    }
  }
</script>

<style lang="scss" scoped>
  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  .right {
    display: inline-block;
  }

  .right {
    flex: 1;
  }

  .el-menu {
    border-bottom: none;
  }

</style>
