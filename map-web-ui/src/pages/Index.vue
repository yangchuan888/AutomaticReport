<template>
  <div id="index">
    <el-container>
      <el-header>
        <header-Button></header-Button>
      </el-header>
      <el-container>
      	<keep-alive>
          <el-aside width="200px">
            <aside-Top></aside-Top>
            <aside-bottom></aside-bottom>
          </el-aside>
        </keep-alive>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import headerButton from '@/components/header/headerButton'
import asideTop from '@/components/aside/asideTop'
import asideBottom from '@/components/aside/asideBottom'
export default {
  components: {
    headerButton,
    asideTop,
    asideBottom
  }
}
</script>

<style>
</style>