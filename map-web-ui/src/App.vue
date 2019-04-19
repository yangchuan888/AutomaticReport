<template>
  <div id="app" @click="menuHiddenFn()">
    <router-view @click="menuHiddenFn()"></router-view>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'App',
  methods: {
    menuHiddenFn () {
      this.$store.commit('setMenuFlag', false)
    }
  }
}
</script>

<style>
#app {
  width:100%;
  height: 100%;
}
</style>
