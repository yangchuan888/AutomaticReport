<template>
  <div>
    <script id="editor" type="text/plain"></script>
  </div>
</template>

<script>
import '../../../static/ueditor/ueditor.config.js'
import '../../../static/ueditor/ueditor.all.js'
import '../../../static/ueditor/lang/zh-cn/zh-cn.js'
import '../../../static/ueditor/jquery-2.2.3.min.js'
export default {
  props: {
    id: {
      type: String
    },
    config: {
      type: Object
    }
  },
  data () {
    return {
      editor: null
    }
  },
  mounted () {
    // 初始化UE
    this.editor = window.UE.delEditor('editor')
    this.editor = window.UE.getEditor('editor', this.config)
  },
  destoryed () {
    this.editor.destory()
  },
  methods: {
    getUEContent () {
      return this.editor.getContent()
    },
    getContentTxt () {
      return this.editor.getContentTxt()
    }
  }
}
</script>
