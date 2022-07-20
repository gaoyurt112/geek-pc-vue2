<template>
  <div className="publish">
    <el-card>
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ articalId ? '修改文章' : '发布文章' }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form label-width="80px" style="margin-left:250px" :model="publishForm" :rules="rules" ref="publishForm">
        <el-form-item label="标题" prop="title">
          <el-input style="width:50%" placeholder="请输入文章标题" v-model="publishForm.title"></el-input>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
          <el-select placeholder="请选择文章频道" style="width:150px" v-model="publishForm.channel_id">
            <el-option :label="item.name" :value="item.id" v-for="(item) in channels" :key="item.id">{{ item.name }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="封面">
          <el-form-item name="type">
            <el-radio-group v-model="publishForm.type">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
            </el-radio-group>
          </el-form-item>
          <div v-if="this.publishForm.type > 0">
            <el-upload action="http://geek.itheima.net/v1_0/upload" list-type="picture-card"
              :on-preview="handlePictureCardPreview" :on-remove="handleRemove" name="image" :on-success="uploadSuccess"
              :limit="this.publishForm.type" :file-list="fileList">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="imgList.dialogVisible">
              <img width="100%" :src="imgList.dialogImageUrl" alt="">
            </el-dialog>
          </div>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <quill-editor v-model="publishForm.content" ref="myQuillEditor" :options="editorOption">
          </quill-editor>
        </el-form-item>
        <el-form-item class="submitButton">
          <el-button type="primary" size="default">{{ articalId ? '修改文章' : '发布文章' }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
       
       
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import { mapActions, mapState } from 'pinia'
import channelStore from '@/store/getChannelStore'
import { http } from '@/utils/http'
export default {
  name: 'PublishPage',
  components: {
    quillEditor
  },
  data () {
    return {
      articalId: null,
      fileList: [],
      fileListCopy: [],
      imgUrlListCopy: [],
      imgList: {
        dialogImageUrl: '',
        dialogVisible: false
      },
      publishForm: {
        channel_id: null,
        content: '',
        cover: {
          type: 1,
          images: []
        },
        type: 1,
        title: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择文章频道', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ]
      },
      editorOption: {
        modules: {
          toolbar: [
            [{ 'list': 'ordered' }, { 'list': 'bullet' }], //列表
            [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }], //几级标题
            [{ 'align': [] }], //对齐方式
          ]
        },
        placeholder: "输入内容..."
      },
    }
  },
  mounted () {
    this.getchannels(),
      this.getParams(),
      this.Artical()
  },
  computed: {
    ...mapState(channelStore, ['channels']),
  },
  methods: {
    ...mapActions(channelStore, ['getchannels']),
    //删除图片的方法
    handleRemove (file) {
      // console.log(file)
      const filepath = file.url
      const i = this.publishForm.cover.images.findIndex(item => item === filepath)
      this.publishForm.cover.images.splice(i, 1)
    },
    handlePictureCardPreview (file) {
      this.imgList.dialogImageUrl = file.url
      this.imgList.dialogVisible = true
    },
    uploadSuccess (res, file, fileList) {
      // console.log(res, file, fileList)
      this.publishForm.cover.images = fileList.map(item => item.url)
      this.imgUrlListCopy = fileList.map(item => item.url)
      this.fileList = fileList
      this.fileListCopy = fileList
    },
    //获取路由参数
    getParams () {
      // console.log(this.$route.query.id)
      this.articalId = this.$route.query.id
    },

    //获取文章数据的方法
    async getArtical () {
      const res = await http.get(`/mp/articles/${this.articalId}`)
      console.log(res)
      console.log(res.data.cover.images)
      this.publishForm.title = res.data.title
      this.publishForm.type = res.data.cover.type
      this.publishForm.content = res.data.content
      this.publishForm.channel_id = res.data.channel_id
      this.publishForm.cover.images = res.data.cover.images
      this.imgUrlListCopy = res.data.cover.images
      this.fileList = res.data.cover.images.map(item => {
        return {
          name: item,
          url: item
        }
      })
      this.fileListCopy = res.data.cover.images.map(item => {
        return {
          name: item,
          url: item
        }
      })

    },

    Artical () {
      if (this.articalId) {
        this.getArtical()
      }
    }
  },
  watch: {
    //监听图片类型是否为0，如果为0清空图片列表
    'publishForm.type': function (newVal, oldVal) {
      // console.log('111', newVal, oldVal)
      this.publishForm.cover.type = newVal
      if (newVal === 0) {

        this.publishForm.cover.images = []
        this.fileList = []
      }
      if (oldVal === 0 && newVal === 1) {
        this.fileList = this.fileListCopy
        this.fileList = this.fileList.slice(0, 1)
        this.publishForm.cover.images = this.publishForm.cover.images.slice(0, 1)
      }

      if (newVal === 1) {
        this.fileList = this.fileListCopy
        this.fileList = this.fileList.slice(0, 1)
        this.publishForm.cover.images = this.publishForm.cover.images.slice(0, 1)
      }
      if (newVal === 3) {
        this.fileList = this.fileListCopy
        console.log(this.imgUrlListCopy)
        this.publishForm.cover.images = this.imgUrlListCopy
      }
    }
  }
}
</script>
       
<style lang="scss" scoped>
.quill-editor {
  height: 300px;
  width: 900px;
}

.submitButton {
  margin-top: 100px;
}
</style>