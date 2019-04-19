<template>
  <div id="header-button">
    <el-button type="text" size="mini" icon="el-icon-tickets" @click="save"><span>保存</span></el-button>
    <el-button type="text" size="mini" icon="el-icon-document" @click="save"><span>另存为</span></el-button>
    <el-button type="text" size="mini" icon="el-icon-circle-plus" @click="beforeDataOrigin"><span>数据源</span></el-button>
    <el-button type="text" size="mini" icon="el-icon-sort" @click="dialogFormVisible2=true"><span>参数</span></el-button>
    <el-button type="text" size="mini" icon="el-icon-news" @click="beforeDateSource"><span>选择模板</span></el-button>
    <el-button type="text" size="mini" icon="el-icon-menu"><span>类型</span></el-button>
    <el-button type="text" size="mini" icon="el-icon-view" onclick="return $EDITORUI['edui273']._onClick(event, this);"><span>预览</span></el-button>
        <el-button type="text" size="mini" icon="el-icon-menu" @click="yulan"><span>下载预览</span></el-button>
		<el-dialog title="填写文件名及放置位置" :visible.sync="dialogFormVisible" width="33%">
    	<div id="aside-tree">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" :render-content="renderContent"></el-tree>
      </div>
		  <el-form :model="form">
		    <el-form-item label="文件名">
		      <el-input v-model="form.fileName"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="saveCertain">确 定</el-button>
		  </div>
		</el-dialog>
		<el-dialog title="自定义参数" :visible.sync="dialogFormVisible2" width="33%">
		  <el-form :inline="true" label-width="100px"  :model="form2">
		    <el-form-item   label="名称">
		      <el-input v-model="form2.name"></el-input>
		    </el-form-item>
				<el-form-item label="默认值">
		      <el-input v-model="form2.price"></el-input>
		    </el-form-item>
				<el-form-item label="备注">
		      <el-input v-model="form2.remark"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible2 = false">取 消</el-button>
		    <el-button type="primary" @click="customParametersFn">确 定</el-button>
		  </div>
		</el-dialog>
    <el-dialog
      title="数据源"
      :visible.sync="centerDialogVisible"
      width="33%"
      center>
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="内嵌" name="first">
          <el-upload
            ref='upload'
            class="upload-demo"
            :on-success="handleAvatarSuccess"
            action="/abc/map/wordToHtml"
            :on-change="handleChange"
            :limit="1"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="引用" name="second">
          <span>引用路径<input type="text"/></span> &nbsp;<el-button size="mini" type="primary" plain>引用</el-button>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="templateFn">确 定</el-button>
    </span>
    </el-dialog>
    <el-dialog
      title="参数"
      :visible.sync="centerDialogVisibleParameters"
      width="33%"
      center>
      <span slot="footer" class="dialog-footer">
	      <el-button @click="centerDialogVisible = false">取 消</el-button>
	      <el-button type="primary" >确 定</el-button>
      </span>
    </el-dialog>
		<el-dialog title="数据源定义" :visible.sync="dialogFormVisibleOrigin" width="45%" height="auto">
    	<el-form :inline="true"  label-position="left" :model="formInline" class="demo-form-inline">
		    <el-form-item label="数据库连接:">
          <el-select v-model.trim="formInline.db_key" @change='areaChange' filterable size="15" placeholder="">
            <el-option :label="value.db_key" :value="value.db_key" :key="index" v-for="(value, index) in databaseConnection "></el-option>
          </el-select>
				</el-form-item>
				<el-form-item  label="数据来源:" style="float:right; margin-right:0px">
          <el-select v-model.trim="formInline.dataSources"  filterable size="15" placeholder="">
            <el-option :label="value.dataSourcesName" :value="value.dataSourcesId" :key="value.dataSourcesId" v-for="value in dataSources"></el-option>
          </el-select>
				</el-form-item>
				<el-form-item v-show="formInline.dataSources !== 3" label="数据名称: ">&nbsp;&nbsp;
          <el-select v-model.trim="formInline.table_name" filterable size="15" placeholder="">
            <el-option :label="value.table_name" :value="value.table_name" :key="index" v-for="(value, index) in dataName"></el-option>
          </el-select>
				</el-form-item>
				<el-button v-show="formInline.dataSources !== 3" size="small" :disabled="formInline.db_key == '' || formInline.table_name == ''" @click="optionFn">{{formInline.dataSources === 1 ? '选择数据表' : '选择视图'}}</el-button>
				<el-button v-show="formInline.dataSources !== 3" size="small" style="float:right" @click="previewTheData">预览数据<i class="el-icon-arrow-right"></i></el-button>
			</el-form>
			<div v-if="formInline.dataSources !== 3" >
				<div id="traveler">		
					<el-transfer
						style="text-align: left; display: inline-block; height:200px;"
						v-model="value3"
						:render-content="renderFunc"
						:titles="['可用列', '启用列']"
						:button-texts="['全部移除', '全部启动']"
						:format="{
							noChecked: '${total}',
							hasChecked: '${checked}/${total}'
						}"
						@change="handleChange"
						:data="dataFn">
					</el-transfer>
				</div>
					<div style="width:100%;margin-top:10px; display: flex">
						<div style="width:45%;">
							<div style="width:100%;height:32px;line-height:32px;border: 1px solid #C0C4CC; border-bottom:none">条件：</div>
							<div >
								<textarea v-model="textareaContent" style="resize: none;width:100%;height:110px;">	</textarea>	
							</div>
						</div>
						<div style="height:152.5px; line-height:152.5px;width:10%;text-align:center">
							<el-button @click="buttonSetContent" class="el-icon-back"></el-button>
						</div>
						<div style="width:45%;">
							<el-table :data="tableData2" @row-dblclick="tableDblClick" @row-click="tableClick"  height="142" border stripe style="width: 100%">
								<el-table-column
										prop="name"
										label="参数快速引用:　　　　　　　双击引用"
										width="">
								</el-table-column>
							</el-table>
						</div>
					</div>
			</div>
			<div v-else>
				<div style="width:100%;margin-top:10px; display: flex">
					<div style="width:45%;">
						<div style="width:100%;height:32px;line-height:32px;border: 1px solid #C0C4CC; border-bottom:none">条件：</div>
						<div >
							<textarea v-model="textareaContent" style="resize: none;width:100%;height:110px;">	</textarea>	
						</div>
					</div>
					<div style="height:152.5px; line-height:152.5px;width:10%;text-align:center">
						<el-button @click="buttonSetContent" class="el-icon-back"></el-button>
					</div>
					<div style="width:45%;">
						<el-table :data="tableData2" @row-dblclick="tableDblClick" @row-click="tableClick"  height="142" border stripe style="width: 100%">
							<el-table-column
								prop="name"
								label="参数快速引用:　　　　　　　双击引用"
								width="">
							</el-table-column>
						</el-table>
					</div>
				</div>
			</div>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisibleOrigin = false">取 消</el-button>
		    <el-button type="primary">确 定</el-button>
		  </div>
		</el-dialog>
		<el-dialog title="数据预览" :visible.sync="previewDialog" width="45%">
			<div class="tableWrapper">
		    <el-table border stripe :data="previewDableData" style="width: 100%">
		      <el-table-column align='center' :prop="item.prop" :label="item.label" :width="item.width" v-for="item in previewTableData" :key="item.prop" ></el-table-column>
		    </el-table>
		  </div>
			 <div class="pagerWrapper">
      	<div class="block" style="text-align: right;">
        	<el-pagination  @current-change="handleCurrentChange" :current-page="pageNum"  layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
      	</div>
    	</div>
			<div slot="footer" class="dialog-footer">
		    <el-button @click="previewDialog = false">取 消</el-button>
		    <el-button type="primary" @click="previewDialog = false">确 定</el-button>
		  </div>
		</el-dialog>
  </div>
</template>

<script>
import {saveAs} from '@/api/user.js'
import {mapActions, mapState} from 'vuex'
export default {
  data () {
    return {
			dataFn: [],
			value3: [],
			value4: [],
			value5: [],
      renderFunc(h, option) {
        return <span>{ option.column_name }</span>
			},
			tableData2: [{
          name: '2016-05-02'
        }, {
          name: '2016-05-04'
        }, {
          name: '2016-05-04'
        }, {
          name: '2016-05-04'
        }, {
          name: '2016-05-04'
        }, {
          name: '2016-05-01'
        }, {
          name: '2016-05-03'
			}],
			previewDableData: [],
			previewTableData: [],
			pageNum: 1,
			total: 0,
			textareaContent: '',
			dataButtonSetContent: '',
    	data: [{
        name: '一级 1',
        icon: 'el-icon-news',
        children: [{
          name: '二级 1-1',
          icon: 'el-icon-news',
          children: [{
            name: '三级 1-1-1',
            icon: 'el-icon-news'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
			dialogFormVisible: false,
			dialogFormVisible2: false,
      centerDialogVisible: false,
			centerDialogVisibleParameters: false,
			dialogFormVisibleOrigin: false,
			previewDialog: false,
      activeName2: 'first',
    	form: {
    	  fileName: ''
			},
			form2: {
				name: '',
				price: '',
				remark: ''
			},
			formInline: {
				db_key: '',
				dataSources: 1,
				table_name: ''
			},
      localFile: '',
    	serverPath: '',
    	pid: '',
      fileList: [],
      okContent: '',
      tableData: [{
      	name: '王小虎',
        desc: '2016-05-03',
        value: '上海市普陀区金沙江路 1518 号'
			}],
			multipleSelection: [],
			databaseConnection : [],
			dataSources: [
				{
					dataSourcesName: '数据库表',
					dataSourcesId: 1
				},
				{
					dataSourcesName: '数据库视图',
					dataSourcesId: 2
				},
				{
					dataSourcesName: '自定义SQL',
					dataSourcesId: 3
				}
			],
			dataName: [],
			params: []
    }
  },
  mounted () {
		this.databaseConnectionListFn()
	  this.$axios.get('/abc/map/catalog/tree').then(res => {
			this.data = res.data
    })
  },
  computed: {
  	...mapState({
  		content: state => state.content
  	})
  },
  methods: {
  	...mapActions(['setContent']),
		save () {
			this.dialogFormVisible = true
			this.form.fileName = ''
			console.log(this.content)
		},
		saveCertain () {
			if (this.form.fileName !== '') {
			  saveAs({
			  	objType: 'map',
					file: {
						version: '1.0.0',
						id: '文件id',
						name: '文件名',
						filetype: '文件类型',
						params: this.params,
						datasource: { // 数据源
							key1:{
								dbkey: this.formInline.db_key,
								sql: 'select　' + this.value3.join(',') + '　from　' + this.formInline.table_name + '　'+ this.textareaContent
							}
						},
						text: '<html>' + this.content + '</html>'
					},
			  	serverPath: this.serverPath + '/' + this.form.fileName,
			  	fileName: this.form.fileName,
			  	pId: this.pid
		      }).then(res => {
		        if (!res.data.status) {
		      	  this.$message({
		          message: res.msg,
		          type: 'success'
		          })
		      	  this.dialogFormVisible = false
		      	}
		        })
			} else {
			   this.$message.error('填写文件名及放置位置')
			}
		},
		handleNodeClick (data) {
		  console.log(data)
          this.serverPath = data.node.path
          this.pid = data.id
        },
	    handleClick(tab, event) {
	      console.log(tab, event);
	    },
	    renderContent (h, { node, data, store }) {
	      return (
	        <span>
	          <i class='el-icon-news'></i>
	          <span>{node.label}</span>
	        </span>
	      )
	    },
	  beforeDateSource () {
	    this.fileList = []
	    this.centerDialogVisible = true
	  },
	  handleChange(file, fileList) {
	    this.$refs.upload.submit()
	  },
	  // 上传成功时函数
	  handleAvatarSuccess(res) {
	    this.okContent = res
	  },
	  templateFn () {
			this.centerDialogVisible = false
			this.$EventBus.$emit('setContentTwo', this.okContent)
	  },
    handleSelectionChange(val) {
			this.multipleSelection = val
			console.log(this.multipleSelection)
    },
		beforeDataOrigin () {
			this.dialogFormVisibleOrigin = true
			this.getTableList()
		},
		databaseConnectionListFn () {
      this.$axios.get('/abc/map/db/conn').then(res => {
				this.databaseConnection  = res.data
      })
		},
		areaChange (item) {
			this.dataNameListFn(item)
		},
		dataSourcesListFn (item) {
      this.$axios.post('/abc/map/db/tables', {
		    dbkey: item
			}).then(res => {
				this.databaseConnection  = res.data
      })
		},
		dataNameListFn (item) {
			this.$axios.post('/abc/map/db/tables', {
		    dbkey: item
			}).then(res => {
				// this.formInline.table_name = ''
				console.log(res.data.length)
				if (res.data.length) {
					this.dataName  = res.data
				} else {
					this.formInline.table_name = ''
					this.dataName = []
				}
      })
		},
		handleChange(value, direction, movedKeys) {
			console.log(value)
			console.log(...this.value3)
		},
		optionFn () {
			this.$axios.post('/abc/map/db/columns', {
				dbkey: this.formInline.db_key,
				tableName: this.formInline.table_name
			}).then(res => {
					this.dataFn = res.data
			})
		},
		tableClick (row, column, event) {
			console.log(row, column, event)
			this.dataButtonSetContent = '{' + row.name + '}'
		},
		buttonSetContent () {
			this.textareaContent += this.dataButtonSetContent
		},
		tableDblClick (row, column, event) {
			this.textareaContent += '{' + row.name + '}'
		},
		getTableList () {
      this.$axios.get('abc/map/sys/list').then(res => {
        this.tableData2 = res.data
      })
		},
		handleCurrentChange(val) {
      this.pageNum = val
      this.previewTheData()
    },
		previewTheData () {
			this.previewDialog = true
			this.tableHeaderFn()
			this.$axios.post('abc/map/db/preview', {
				dbkey: this.formInline.db_key,
				sql: 'select　' + this.value3.join(',') + '　from　' + this.formInline.table_name + '　'+ this.textareaContent,
				pageNum: this.pageNum
			}).then(res => {
				this.previewDableData = res.data.rows
				this.total = res.data.total
      })
		},
		tableHeaderFn () {
			this.previewTableData = []
			for(var i = 0; i < this.value3.length; i++) {
				this.previewTableData.push(
					{
			    	prop: this.value3[i],
			      label: '字段:　' + this.value3[i],
			      width: ''
			    }
				)
			}
		},
		yulan () {
			this.$axios.post('/abc/map/htmlToWord',{
				content: '<html>' + this.$store.state.content + '</html>',
				fileName: "下载预览"
			}).then(res => {
				var blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8'}); //application/vnd.openxmlformats-officedocument.wordprocessingml.document这里表示doc类型
				var downloadElement = document.createElement('a');
				var href = window.URL.createObjectURL(blob); //创建下载的链接
				downloadElement.href = href;
				downloadElement.download ='download .doc'; //下载后文件名
				document.body.appendChild(downloadElement);
				downloadElement.click(); //点击下载
				document.body.removeChild(downloadElement); //下载完成移除元素
				window.URL.revokeObjectURL(href)
			})
		},
		customParametersFn () {
			this.params.push({
				...this.form2
			})
			this.$EventBus.$emit('val', this.form2)
			this.dialogFormVisible2 = false
		}
  }
}
</script>
<style scoped>
  .el-dialog .el-dialog__body {
		padding: 0px 20px !important;
	}
  #header-button .el-button--text span{
    color: black;
  }
	#traveler{
		text-align: center;
	}
</style>
<style>
  #header-button .el-dialog .el-dialog__body {
		padding: 0px 20px !important;
	}
</style>


