<template>

  <div class="index-page">
    首页
  </div>
</template>

<script>
import * as api from '../api/api'

export default {
   async asyncData({params}) {
    let adminUserInfo = await api.getAdmin();
    console.log('=========>', adminUserInfo);
  }
}
</script>
