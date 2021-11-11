<template>
  <div class="search-box ">

    <!--搜索输入框-->
    <div class="search-input-box">

    </div>
    <!--搜索条件-->
    <div class="search-condition-box"></div>

    <!--搜索结果板块-->
    <div class="search-result-box clear-fix">
      <div class="search-left-part float-left default-border-radius">
        <!--搜索结果数量-->
        <div class="search-result-count-info">
          找到 <span v-text="searchResult.totalCount"></span> 条结果
        </div>
        <div class="search-result-list-box">
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

      </div>
    </div>

  </div>
</template>

<style>

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
  color: #737F90;
  font-size: 14px;
  margin-top: 10px;
  padding: 20px 0px 0px 20px;
  background: #FFffff;
  border-radius: 8px 8px 0px 0px;
}

.search-condition-box {
  height: 100px;
  background: darkgreen;
}

.search-input-box {
  height: 50px;
  background: cyan;
}

.search-box {
  margin-top: 10px;
}

.search-left-part {
  width: 900px;
}

.search-right-part {
  width: 235px;
  height: 300px;
  background: cornflowerblue;
}

</style>

<script>

import * as api from "../../api/api"

export default {
  async asyncData({query}) {
    let categoryId = query.categoryId ? query.categoryId : '';
    let keyword = query.keyword ? query.keyword : '';
    let page = query.page ? query.page : 1;
    let size = query.size ? query.size : 10;
    let sort = query.sort ? query.sort : '';
    if (keyword == '') {
      return;
    }
    return api.doSearch(categoryId, keyword, page, size, sort).then(res => {
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

      return {
        searchResult: tmpRes,
        isFirst: isFirst,
        isLast: isLast,
        categoryId: categoryId,
        keyword: keyword,
        page: parseInt(page),
        size: parseInt(size),
        sort: sort,
      }
    })

  }
}
</script>
