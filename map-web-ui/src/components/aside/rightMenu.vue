<template>
  <div id="rightMenu">
    <ul id="list">
        <li @click="openFn">打开</li>
        <li @click="deleteTree">删除</li>
        <li @click="ren">重命名</li>
    </ul>
    
  </div>
</template> 
<script>
export default {
  data () {
    return {
      serverPath: '',
      treeData:{},
      eventData: {}
    }
  },
  methods: {
    menuShow (event, data) {
      this.treeData = data
      this.eventData = event
      this.serverPath = data.node.path
      var listBox = document.getElementById('list')
      listBox.style.display = "block"
      var x = event.clientX
      var y = event.clientY
      listBox.style.left = x + 'px'
      listBox.style.top = y + 'px'
      listBox.onclick = function () {
        listBox.style.display = "none"
      }
    },
    openFn () {
      this.$axios.post('/abc/map/catalog/open', {
          serverPath: this.serverPath
      }).then(res => {
        this.$EventBus.$emit('setContent', res.data.data.text)
        // this.$store.dispatch('setContent', res.data.data)
      })
    },
    deleteTree () {
      this.$axios.post('abc/map/catalog/delete', {
        node: this.treeData.id,
        objType: this.treeData.node.objType,
        serverPath: this.treeData.node.path
      }).then(res => {
         if (!res.data.status) {
            this.$message({
		          message: res.data.msg,
		          type: 'success'
            })
         }
      })
    },
    ren () {
      this.$emit('childByValue', this.eventData, this.treeData)
    
    }
  }
}
</script>  
<style scope>
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
    /* display: none; */
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