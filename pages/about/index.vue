<template>
  <div class="about-box clear-fix" id="about-box">
    <div class="about-left-part float-left" id="about-left-part">
      <el-tabs tab-position="left" v-model="target" @tab-click="onLeftItemClick">
        <el-tab-pane label="关于猿村(about)" name="about"></el-tab-pane>
        <el-tab-pane label="猿村的使命(mission)" name="mission"></el-tab-pane>
        <el-tab-pane label="猿村的愿景(vision)" name="vision"></el-tab-pane>
        <el-tab-pane label="猿村站点(websites)" name="websites"></el-tab-pane>
        <el-tab-pane label="联系我们(contacts)" name="contacts"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="about-right-part float-left" id="about-right-part">
      <div class="about-item">
        <h1 id="about">
          关于猿村
        </h1>
        <p>
          猿村创立于2021年11月15日，想找一个喜欢的，能记录自己技术路线成长的地方，于是猿村诞生...
        </p>
      </div>
      <div class="about-item">
        <h1 id="mission">
          猿村的使命
        </h1>
        <p>
          记录自己的技术成长路线。
        </p>
      </div>
      <div class="about-item">
        <h1 id="vision">
          猿村的愿景
        </h1>
        <p>
          有更多的程序猿(媛)们加入
        </p>
      </div>
      <div class="about-item">
        <h1 id="websites">
          猿村站点
        </h1>
        <div class="websites">
          <ul>
            <li>
              <a href="https://www.xuyuanjun.cn" target="_blank">猿村主站</a>
            </li>
<!--            <li>-->
<!--              <a href="https://shop.sunofbeach.net" target="_blank">猿村商城</a>-->
<!--            </li>-->
<!--            <li>-->
<!--              <a href="https://sunofbeach.taobao.com" target="_blank">猿村网店</a>-->
<!--            </li>-->
          </ul>
        </div>
      </div>
      <div class="about-item">
        <h1 id="contacts">
          联系我们
        </h1>
        <p class="contact">
          广告投放 xxxx(演示)
          <br>
          商务合作 xxxx(演示)
          <br>
          内容投诉 xxxx(演示)
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
            content: '猿村,这是个人技术，包括前端，后台'
          },
          {
            hid: 'keywords',
            name: 'keywords',
            content: '猿村,java,C#,开发,系统,程序员,宣君'
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
          // console.log(parentBoxTop);
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
      this.$store.commit("setCurrentActivityTab", "about");
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
    margin-top: 20px;
    margin-bottom: 20px;
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
    color: #409EFF;
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
    border: 6px solid #409EFF;
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
    color: #409EFF;
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
