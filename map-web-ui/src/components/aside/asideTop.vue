<template>
  <div id="aside-Top">
    <div id="aside-file">
      <span>文件</span><span style="float: right;">&lang;&lang;</span>
    </div>
    <div id="aside-buttonChoice">
      <el-button type="info" plain size="mini">模板</el-button>
      <el-button type="info" plain size="mini">发布</el-button>
    </div>
    <div id="aside-button">
      <el-button type="text" size="mini" icon="el-icon-news"></el-button>
      <el-button type="text" size="mini" icon="el-icon-refresh" @click="getTree"></el-button>
      <el-button type="text" size="mini" icon="el-icon-caret-top"></el-button>
      <el-button type="text" size="mini" icon="el-icon-caret-bottom"></el-button>
      <el-button type="text" size="mini" icon="el-icon-close" @click="deleteTree"></el-button>
    </div>
    <div id="aside-tree">
      <el-tree :data="data" :props="defaultProps"  @node-contextmenu="handleNodeClickRight" @node-click="handleNodeClick">
         <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>
                <i :class="data.icon"></i>{{ data.name }}
            </span>              
        </span>
      </el-tree>
    </div>
    <right-Menu ref="rightMenu" v-on:childByValue="childByValue" v-show="rightMenuFlag"></right-Menu>
    <div id="renInput"  v-show="renInput">
      <input v-model="renameTo" type="text" placeholder="重命名"><br><button style="margin-right:5px" @click="renInput = false">取消</button><button @click="renConfirm">确定</button>
    </div>
  </div>
</template>

<script>
import {tree} from '@/api/user.js'
import rightMenu from '@/components/aside/rightMenu'
import {mapState} from 'vuex'
export default {
  components: {
    rightMenu
  },
  data () {
    return {
      treeData: {},
      renameTo: '',
      renInput: false,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      tree: {}
    }
  },
  mounted () {
    this.getTree()
  },
  computed: {
	  ...mapState({
		  rightMenuFlag : state => state.menuFlag
	  })
  },
  methods: {
    getTree () {
      this.$axios.get('/abc/map/catalog/tree').then(res => {
    	  this.data = res.data
      })
    },
    handleNodeClick (data) {
      console.log(data)
      this.tree = data
    },
    handleNodeClickRight (event, data) {
      this.$store.commit('setMenuFlag', true)
      this.$refs.rightMenu.menuShow(event, data)
    },
    deleteTree () {
      this.$axios.post('abc/map/catalog/delete', {
        node: this.tree.id,
        objType: this.tree.node.objType,
        serverPath: this.tree.node.path
      }).then(res => {
         if (!res.data.status) {
            this.$message({
		          message: res.data.msg,
		          type: 'success'
            })
         }
      })
    },
    renderContent (h, { node, data, store }) {
      console.log(data)
      return (
        <span>
          <i class="node.icon"></i>
          <span>{node.label}</span>
        </span>
      )
    },
    childByValue (event, treeData) {
      console.log(treeData)
      this.renInput = true
      this.treeData = treeData
      var renInput = document.getElementById('renInput')
      var x = event.clientX
      var y = event.clientY
      renInput.style.left = 20 + 'px'
      renInput.style.top = y + 10 + 'px'
    },
    renConfirm () {
      this.$axios.post('abc/map/catalog/rename', {
        node: this.treeData.id,
        rename: this.treeData.name,
        renameTo: this.renameTo,
        pId: this.treeData.node.pId,
        path: this.treeData.node.path
      }).then(res => {
         if (!res.data.status) {
            this.$message({
		          message: res.data.msg,
		          type: 'success'
            })
            this.renInput = false
         }
      }) 
    }
  }
}
</script>

<style scoped>
  #renInput {
    position: absolute
  }
  #aside-Top {
    height: auto;
    border-bottom: 1px solid #C4C4C4;
  }
  #aside-Top #aside-file {
    width: 100%;
    height: 34px;
    line-height: 34px;
    padding: 0px 10px;
    border-bottom: 0.5px solid #C4C4C4;
  }
  #aside-Top #aside-buttonChoice {
    width: 100%;
    height: 32px;
    line-height: 30px;
    padding: 0px 10px;
    border-bottom: 0.5px solid #C4C4C4;
  }
  #aside-Top #aside-button {
    text-align: right;
    width: 100%;
    height: 32px;
    line-height: 26px;
    padding: 0px 10px;
    border-bottom: 0.5px solid #C4C4C4;
    font-size: 24px;
  }
  #aside-Top #aside-button .el-button--text {
   color: #9C9C9C !important;
   font-size: 16px;
  }
  ul{
    padding:0;
    margin: 0;
    list-style: none;
  }
  #list{
    width:100px;
    min-height:90px;
    z-index: 99999;
    border: 1px solid rgba(0, 0, 0, 0.2);
    /* box-shadow:0px 0px 5px #f4979a; */
    border-radius: 6px; 
    background: white;
    display: none;
    position: absolute;
  }
  #list li{
    height:30px;
    line-height:30px;
    font-size:12px;
    color:black;
    text-align:center;
  } 
  #list li:hover{
   background: rgba(100,149,237, .3);
  }
</style>