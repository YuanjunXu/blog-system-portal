<template>
  <div class="search-box ">

    <!--搜索输入框-->
    <div class="search-input-box">
      <div class="search-input-container clear-fix">
        <div class="search-logo float-left">
          <span class="logo">猿村</span> |
          <span>搜索</span>
        </div>
        <div class="search-input float-left">
          <el-input @keyup.enter.native="toSearchPage" v-model="keyword" placeholder="输入想搜索的内容~"></el-input>
        </div>
        <div class="search-btn float-left">
          <el-button type="primary" icon="el-icon-search" @click="toSearchPage">搜索</el-button>
        </div>
      </div>
    </div>
    <!--搜索条件-->
    <div class="search-condition-box">
      <div class="select-item">
        <span :class="sort===''? 'sort-active' : ''" @click="doSearchBySort('')">综合排序</span>
        <span :class="sort==='2'|| sort==='1'? 'sort-active' : ''" @click="doSearchBySort('2')">时间</span>
        <span :class="sort==='4'|| sort==='3'? 'sort-active' : ''" @click="doSearchBySort('4')">浏览量</span>
      </div>
      <div class="select-item">
        <span :class="categoryId===''? 'category-active':''" @click="doSearchByCategory('')">全部分类</span>
        <span :class="categoryId===item.id? 'category-active':''"
              @click="doSearchByCategory(item.id)" v-for="item in categories"
              :key="item.id">{{ item.name }}</span>
      </div>

    </div>

    <!--搜索结果板块-->
    <div class="search-result-box clear-fix">
      <div class="search-left-part float-left default-border-radius">
        <!--搜索结果数量-->
        <div class="search-result-count-info">
          找到 <span v-text="searchResult.totalCount"></span> 条结果
        </div>
        <div class="search-result-list-box" v-if="searchResult.data.length!==0">
          <div class="search-result-item" v-for="(item,index) in searchResult.data" :key="index">
            <div class="result-item-title" v-html="item.blogTitle"></div>
            <div class="result-item-content" v-html="item.blogContent"></div>
            <div class="search-info-box">
              <span class="sob_blog sobicon">
                {{ item.blogCreateTime|formatDate("yyyy-MM-dd hh:mm:ss") }}
              </span>
              <span class="sob_blog sobview"> {{ item.blogViewCount }}</span>
              <span>
                <el-tag
                  size="mini"
                  v-for="(tag,tagIndex) in item.blogLabels"
                  :key="tagIndex"
                  type="info"
                  effect="plain">
                   {{ tag }}
                </el-tag>
              </span>
            </div>
          </div>
        </div>

        <div class="search-result-empty-box" v-else>
          <div class="empty-box">
            <div class="sob_blog sobemptybox"></div>
            <div class="empty-text">太可惜了，没有找到相关内容</div>
          </div>
        </div>

        <div class="search-result-page-navigation-box clear-fix">
          <div class="search-pre float-left">
            <el-link disabled v-if="isFirst"> &lt;&lt;上一页</el-link>
            <el-link v-else
                     :href="'/search?keyword='+keyword +'&page='+(page-1)+'&sort='+sort+'&categoryId='+categoryId"> &lt;&lt;上一页
            </el-link>
          </div>
          <div class="search-next float-right">
            <el-link disabled v-if="isLast">下一页&gt;&gt;</el-link>
            <el-link v-else
                     :href="'/search?keyword='+keyword +'&page='+(page+1)+'&sort='+sort+'&categoryId='+categoryId"> 下一页&gt;&gt;
            </el-link>
          </div>
        </div>
      </div>

      <div class="search-right-part float-right default-border-radius">
        <div class="hot-labels">
          <div class="card-title">
            热词
          </div>
          <wordCcloud></wordCcloud>
        </div>

        <div class="other-card">
          <div class="card-title">
            其它卡片
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<style>

.other-card {
  background: #FFffff;
  border-radius: 8px;
  padding: 10px;
}

.card-title {
  color: #737F90;
  font-size: 14px;
  font-weight: 500;
}

.hot-labels .wordCloud {
  width: 100%;
  height: 204px;
}

.hot-labels {
  background: #FFffff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
}

.search-result-empty-box .sobemptybox {
  line-height: 200px;
  font-size: 80px;
}

.search-result-empty-box .empty-text {
  font-size: 15px;
}

.search-result-empty-box {
  background: #FFffff;
  height: 350px;
  text-align: center;
  color: #6495ED9A;
}

.sort-active, .category-active {
  color: #FFffff !important;
  background: cornflowerblue;
  border-radius: 8px;
}

.select-item span:hover {
  color: #c9adf3;
}

.select-item span {
  margin-left: 10px;
  margin-right: 6px;
  padding: 2px 10px;
  font-size: 14px;
  font-width: 500;
  cursor: pointer;
  color: #79797f;
}

.select-item {
  line-height: 24px;
  margin-bottom: 5px;
}

.search-logo .logo {
  font-size: 26px;
}

.search-logo {
  color: cornflowerblue;
  font-size: 18px;
  font-weight: 500;
}

.search-input-container {
  line-height: 40px;
  display: inline-block;
}

.search-input {
  width: 300px;
  margin-left: 20px;
  margin-right: 20px;
}

.el-tag {
  cursor: pointer;
}

.search-pre:hover, .search-next:hover {
  color: #c9adf3;
}


.search-pre, .search-next {
  cursor: pointer;
}


.search-result-page-navigation-box {
  background: #FFffff;
  padding: 20px;
  margin-top: 10px;
  border-radius: 8px;
}

.search-info-box span {
  margin-right: 10px;
  font-size: 13px;
  font-weight: 300;
}

.search-info-box {
  color: #79797f;
}

.result-item-content {
  margin-top: 6px;
  margin-bottom: 6px;
  color: #4d5156;
  font-size: 15px;
  text-decoration: none;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.search-result-item {
  margin-top: 20px;
  line-height: 20px;
  height: 100px;
  margin-bottom: 20px;
}

.result-item-title:hover {
  color: #c9adf3;
}

.result-item-title {
  font-size: 20px;
  line-height: 1.3;
  font-weight: 500;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  cursor: pointer;
}

.search-result-list-box {
  padding: 20px;
  background: #FFffff;
  border-radius: 0 0 8px 8px;
}

.search-result-count-info {
  color: rgba(138, 150, 165, 0.67);
  font-size: 14px;
  margin-top: 10px;
  padding: 20px 0px 0px 20px;
  background: #FFffff;
  border-radius: 8px 8px 0px 0px;
}

.search-condition-box {
  background: #FFffff;
  border-radius: 0 0 8px 8px;
  padding: 10px;
}

.search-input-box {
  border-radius: 8px 8px 0 0;
  padding-top: 20px;
  text-align: center;
  background: #FFffff;
}

.search-box {
  margin-top: 10px;
}

.search-left-part {
  width: 900px;
}

.search-right-part {
  margin-top: 10px;
  width: 235px;
  height: 300px;
}

</style>

<script>

import * as api from "../../api/api"

export default {

  methods: {
    doSearchByCategory(categoryId) {
      location.href = '/search?keyword=' + encodeURIComponent(this.keyword) + "&sort=" + this.sort + "&categoryId=" + categoryId;
    },

    doSearchBySort(sort) {
      // 如果当前sort=2，表示时间排序ASC，如果再次点击时间排序，则进行逆序排序 sort=1 DSC
      if (sort === '2' & this.sort === '2') {
        sort = '1';
      }
      // 如果当前sort=4，表示浏览量排序ASC，如果再次点击浏览量排序，则进行逆序排序 sort=3 DSC
      if (sort === '4' & this.sort === '4') {
        sort = '3';
      }
      location.href = '/search?keyword=' + encodeURIComponent(this.keyword) + "&sort=" + sort + "&categoryId=" + this.categoryId;
    },

    toSearchPage() {
      location.href = '/search?keyword=' + encodeURIComponent(this.keyword);
    }
  },

  async asyncData({query}) {
    let categoryId = query.categoryId ? query.categoryId : '';
    let keyword = query.keyword ? query.keyword : '';
    let page = query.page ? query.page : 1;
    let size = query.size ? query.size : 10;
    let sort = query.sort ? query.sort : '';
    if (keyword == '') {
      return;
    }
    let res = await api.doSearch(categoryId, keyword, page, size, sort);
    // 处理标签
    let tmpRes = res.data;
    let contents = tmpRes.data;
    let isFirst = false;
    let isLast = false;
    contents.forEach(c => {
      c.blogLabels = c.blogLabels.split('-');
    })
    // 处理前上一页、下一页的显示
    if (page == 1) {
      if (contents.length < size) {
        isFirst = true;
        isLast = true;
      } else {
        isFirst = true;
        isLast = false;
      }
    } else if (contents.length < size) {
      isFirst = false;
      isLast = true;
    }
    // 获取分类
    let categoriesRes = await api.getCategories();

    return {
      categories: categoriesRes.data,
      searchResult: tmpRes,
      isFirst: isFirst,
      isLast: isLast,
      categoryId: categoryId,
      keyword: keyword,
      page: parseInt(page),
      size: parseInt(size),
      sort: sort,
    }

  }
}
</script>
