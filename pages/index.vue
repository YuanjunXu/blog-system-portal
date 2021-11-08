<template>
  <div class="index-page-box">

    <div class="index-left-part float-left default-border-radius">
      <div class="index-left-user-info">
        <div class="user-avatar">
          <img :src="userInfo.avatar">
        </div>
        <div class="user-name">
          <span v-text="userInfo.userName"></span>
        </div>
        <div class="user-sign">
          <span v-text="userInfo.sign"></span>
        </div>
        <div class="user-self-link">
          <span class="sob_blog sobwechat"></span>
          <span class="sob_blog sobgithub"></span>
          <span class="sob_blog sobbilibili-line"></span>
        </div>
      </div>
      <div class="left-categories-box">
        <div class="category-item default-border-radius" v-for="(item,index) in categories" :key="index">
          <span v-text="item.name"></span>
        </div>
      </div>
    </div>

    <div class="index-center-part float-left default-border-radius">
      <div class="loop-box default-border-radius">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="(item,index) in loopImages" :key="index">
            <img :src="item.imageUrl" style="object-fit: cover">
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="top-article-box">
        <div class="article-item default-border-radius clear-fix" v-for="(item,index) in topArticles" :key="index">
          <div class="article-right float-right">
            <div class="article-cover"><img :src="item.cover"></div>
          </div>
          <div class="article-left float-left">
            <div class="article-title">
              <span class="tips">置顶</span>
              <span class="title">{{ item.title }}</span>
            </div>
            <div class="article-summary clear-fix">
              <div class="article-summary-left float-left">
                <p>{{ item.summary }}</p>
              </div>
              <div class="article-summary-right float-right">
                <span class="read-more">阅读全文</span>
              </div>
            </div>
            <div class="article-label">
              <el-tag size="mini"
                      v-for="(tag,takIndex) in item.labels" :key="takIndex" effect="plain">
                {{ tag }}
              </el-tag>
            </div>
          </div>

        </div>
      </div>

      <div class="latest-article" v-loading="isLoading">
        <div class="article-item default-border-radius clear-fix" v-for="(item,index) in latestArticles.data"
             :key="index">
          <div class="article-right float-right">
            <div class="article-cover"><img :src="item.cover"></div>
          </div>
          <div class="article-left float-left">
            <div class="article-title">
              <span class="title">{{ item.title }}</span>
            </div>
            <div class="article-summary clear-fix">
              <div class="article-summary-left float-left">
                <p>{{ item.summary }}</p>
              </div>
              <div class="article-summary-right float-right">
                <span class="read-more">阅读全文</span>
              </div>
            </div>
            <div class="article-label">
              <el-tag size="mini"
                      v-for="(tag,takIndex) in item.labels" :key="takIndex" effect="plain">
                {{ tag }}
              </el-tag>
            </div>
          </div>
        </div>

        <div class="article-page-navigation">
          <el-pagination
            background
            @current-change="onPageChange"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="latestArticles.totalCount">
          </el-pagination>
        </div>
      </div>

    </div>

    <div class="index-right-part float-right default-border-radius">
      <div class="search-card default-border-radius">
        <div class="card-title">
          内容搜索
        </div>
        <div class="card-content">
          <el-input
            placeholder="请输入搜索内容"
            prefix-icon="el-icon-search"
            v-model="keyword">
          </el-input>
        </div>
      </div>

      <div class="hot-labels-card default-border-radius">
        <div class="card-title">
          热门标签
        </div>
        <div class="card-content">
          <div class="label-list-box">
            <wordcloud
              :data="hotLabels"
              :margin="margin"
              :rotate="rotate"
              :fontSize="fontSize"
              nameKey="name"
              valueKey="count"
              :showTooltip="false"
              :wordClick="wordClickHandler">
            </wordcloud>
          </div>
        </div>
      </div>

      <div class="right-card default-border-radius">
        <div class="card-title">
          每日一句
        </div>
        <div class="card-content">
          热闹只是消耗品，撑起人生的是孤独。 ——宣君
        </div>
      </div>

      <div class="right-card default-border-radius">
        <div class="card-title">
          公众号
        </div>
        <div class="card-content">
          <div class="gong-zhong-hao">
            <img src="http://fs.xuyuanjun.cn/20211109/%E5%BE%AE%E4%BF%A1%E5%85%AC%E4%BC%97%E5%8F%B7.jpg">
          </div>
        </div>
      </div>

      <div class="right-card default-border-radius">
        <div class="card-title">
          其它卡片
        </div>
        <div class="card-content">

        </div>
      </div>
    </div>

  </div>
</template>

<style>

.gong-zhong-hao img {
  height: 150px;
  width: 150px;
  margin-left: 30px;
  border-radius: 44px;
}

.search-card {
  padding: 10px;
  margin-bottom: 10px;
  background: #ffffff;
}

.search-card .card-title {
  margin-bottom: 5px;
}

.right-card {
  padding: 10px;
  margin-bottom: 10px;
  background: #ffffff;
}

.hot-labels-card {
  padding: 10px;
  margin-bottom: 10px;
  background: #ffffff;
}

.hot-labels-card .card-content .label-list-box .wordCloud {
  width: 215px;
  height: 204px;
}

.wordCloud .text {
  cursor: pointer;
}

.right-card .card-title {
  color: #737F90;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 10px;
}

.article-page-navigation {
  margin-bottom: 10px;
  text-align: center;
}

.article-page-navigation .el-pagination.is-background li {
  background: #F4EFEFCC;
}

.article-label .el-tag {
  margin-left: 5px;
  cursor: pointer;
}

.article-label {
  margin-top: 10px;
}

.article-summary-right {
  margin-top: 10px;
}

.article-summary-left {
  width: 400px;
  margin-left: 10px;
  color: #909399;
  margin-top: 10px;

  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;

}


.article-title {
  margin-top: 10px;
  margin-left: 10px;
  font-size: 12px;
  width: 440px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.read-more:hover {
  color: #373735FF;
}

.read-more {
  color: #D6CFC7D6;
  border-radius: 8px;
  padding: 2px 10px;
  cursor: pointer;
  font-size: 12px;
}


.article-title .tips {
  padding: 2px 10px;
  background: #f05c29;
  border-radius: 4px;
  margin-right: 5px;
  vertical-align: middle;
  color: white;
}

.article-cover img {
  width: 150px;
  height: 100px;
  margin-right: 10px;
  border-radius: 4px;
  vertical-align: middle;
}

.article-title .title {
  font-size: 20px;
  color: #606266;
  vertical-align: middle;
}

.top-article-box {
  margin-top: 10px;
}

.article-item {
  padding: 10px 0;
  margin-bottom: 10px;
  background: white;
}

.loop-box {
  background: white;
}

.loop-box img {
  width: 100%;
  height: 200px;
}

.left-categories-box {
  margin-top: 20px;
  text-align: center;
}

.loop-box .el-carousel .el-carousel__button {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.left-categories-box .category-item {
  padding: 5px;
  cursor: pointer;
  color: #737F90;
}

.left-categories-box .category-item:hover {
  background: rgba(235, 233, 238, 0.76);
}

.index-left-user-info {
  text-align: center;
  margin-top: 10px;
}

.index-left-user-info .user-avatar img {
  width: 60px;
  height: 60px;
  border-radius: 50px;
}

.index-left-user-info .user-name {
  margin-top: 10px;
  font-size: 18px;
}

.index-left-user-info .user-sign {
  margin-top: 10px;
  font-size: 14px;
  color: #5a5858;
}

.index-left-part .user-self-link {
  margin-top: 20px;
}

.index-left-part .user-self-link span {
  font-size: 25px;
  font-weight: 500;
  color: #737F90;
  padding: 10px;
}

.index-left-part .user-self-link span:hover {
  cursor: pointer;
  color: #c9adf3;
}

.index-page-box {
  overflow: auto;
  margin-top: 10px;
  margin-bottom: 10px;
}

.index-left-part {
  width: 215px;
  background: #ffffff;
  padding: 10px;
}

.index-right-part {
  width: 235px;
  color: #737F90;
}

.index-center-part {
  width: 660px;
  margin-left: 5px;
  margin-right: 5px;
}


</style>


<script>
import * as api from '../api/api'
import {getLatestArticles, getLoopImages, getTopArticles} from "../api/api";

export default {

  data() {
    return {
      isLoading: false,
      keyword: '',
      margin: {top: 0, right: 0, bottom: 0, left: 0},
      rotate: {from: -10, to: 30, numOfOrientation: 10},
      fontSize: [10, 40],
      hotLabels: [],
    }
  },

  mounted() {
    this.getHotLabels(10);
  },

  methods: {

    getHotLabels(size) {
      api.getHotLabels(size).then(res => {
        if (res.code == api.successCode) {
          this.hotLabels = res.data.data;
        }
      })
    },

    wordClickHandler(name, value, vm) {
      console.log('wordClickHandler', name, value, vm);
    },

    onPageChange(page) {
      this.isLoading = true;
      api.getLatestArticles(page, this.pageSize).then(res => {
        this.isLoading = false;
        if (res.code == api.successCode) {
          this.latestArticles = res.data;
        } else {
          this.$message.error(res.message)
        }
      })
    }
  },

  async asyncData({params}) {
    let adminUserInfoRes = await api.getAdmin();
    let categoriesRes = await api.getCategories();
    let loopImageRes = await api.getLoopImages();
    let topArticlesRes = await api.getTopArticles();

    let pageSize = 10;
    let articlesRes = await api.getLatestArticles(1, pageSize);

    return {
      userInfo: adminUserInfoRes.data,
      categories: categoriesRes.data,
      loopImages: loopImageRes.data,
      topArticles: topArticlesRes.data,
      latestArticles: articlesRes.data,
      pageSize: pageSize,
    }
  }
}
</script>
