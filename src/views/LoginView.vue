<script setup>
import { onBeforeMount, reactive, ref } from 'vue';
import api from '@/api';
import { useTokenStore } from '@/stores/token';
import router from '@/router';
// 登录验证码url地址
const loginCaptchaImageUrl = ref('');
// 注册验证码url地址
const logonCaptchaImageUrl = ref('');

// 请求返回的验证码key
let captchaKey;

// 获取登录验证码
const getLoginCaptcha = () => {
  api.get('/user/login/captcha').then(function (response) {
    // 处理成功情况
    // 保存验证码的key
    captchaKey = response.data.key;
    loginCaptchaImageUrl.value = response.data.image;
  });
};
// 获取注册验证码
const getLogonCaptcha = () => {
  api.get('/user/logon/captcha').then(function (response) {
    // 处理成功情况
    // 保存验证码的key
    captchaKey = response.data.key;
    logonCaptchaImageUrl.value = response.data.image;
  });
};
// tabs切到logon发起请求获取注册的验证码
const handleChange = (name) => {
  if (name === 'logon') {
    getLogonCaptcha();
  }
};

// vue生命周期函数，进入页面直接获取验证码
onBeforeMount(() => {
  tokenStore.setToken('');
  getLoginCaptcha();
});

// tabs页面绑定，默认login页面
const activeName = ref('login');

// 使用Store保存token
const tokenStore = useTokenStore();

//=================== 登录 =========================
const loginForm = reactive({
  name: '',
  password: '',
  captchaCode: '',
  captchaKey: '',
});
const loginFormRules = {
  name: [
    {
      required: true,
      message: '请输入账号！',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码！',
      trigger: 'blur',
    },
  ],
  captchaCode: [
    {
      required: true,
      message: '请输入验证码！',
      trigger: 'blur',
    },
  ],
};

const ruleLoginFormRef = ref();
const loginFormSubmit = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      loginForm.captchaKey = captchaKey;
      console.log('submit!', loginForm);
      api.post('/user/login', loginForm).then((response) => {
        console.log(response);
        if (response.code === '200') {
          // 登录成功
          tokenStore.setToken(response.data);
          router.push('/');
        } else if (response.code === '301') {
          // 验证码错误
        } else if (response.code === '302') {
          // 账号不存在
        } else if (response.code === '303') {
          // 账号或密码错误
        }
      });
    }
  });
};

//=================== 注册 =========================
const logonForm = reactive({
  name: '',
  password: '',
  checkPass: '',
  captchaCode: '',
  captchaKey: '',
});
const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码！'));
  } else {
    if (logonForm.checkPass !== '') {
      if (!ruleLogonFormRef.value) return;
      console.log(ruleLogonFormRef);

      ruleLogonFormRef.value.validateField('checkPass');
    }
    callback();
  }
};
const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码！'));
  } else if (value !== logonForm.password) {
    callback(new Error('两次密码输入不一致!'));
  } else {
    callback();
  }
};
const logonFormRules = reactive({
  name: [
    {
      required: true,
      message: '请输入账号！',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      validator: validatePass,
      trigger: 'blur',
    },
  ],
  checkPass: [
    {
      required: true,
      validator: validatePass2,
      trigger: 'blur',
    },
  ],
  captchaCode: [
    {
      required: true,
      message: '请输入验证码！',
      trigger: 'blur',
    },
  ],
});

const ruleLogonFormRef = ref();
const logonFormSubmit = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      logonForm.captchaKey = captchaKey;
      console.log('submit!', logonForm);
      api.post('/user/logon', logonForm).then((res) => {
        console.log(res);
        if (res.code === '200') {
          console.log('注册成功！');

          location.reload();
          // activeName.value = 'logon';
        }
      });
    }
  });
};
</script>

<template>
  <div class="login">
    <div class="header-banner">
      <img src="@/assets/bolo-banner.png" />
    </div>
    <div class="login-main">
      <div class="header-img">
        <el-icon :size="60" color="rgb(121.3, 187.1, 255)">
          <UserFilled />
        </el-icon>
      </div>

      <el-tabs v-model="activeName" class="login-tabs" @tab-change="handleChange" :stretch="true">
        <el-tab-pane label="登录" name="login">
          <el-form
            class="login-container"
            ref="ruleLoginFormRef"
            :model="loginForm"
            :rules="loginFormRules"
          >
            <el-form-item label="账号:" prop="name" label-position="top">
              <el-input v-model="loginForm.name" autocomplete="off" size="large"> </el-input>
            </el-form-item>

            <el-form-item label="密码:" prop="password" label-position="top">
              <el-input
                v-model="loginForm.password"
                type="password"
                autocomplete="off"
                size="large"
              >
              </el-input>
            </el-form-item>

            <el-form-item label="验证码:" prop="captchaCode" label-position="top">
              <div class="captcha">
                <el-input
                  v-model="loginForm.captchaCode"
                  autocomplete="off"
                  size="large"
                ></el-input>
                <el-image :src="loginCaptchaImageUrl" @click="getLoginCaptcha" />
              </div>
            </el-form-item>

            <el-form-item>
              <el-button
                class="login-btn"
                type="primary"
                plain
                @click="loginFormSubmit(ruleLoginFormRef)"
              >
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="logon">
          <el-form
            class="logon-container"
            ref="ruleLogonFormRef"
            :model="logonForm"
            :rules="logonFormRules"
          >
            <el-form-item label="账号:" prop="name" label-position="top">
              <el-input v-model="logonForm.name" type="username" autocomplete="off" size="large">
              </el-input>
            </el-form-item>

            <el-form-item label="密码:" prop="password" label-position="top">
              <el-input
                v-model="logonForm.password"
                type="password"
                autocomplete="off"
                size="large"
              >
              </el-input>
            </el-form-item>

            <el-form-item label="确认密码:" prop="checkPass" label-position="top">
              <el-input
                v-model="logonForm.checkPass"
                type="password"
                autocomplete="off"
                size="large"
              >
              </el-input>
            </el-form-item>

            <el-form-item label="验证码:" prop="captchaCode" label-position="top">
              <div class="captcha">
                <el-input
                  v-model="logonForm.captchaCode"
                  autocomplete="off"
                  size="large"
                ></el-input>
                <el-image :src="logonCaptchaImageUrl" @click="getLogonCaptcha" />
              </div>
            </el-form-item>

            <el-form-item>
              <el-button
                class="logon-btn"
                type="success"
                plain
                @click="logonFormSubmit(ruleLogonFormRef)"
              >
                注册
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;

  // background-color: rgb(243.9, 244.2, 244.8);

  .header-banner {
    width: 100%;
    height: 155px;

    margin-top: -64px;
    margin-bottom: 20px;

    display: flex;
    flex-direction: column;

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .login-main {
    width: 26%;

    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #e7e7e7;
    border-radius: 5px;

    background-color: rgb(235.9, 245.3, 255);

    .header-img {
      margin-top: 30px;
      border-radius: 3px;
      background-color: #fff;
    }

    .login-tabs {
      margin-top: 20px;
      margin-bottom: 30px;

      .login-btn {
        height: 40px;
        width: 100%;
        margin-top: 10px;
      }

      .logon-btn {
        height: 40px;
        width: 100%;
        margin-top: 10px;
      }

      .captcha {
        display: flex;

        > .el-input {
          height: 40px;
        }

        .el-image {
          width: 120px;
          height: 40px;
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
