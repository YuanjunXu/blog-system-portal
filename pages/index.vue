<template>
  <div id="index-page-box" class="index-page-box clear-fix">
    <div id="index-left-part" class="index-left-part default-border-radius float-left">
      <!--管理员信息展示-->
      <div class="about-admin">
        <div class="title">关于作者</div>
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
        </div>
        <div class="left-user-self-links">
          <el-popover
            popper-class="wechat-pop-container"
            placement="bottom"
            trigger="click">
            <div class="index-wechat-pop-content">
              <div class="wechat-subscription">
                <img src="http://fs.xuyuanjun.cn/20211109/%E5%BE%AE%E4%BF%A1%E5%85%AC%E4%BC%97%E5%8F%B7.jpg">
              </div>
            </div>
            <span slot="reference" class="sob_blog sobwechat"></span>
          </el-popover>
          <a href="https://gitee.com/alex_xyj" target="_blank">
            <span class="sob_blog sobgithub"></span>
          </a>
          <a target="_blank" href="https://space.bilibili.com/393667619">
            <span class="sob_blog sobbilibili-line"></span>
          </a>
        </div>
      </div>


      <div class="left-categories-box">
        <div
          :class="currentCategoryId===item.id?'category-item-active default-border-radius':'category-item default-border-radius'"
          v-for="(item,index) in categories" :key="index">
          <div v-text="item.name" @click="listArticlesByCategoryId(item)"></div>
        </div>
      </div>
    </div>
    <div id="index-center-part" class="index-center-part float-left">
      <div class="loop-box default-border-radius">
        <el-carousel :interval="3000" arrow="always">
          <el-carousel-item v-for="(item,index) in loop" :key="index">
            <a :href="item.targetUrl"><img :src="item.imageUrl" style="object-fit: cover"></a>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="top-articles-box">
        <div class="article-item default-border-radius clear-fix" v-for="(item,index) in topArticles" :key="index">
          <div class="article-left float-left">
            <div class="article-title">
              <span class="top-tips">置頂</span>
              <span class="title">
                <a :href="'/article/'+item.id">{{ item.title }}</a>
              </span>
            </div>
            <div class="article-summary">
              <p>
                {{ item.summary }}
                <span>...</span>
                <a :href="'/article/'+item.id"><span class="read-more">阅读全文</span></a>
              </p>
            </div>
            <div class="labels">
              <el-tag
                size="medium"
                v-for="(tag,tagIndex) in item.labels"
                :key="tagIndex"
                type="info">
                <a :href="'/search?keyword='+tag" target="_blank">{{ tag }}</a>
              </el-tag>
            </div>
          </div>
          <div class="article-right float-right">
            <div class="article-cover">
              <img :src="'/portal/image/'+item.cover">
            </div>
          </div>
        </div>
      </div>
      <div class="last-articles-box"
           v-loading="isLoading">
        <div class="article-item default-border-radius clear-fix" v-for="(item,index) in articles" :key="index">
          <div class="article-left float-left">
            <div class="article-title">
              <span class="title">
                 <a :href="'/article/'+item.id">{{ item.title }}</a>
              </span>
            </div>
            <div class="article-summary">
              <p>
                {{ item.summary }}
                <span>...</span>
                <a :href="'/article/'+item.id"><span class="read-more">阅读全文</span></a>
              </p>
            </div>
            <div class="labels">
              <el-tag
                size="medium"
                v-for="(tag,tagIndex) in item.labels"
                :key="tagIndex"
                type="info">
                <a :href="'/search?keyword='+tag" target="_blank">{{ tag }}</a>
              </el-tag>
            </div>
          </div>
          <div class="article-right float-right">
            <div class="article-cover" v-if="item.cover!=='' && item.cover!==null">
              <img :src="'/portal/image/'+item.cover">
            </div>
          </div>
        </div>
      </div>
      <div class="article-page-navigation-bar">
        <el-pagination
          class="user-list-page-navigation-bar"
          background
          @current-change="onPageChange"
          :current-page="pageNavigation.currentPage"
          :page-size="pageNavigation.pageSize"
          layout="prev, pager, next"
          :total="pageNavigation.totalCount">
        </el-pagination>
      </div>
    </div>
    <div class="index-right-part float-left">
      <div class="right-card">
        <div class="card-title">
          内容搜索
        </div>
        <div class="card-content">
          <el-input
            @keyup.enter.native="toSearchPage"
            size="medium"
            placeholder="搜索文章"
            prefix-icon="el-icon-search"
            v-model="keyword">
          </el-input>
        </div>
      </div>
      <div id="wechart-box" class="right-card">
        <div class="card-title">
          热门标签
        </div>
        <div class="card-content">
          <div class="labels-list-box">
            <WordCloud></WordCloud>
          </div>
        </div>
      </div>
      <div class="right-card">
        <div class="card-title">
          公众号
        </div>
        <div class="card-content">
          <div class="wechat-subscription">
            <img src="http://fs.xuyuanjun.cn/20211109/%E5%BE%AE%E4%BF%A1%E5%85%AC%E4%BC%97%E5%8F%B7.jpg">
          </div>
        </div>
      </div>
      <!--广告卡片-->
      <!--      <div class="taobao-ad-box" id="taobao-ad-box">-->
      <!--        <TaobaoLoop></TaobaoLoop>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
import * as api from '../api/api';
import {getDailyContent} from "../api/api";

export default {
  head() {
    return {
      title: '猿村-记录程序猿技术成长路线',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '猿村,这是个人技术，包括前端，后台'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: '猿村,java,C#,开发,系统,程序员,宣君'
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: '../static/favicon.ico'
        }
      ]
    }
  },
  data() {
    return {
      isLoading: false,
      keyword: '',
      currentCategoryId: '',
      dailyContent: {
        content: '',
        from: ''
      }
    }
  },
  mounted() {
    this.$store.commit("setCurrentActivityTab", "index");
    this.onWindowScroll();
    window.addEventListener('scroll', this.onWindowScroll);
    let that = this;
    window.onresize = function () {
      that.onWindowScroll();
    };

  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onWindowScroll);
  },
  methods: {
    toSearchPage() {
      //如果没有输入内容，无效
      this.keyword = this.keyword.trim();
      if (this.keyword === '') {
        console.log('内容为空.');
        return;
      }
      location.href = "/search?keyword=" + encodeURIComponent(this.keyword);
    },
    listArticlesByCategoryId(item) {
      if (this.currentCategoryId === item.id) {
        return;
      }
      this.isLoading = true;
      //console.log(item);
      //重置页码
      this.pageNavigation.currentPage = 1;
      this.currentCategoryId = item.id;
      //请求数据
      api.getArticles(this.currentCategoryId,
        this.pageNavigation.currentPage,
        this.pageNavigation.pageSize).then(result => {
        //处理结果
        this.handleArticleResult(result);
      });

    },
    onWindowScroll() {
      let scrolledTop = document.documentElement.scrollTop;
      let scrolledLeft = document.documentElement.scrollLeft;
      let centerPart = document.getElementById('index-center-part');
      let parentPart = document.getElementById('index-page-box');
      //计算我们leftPart顶部
      let leftPart = document.getElementById('index-left-part');
      //左边内容悬浮控制
      if (centerPart && leftPart && parentPart) {
        //处理上下滑动
        let baseTop = centerPart.offsetTop;
        if (scrolledTop <= baseTop) {
          leftPart.style.top = (baseTop - scrolledTop) + 'px';
        } else {
          leftPart.style.top = '20px';
        }
        //处理左右滑动
        if (scrolledLeft > 0) {
          leftPart.style.left = -scrolledLeft + 'px';
        } else {
          //正常状态的，左边应该它老爸的左边
          leftPart.style.left = parentPart.offsetLeft + 'px';
        }
      }
      //右边内容悬浮控制
      let taobaoAd = document.getElementById('taobao-ad-box');
      let hotLabelBox = document.getElementById('wechart-box');
      if (taobaoAd && hotLabelBox) {
        let bootomOfTB = taobaoAd.offsetTop + taobaoAd.offsetHeight;
        //console.log('bootomOfTB == > ' + bootomOfTB);
        if (scrolledTop >= bootomOfTB) {
          // console.log('显示悬浮内容...');
          hotLabelBox.style.position = 'fixed';
          hotLabelBox.style.top = '20px';
          hotLabelBox.style.width = '210px';
          //显示我们的悬浮内容
        } else {
          hotLabelBox.style.position = '';
          hotLabelBox.style.top = '';
          // console.log('隐藏悬浮内容...')
        }
      }
      //console.log('onscroll...' + scrolledTop);
    },
    handleArticleResult(result) {
      if (result.code === api.success_code) {
        this.articles = result.data.contents;
        //回到顶部
        let topHeader = document.getElementById('blog-header');
        if (topHeader) {
          topHeader.scrollIntoView({
            block: 'start',
            behavior: 'smooth'
          })
        }
        //处理一下页码
        this.pageNavigation.currentPage = result.data.currentPage;
        this.pageNavigation.totalCount = result.data.totalCount;
        this.pageNavigation.pageSize = result.data.pageSize;
      } else {
        this.$message.error(result.message);
      }
      this.isLoading = false;
    },
    onPageChange(page) {
      this.isLoading = true;
      //客户端了
      //console.log(page);
      //去加载当前页的内容
      api.getArticles(this.currentCategoryId, page, this.pageNavigation.pageSize).then(result => {
        this.handleArticleResult(result);
      })
    },

  },
  async asyncData({params}) {
    let userInfoRes = await api.getAdminInfo();
    let categoriesRes = await api.getCategories();
    let loopRes = await api.getLoop();
    let topArticlesRes = await api.getTopArticle();
    //在服务渲染的
    let articlesRes = await api.getArticles('', 1, 10);
    let pageNavigation = {
      currentPage: articlesRes.data.currentPage,
      totalCount: articlesRes.data.totalCount,
      pageSize: articlesRes.data.pageSize
    };
    let tempCategories = [];
    tempCategories.push({
      name: '全部分类',
      id: ''
    });
    tempCategories = tempCategories.concat(categoriesRes.data);
    return {
      pageNavigation: pageNavigation,
      articles: articlesRes.data.contents,
      topArticles: topArticlesRes.data,
      loop: loopRes.data,
      categories: tempCategories,
      userInfo: userInfoRes.data
    };
  }
};
</script>
<style>
.about-admin .title {
  font-size: 14px;
  color: #409EFF;
  margin-bottom: 10px;
  font-weight: 600;
  margin-left: 10px;
  padding-top: 10px;
}

.about-admin {
  background: #FFFFFF;
  padding-bottom: 20px;
  border-radius: 8px;
}

.wechat-pop-container {
  padding: 0 !important;
}

#index-left-part {
  position: fixed;
  top: 91px;
}

.taobao-ad-box .el-carousel__button {
  height: 5px;
  width: 5px;
  border-radius: 50%;
}

.taobao-ad-box .el-carousel__container {
  height: 230px;
}

.wechat-subscription img {
  object-fit: cover;
  width: 210px;
  height: 210px;
}

.wordCloud .text {
  cursor: pointer;
}

.labels-list-box {
  height: 240px;
}

.labels-list-box .wordCloud {
  width: 100%;
  height: 240px;
}

.right-card {
  background: #fff;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.right-card .card-title {
  font-size: 14px;
  color: #409EFF;
  margin-bottom: 10px;
  font-weight: 600;
}

.article-page-navigation-bar {
  text-align: center;
}

.article-page-navigation-bar .el-pagination.is-background .el-pager li {
  background-color: #fff;
}

.labels .el-tag--medium {
  height: 22px;
  line-height: 22px;
}

.labels .el-tag a:hover {
  color: #409EFF;
}

.labels .el-tag a {
  color: #909399;
  padding: 0 10px;
}

.labels .el-tag {
  cursor: pointer;
  padding: 0;
  margin-right: 10px;
}

.labels {
  margin-top: 10px;
}

.read-more:hover {
  color: #444444;
}

.read-more {
  font-size: 12px;
  color: #999999;
  cursor: pointer;
  border-radius: 4px;
  padding: 3px 10px;
}

.article-summary {
  max-width: 400px;
  margin-top: 10px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  color: #909399;
}

.article-title .top-tips {
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 12px;
  vertical-align: middle;
  background: #ff4500;
  color: #fff;
}

.article-title {
  display: -webkit-box;
  max-width: 400px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  margin-top: 10px;
}

.article-title .title a:hover {
  color: #409EFF;
}

.article-title .title a {
  cursor: pointer;
  font-size: 20px;
  vertical-align: middle;
  color: #606266;
}

.article-item {
  background: #fff;
  padding: 10px;
  margin-bottom: 20px;
}

.top-articles-box {
  margin-top: 20px;
}

.article-cover img {
  width: 160px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
}

.loop-box {
  background: #fff;
  padding: 10px;
}

.loop-box img {
  width: 100%;
  border-radius: 4px;
  height: 300px;
}

.left-categories-box .category-item:hover,
.left-categories-box .category-item-active {
  background: #eceaea;
  color: #409EFF !important;
}

.left-categories-box .category-item, .left-categories-box .category-item-active {
  padding: 10px 5px;
  cursor: pointer;
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 5px;
  color: #999999;
}

.left-categories-box {
  border-radius: 8px;
  background: #fff;
  margin-bottom: 20px;
  margin-top: 20px;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
}

.left-user-self-links a > span:hover, .left-user-self-links .sobwechat:hover {
  color: #409EFF;
}

.left-user-self-links {
  text-align: center;
  margin-top: 20px;
  background: #fff;
}

.left-user-self-links a > span, .left-user-self-links .sobwechat {
  font-size: 30px;
  font-weight: 600;
  cursor: pointer;
  margin-left: 15px;
  display: inline-block;
  color: #CACACA;
  margin-right: 15px;
}

.index-left-user-info {
  background: #fff;
  margin-top: 10px;
  text-align: center;
}

.index-left-user-info .user-sign {
  margin-top: 14px;
  color: #CACACA;
}

.index-left-user-info .user-name {
  margin-top: 14px;
  color: #606060;
  font-size: 18px;
}

.index-left-user-info .user-avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.index-page-box {
  margin-top: 20px;
  margin-bottom: 20px;
}


.index-right-part {

}

.index-left-part {
  margin-right: 10px;
  width: 230px;
}

.index-right-part {
  margin-left: 10px;
  width: 230px;
}

.index-center-part {
  width: 640px;
  margin-right: 10px;
  margin-left: 250px;
}
</style>
