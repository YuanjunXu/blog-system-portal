<template>
  <div class="link-page-box">
    <div class="link-title">
      友情链接
    </div>
    <div class="link-list-box clear-fix">
      <div :title="item.name" class="link-item float-left" v-for="(item,index) in linksList" :key="index">
        <a :href="item.url" target="_blank">
          <img :src="'/portal/image/'+item.logo">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import * as api from '../../api/api';

  export default {
    head() {
      return {
        title: '猿村-友情链接',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: '友情链接'
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
      this.$store.commit("setCurrentActivityTab", "link");
    },
    asyncData() {
      return api.getLinkList().then(result => {
        //console.log(result.data);
        return {
          linksList: result.data
        }
      });
    }
  }
</script>

<style>
  .link-title {
    text-align: center;
    font-size: 20px;
    color: #7f828b;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .link-page-box {
    background: #fff;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 20px;
    border-radius: 8px;
  }

  .link-item img {
    width: 150px;
    height: 57px;
    vertical-align: middle;
  }

  .link-item:hover {
    border: #409EFF 1px solid;
  }

  .link-item {
    padding: 10px;
    margin: 10px;
    width: 233px;
    text-align: center;
    border: #dfdfdf 1px solid;
    cursor: pointer;
  }
</style>
