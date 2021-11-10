<template>
  <div id="index-page-box" class="index-page-box">

    <div id="index-left-part" class="index-left-part float-left default-border-radius">
      <!--用户信息-->
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

      <!--文章分类-->
      <div class="left-categories-box">
        <div
          :class="currentCategoryId===item.id?'category-item-active default-border-radius':'category-item default-border-radius'"
          v-for="(item,index) in categories" :key="index">
          <div v-text="item.name" v-on:click="listArticlesByCategoryId(item)"></div>
        </div>
      </div>

    </div>

    <div id="index-center-part" class="index-center-part float-left default-border-radius">
      <!--顶部轮播图-->
      <div class="loop-box default-border-radius">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="(item,index) in loopImages" :key="index">
            <img :src="item.imageUrl" style="object-fit: cover">
          </el-carousel-item>
        </el-carousel>
      </div>

      <!--置顶文章-->
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

      <!--最新文章列表-->
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

        <!--分页栏-->
        <div class="article-page-navigation">
          <el-pagination
            background
            @current-change="onPageChange"
            :current-page="pageNum"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="latestArticles.totalCount">
          </el-pagination>
        </div>
      </div>

    </div>

    <div id="index-right-part" class="index-right-part float-right default-border-radius">
      <!--搜索卡片-->
      <div class="search-card default-border-radius">
        <div class="card-title">
          内容搜索
        </div>
        <div class="card-content">
          <el-input
            @keyup.enter.native="toSearchPage"
            placeholder="请输入搜索内容"
            prefix-icon="el-icon-search"
            v-model="keyword">
          </el-input>
        </div>
      </div>

      <!--热门标签卡片-->
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

      <!--每日一句卡片-->
      <div class="right-card default-border-radius">
        <div class="card-title">
          每日一句
        </div>
        <div class="card-content">
          热闹只是消耗品，撑起人生的是孤独。 ——宣君
        </div>
      </div>

      <!--公众号卡片-->
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

      <!--其它卡片-->
      <div class="right-card default-border-radius">
        <div class="card-title">
          其它卡片
        </div>
        <div class="card-content">

        </div>
      </div>

      <!--淘宝广告轮播卡片-->
      <div class="taobao-ads-box">
        <!--          <TaobaoLoop></TaobaoLoop>-->
      </div>

    </div>

  </div>
</template>

<style>

.taobao-ads-box {

}

.index-left-part {
  background: #FFffff;
  margin-bottom: 10px;
  width: 235px;
  position: fixed;
  top: 71px;
}

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
  margin-left: 5px;
  margin-right: 5px;
  text-align: center;
  padding: 0 0 10px 0;
}

.loop-box .el-carousel .el-carousel__button {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.left-categories-box .category-item, .left-categories-box .category-item-active {
  padding: 5px;
  cursor: pointer;
  color: #737F90;
  margin-bottom: 5px;
}


.left-categories-box .category-item:hover, .left-categories-box .category-item-active {
  background: #EBE9EEC1;
  color: #c9adf3;
}

.index-left-user-info {
  text-align: center;
}

.index-left-user-info .user-avatar {
  padding: 20px 10px;
}

.index-left-user-info .user-avatar img {
  width: 60px;
  height: 60px;
  border-radius: 50px;
}

.index-left-user-info .user-name {
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
  width: 235px;
}

.index-right-part {
  width: 235px;
  color: #737F90;
  position: fixed;
  top: 71px;
  margin-left: 905px;
}

.index-center-part {
  width: 660px;
  margin-left: 240px;
  margin-right: 5px;
}


</style>


<script>
import * as api from '../api/api'
import {getLatestArticles, getLatestArticlesByCategoryId, getLoopImages, getTopArticles} from "../api/api";

export default {

  data() {
    return {
      isLoading: false,
      keyword: '',
      margin: {top: 0, right: 0, bottom: 0, left: 0},
      rotate: {from: -10, to: 30, numOfOrientation: 10},
      fontSize: [10, 40],
      hotLabels: [],
      currentCategoryId: ''
    }
  },

  mounted() {
    this.getHotLabels(10);

    this.onWindowScroll();
    window.addEventListener("scroll", this.onWindowScroll);
    let _this = this
    window.onresize = function () {
      _this.onWindowScroll();
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onWindowScroll);
  },

  methods: {

    toSearchPage() {
      if (this.keyword === '') {
        console.log("搜索内容为空~~~~~~")
        return;
      }
      // 跳转到搜索结果页面
      location.href = '/search/' + encodeURIComponent(this.keyword);
    },

    listArticlesByCategoryId(category) {
      if (this.currentCategoryId == category.id) {
        return;
      }
      this.currentCategoryId = category.id;
      // 重置页码
      this.pagenum = 1;
      // 获取数据
      api.getLatestArticlesByCategoryId(this.currentCategoryId, this.pagenum, this.pageSize).then(res => {
        if (res.code == api.successCode) {
          this.latestArticles = res.data;
        } else {
          this.$message.error(res.message)
        }
      })
    },

    // 窗口滚动时，让左右板块悬浮滑动
    onWindowScroll() {
      let scrollTop = document.documentElement.scrollTop;
      let scrollLeft = document.documentElement.scrollLeft;
      let leftPart = document.getElementById('index-left-part');
      let rightPart = document.getElementById('index-right-part');
      let centerPart = document.getElementById('index-center-part');
      let indexPageBox = document.getElementById('index-page-box');
      if (rightPart && leftPart && centerPart && indexPageBox) {
        // 处理上下滑动
        let baseTop = centerPart.offsetTop;
        if (scrollTop < baseTop) {
          leftPart.style.top = (baseTop - scrollTop) + 'px';
          rightPart.style.top = (baseTop - scrollTop) + 'px';
        } else {
          leftPart.style.top = 10 + 'px';
          rightPart.style.top = 10 + 'px';
        }
        // 处理左右滑动
        if (scrollLeft > 0) {
          leftPart.style.left = -scrollLeft + 'px';
          console.log(leftPart.style.left)
          rightPart.style.left = -scrollLeft + 'px';
        } else {
          // 正常状态
          leftPart.style.left = indexPageBox.offsetLeft + 'px';
          console.log("indexPageBox.offsetLeft", indexPageBox.offsetLeft);
          console.log("  leftPart.style.left", leftPart.style.left);
          rightPart.style.left = indexPageBox.offsetLeft + 'px';
        }
      }
    },


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
      this.pagenum = page;
      this.isLoading = true;
      api.getLatestArticlesByCategoryId(this.currentCategoryId, page, this.pageSize).then(res => {
        this.isLoading = false;
        if (res.code == api.successCode) {
          // 回到页面顶部
          let header = document.getElementById('blog-header');
          if (header) {
            header.scrollIntoView({block: "start", behavior: "smooth"})
          }
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
    let articlesRes = await api.getLatestArticlesByCategoryId('', 1, pageSize);


    let tmpCategories = [];
    tmpCategories.push({
      name: "全部分类",
      id: ""
    });
    tmpCategories = tmpCategories.concat(categoriesRes.data);
    return {
      userInfo: adminUserInfoRes.data,
      categories: tmpCategories,
      loopImages: loopImageRes.data,
      topArticles: topArticlesRes.data,
      latestArticles: articlesRes.data,
      pageSize: pageSize,
      pageNum: 1,
    }
  }
}
</script>
