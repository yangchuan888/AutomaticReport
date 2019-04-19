<template>
  <div id="aside-bottom">
    <div id="aside-button">
      <el-button type="text" size="mini" icon="el-icon-refresh" @click="getTree"></el-button>
      <el-button type="text" size="mini" icon="el-icon-caret-top"></el-button>
      <el-button type="text" size="mini" icon="el-icon-caret-bottom"></el-button>
      <el-button type="text" size="mini" icon="el-icon-close"></el-button>
    </div>
    <div id="aside-tree">
       <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" :render-content="renderContent"></el-tree>
       <el-tree :data="data2" :props="defaultProps" @node-click="handleNodeClick" :render-content="renderContent"></el-tree>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [],
      data2: [{
        name: '自定义参数',
        icon: 'el-icon-news',
        children: []
      }
      ],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  methods: {
    handleNodeClick (data) {
      console.log(data)
    },
    renderContent (h, { node, data, store }) {
      return (
        <span>
          <i class='el-icon-news'></i>
          <span>{node.label}</span>
        </span>
      )
    },
    getTree () {
      this.$axios.get('abc/map/sys/tree').then(res => {
        this.data = res.data
      })
    },
    treeFn (data) {
      this.data2[0].children.push({
        ...data
      })
    }
  },
  mounted () {
    this.getTree()
    this.$EventBus.$on('val',(data) => {
      this.treeFn(data)
    })
  }
}
</script>

<style scoped>
  #aside-bottom {
    height: auto;
    border-bottom: 1px solid #C4C4C4;
  }
  #aside-bottom #aside-button {
    text-align: right;
    width: 100%;
    height: 32px;
    line-height: 26px;
    padding: 0px 10px;
    border-bottom: 0.5px solid #C4C4C4;
    font-size: 24px;
  }
  #aside-bottom #aside-button .el-button--text {
   color: #9C9C9C !important;
   font-size: 16px;
  }
</style>