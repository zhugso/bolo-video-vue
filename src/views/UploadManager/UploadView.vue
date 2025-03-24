<script setup>
import api from '@/api';
import { ElMessageBox, genFileId } from 'element-plus';
import { reactive, ref } from 'vue';

// 表单数据
const form = reactive({
  videoKey: '',
  coverKey: '',
  title: '',
  copyright: '1',
  description: '',
});

// 表单规则
const formRules = {
  videoKey: [
    {
      required: true,
      message: '请等待视频上传完成！',

      trigger: 'blur',
    },
  ],
  coverKey: [
    {
      required: true,
      message: '请等待封面上传完成！',
      trigger: 'blur',
    },
  ],
  title: [
    {
      required: true, // 不为空
      message: '请输入标题',
      trigger: 'blur',
    },
    {
      min: 1,
      max: 80,
      message: '标题长度在1到80之间',
      trigger: 'blur',
    },
  ],
  copyright: [
    {
      required: true,
      trigger: 'blur',
    },
  ],
};

// 获取视频文件的一帧图片
const getVideoCover = (file) => {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.src = URL.createObjectURL(file);
    video.addEventListener('loadedmetadata', () => {
      video.currentTime = video.duration / 100;
      video.addEventListener('seeked', () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0);
        // resolve(canvas.toDataURL('image/jpeg'));
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/jpeg');
        URL.revokeObjectURL(video.src);
      });
    });
  });
};

//=============== 视频处理 ===================
let videoKey;
const uploadVideoRef = ref();
// 视频上传地址url
const videoUrl = ref('');

// 视频上传之前
const beforeUnloadVideo = async (rawFile) => {
  console.log(rawFile);
  // await 同步执行，不然会出现videoUrl没改就上传
  await api.get('/upload/getUpVideoUrl').then((res) => {
    console.log(res);
    videoUrl.value = res.data.url;
    videoKey = res.data.videoKey;
  });
};

// 上传视频改变
const videoChange = (uploadFile) => {
  console.log('视频改变', uploadFile);
  if (uploadFile.status === 'ready') {
    const videoNameTemp = uploadFile.name.replace(/\.[^.]+$/, '');
    // 判断是否以添加标题
    if (form.title === '') {
      form.title = videoNameTemp;
    }

    getVideoCover(uploadFile.raw).then((res) => {
      console.log('获取封面', res);
      // const file = new File([res], 'cover', { type: res.type });
      fileList.value[0] = {
        name: 'cover',
        status: 'ready',
        url: URL.createObjectURL(res),
        raw: res,
      };
    });
  }
};

// 视频上传成功
const videoSuccessHandle = () => {
  form.videoKey = videoKey;
};

// 上传视频
const uploadVideoHttp = async (option) => {
  // console.log(option);
  return await api
    .uploadToMinio(videoUrl.value, option.file, (e) => {
      const progressEvt = e;
      progressEvt.percent = e.total > 0 ? (e.loaded / e.total) * 100 : 0;
      option.onProgress(progressEvt);
    })
    .then((res) => {
      // console.log(res);
      option.onSuccess(res);
      // videoSuccessHandle();
    })
    .catch((err) => {
      // console.log(err);
      option.onError(err);
    });
};

//===================== 图片处理 ====================
let coverKey;
const uploadCoverRef = ref();
// 封面地址url
const coverUrl = ref('');
// 图片列表
const fileList = ref([]);

// 图片上传之前
const beforeUnloadCover = async (rawFile) => {
  console.log(rawFile);
  await api.get('/upload/getUpCoverUrl').then((res) => {
    coverUrl.value = res.data.url;
    coverKey = res.data.coverKey;
  });
};

// 移除图片
const handleRemove = () => {
  fileList.value = [];
};

// 超出图片上限
const handleExceed = (files) => {
  console.log(uploadCoverRef);
  console.log(files);
  uploadCoverRef.value.clearFiles();
  const file = files[0];
  file.uid = genFileId();
  uploadCoverRef.value.handleStart(file);
};

// 封面上传成功
const coverSuccessHandle = () => {
  console.log('封面上传成功！');
  form.coverKey = coverKey;
};

// 上传封面
const uploadCoverHttp = async (option) => {
  // console.log(options);
  return await api
    .uploadToMinio(coverUrl.value, option.file)
    .then(() => {
      // console.log(res);
      coverSuccessHandle();
      // option.onSuccess(res);
    })
    .catch((err) => {
      // console.log(err);
      option.onError(err);
    });
};

// 上传视频+封面
const uploadFile = () => {
  uploadVideoRef.value.submit();

  // console.log(fileList);
  uploadCoverRef.value.submit();
};

//================ 表单提交 =================
const ruleFormRef = ref();
// 表单提交, 视频发布
const submitForm = (formRef) => {
  console.log('上传前的表单：', form);
  console.log(coverKey);

  if (!formRef) return;
  formRef.validate((valid) => {
    if (valid) {
      api.post('/upload/submitVideo', form).then((res) => {
        console.log(res);
        ElMessageBox.alert('发布成功！', '', {
          confirmButtonText: 'OK',
        });
        location.reload();
      });
      console.log('submit!', form);
    }
  });
};
</script>

<template>
  <div class="upload">
    <div class="header-nav">
      <div>视频投稿</div>
    </div>
    <div class="upload-container">
      <el-form class="up-form" :rules="formRules" :model="form" ref="ruleFormRef">
        <el-form-item label="视频" prop="videoKey">
          <el-upload
            class="upload-video"
            action="#"
            ref="uploadVideoRef"
            drag
            :before-upload="beforeUnloadVideo"
            :on-success="videoSuccessHandle"
            :on-change="videoChange"
            :auto-upload="false"
            :limit="1"
            :http-request="uploadVideoHttp"
            accept=".mp4,.flv,.avi,.wmv,.mov,.webm,.mpeg4,.ts,.mpg,.rm,.rmvb,.mkv,.m4v"
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">拖拽到此处也可上传</div>
          </el-upload>
        </el-form-item>

        <el-form-item class="upload-cover-container" label="封面" prop="coverKey">
          <el-upload
            class="upload-cover"
            action="#"
            ref="uploadCoverRef"
            v-model:file-list="fileList"
            list-type="picture-card"
            :auto-upload="false"
            :before-upload="beforeUnloadCover"
            :on-exceed="handleExceed"
            :on-success="coverSuccessHandle"
            :limit="1"
            :http-request="uploadCoverHttp"
            accept="image/png, image/jpeg"
          >
            <el-icon>
              <Plus />
            </el-icon>
            <template #file="{ file }">
              <div style="background-color: #000">
                <img class="image-cover" :src="file.url" alt="" />
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                    <el-icon>
                      <Delete />
                    </el-icon>
                  </span>
                </span>
              </div>
            </template>
          </el-upload>
        </el-form-item>

        <el-form-item label=" 标题" prop="title">
          <el-input v-model="form.title" maxlength="80" show-word-limit />
        </el-form-item>

        <el-form-item label="类型" prop="copyright">
          <el-radio-group v-model="form.copyright">
            <el-radio value="1">自制</el-radio>
            <el-radio value="0">转载</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="简介" prop="description" style="margin-left: 10px">
          <el-input type="textarea" v-model="form.description" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="uploadFile">上传文件</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)">立即投稿</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.upload {
  width: 1100px;
  background-color: #fff;

  .header-nav {
    width: 100%;
    height: 64px;
    border-bottom: 1px solid #e7e7e7;

    > div {
      width: 68px;
      margin-left: 40px;
      padding: 26px 0 18px;
      color: #00a1d6;
      cursor: pointer;
    }
  }

  .upload-container {
    width: 100%;
    padding: 8px 0 16px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .up-form {
      width: 648px;

      .upload-video {
        width: 648px;
        height: 200px;
        margin: 10px 0 30px;
      }

      .upload-cover-container {
        .upload-cover {
          :deep(.el-upload--picture-card),
          :deep(.el-upload-list__item) {
            // width: 320px;
            width: auto;
            height: 165px;
            aspect-ratio: 16/9; // 固定宽高比
          }

          .image-cover {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
