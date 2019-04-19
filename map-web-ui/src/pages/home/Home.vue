<template>
  <div id="app">
      <div>
        <!--<button @click="getContent">diani=wkefnjejfjnenv</button>-->
        <UEditor style="display: none;" :config="config" ref="ueditor"></UEditor>
        <vue-ueditor-wrap  v-model="writingContent" :config="config"></vue-ueditor-wrap>
      </div>
  </div>
</template>

<script>
import UEditor from '@/components/ueditor/ueditor.vue'
import VueUeditorWrap from 'vue-ueditor-wrap'
import {mapState} from 'vuex'
export default{
  components: {UEditor, VueUeditorWrap},
  data () {
    return {
      vuexContent: this.$store.state.content,
      config: {
        autoHeightEnabled: false,
        autoFloatEnabled: true,
        initialContent: '请输入内容',
        autoClearinitialContent: true,
        initialFrameWidth: null,
        initialFrameHeight: 550,
        BaseUrl: '',
        UEDITOR_HOME_URL: 'static/ueditor/'
      },
      addFormVisible: false,
      writingContent: ''
    }
  },
  computed: {
	  ...mapState({
		  content : state => state.content
    })
  },
  watch: {
    writingContent: {
      handler(value) {
        this.$store.dispatch('setContent', value)
      }
    },
    vuexContent: {
      handler(value) {
        this.writingContent = value
      }
    }
  },
  mounted () {
    this.$EventBus.$on('setContent',(data) => {
      this.writingContent = data
    })
    this.$EventBus.$on('setContentTwo',(data) => {
      this.writingContent = data
    })
	  this.$axios.get('/abc/map/template/getHtml').then(res => {
      this.writingContent = res.data
	  })
  },
  methods: {
    getContent () {
      console.log(this.writingContent)
    }
  }
}
</script>
