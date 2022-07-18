<template>
  <el-container>
    <el-header class="header">
      <div class="logo"></div>
      <div class="user-info">
        <span class="user-name">{{ userInfo.name }}</span>
        <span class="user-logout">
          <el-popconfirm title="是否确认退出？" onfirm-button-text="退出" cancel-button-text="取消" icon="el-icon-info"
            icon-color="red" @confirm=userLogout()>
            <i class="el-icon-switch-button" slot="reference">退出</i>
          </el-popconfirm>
        </span>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" class="site-layout-background">
        <!-- 动态设置选中值高亮 -->
        <el-menu mode="inline" router :default-active="activeMenu">
          <el-menu-item index="" route="/">
            <i class="el-icon-s-data"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="artical" route="/artical">
            <i class="el-icon-setting"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
          <el-menu-item index="publish" route="/publish">
            <i class="el-icon-s-order"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="layout-content">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
       
       
<script>
import { mapState, mapActions } from 'pinia'
import userStore from '@/store/userStore'
import loginStore from '@/store/loginStore'
export default {
  name: 'LayoutPage',
  data () {
    return {

    }
  },
  mounted () {
    this.getUserInfo()
  },
  computed: {
    //设置菜单高亮，获取当前路由路径
    activeMenu () {
      return this.$route.path.split('/')[1]
    },
    ...mapState(userStore, ['userInfo'])
  },
  methods: {
    ...mapActions(userStore, ['getUserInfo']),
    ...mapActions(loginStore, ['loginOut']),
    //退出登录的方法
    userLogout () {
      this.loginOut()
      this.$router.push({ name: 'loginPage' })
    }
  }
}
</script>
       
<style lang="scss" scoped>
.el-container {
  height: 100vh;
}

.el-header {
  background-color: #0f59a4;
  line-height: 60px;
}

.el-aside {
  background-color: #0f59a4;

  .el-menu-item {
    background-color: #0f59a4;
  }
}

.header {
  padding: 0;
}

.logo {
  width: 200px;
  height: 60px;
  background: url('~@/assets/logo.png') no-repeat center / 160px auto;
}

.layout-content {
  overflow-y: auto;
  padding: 20px;
}

.user-info {
  position: absolute;
  right: 0;
  top: 0;
  padding-right: 40px;
  color: #fff;

  .user-name {
    margin-right: 40px;
  }

  .user-logout {
    display: inline-block;
    cursor: pointer;

    i {
      font-weight: 800;
    }
  }
}

.el-header {
  padding: 0 !important;
}
</style>