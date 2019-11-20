<template>
  <div class="house">
    <div class="house-canvas" :style="dialogStyle">
      <DragView v-for="(item,index) in modeList" :key="index" :mode="item" v-on:deactivated="onDeactivated"
                v-on:activated="onActivated(index)">
        <div class="edit" @click="doEdit(index)" v-if="currentIndex==index">编辑</div>
      </DragView>

      <OptionDialog :dialogType="dialogType" :dialogOptions="dialogMode" :doCancel="doCancel" :doSave="doSave"></OptionDialog>
      <OptionDialog :dialogType="optionType" :dialogOptions="dialogOption" :doCancel="cancelOption" :doSave="saveOption"></OptionDialog>

      <div class="dialog" v-if="showTitle">
        <div class="dialog-content">
          <div class="dialog-item">
            <div class="dialog-title">标题：</div>
            <el-input v-model="listTitle" placeholder="请输入标题"></el-input>
          </div>
        </div>
        <div class="dialog-button">
          <el-button type="info" @click="doCancelTitle">取消</el-button>
          <el-button type="success" @click="doSureTitle">确认</el-button>
        </div>
      </div>

    </div>
    <div>
      <el-button @click="doAdd" type="primary">添加</el-button>
      <el-button @click="saveList" type="success">保存</el-button>
      <el-button @click="doAlert" type="warning">修改</el-button>
      <el-button @click="toList" type="info">列表</el-button>
    </div>
  </div>
</template>

<style lang="scss">
  @import url("../../style/dialog.css");

  .house {
    width: 100%;
    height: 100%;
  }

  .house-canvas {
    width: 475px;
    height: 350px;
    border: 1px solid red;
    position: relative;
  }

  .edit {
    width: 30px;
    height: 20px;
    font-size: 12px;
    color: white;
    line-height: 20px;
    text-align: center;
    position: absolute;
    top: -20px;
    left: 0;
    box-sizing: border-box;
    background-color: black;
    opacity: 0.8;
  }
</style>

<script>
  import DragView from '../../components/DragView'
  import OptionDialog from '../../components/OptionDialog'

  export default {
    name: 'HouseCanvas',
    components: {
      DragView,
      OptionDialog
    },
    data: function () {
      return {
        dialogType:0,
        optionType:0,
        showTitle: false,
        uploadUrl: '',//https://jsonplaceholder.typicode.com/posts/
        modeList: [],
        currentIndex: -1,
        dialogMode: {},
        listTitle: '',
        listId: '',
        dialogStyle:{},
        dialogOption:null
      }
    },
    mounted: function () {
      let data = this.$route.query.data;
      let option = this.$route.query.option;
      if(data){
        this.listTitle = data.title;
        this.modeList = data.data;
        this.listId = data.id;
        console.log('query', data);
      }
      if(option){
        this.dialogOption = option;
        this.setDialogOptions();
      }
    },
    methods: {
      setDialogOptions(){
        let style = {
          height:  this.dialogOption.height+'px',
          width:  this.dialogOption.width+'px'
        }
        this.dialogStyle = style;
      },
      doEdit () {
        let mode = this.modeList[this.currentIndex]
        console.log('doEdit')
        // this.currentIndex = index
        this.dialogMode = mode
        this.dialogType = 1;
      },
      doAdd () {
        this.currentIndex = this.modeList.length
        let index = this.modeList.length + 1
        this.modeList.push({
          content: '' + index,
          width: 100,
          height: 100,
          left: 0,
          top: 0,
          snap: '1',
          img: ''
        })
      },
      saveList () {
        this.showTitle = true
      },
      doAlert(){
        this.optionType = 1;
      },
      cancelOption(){
        this.optionType = 0;
      },
      saveOption(){
        this.setDialogOptions();
        this.optionType = 0;
      },
      toList () {
        this.$router.replace("/house_list")
      },
      doCancel () {
        console.log('doCancel');
        this.dialogType = 0;
      },
      doSave () {
        if (this.dialogMode) {
          console.log('doSave-before', this.dialogMode, typeof this.dialogMode.width)
          try {
            this.dialogMode.width = Number.parseFloat(this.dialogMode.width)
            this.dialogMode.height = Number.parseFloat(this.dialogMode.height)
            this.dialogMode.left = Number.parseFloat(this.dialogMode.left)
            this.dialogMode.top = Number.parseFloat(this.dialogMode.top)
            console.log('doSave-after', this.dialogMode, typeof this.dialogMode.width)
            this.modeList[this.currentIndex] = this.dialogMode
          } catch (e) {
            console.log('save', e)
          }
          this.dialogType = 0;
        }
      },
      doCancelTitle () {
        this.showTitle = false
      },
      doSureTitle () {
        let that = this
        if (that.modeList) {
          let historyData = localStorage.getItem('modeHistoryList')
          console.log('saveList-historyData', historyData)
          let historyList = []
          if (historyData) {
            historyList = JSON.parse(historyData)
          }
          if (!historyList || historyList.length == 0) {
            historyList = []
          } else {
            $.map(historyList, (item, index) => {
              console.log('map:', item, index)
              if (item.id == that.listId) {
                item.data = that.modeList
                item.title = that.listTitle
                item.option = that.dialogOption
              }
            })
          }
          if (!that.listId) {
            let id = new Date().getTime()
            historyList.push({ id: id, title: that.listTitle,option:that.dialogOption, data: that.modeList })
          }

          console.log('saveList-historyList', historyList)
          localStorage.setItem('modeHistoryList', JSON.stringify(historyList))
        }
        that.showTitle = false
      },
      onDeactivated () {
        console.log('onDeactivated')
        this.currentIndex = -1
      },
      onActivated (index) {
        console.log('onActivated')
        this.currentIndex = index
      },
    }
  }
</script>
