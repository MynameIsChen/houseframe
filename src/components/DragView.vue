<!--https://github.com/gorkys/vue-draggable-resizable-->
<!--Props-->
<!--active:确定组件是否应处于活动状态。 prop对更改做出反应，也可以与syncmodifier 一起使用以保持状态与父级同步。-->
<!--draggable:是否可以拖动-->
<!--resizable：是否可以调整大小-->
<!--w:宽，h:高，minw:最小宽，minh:最小高，x:初始x位置，y:初始y位置，z:定义zindex-->
<!--handles:定义句柄组以限制原色大小调整-->
<!--axis:定义可以拖动的轴(x,y)-->
<!--gird:定义捕捉元素的网格-->
<!--parent:将原色的移动和尺寸限制为父元素-->
<!--dragHandle:定义用于拖动组件的选择器-->
<!--dragCancel:定义应该用于阻止拖动初始化的选择器-->
<!--maximize:如果设置为true，则允许组件在双击时填充其父级-->
<!--is-conflict-check:定义组件是否开启冲突检测-->
<!--snap:是否开启元素对齐-->
<!--snap-tolerance:当调用对齐时，用来设置组件与组件之间的对齐距离，以像素为单位。-->

<!--Events-->
<!--activated:单击组件时调用，以显示句柄-->
<!--deactivated:每当用户单击组件外的任何位置时调用，以便停用它-->
<!--resizing:每当组件调整大小时调用-->
<!--resizestop:每当组件停止调整大小时调用。-->
<!--dragging:每当拖动组件时调用-->
<!--dragstop:每当组件停止拖动时调用-->

<template>
  <VueDraggableResizable :w="mode.width" :h="mode.height" :x="mode.left" :y="mode.top" :minh='minH' :minw="minW"
                         :handles="handleAll" :snap="mode.snap!='0'" :parent="true" :is-conflict-check="true"
                         :active="true" :resizable="true" :draggable="true"
                         @dragging="onDrag" @resizing="onResizing" @resizestop="resizeTop" @dragstop="dragsTop"
                         @activated="onActivated" @deactivated="onDeactivated">

    <div class="drag-mode">
      <el-image v-if="mode&&mode.img"
                style="width: 100%; height: 100%;position: absolute;"
                :src="mode.img"
                fit="fit"></el-image>
      <span class="drag-txt">{{mode.content}}</span>
    </div>
    <slot></slot>
  </VueDraggableResizable>
</template>

<script>
  import VueDraggableResizable from 'vue-draggable-resizable-gorkys'
  import 'vue-draggable-resizable/src/components/vue-draggable-resizable.css'

  export default {
    name: 'DragView',
    components: {
      VueDraggableResizable
    },
    props: {
      mode: {
        type: Object,
        default: function () {
          return {
            width: 100,
            height: 100,
          }
        }
      },
      w: {
        type: Number,
        default: function () {
          return 100
        }
      },
      h: {
        type: Number,
        default: function () {
          return 100
        }
      },
    },
    data: function () {
      return {
        minH: 50,
        minW: 50,
        handleX: ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'],
        handleAll: ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'],
      }
    },
    methods: {
      onResizing: function (x, y, width, height) {
        this.mode.left = x
        this.mode.top = y
        this.mode.width = width
        this.mode.height = height
      },
      onDrag: function (x, y) {
        this.mode.left = x
        this.mode.top = y
      },
      dragsTop (x, y) {
        this.mode.left = x
        this.mode.top = y
      },
      resizeTop (x, y, width, height) {
        this.mode.left = x
        this.mode.top = y
        this.mode.width = width
        this.mode.height = height
      },
      onDeactivated (e) {
        console.log('onDeactivated:', e)
        this.$emit('deactivated')
      },
      onActivated (e) {
        console.log('onDeactivated:', e)
        this.$emit('activated')
      }
    }
  }
</script>

<style scoped>
  .drag-mode {
    width: 100%;
    height: 100%;
    border: 1px dashed #dfdfdf;
    overflow: scroll;
  }

  .drag-txt {
    width: 100%;
    height: 100%;
    word-break: break-all;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
