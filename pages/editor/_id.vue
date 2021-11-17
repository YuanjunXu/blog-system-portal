<template>
  <div class="markdown-editor-box">
    <el-container>
      <el-header>
        <div class="title-part">
          <el-input placeholder="请输入文章标题" maxlength="60" show-word-limit v-model="article.title"></el-input>
        </div>
      </el-header>
      <el-main>
        <div class="editor-part">
          <no-ssr>
            <mavon-editor
              language="zh-CN"
              toolbars-background="#e7e7e9"
              codeStyle="atom-one-dark"
              :toolbars="markdownOption" v-model="article.content"/>
          </no-ssr>
        </div>
      </el-main>

      <div class="set-part">
        <div class="article-post-settings-part">
          <el-form label-width="100px">
            <el-form-item label="文章分类" required>
              <el-select v-model="article.categoryId" placeholder="请选择分类" size="medium">
                <el-option
                  v-for="item in categories"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="摘要" required>
              <el-input
                type="textarea"
                :rows="3"
                placeholder="文章摘要"
                v-model="article.summary">
              </el-input>
            </el-form-item>
            <el-form-item label="封面" required>
              <div class="article-cover-selector" @click="showImageSelector">
                <i class="el-icon-plus" v-if="!article.cover"></i>
                <el-image fit="cover" v-else
                          :src="'/portal/image/'+article.cover"></el-image>
              </div>
            </el-form-item>
            <el-form-item label="标签" class="label-input-box" required>
              <el-tag
                :key="tag"
                v-for="tag in labels"
                closable
                :disable-transitions="false"
                @close="deleteLabel(tag)">
                {{ tag }}
              </el-tag>
              <el-input
                class="input-new-label"
                v-if="labelInputVisible"
                v-model="labelNewValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleLabelInputConfirm">
              </el-input>
              <el-button v-if="!labelInputVisible&&!isEnough" class="button-new-tag" size="small"
                         @click="showLabelInput">+
                添加标签
              </el-button>

            </el-form-item>
          </el-form>
        </div>
        <div class="article-post-action-bar clearfix">
          <div class="action-btn-container float-right">
            <el-button size="medium" type="primary" @click="commitArticle">{{ commitText }}</el-button>
          </div>
        </div>
        <div class="article-post-dialog-box">
          <el-dialog
            class="image-picker-container"
            title="图片选择"
            :visible.sync="isImageSelectorShow"
            width="500">
            <div class="image-selector-box">
              <div class="image-action-bar">
                <el-upload
                  class="image-selector-uploader"
                  action="/admin/image/article"
                  :show-file-list="false"
                  :on-error="onUploadError"
                  :on-success="uploadSuccess"
                  accept="image/*">
                  <el-button size="medium">上传图片</el-button>
                </el-upload>
              </div>
              <div class="image-selector-list clearfix">
                <el-radio-group v-model="selectedImageIndex">
                  <el-radio-button :label="index" v-for="(item,index) in images" :key="index">
                    <img style="object-fit: cover"
                         :src="'/portal/image/'+item.url">
                  </el-radio-button>
                </el-radio-group>
              </div>
              <div class="image-picker-navigation">
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
            <span slot="footer" class="dialog-footer">
                    <el-button @click="isImageSelectorShow = false" size="medium">取 消</el-button>
                    <el-button type="primary" @click="onImageSelected" size="medium">确 定</el-button>
                  </span>
          </el-dialog>
          <el-dialog
            title="确定要离开吗？"
            :visible.sync="saveConfirmDialogShow"
            width="400px"
            center>
            <span>系统可能不会保存填写的稿件信息噢...(´；ω；`)</span>
            <span slot="footer" class="dialog-footer">
                    <el-button size="medium" @click="saveConfirmDialogShow = false">取 消</el-button>
                    <el-button size="medium" type="primary" @click="toNextPage">确 定</el-button>
                  </span>
          </el-dialog>
        </div>
      </div>
    </el-container>

  </div>


</template>
<style>

.input-new-label {
  width: 120px;
}

.article-title-part input {
  border: none;
  padding-left: 20px;
  font-size: 20px;
}

.label-input-box .el-tag {
  margin-right: 20px;
}

.image-selector-list img {
  width: 179px;
  border-radius: 4px;
  height: 179px;
  float: left;
}

.article-cover-selector i {
  line-height: 140px;
  color: #E5E5E5;
  font-size: 20px;
}

.article-cover-selector img {
  width: 200px;
  height: 140px;
}

.article-cover-selector {
  cursor: pointer;
  width: 200px;
  border-radius: 4px;
  text-align: center;
  height: 140px;
  border: #E5E5E5 dashed 1px;
}

.article-post-settings-part .el-textarea {
  width: 500px;
}

.article-post-action-bar .action-btn-container {
  margin-right: 40px;
}

.set-part {
  padding-top: 20px;
  border-top: #c1c1c4 1px solid;
  margin-bottom: 20px;
  /*background: chocolate;*/
}

.title-part .el-input .el-input__inner {
  height: 100%;
  border-radius: 0;
  border: 0;
  font-size: 30px;
  font-weight: 600;
}

.title-part .el-input {
  height: 60px;
}

.title-part {
  height: 40px;
}

.el-header {
  padding: 0;
}

.el-main {
  padding: 0;
}


.markdown-editor-box {
  padding-top: 10px;
  margin-top: 20px;
  width: 1140px;
  border-radius: 8px;
  background: #ffffff;
  margin-bottom: 20px;
}

.v-note-panel {
  min-height: 600px;
}
</style>

<script>

import *  as  api from "../../api/api";
import {getArticleDetail} from "../../api/api";

export default {
  head() {
    return {
      title: '猿村-内容编辑',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '内容编辑'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: '猿村,java,C#,开发,系统,程序员,宣君'
        }
      ]
    }
  },

  mounted() {
    this.$store.commit("setCurrentActivityTab", "editor");

    window.onbeforeunload = function () {
      return '系统可能不会保存填写的稿件信息噢';
    };

    //获取文章分类
    this.listCategories();
    this.listImages();
  },

  data() {
    return {
      markdownOption: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        navigation: true, // 导航目录
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
      saveConfirmDialogShow: false,
      imageSelectFor: 'article',
      pageNavigation: {
        currentPage: 1,
        totalCount: 0,
        pageSize: 15,
      },
      selectedImageIndex: 0,
      isImageSelectorShow: false,
      isEnough: false,
      labelNewValue: '',
      labelInputVisible: false,
      labels: [],
      categories: [],
      article: {
        id: '',
        title: '',
        content: '',
        categoryId: '',
        summary: '',
        cover: '',
        label: '',
        state: '1',
        type: '1',
        createTime: null
      },
      images: [],
      commitText: '发表文章',
      disableDraftBtn: false,
      isContentSave: false,
      nextPath: '',
      hasContentChange: false

    }
  },
  watch: {
    article: {
      handler() {
        this.hasContentChange = true;
      },
      deep: true
    }
  },

  async asyncData({params}) {
    if (params.id) {
      let articleResult = await api.getArticleDetail(params.id);
      console.log("详情,", articleResult.data)
      let article = articleResult.data;
      let labels = articleResult.data.label.split("-");
      return {
        article: article,
        labels: labels,
        commitText: "更新文章",
      }
    }
  },

  methods: {
    toNextPage() {
      this.hasContentChange = true;
      this.saveConfirmDialogShow = true;
      this.isContentSave = true;
      this.$router.push({
        path: this.nextPath
      })
    },

    commitArticle() {
      //检查内容：标题、内容、分类、摘要、封面、标签
      if (this.article.title === '') {
        this.$message.error('文章标题不可以为空.');
        return;
      }
      if (this.article.content === '') {
        this.$message.error('内容不可以为空.');
        return;
      }
      if (this.article.categoryId === '') {
        this.$message.error('分类没有选择呢.');
        return;
      }
      if (this.article.summary === '') {
        this.$message.error('摘要不可以为空.');
        return;
      }
      if (this.article.cover === '') {
        this.$message.error('请设置文章封面.');
        return;
      }
      if (this.labels.length === 0) {
        this.$message.error('请设置标签，方便检索分类.');
        return;
      }
      let tempLabels = '';
      //处理标签
      this.labels.forEach((item, index) => {
        tempLabels += item;
        if (index !== this.labels.length - 1) {
          tempLabels += '-';
        }
      });
      this.article.label = tempLabels;
      console.log('label == > ' + this.article.label);
      //到底是更新还是发布文章
      //判断article的ID是否存在，如果有，那就是更新，否则就是发布
      if (this.article.id === '') {
        //提交数据
        api.postArticle(this.article).then(result => {
          if (result.code === api.success_code) {
            window.onbeforeunload = null;
            this.isContentSave = true;
            this.$message.success(result.message);
            //跳转到文章列表页面
            location.href = "/";
          } else {
            this.$message.error(result.message);
          }
        });
      } else {
        if (this.article.state === '0' || this.article.state === '2') {
          this.article.state = '1';
        }
        //更新文章
        api.updateArticle(this.article.id, this.article).then(result => {
          if (result.code === api.success_code) {
            this.isContentSave = true;
            this.$message.success(result.message);
            //跳转到文章列表页面
            location.href = "/"
          } else {
            this.$message.error(result.message);
          }
        });
      }

    },
    onPageChange(page) {
      this.pageNavigation.currentPage = page;
      this.listImages();
    },
    onUploadError() {
      this.$message.error('图片上传失败.');
    },
    uploadSuccess(response) {
      if (response.code === api.success_code) {
        this.$message.success(response.message);
        //更新列表
        this.listImages();
      }
    },
    onImageSelected() {
      //判断当前的操作是给谁选择图片
      //如果是文章则插入到文章
      //如果是封面则作为封面
      let item = this.images[this.selectedImageIndex];
      if (this.imageSelectFor === 'article') {
        this.$refs.mdEditor.toolbar_left_addlink('no-link',
          item.name,
          'portal/image' + item.url
        )
      } else if (this.imageSelectFor === 'cover') {

        this.article.cover = item.url;
      }
      this.isImageSelectorShow = false;
    },
    showImageSelector() {
      this.imageSelectFor = "cover";
      //显示图片选择器
      this.isImageSelectorShow = true;
    },
    htmlCode(status, value) {
      console.log(status);
      console.log(value);
    },
    onEditorImageClick() {
      this.imageSelectFor = "article";
      //显示图片选择器
      this.isImageSelectorShow = true;
    },

    showLabelInput() {
      //判断个数，限制5，
      //控制输入框的显示
      if (this.labels.length < 5) {
        this.labelInputVisible = true;
      } else {
        this.labelInputVisible = false;
      }
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      })
    },
    handleLabelInputConfirm() {
      //回车的时候
      if (this.labels.length < 5) {
        this.labels.push(this.labelNewValue);
        this.labelNewValue = '';
      }
      //如果加完以后，数量是5，那就隐藏输入框
      if (this.labels.length >= 5) {
        this.labelInputVisible = false;
        this.isEnough = true;
      }
    },
    deleteLabel(label) {
      //从数组里删除
      this.labels.splice(this.labels.indexOf(label), 1);
      if (this.labels.length < 5) {
        this.isEnough = false;
        this.labelInputVisible = true;
      }
    },
    listCategories() {
      api.getCategories().then(result => {
        if (result.code === api.success_code) {
          this.categories = result.data;
        }
      });
    },
    listImages() {
      api.listImages(this.pageNavigation.currentPage, this.pageNavigation.pageSize, 'article').then(result => {
        if (result.code === api.success_code) {
          this.images = result.data.content;
          this.pageNavigation.currentPage = result.data.number + 1;
          this.pageNavigation.totalCount = result.data.totalElements;
          this.pageNavigation.pageSize = result.data.size;
        } else {
          this.$message.error(result.message);
        }
      });
    },
  },
}
</script>
