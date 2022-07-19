<template>
  <div>
    <el-card style="margin-bottom:20">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="form" :model="form" style="margin-top:30px">
        <el-form-item label="状态" name="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="-1">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道" name="channel_id">
          <el-select placeholder="请选择文章频道" style="width:120px" v-model="form.channel_id">
            <el-option :label="item.name" :value="item.id" v-for="(item) in channels" :key="item.id">{{ item.name }}
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期" name="date">
          <el-date-picker v-model="form.date" type="daterange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSearch(form)">
            筛选
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header">
        <span>根据筛选条件共查询到{{ artical.count }}条结果:</span>
      </div>
      <el-table row-key="id" :data="artical.list" border>
        <el-table-column prop="cover" label="封面" width="120" align="center">
          <template slot-scope="scope">
            <img :src='artical.list[scope.$index].cover.images[0] ? artical.list[scope.$index].cover.images[0] : img404'
              style="width:80px;height:80px">
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="220" align="center">
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope>
            <el-tag type="success">审核通过</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间" align="center">
        </el-table-column>
        <el-table-column prop="read_count" label="阅读数" align="center">
        </el-table-column>
        <el-table-column prop="comment_count" label="评论数" align="center">
        </el-table-column>
        <el-table-column prop="like_count" label="点赞数" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row.id)" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)" icon="el-icon-delete">
              删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagenation" @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="pageparams.page" :page-sizes="[3, 5, 10]" :page-size="pageparams.per_page"
        layout="prev, pager, next,sizes" :total="artical.count">
      </el-pagination>
    </el-card>

  </div>
</template>
       
       
<script>
import img404 from '../assets/error.png'
import { mapActions, mapState } from 'pinia'
import channelStore from '@/store/getChannelStore'
import { http } from '../utils/http'

export default {
  name: 'ArticalPage',
  data () {
    return {
      img404,
      pageSize: 3,
      artical: {
        list: [],
        count: 0
      },
      pageparams: {
        page: 1,
        per_page: 3
      },
      filtparams: {

      },
      form: {
        status: -1,
        channel_id: '',
        date: ''
      },
      // 测试数据（删除）
      testData: [{
        id: '8218',
        comment_count: 0,
        cover: {
          images: ['http://geek.itheima.net/resources/images/15.jpg'],
        },
        like_count: 0,
        pubdate: '2019-03-11 09:00:00',
        read_count: 2,
        status: 2,
        title: 'wkwebview离线化加载h5资源解决方案'
      }]
    }
  },
  mounted () {
    this.getchannels(),
      this.getTableList()

  },
  computed: {
    ...mapState(channelStore, ['channels']),
  },
  methods: {
    ...mapActions(channelStore, ['getchannels']),
    //获取表格数据
    async getTableList (value) {
      let params = {}
      if (value) {
        params = { ...this.pageparams, ...value }
      } else {
        params = { ...this.pageparams }
      }
      const res = await http.get('/mp/articles', { params })
      console.log(params)
      this.artical.list = res.data.results
      this.artical.count = res.data.total_count
    },

    //列表数据筛选方法
    onSearch () {
      const { status, channel_id, date } = this.form
      this.filtparams.status = status
      if (channel_id) {
        this.filtparams.channel_id = channel_id
      }
      if (date) {
        this.filtparams.begin_pubdate = date[0]
        this.filtparams.end_pubdate = date[1]
      }
      if (status === -1) {
        this.getTableList()
      } else {
        this.getTableList(this.filtparams)
      }
    },
    handleSizeChange (val) {
      this.pageparams.per_page = val
    },
    handleCurrentChange (val) {
      this.pageparams.page = val
      this.getTableList()
    },
    //删除文章功能
    async handleDelete (id) {
      await http.delete(`/mp/articles/${id}`)
      this.getTableList({ page: 1, per_page: 3 })
    },
    //修改文章跳转
    handleEdit (editid) {
      this.$router.replace(`/publish?id=${editid}`)
    }
  }
}
</script>
       
<style lang="scss" scoped>
.pagenation {
  display: flex;
  margin-top: 30px;
  justify-content: center;
}
</style>