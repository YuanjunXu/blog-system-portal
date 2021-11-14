<template>
  <div class="about-box clear-fix" id="about-box">
    <div class="about-left-part float-left" id="about-left-part">
      <el-tabs tab-position="left" v-model="target" @tab-click="onLeftItemClick">
        <el-tab-pane label="关于猿村(about)" name="about"></el-tab-pane>
        <el-tab-pane label="猿村的使命(mission)" name="mission"></el-tab-pane>
        <el-tab-pane label="猿村的愿景(vision)" name="vision"></el-tab-pane>
        <el-tab-pane label="猿村分站(websites)" name="websites"></el-tab-pane>
        <el-tab-pane label="联系我们(contacts)" name="contacts"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="about-right-part float-left" id="about-right-part">
      <div class="about-item">
        <h1 id="about">
          关于猿村
        </h1>
        <p>
          阳光沙滩创立于2014年11月22日，那是一个阳光明媚的下午。韩寒的电影《后会无期》里面有一句台词：sun of beach
          （阳光沙滩），于是阳光沙滩创立。阳光沙滩是一个学习编程的社区网站。
          你可以在这里学习，写博客，写笔记，分享经验，提问题，分享链接。你可以遇到志同道合的人，收获知识、经验与同性朋友。
        </p>
      </div>
      <div class="about-item">
        <h1 id="mission">
          猿村的使命
        </h1>
        <p>
          让学习编程变得更加简单。
        </p>
      </div>
      <div class="about-item">
        <h1 id="vision">
          猿村的愿景
        </h1>
        <p>
          让每一个热爱编程的年轻人成为优秀的程序员。
        </p>
      </div>
      <div class="about-item">
        <h1 id="websites">
          猿村分站
        </h1>
        <div class="websites">
          <ul>
            <li>
              <a href="https://www.sunofbeach.net" target="_blank">阳光沙滩主站</a>
            </li>
            <li>
              <a href="https://shop.sunofbeach.net" target="_blank">阳光沙滩商城</a>
            </li>
            <li>
              <a href="https://sunofbeach.taobao.com" target="_blank">阳光沙滩网店</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="about-item">
        <h1 id="contacts">
          联系我们
        </h1>
        <p class="contact">
          广告投放 ad@sunofbeach.net(仅作演示)
          <br>
          商务合作 bd@sunofbeach.net(仅作演示)
          <br>
          内容投诉 rp@sunofbeach.net(仅作演示)
        </p>
      </div>
      <div class="about-img">
<!--        <img src="/about.png">-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: '猿村-关于',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '猿村-关于'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: '猿村,博客系统，程序员，前端，后端，随笔'
        }
      ]
    }
  },
  data() {
    return {
      target: 'about',
      contentHeaders: [],
      isClickLeftSwitch: false,
    };
  },
  methods: {
    onLeftItemClick() {
      this.isClickLeftSwitch = true;
      this.$router.push({
        path: '/about#' + this.target
      });
      // console.log(this.target);
    },
    onWindowScroll() {
      let dy = document.documentElement.scrollTop;
      let dx = document.documentElement.scrollLeft;
      let leftBox = document.getElementById('about-left-part');
      let parentBox = document.getElementById('about-box');
      if (leftBox && parentBox) {
        let parentBoxTop = parentBox.offsetTop;
        if (dy > parentBoxTop) {
          leftBox.style.top = '0px';
        } else {
          leftBox.style.top = (parentBoxTop - dy) + 'px';
        }
        //处理横向滑动
        if (dx > 0) {
          leftBox.style.left = -dx + "px";
        } else {
          leftBox.style.left = parentBox.offsetLeft + "px";
        }
      }
      if (!this.isClickLeftSwitch) {
        //处理标签的滚动范围
        for (let i = 0; i < this.contentHeaders.length - 1; i++) {
          let first = this.contentHeaders[i];
          let second = this.contentHeaders[i + 1];
          if (dy >= first.offTop && dy < second.offTop) {
            this.target = first.id;
            //console.log(this.target);
            break;
          }
        }
      } else {
        this.isClickLeftSwitch = false;
      }
      //console.log("scroll...");
      // if (dy === 0) {
      //
      // }
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onWindowScroll);
  },
  mounted() {
    //处理内容部分的H1标签距离，如果是后台获取数据
    //那就在数据获取完以后进行处理
    let rightContent = document.getElementById('about-right-part');
    let h1List = rightContent.querySelectorAll('h1');
    h1List.forEach(item => {
      this.contentHeaders.push({
        offTop: item.offsetTop,
        id: item.id
      });
      //console.log(item.id);
    });

    let that = this;
    window.onresize = function () {
      that.onWindowScroll();
    };
    window.addEventListener("scroll", this.onWindowScroll);
    this.$store.commit("setCurrentActivatedTab", "about");
    this.onWindowScroll();
  },
};
</script>

<style>
#about-left-part {
  top: 91px;
  position: fixed;
}

.about-box {
  background: #fff;
  margin-top: 10px;
  margin-bottom: 20px;
  border-radius: 8px;
}

.about-left-part .el-tabs--left .el-tabs__header.is-left {
  margin-right: 0;
}

.about-item .contact {
  color: #7f828b;
}

.about-left-part .el-tabs__item {
  border-right: 1px dashed #e0e0e0;
  height: fit-content;
  color: #666;
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: 16px;
  transition: all .3s;
}

.about-left-part .el-tabs__nav {
  padding-right: 30px;
}

.about-left-part .el-tabs__item.is-active {
  color: #c9adf3;
  font-size: 18px;
  padding-top: 20px;
  padding-bottom: 20px;
  font-weight: 600;
  transition: all .3s;
}

.about-left-part .el-tabs__item.is-active::after {
  content: " ";
  display: inline-block;
  position: absolute;
  right: -20px;
  width: 27px;
  height: 27px;
  border: 6px solid #c9adf3;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  background-color: #fff;
  -webkit-transform: scale(.5);
  -moz-transform: scale(.5);
  -ms-transform: scale(.5);
  transform: scale(.5);
}

.about-left-part .el-tabs__nav-wrap::after {
  background: rgba(0, 0, 0, 0);
}

.about-left-part .el-tabs__active-bar {
  width: 0 !important;
}

.about-left-part .el-tabs {
  text-align: right;
}

.about-item .websites a {
  color: #c9adf3;
}

.about-item .websites {
  margin-left: 20px;
}


.about-left-part .el-tabs--left .el-tabs__header.is-left {
  float: none;
}

.about-left-part {
  /*1140 - 300 == > 840px*/
  padding-top: 20px;
  width: 300px;
  min-height: 300px;
}

.about-right-part .about-item {
  margin-top: 5px;
  margin-bottom: 80px;
  line-height: 30px;
  font-size: 16px;
}

.about-right-part .about-img {
  margin-bottom: 100px;
}

.about-right-part .about-img img {
  width: 100%;
}

.about-right-part h1 {
  margin-bottom: 20px;
}

.about-right-part {
  padding: 40px 110px 20px 20px;
  width: 710px;
  margin-left: 300px;
}

</style>
