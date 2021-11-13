import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _679e4ad0 = () => interopDefault(import('..\\pages\\about\\index.vue' /* webpackChunkName: "pages/about/index" */))
const _0ec90a62 = () => interopDefault(import('..\\pages\\article\\index.vue' /* webpackChunkName: "pages/article/index" */))
const _b72bee3c = () => interopDefault(import('..\\pages\\forget\\index.vue' /* webpackChunkName: "pages/forget/index" */))
const _0d1c9df5 = () => interopDefault(import('..\\pages\\link\\index.vue' /* webpackChunkName: "pages/link/index" */))
const _bb456588 = () => interopDefault(import('..\\pages\\login\\index.vue' /* webpackChunkName: "pages/login/index" */))
const _755f612c = () => interopDefault(import('..\\pages\\register\\index.vue' /* webpackChunkName: "pages/register/index" */))
const _70f37247 = () => interopDefault(import('..\\pages\\search\\index.vue' /* webpackChunkName: "pages/search/index" */))
const _8d3c3a14 = () => interopDefault(import('..\\pages\\userInfo\\index.vue' /* webpackChunkName: "pages/userInfo/index" */))
const _101e616f = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _679e4ad0,
    name: "about"
  }, {
    path: "/article",
    component: _0ec90a62,
    name: "article"
  }, {
    path: "/forget",
    component: _b72bee3c,
    name: "forget"
  }, {
    path: "/link",
    component: _0d1c9df5,
    name: "link"
  }, {
    path: "/login",
    component: _bb456588,
    name: "login"
  }, {
    path: "/register",
    component: _755f612c,
    name: "register"
  }, {
    path: "/search",
    component: _70f37247,
    name: "search"
  }, {
    path: "/userInfo",
    component: _8d3c3a14,
    name: "userInfo"
  }, {
    path: "/",
    component: _101e616f,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
