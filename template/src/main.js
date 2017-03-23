{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'{{#if_eq lintConfig "airbnb"}}{{/if_eq}}
import App from './App'{{#if_eq lintConfig "airbnb"}}{{/if_eq}}
{{#router}}
import router from './router'{{#if_eq lintConfig "airbnb"}}{{/if_eq}}
{{/router}}
{{#vuex}}
import store from './store'{{#if_eq lintConfig "airbnb"}}{{/if_eq}}
{{/vuex}}

Vue.config.productionTip = false{{#if_eq lintConfig "airbnb"}}{{/if_eq}}

Vue.mixin({
  filters: {
    json(val) {
      return JSON.stringify(val, null, 2)
    },
    uppercase(val) {
      return val.toUpperCase()
    },
    lowercase(val) {
      return val.toLowerCase()
    }
  },
  created: function () {
    console.log('**** mixin creates', this)
  },
  updated: function () {
    console.log('updated', this)
  }
})

Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  bind(el, data){
    el.onkeyup = function(e){
      if (e.keyCode === 13 && !e.shiftKey && !e.ctrlKey && !e.altKey){
        let els = document.querySelectorAll('input, textarea, button, checkbox, radio')
        let arr = Array.prototype.slice.call(els)
        let next = arr.indexOf(el) + 1
        if (next < arr.length){
          arr[next].focus()
        }
      }
    }
  },
  inserted: function(el, data) {
    if (el && (typeof data.value === 'undefined' || data.value === true)){
      el.focus()
    }
  }
})

Vue.directive('attachCss', {
  inserted: function (el, data) {
    let style = document.createElement('style')
    style.type = 'text/css'
    style.id = ('css_' + Math.random()).replace('.', '')
    el._cssScriptId = style.id
    style.appendChild(document.createTextNode(data.value))
    el.appendChild(style)
  },
  update: function(el, data){
    let style = document.getElementById(el._cssScriptId)
    style.innerHTML = data.value
  }
})

Vue.directive('scrollBottom', {
  componentUpdated(el, data) {
    el.scrollTop = el.scrollHeight
  }
})

Vue.directive('autoHeight', {
  inserted: function (el, data) {
    el.style.height = data.value || `2.5rem`
  },
  componentUpdated(el, data) {
    if (el.value) {
      el.style.height = `${el.scrollHeight}px`
    } else {
      el.style.height = data.value || `2.5rem`
    }
  }
})


Vue.directive('enterDown', {
  bind(el, data){
    // we need to hack the on input because enter on android does not always work
    function trackEnter(e){
      let charKeyCode = event.keyCode || event.which || e.target.value.substr(-1)
      if ((charKeyCode !== 13 && charKeyCode !== '\n') || (event.shiftKey || event.ctrlKey || event.altKey)){
        data.value(null, e)
        return
      }
      e.preventDefault()
      data.value(e)
    }
    if (/(android)/i.test(navigator.userAgent)){
      el.oninput = trackEnter
    } else {
      el.onkeydown = trackEnter
    }
  }
})

Vue.directive('fileDrop', {
  inserted: function (el, data) {
    'drag dragstart dragend dragover dragenter dragleave drop'
      .split(' ')
      .forEach(e => el.addEventListener(e, e => {
        e.preventDefault()
        e.stopPropagation()
        el.classList.add('draggingFile')
        if (e.type === 'drop'){
          el.classList.remove('draggingFile')
          let droppedFiles = e.dataTransfer.files
          if (data.value){
            data.value(droppedFiles)
          }
        }
      }, false))
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#vuex}}
  store,
  {{/vuex}}
  {{#if_eq build "runtime"}}
  render: h => h(App){{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  template: '<App/>',
  components: { App }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  {{/if_eq}}
}){{#if_eq lintConfig "airbnb"}}{{/if_eq}}
