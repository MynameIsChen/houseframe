<template>
  <div class="list-content">
    <div class="house-list">
      <div class="house-item" v-for="(item,index) in houseList">
        <div class="item-title">{{item.title?item.title:'默认标题'}}</div>
        <el-button size="mini" @click="doDel(index)" type="primary">删除</el-button>
        <el-button size="mini" @click="doScan(index)" type="primary">查看</el-button>
      </div>
    </div>
    <el-button @click="doAdd()" type="success">添加</el-button>
  </div>
</template>

<script>
  export default {
    name: 'HouseList',
    data: function () {
      return {
        houseList: [],
      }
    },
    created () {
      let historyData = localStorage.getItem('modeHistoryList');
      console.log('create-data', historyData);
      if(historyData){
        let list = JSON.parse(historyData);
        if (list && list.length > 0) {
          this.houseList = list;
        }
        console.log('create-list', list);
      }
    },
    mounted () {

    },
    methods: {
      doDel (index) {
        // 数组操作：https://www.jb51.net/article/121651.htm
        this.houseList.splice(index, 1);
        console.log('del-list', this.houseList);
        let houseData = '';
        if (this.houseList && this.houseList.length > 0) {
          houseData = JSON.stringify(this.houseList);
        }
        localStorage.setItem('modeHistoryList', houseData);
        console.log('del-data', houseData);
      },
      doScan(index){
        console.log('doScan', index);
        let item = this.houseList[index];
        this.$router.push({
          path:"/house_canvas",
          query:{
            data:item,
          }
        })
      },
      doAdd () {
        console.log("addHouse");
        this.$router.replace("/house_canvas");
      }
    }
  }
</script>

<style scoped>
  .list-content {
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
  }

  .house-list {
    width: 100%;
    height: 80%;
    border: 1px solid #eee;
    border-radius: 4px;
    margin-bottom: 10px;
    position: relative;
    padding: 0 10px;
    box-sizing: border-box;
  }

  .house-item {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding: 10px;
    box-sizing: border-box;
  }

  .item-title {
    flex: 1;
    font-size: 14px;

  }
</style>
