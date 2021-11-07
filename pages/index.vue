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
        <div class="top-article-item default-border-radius" v-for="(item,index) in topArticles" :key="index">
          <!--          <div class="top-article-cover"><img :src="item.cover"></div>-->
          <div class="top-article-title">
            <span class="top-tips">置顶</span>
            <span class="top-title">{{ item.title }}</span>
          </div>
          <div class="top-article-summary">
            <p>{{ item.summary }}
              <span>...</span>
              <span class="read-more">阅读全文</span>
            </p>
          </div>
          <div class="top-article-label">
            <el-tag size="mini"
                    v-for="(tag,takIndex) in item.labels" :key="takIndex" effect="plain">
                    {{ tag }}
            </el-tag>
          </div>
        </div>
      </div>
    </div>

    <div class="index-right-part float-left default-border-radius"></div>
  </div>
</template>

<style>
.top-article-label .el-tag {
  margin-left: 10px;
  cursor: pointer;
}

.top-article-label{
  margin-top: 10px;
}

.top-article-summary {
  margin-left: 10px;
}


.read-more:hover {
  border: #AEAAA8D6 solid 1px;
}

.read-more {
  border: #D6CFC7D6 solid 1px;
  border-radius: 8px;
  padding: 2px 10px;
  cursor: pointer;
  margin-left: 10px;
}

.top-article-summary {
  margin-top: 10px;
}

.top-article-title .top-tips {
  padding: 2px 10px;
  background: #f97144;
  border-radius: 4px;
  margin-right: 5px;
  color: white;
}

.top-article-title .top-title {
  font-size: 20px;
}

.top-article-box {
  margin-top: 10px;
}

.top-article-item {
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
  margin-top: 10px;
  margin-bottom: 10px;
}

.index-left-part {
  width: 215px;
  margin-right: 5px;
  background: #ffffff;
  padding: 10px;
}

.index-center-part {
  width: 660px;
}

.index-right-part {
  width: 215px;
  margin-left: 5px;
  background: #ffffff;
  padding: 10px;
}

</style>


<script>
import * as api from '../api/api'
import {getLoopImages, getTopArticles} from "../api/api";

export default {
  async asyncData({params}) {
    let adminUserInfoRes = await api.getAdmin();
    let categoriesRes = await api.getCategories();
    let loopImageRes = await api.getLoopImages();
    let topArticlesRes = await api.getTopArticles();
    console.log(topArticlesRes.data);
    return {
      userInfo: adminUserInfoRes.data,
      categories: categoriesRes.data,
      loopImages: loopImageRes.data,
      topArticles: topArticlesRes.data,
    }
  }
}
</script>
