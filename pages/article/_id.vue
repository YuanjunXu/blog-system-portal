<template>
  <div id="article-box" class="article-box">
    <div class="content-box clear-fix default-font-family">
      <div class="article-left-part float-left default-border-radius">
        <div class="article-container default-border-radius">
          <div class="article-detail-title">
            <h1 v-text="articleRes.title"></h1>
          </div>
          <div class="article-info">
            <img :src="articleRes.userAvatar"></img>
            <span class="username">{{ articleRes.userName }}</span>
            <span class="el-icon-date"> 发表于：{{ articleRes.updateTime|formatDate("yyyy-MM-dd hh:mm:ss") }}</span>
            <span class="el-icon-view"> {{ articleRes.viewCount }}</span>
          </div>
          <div class="article-label">
            <el-tag type="info" size="mini" v-for="(item,index) in articleResTags" :key="index">
              {{ item }}
            </el-tag>
          </div>
          <div id="article-content-category-box" class="catalog-box"></div>
          <div id="article-content" class="article-content" v-html="articleRes.content"></div>
        </div>
        <!--输入评论-->
        <div class="article-comment-input">
          <div class="comment-input-header">评 论</div>
          <el-input
            @focus="checkLogin"
            rows="4"
            type="textarea"
            placeholder="快写下你的评论吧"
            v-model="comment.content"
            maxlength="255"
            show-word-limit>
          </el-input>
          <div class="comment-submit-btn">
            <el-button size="mini" type="primary" @click="doComment">提交评论</el-button>
          </div>

        </div>
        <!--评论区-->
        <div class="article-comment-box default-border-radius">
          <div class="article-comment-list-box">
            <div class="article-comment-header">
              评论列表
            </div>
            <div class="comment-item-list">
              <div class="article-comment-item" v-for="(comment,comIndex) in comments" :key="comIndex">
                <div class="article-comment-user-info">
                  <a :href="'/user/'+comment.userId">
                    <img :src="comment.userAvatar">
                    <span class="username">{{ comment.userName }}</span>
                  </a>
                </div>
                <div class="article-comment-reply" v-if="comment.parentContent!==null">
                  <span>回复：{{ comment.parentContent }}</span>
                </div>
                <div class="article-comment-content">
                  {{ comment.content }}
                </div>
                <div class="article-comment-action">
                  <span class="el-icon-date"> {{ comment.updateTime|formatDate('yyyy-MM-dd hh:mm:ss') }}</span>
                  ·
                  <span class="item-reply-btn">回复</span>
                </div>
              </div>
            </div>
            <div class="no-comment" v-if="comments.length===0">暂时没有评论，赶快写下宝贵的的建议吧~</div>
            <div class="load-more-comment" v-else-if="!isLastPage">加载更多>></div>
          </div>

        </div>
        <!--相关文章推荐-->
        <div class="article-recommend-box default-border-radius">
          <div class="article-recommend-box-title">小猿推荐文章</div>
          <div class="recommend-item" v-for="(item,index) in recommendArtic" :key="index">
            <div class="recommend-title">
              <a :href="'/article/'+item.id">{{ item.title }}</a>
            </div>
            <div class="recommend-summary">
              {{ item.summary }}
            </div>
            <div class="recommend-info">
              <span class="el-icon-date"> {{ item.updateTime|formatDate('yyyy-MM-dd hh:mm:ss') }}</span>
              <span class="el-icon-view"> {{ item.viewCount }}</span>
            </div>
            <el-tag type="info" size="mini" v-for="(tag,tagIndex) in item.labels" :key="tagIndex">
              <a :href="'/search?keyword='+tag" target="_blank">{{ tag }}</a>
            </el-tag>
          </div>
        </div>
      </div>
      <div class="article-right-part float-right default-border-radius">

        <!--每日一句卡片-->
        <div id="daily-card" class="right-card default-border-radius">
          <div class="card-title">
            每日一句
          </div>
          <div class="card-content">
            热闹只是消耗品，撑起人生的是孤独。 ——宣君
          </div>
        </div>

        <!--公众号卡片-->
        <div id="weChart-box" class="right-card default-border-radius">
          <div class="card-title">
            公众号
          </div>
          <div class="card-content">
            <div class="gong-zhong-hao">
              <img src="http://fs.xuyuanjun.cn/20211109/%E5%BE%AE%E4%BF%A1%E5%85%AC%E4%BC%97%E5%8F%B7.jpg">
            </div>
          </div>
        </div>

        <!--文章目录卡片-->
        <div id="article-catalog-box" class="right-card default-border-radius">
          <div class="card-title">
            文章目录
          </div>
          <div id="article-catalog" class="card-content">

          </div>
        </div>
      </div>
    </div>

    <div class="article-detail-part">
      <el-dialog
        :visible.sync="isImageDialogShow">
        <img :src="targetImgPath">
      </el-dialog>
    </div>
  </div>
</template>

<style>


.comment-input-header {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: #999999;
  padding: 0 0 10px 0;
}

.comment-submit-btn {
  margin-top: 10px;
  text-align: right;
}

.article-comment-input {
  margin-top: 10px;
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
}

.no-comment {
  text-align: center;
  color: #737F90;
  font-size: 14px;
  font-weight: 500;
  padding: 20px 0;
}

.article-comment-user-info .username {
  margin-left: 3px;
  font-weight: 600;
  color: #737F90;
  font-size: 16px;
  display: inline-block;
}

.load-more-comment:hover {
  color: #c9adf3;
}

.load-more-comment {
  text-align: center;
  cursor: pointer;
  margin-top: 20px;
  font-size: 14px;
  font-weight: 500;
  color: #737F90;
}

.article-comment-reply {
  padding: 10px;
  margin-left: 30px;
  background: #F1F1F1FF;
}

.article-comment-content {
  padding: 10px;
  margin-left: 20px;
}

.item-reply-btn:hover {
  color: #c9adf3;
}

.item-reply-btn {
  cursor: pointer;
}

.article-comment-action {
  color: #999999;
  font-size: 14px;
  font-weight: 500;
  text-align: right;
}

.comment-item-list {
  margin-top: 10px;
}

.article-comment-item {
  margin-top: 10px;
  border-bottom: #F1F1F1FF 1px solid;
}

.article-comment-user-info .username:hover {
  color: #c9adf3;
}

.article-comment-user-info img {
  display: inline-block;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  vertical-align: middle;
}

.article-comment-box {
  background: #ffffff;
  margin-top: 10px;
  padding: 20px;
}

.cl-link > span {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

#article-catalog-box {
  max-height: 600px;
  overflow: hidden;
}

.cl-link-active > span {
  color: #c9adf3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.right-card {
  padding: 10px;
  margin-bottom: 10px;
  background: #ffffff;
}

.gong-zhong-hao img {
  height: 150px;
  width: 150px;
  margin-left: 30px;
  border-radius: 44px;
}


#article-catalog .cl-wrapper ul li span:hover {
  color: #c9adf3;
}

#article-catalog ul {
  margin-left: 20px;
  cursor: pointer;
}

.catalog-box {
  margin-top: 20px;
}

.catalog-box .cl-wrapper ul li span:hover {
  color: #c9adf3;
}

.catalog-box ul {
  margin-left: 20px;
  cursor: pointer;
}

.article-recommend-box-title, .article-comment-header {
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  padding-bottom: 5px;
  border-bottom: #999999 solid 1px;
  margin-bottom: 5px;
  color: #999999;
}

.recommend-item a:hover {
  color: #c9adf3;
}

.recommend-item a {
  color: #515b60;
}

.recommend-info {
  display: inline-block;
}

.el-tag.el-tag--info {
  margin-right: 10px;
  cursor: pointer;
}

.recommend-info span {
  margin-right: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #737F90;
}

.recommend-summary {
  font-size: 16px;
  color: #737F90;
  margin-bottom: 10px;
  font-size: 16px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2
}

.recommend-title {
  font-size: 18px;
  font-weight: 600;
  color: #515b60;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 1
}


.recommend-item {
  border-bottom: #f5f5f5 solid 1px;
  padding-bottom: 10px;
  padding-top: 10px;
}

.article-recommend-box {
  background: #ffffff;
  padding: 20px;
  margin-top: 10px;
}


.right-card .card-title {
  color: #737F90;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 10px;
}


.article-detail-part .el-dialog {
  width: fit-content;
}

.article-detail-part .el-dialog__body {
  padding: 10px;
}

.article-detail-part .el-dialog__header {
  padding: 0;
}

.article-content h1 {
  color: #000;
  line-height: 40px;
}

.article-content p code {
  color: #5195f1;
  font-weight: 600;
}

.article-content ol li code {
  color: #5195f1;
  font-weight: 600;
}

.article-content p {
  line-height: 24px;
  font-size: 16px;
  color: #252424F4;
  font-weight: 500;
  padding: 10px 0;
  margin-left: 25px;
}

.article-content li {
  line-height: 14px;
  font-size: 16px;
  color: #252424F4;
  font-weight: 500;
  padding: 10px 0;
  margin-left: 25px;
}

.article-content hr {
  margin: 15px 0;
}

.article-content ul {
  margin-left: 25px;
  line-height: 24px;
  color: #252424F4;
  font-weight: 500;
  padding: 10px 0;
  font-size: 16px;
}

.article-content pre code {
  border-radius: 8px;
  padding: 20px;
  font-weight: 500;
  font-size: 14px;
  font-family: PingFangSC-Regular, sans-serif;
  max-height: 500px;
  margin-bottom: 5px;
}

.article-content pre code span {
  padding: 5px 0;
  font-weight: 500;
}

.article-content {
  margin-top: 20px;
}

.article-content img {
  max-width: 800px;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  display: block;
  margin-bottom: 5px;
  cursor: zoom-in;
}

.article-info .username {
  font-size: 18px;
  font-width: 500;
  margin-left: 5px;
  margin-right: 5px;
}

.article-info {
  margin-top: 10px;
  line-height: 30px;
  font-size: 15px;
  color: #79797f;
}

.article-info img {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  vertical-align: middle;
}

.article-right-part {
  width: 240px;
}

.article-left-part {
  width: 890px;
}

.article-container {
  background: #ffffff;
  padding: 20px;

}


.article-box {
  margin-top: 10px;
  margin-bottom: 20px;
}

</style>

<script>
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import * as api from '../../api/api'
import Catelog from '../../utils/headerLineHandler'

export default {
  data() {
    return {
      isImageDialogShow: false,
      targetImgPath: '',
      comment: {
        content: '',
        articleId: '',
        parentComment: ''
      }
    }
  },

  mounted() {
    // 初始化高亮插件
    hljs.initHighlighting();

    this.previewImage();

    // 生成文章目录
    new Catelog({
      contentEl: 'article-content',
      catalogEl: 'article-catalog',
      selector: ['h1', 'h2', 'h3', 'h4']
    });

    // 让文章目录盒子悬浮
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
    doComment() {
      //检查是否登录
      if (document.cookie.indexOf('sob_blog_token') === -1) {
        location.href = "/login?redirect=" + location.href;
      }
      if (this.comment.content === '') {
        this.$message.error("当前没有可提交的评论");
        return;
      }
      this.comment.articleId = this.articleRes.id;

      api.postComment(this.comment).then(res => {
        if (res.code === api.successCode) {
          this.$message.success("评论成功");
          // 刷新列表
          this.getArticlesComments(this.articleRes.id, 1, 10);
        } else {
          this.$message.error(res.message);
        }
      }).catch(err => {
        this.$message.error(err.message);
      })
    },

    checkLogin() {
      api.checkToken().then(res => {
        if (res.code !== api.successCode) {
          location.href = "/login?redirect=" + location.href;
        }
      })
    },
    getArticlesComments(articleId, page, size) {
      api.getComments(articleId, page, size).then(res => {
        if (res.code === api.successCode) {
          this.comments = res.data.data;
        } else {
          this.$message.error(res.message);
        }
      }).catch(err => {
        this.$message.error(err.message);
      })
    },
    // 放大图片显示
    showImage(event) {
      this.isImageDialogShow = true;
      this.targetImgPath = event.target.src;
    },
    previewImage() {
      // 遍历图片
      let articleContent = document.getElementById("article-content");
      if (articleContent) {
        let imgList = articleContent.querySelectorAll("img");
        imgList.forEach(item => {
          item.addEventListener("click", this.showImage);
        })
      }
    },
    // 窗口滚动时，让左右板块悬浮滑动
    onWindowScroll() {
      let scrollTop = document.documentElement.scrollTop;
      let scrollLeft = document.documentElement.scrollLeft;
      let catalogBox = document.getElementById('article-catalog-box');
      let weChartBox = document.getElementById('weChart-box');
      let parentPart = document.getElementById('article-box');
      // 窗口顶部到微信公众号卡片的底部高度
      let bottomWC = weChartBox.offsetTop + weChartBox.offsetHeight;
      if (catalogBox && weChartBox && parentPart) {
        if (scrollTop > bottomWC) {
          catalogBox.style.position = 'fixed';
          catalogBox.style.top = '10px';
        } else {
          catalogBox.style.position = '';
          catalogBox.style.top = (bottomWC - scrollTop + 10) + 'px';
        }
        //处理左右滑动
        if (scrollLeft > 0) {
          catalogBox.style.left = parentPart.offsetLeft + parentPart.offsetWidth
            - catalogBox.offsetWidth - scrollLeft + 'px';
        } else {
          //正常状态的，左边应该它老爸的左边
          catalogBox.style.left = parentPart.offsetLeft + parentPart.offsetWidth
            - catalogBox.offsetWidth + 'px';
        }
      }
    },

  },

  /*
  * 加载文章详情：1.文章id
  * */
  async asyncData({params}) {
    let articleResData = await api.getArticle(params.id);
    let labels = articleResData.data.labels;
    if (labels !== '') {
      labels = labels.split('-');
    }
    ;
    //获取推荐相关文章
    let recommendArticRes = await api.getRecommendArticle(articleResData.data.id, 10);
    // 获取评论列表
    let size = 10;
    let commentRes = await api.getComments(articleResData.data.id, 1, 10);
    let isLastPage = false;
    if (commentRes.data.data.length < size) {
      isLastPage = true;
    }
    return {
      articleRes: articleResData.data,
      articleResTags: labels,
      recommendArtic: recommendArticRes.data,
      comments: commentRes.data.data,
      isLastPage: isLastPage,
      size: size,
    }

  }

}
</script>
