<template>
  <div id="app">
  <transition
  enter-active-class="animated fadeIn"
   
  >
<router-view></router-view>
</transition>
  </div>
</template>

<style lang="less">
#app{
  width: 100%;
  height: 100%;
}
</style>
