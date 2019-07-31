<template>
  <div class="house">
    <div class="house-canvas">
      <DragView v-for="(item,index) in modeList" :key="index" :mode="item" v-on:deactivated="onDeactivated"
                v-on:activated="onActivated(index)">
        <div class="edit" @click="doEdit(index)" v-if="currentIndex==index">编辑</div>
      </DragView>

      <div class="dialog" v-if="showDialog">
        <div class="dialog-content">
          <div class="dialog-left">
            <div class="dialog-item">
              <div class="dialog-title">内容：</div>
              <el-input v-model="dialogMode.content" placeholder="请输入内容"></el-input>
            </div>
            <div class="dialog-item">
              <div class="dialog-title">宽度：</div>
              <el-input type="number" v-model="dialogMode.width" placeholder="0"></el-input>
            </div>
            <div class="dialog-item">
              <div class="dialog-title">高度：</div>
              <el-input type="number" v-model="dialogMode.height" placeholder="0"></el-input>
            </div>
            <div class="dialog-item">
              <div class="dialog-title">距左：</div>
              <el-input type="number" v-model="dialogMode.left" placeholder="0"></el-input>
            </div>
            <div class="dialog-item">
              <div class="dialog-title">距上：</div>
              <el-input type="number" v-model="dialogMode.top" placeholder="0"></el-input>
            </div>
            <div class="dialog-item">
              <div class="dialog-title">对齐：</div>
              <el-input type="number" v-model="dialogMode.snap" placeholder="0"></el-input>
            </div>
          </div>
          <div class="dialog-right">
            <div class="dialog-title">背景：</div>
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="dialogMode.img" :src="dialogMode.img" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
        <div class="dialog-button">
          <el-button type="info" @click="doCancel">取消</el-button>
          <el-button type="success" @click="doSave">保存</el-button>
        </div>
      </div>

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
    </div>
  </div>
</template>

<style scoped>
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

  .dialog {
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.6);
    font-size: 16px;
  }

  .dialog-content {
    width: 80%;
    background-color: white;
    display: flex;
    flex-direction: row;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 4px;
  }

  .dialog-left {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
  }

  .dialog-right {
    margin-left: 20px;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
  }

  .dialog-button {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }

  .dialog-item {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .dialog-title {
    width: 50px;
  }

  .el-input {
    width: 100px;
    flex: 1;
  }

  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-top: 10px;
  }

  .avatar-uploader:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }

  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }

</style>

<script>
  import DragView from '../components/DragView'

  export default {
    name: 'HouseCanvas',
    components: {
      DragView
    },
    data: function () {
      return {
        showDialog: false,
        showTitle: false,
        uploadUrl: '',//https://jsonplaceholder.typicode.com/posts/
        modeList: [],
        currentIndex: -1,
        dialogMode: {},
        listTitle:"",
      }
    },
    methods: {
      doEdit () {
        let mode = this.modeList[this.currentIndex]
        console.log('doEdit')
        // this.currentIndex = index
        this.dialogMode = mode
        this.showDialog = true
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
        this.showTitle = true;
      },
      doCancel () {
        console.log('doCancel')
        this.showDialog = false
      },
      doSave () {
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
        this.showDialog = false
      },
      doCancelTitle(){
        this.showTitle = false;
      },
      doSureTitle(){
        if (this.modeList) {
          let historyData = localStorage.getItem('modeHistoryList')
          console.log("saveList-historyData",historyData);
          let historyList = [];
          if (historyData) {
            historyList = JSON.parse(historyData);
          }
          if (!historyList && historyList.length == 0) {
            historyList = [];
            historyList.push({title:this.listTitle,data:this.modeList});
          }else{
            jQuery.map(historyList,(item,index)=>{
              console.log("map:",item,index);
            })
          }

          console.log("saveList-historyList",historyList);
          localStorage.setItem('modeHistoryList', JSON.stringify(historyList));
        }
      },
      onDeactivated () {
        console.log('onDeactivated')
        this.currentIndex = -1
      },
      onActivated (index) {
        console.log('onActivated')
        this.currentIndex = index
      },
      handleAvatarSuccess (res, file) {
        this.dialogMode.img = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload (file) {
        console.log(file)
        if (window.FileReader) {
          let reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = (e) => {
            this.dialogMode.img = e.target.result
          }
        }
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    }
  }
</script>
