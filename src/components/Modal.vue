<template>
	<div>
    <el-dialog
      title="提示"
      :visible.sync="mdShow"
      width="30%"
      :before-close="handleClose" center>
      <slot name="message"></slot>
      <span slot="footer" class="dialog-footer">
        <slot name="btnGroup"></slot>
<!--
         <button @click="closeModal" class="btn">子组件关闭模态框</button>
-->
      </span>
    </el-dialog>
	</div>
</template>

<script>
  export default {
    props:["mdShow"],
    data() {
      return {
      };
    },
    methods: {
      handleClose(done) {
        this.$emit('close');
        trigger('click');
      },
      closeModal(){
        this.$emit('close');
        trigger('click');
      }
    }
  };
</script>

<style>

</style>
