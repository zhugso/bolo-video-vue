<script setup>
// import { ref } from 'vue'
const imgs = [
  'https://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960',
  'https://gips2.baidu.com/it/u=1651586290,17201034&fm=3028&app=3028&f=JPEG&fmt=auto&q=100&size=f600_800',
  'http://127.0.0.1:9000/bolo/c/174270489466451d75241-ec2a-4f2f-95fa-24c4bd781cb9',
];

// const inde = ref(1);
</script>

<template>
  <div class="slideshow" m="t-4">
    <el-carousel trigger="click" height="368px">
      <el-carousel-item v-for="item in imgs" :key="item">
        <img :src="item" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped>
.slideshow .el-carousel {
  width: 100%;
  height: 100%;
  /* border: 2px solid rebeccapurple; */
  border-radius: 5px;
  box-shadow: 0 0 4px 4px #00000014;
}

.slideshow .el-carousel img {
  width: 100%;
  height: 100%;

  object-fit: contain;
}
</style>
