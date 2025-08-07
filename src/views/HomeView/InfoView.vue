<script setup>
import { reactive } from 'vue';

const form = reactive({
  name: '',
  region: '',
});
</script>

<template>
  <div class="info">
    <div class="top-title">
      <div></div>
      <div>我的信息</div>
    </div>

    <div class="main">
      <el-form :model="form" label-width="auto" style="max-width: 600px">
        <el-form-item label="Activity name">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.info {
  .top-title {
    width: 100%;
    height: 50px;
    padding-left: 30px;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;

    :first-child {
      width: 4px;
      height: 16px;

      background-color: #00a1d6;
      border-radius: 4px;
    }
    :last-child {
      font-size: 14px;
      color: #00a1d6;
      margin-left: 5px;
    }
  }
}
</style>
