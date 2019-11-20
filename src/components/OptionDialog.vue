<template>
  <div class="dialog" v-if="dialogType==1">
    <div class="dialog-content" v-if="dialogOptions">
      <div class="dialog-left">
        <div class="dialog-item">
          <div class="dialog-title">内容：</div>
          <el-input v-model="dialogOptions.content" placeholder="请输入内容"></el-input>
        </div>
        <div class="dialog-item">
          <div class="dialog-title">宽度：</div>
          <el-input type="number" v-model="dialogOptions.width" placeholder="0"></el-input>
        </div>
        <div class="dialog-item">
          <div class="dialog-title">高度：</div>
          <el-input type="number" v-model="dialogOptions.height" placeholder="0"></el-input>
        </div>
        <div class="dialog-item">
          <div class="dialog-title">距左：</div>
          <el-input type="number" v-model="dialogOptions.left" placeholder="0"></el-input>
        </div>
        <div class="dialog-item">
          <div class="dialog-title">距上：</div>
          <el-input type="number" v-model="dialogOptions.top" placeholder="0"></el-input>
        </div>
        <div class="dialog-item">
          <div class="dialog-title">对齐：</div>
          <el-input type="number" v-model="dialogOptions.snap" placeholder="0"></el-input>
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
          <img v-if="dialogOptions.img" :src="dialogOptions.img" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </div>
    <div class="dialog-button">
      <el-button type="info" @click="doCancel">取消</el-button>
      <el-button type="success" @click="doSave">保存</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'OptionDialog',
    // dialogType:1参数配置
    props:['dialogType','dialogOptions','doCancel','doSave'],
    data:function(){
      return{
        uploadUrl:''
      }
    },
    methods:{
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

<style scoped>

</style>
