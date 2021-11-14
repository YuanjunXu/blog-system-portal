<template>
  <div class="link-page-box">
    <div class="link-list-box clear-fix">
      <div class="link-title">
        ^_^ 友情链接 ^_^
      </div>

      <div class="link-item float-left" :title="item.name" v-for="(item,index) in linkList" :key="index">
        <a :href="item.url" target="_blank">
          <img :src="item.logo">
        </a>
      </div>
    </div>
  </div>
</template>

<style>
.link-title {
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
  font-weight: 500;
  color: #737F90;
}

.link-page-box {
  margin: 10px auto;
  background: #FFffff;
  border-radius: 8px;
}


.link-item img {
  width: 150px;
  height: 57px;
  vertical-align: middle;
  border-radius: 8px;
}

.link-item:hover {
  border: #c9adf3 1px solid;
}

.link-item span {
  font-size: 10px;
  color: #737F90;
}

.link-item {
  padding: 5px;
  margin: 20px 33px;
  width: 150px;
  text-align: center;
  border: #FFffff 1px solid;
  border-radius: 8px;
  cursor: pointer;
}


</style>

<script>
import * as api from '../../api/api'

export default {
  head() {
    return {
      title: '猿村-友情链接',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '猿村-友情链接'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: '猿村,博客系统，程序员，前端，后端，随笔'
        }
      ]
    }
  },

  mounted() {
    this.$store.commit('setCurrentActivatedTab', 'link');
  },

  async asyncData({params}) {
    return await api.getLinkList().then(res => {
      return {
        linkList: res.data
      }
    })
  }
}
</script>
