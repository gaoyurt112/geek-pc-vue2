<template>
  <div>
    <el-card style="margin-bottom:20">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      </el-breadcrumb>
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
          <el-select placeholder="请选择文章频道" defaultValue="lucy" style="width:120px" v-model="form.channel_id">
            <el-option value="jack">Jack</el-option>
            <el-option value="lucy">Lucy</el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期" name="date">
          <el-date-picker v-model="form.date" type="daterange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary">
            筛选
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header">
        <span>根据筛选条件共查询到 count 条结果:</span>
      </div>
      <el-table row-key="id" :data="testData">
        <el-table-column prop="cover" label="封面" width="120">
        </el-table-column>
        <el-table-column prop="title" label="标题" width="220">
        </el-table-column>
        <el-table-column prop="status" label="状态">
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间">
        </el-table-column>
        <el-table-column prop="read_count" label="阅读数">
        </el-table-column>
        <el-table-column prop="comment_count" label="评论数">
        </el-table-column>
        <el-table-column prop="like_count" label="点赞数">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>
       
       
<script>
export default {
  name: 'ArticalPage',
  data () {
    return {
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
  }
}
</script>
       
<style>
</style>