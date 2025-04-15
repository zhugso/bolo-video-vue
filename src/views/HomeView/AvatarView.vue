<script setup>
import api from '@/api';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const resBaseUrl = 'http://localhost:9000/bolo/';

const router = useRouter();

let avatarKey = '';
let upAvatarUrl = '';
const avatarUrl = ref('');

const getAvatar = () => {
  api.get('/user/avatar').then((res) => {
    avatarUrl.value = res.data;
    console.log(res);
  });
};
const beforeUploadAvatar = async () => {
  await api.get('/upload/avatar-url').then((res) => {
    console.log('avatar-url:', res);
    upAvatarUrl = res.data.url;
    avatarKey = res.data.avatarKey;
  });
};
const uploadAvatarHttp = async (option) => {
  console.log(upAvatarUrl);

  return await api
    .uploadToMinio(upAvatarUrl, option.file)
    .then(() => {
      avatarSuccessHandle();
    })
    .catch((err) => {
      option.onError(err);
    });
};

const avatarSuccessHandle = () => {
  api.post(`/user/avatar/${avatarKey}`).then(() => {
    router.go(0);
  });
};

onMounted(() => {
  getAvatar();
});
</script>

<template>
  <div class="avatar">
    <el-avatar :size="120" :src="resBaseUrl + avatarUrl" />
    <el-upload
      class="upload-avatar"
      action="#"
      :limit="1"
      accept="image/png,image/jpg,image/jpeg"
      :show-file-list="false"
      :on-success="avatarSuccessHandle"
      :http-request="uploadAvatarHttp"
      :before-upload="beforeUploadAvatar"
    >
      <el-button type="primary">修改头像</el-button>
      <template #tip>
        <div class="el-upload__tip">
          请选择图片上传：大小180 * 180像素支持JPG、PNG等格式，图片需小于2M
        </div>
      </template>
    </el-upload>
  </div>
</template>

<style lang="less" scoped>
.avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  .el-avatar {
    margin-top: 50px;
  }
  .upload-avatar {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
