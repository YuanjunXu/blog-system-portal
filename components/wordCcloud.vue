<template>
  <div class="word-cloud">
    <div class="label-list-box">
      <client-only>
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
      </client-only>
    </div>
  </div>
</template>

<style>

</style>

<script>
import * as api from "@/api/api";

export default {

  mounted() {
    this.getHotLabels(20);
  },

  data() {
    return {
      margin: {top: 0, right: 0, bottom: 0, left: 0},
      rotate: {from: -10, to: 30, numOfOrientation: 10},
      fontSize: [10, 40],
      hotLabels: [],
    }
  },
  methods: {
    getHotLabels(size) {
      api.getHotLabels(size).then(res => {
        if (res.code == api.successCode) {
          this.hotLabels = res.data.data;
        }
      })
    },
    wordClickHandler(name, value, vm) {
      // 通过标签跳转搜索页面
      location.href = "/search?keyword=" + encodeURIComponent(name);
    },
  }


}
</script>
