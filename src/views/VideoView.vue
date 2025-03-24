<script setup>
import HeaderNav from '@/components/HeaderNav.vue';
import { onMounted } from 'vue';
import Player from 'xgplayer';
import 'xgplayer/dist/index.min.css';

onMounted(() => {
  new Player({
    id: 'xgplayer',
    url: 'http://localhost:9000/bolo/v/17426530743458bbe0eb0-bf7d-436d-aba9-5d5c1cf00cf4',
    height: '566px',
    width: '1006px',
  });
});
</script>

<template>
  <div class="video">
    <HeaderNav></HeaderNav>
    <div class="main">
      <div class="left">
        <div class="video-info">
          <div class="title">title</div>
          <div class="info-detail">
            <div class="video-counts">
              <el-icon size="20px" style="margin-right: 4px">
                <VideoPlay />
              </el-icon>
              <div>11111</div>
            </div>
            <div class="video-up-date">2025-02-21 17:53:13</div>
            <div class="video-copyright">
              <el-icon color="#fd676f" size="16px" style="margin-right: 2px">
                <CircleCloseFilled />
              </el-icon>
              <div>未经作者授权，禁止转载</div>
            </div>
          </div>
        </div>
        <div id="xgplayer"></div>
        <div class="video-toolbar">
          <div class="toolbar-left">
            <div class="thumbs-up">
              <img src="@/assets/thumbs-up.svg" />
              <div>1</div>
            </div>
            <div class="collect">
              <el-icon size="28px" color="#61666D">
                <StarFilled />
              </el-icon>
              <div>1</div>
            </div>
            <div class="share">
              <el-icon size="28px" color="#61666D">
                <Share />
              </el-icon>
              <div>1</div>
            </div>
          </div>
        </div>
        <div class="video-desc">
          <el-text line-clamp="2"> aaaaaaaaaadsajfalsdjfasj </el-text>
        </div>
      </div>
      <div class="right">
        <div class="user-up">
          <div>
            <el-link :underline="false">
              <el-avatar :size="48"> user </el-avatar>
            </el-link>
          </div>
          <div class="user-info">
            <div class="user-detail">
              <el-link class="user-up-name" :underline="false"> 用户名 </el-link>
              <el-link class="to-up-send-msg" :underline="false">
                <el-icon size="13px" style="margin-top: 2px">
                  <Message />
                </el-icon>
                &nbsp;发消息
              </el-link>
            </div>

            <el-text class="user-up-desc" line-clamp="1">简介aaaa</el-text>

            <el-button class="user-up-subscribe-btn" type="primary" icon="Plus">
              <div>关注</div>
              <div class="user-up-subscriptions">1231</div>
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.video {
  .main {
    padding: 0 10px;
    display: flex;
    justify-content: center;

    .left {
      width: 1006px;

      .video-info {
        height: 104px;
        padding-top: 22px;
        // background-color: #db1b1b;

        .title {
          color: #18191c;
          font-size: 20px;
        }

        .info-detail {
          margin-top: 6px;
          display: flex;
          align-items: center;
          color: #9499a0;
          font-size: 13px;

          .video-counts {
            margin-right: 12px;
            display: flex;
            align-items: center;
          }

          .video-up-date {
            margin-right: 12px;
            align-items: center;
          }

          .video-copyright {
            display: flex;
            align-items: center;
          }
        }
      }

      .video-toolbar {
        height: 57px;
        padding: 16px 0 12px;
        border-bottom: 1px solid #e3e5e7;

        .toolbar-left {
          height: 28px;
          display: flex;

          .thumbs-up {
            > img {
              height: 100%;
              margin-right: 8px;
            }
          }

          > * {
            .el-icon {
              margin-right: 8px;
            }

            height: 100%;
            width: 92px;

            display: flex;
            align-items: center;

            cursor: pointer;
          }

          .thumbs-up:hover {
            color: #1989fa;

            img {
              filter: drop-shadow(#1989fa 1000px 0);
              transform: translateX(-1000px);
            }
          }

          .collect:hover {
            color: #1989fa;

            > .el-icon {
              color: #1989fa;
            }
          }

          .share:hover {
            color: #1989fa;

            > .el-icon {
              color: #1989fa;
            }
          }
        }
      }

      .video-desc {
        height: 48px;
        margin: 16px 0;

        > .el-text {
          font-size: 15px;
          color: #18191c;
        }
      }
    }

    .right {
      width: 350px;
      margin-left: 30px;

      .user-up {
        height: 104px;
        display: flex;
        align-items: center;

        > .user-info {
          width: 100%;
          margin-left: 12px;
          display: flex;
          flex-direction: column;

          > .user-detail {
            display: flex;
            align-items: center;

            .user-up-name {
              color: #18191c;
              font-size: 15px;
              margin-right: 12px;
            }
          }

          .user-up-desc {
            width: 100%;
            margin-top: 2px;
            color: #9499a0;
            font-size: 13px;
          }

          .user-up-subscribe-btn {
            margin-top: 5px;
            width: 200px;
            height: 30px;
          }
        }
      }
    }
  }

  // display: flex;
  // flex-direction: column;
}
</style>
