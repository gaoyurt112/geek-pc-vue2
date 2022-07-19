<template>
  <div className="publish">
    <el-card>
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>文章发布</el-breadcrumb-item>
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
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <quill-editor ref="myQuillEditor" v-model="publishForm.content" :options="editorOption"
            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default">发布文章</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
       
       
<script>
import 'quill/dist/quill.snow.css'
import { quillEditor } from 'vue-quill-editor'
import { mapActions, mapState } from 'pinia'
import channelStore from '@/store/getChannelStore'
export default {
  name: 'PublishPage',
  components: {
    quillEditor
  },
  data () {
    return {
      publishForm: {
        title: '',
        channel_id: null,
        type: 1,
        content: ''
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
      editorOption: [
        ['bold', 'italic', 'underline', 'strike'], // 字体
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }], // 样式标题
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }], // 下标、上标
        [{ 'indent': '-1' }, { 'indent': '+1' }], // 缩进
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }], // 字体
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean'] // 格式清除
      ]
    }
  },
  mounted () {
    this.getchannels()
  },
  computed: {
    ...mapState(channelStore, ['channels']),
  },
  methods: {
    ...mapActions(channelStore, ['getchannels']),
    onEditorBlur (quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      console.log('editor ready!', quill)
    }
  }
}
</script>
       
<style>
</style>