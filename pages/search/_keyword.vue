<template>
  <div class="search-box">
    搜索结果页面
  </div>
</template>

<style>

</style>

<script>
export default {
  async asyncData({params}) {
    console.log('----------------',params.keyword)
  }
}
</script>
