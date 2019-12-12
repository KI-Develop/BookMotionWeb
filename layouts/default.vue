<template>
  <div class="layout">
    <Layout :style="{ minHeight: '100vh' }">
      <Sider
        ref="side1"
        v-model="isCollapsed"
        hide-trigger
        collapsible
        :collapsed-width="78"
        breakpoint="md"
      >
        <Menu
          :active-name="activeName"
          theme="dark"
          width="auto"
          :open-names="[openName]"
          :class="menuitemClasses"
        >
          <Submenu name="1">
            <template slot="title">
              <Icon type="md-home" />
              <span>ホーム</span>
            </template>
            <MenuItem name="1-1" @click.native="pageLink('/home/tsundoku')">
              <span>積み本</span>
            </MenuItem>
            <MenuItem name="1-2" @click.native="pageLink('/home/wishlist')">
              <span>気になる本</span>
            </MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="md-create" />
              <span>本の登録</span>
            </template>
            <MenuItem name="2-1" @click.native="pageLink('/register/searchdb')">
              <span>データベース検索</span>
            </MenuItem>
            <!-- <MenuItem name="2-2">
                <span>論文検索</span>
              </MenuItem> -->
            <MenuItem name="2-2" @click.native="pageLink('/register/manual')">
              <span>手動入力</span>
            </MenuItem>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-contact" />
              <span>アカウント</span>
            </template>
            <MenuItem name="3-1" @click.native="pageLink('/account/setting')">
              <span>基本設定</span>
            </MenuItem>
            <MenuItem name="3-3" @click.native="logout">
              <span>ログアウト</span>
            </MenuItem>
          </Submenu>
          <Submenu name="4">
            <template slot="title">
              <Icon type="ios-more" />
              その他
            </template>
            <a href="https://tsundoku.book-motion.com/notice.html">
              <MenuItem name="4-1">
                お知らせ
              </MenuItem>
            </a>
            <a href="https://forms.gle/4ZAPNnhvWG9yLcNK9">
              <MenuItem name="4-2">
                お問い合わせ
              </MenuItem>
            </a>
            <a href="https://tsundoku.book-motion.com/terms.html">
              <MenuItem name="4-3">
                利用規約
              </MenuItem>
            </a>
          </Submenu>
        </Menu>
      </Sider>
      <Layout>
        <Header :style="{ padding: 0 }" class="layout-header-bar">
          <Icon
            :class="rotateIcon"
            :style="{ margin: '0 20px' }"
            type="md-menu"
            size="24"
            @click.native="collapsedSider"
          />
          <!-- TODO: title padding  -->
          <span style="font-size:20px">{{ title }}</span>
        </Header>
        <Content :style="{ padding: '0 16px 16px' }">
          <Breadcrumb :style="{ margin: '16px 0' }">
            <BreadcrumbItem
              v-for="breadCrumbItem in breadCrumbItems"
              :key="breadCrumbItem.id"
            >
              <nuxt-link :to="breadCrumbItem.path">
                {{ breadCrumbItem.name }}
              </nuxt-link>
            </BreadcrumbItem>
          </Breadcrumb>
          <nuxt />
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import { auth } from '~/plugins/firebase'
export default {
  data: () => ({
    isCollapsed: false,
    title: '',
    breadCrumbItems: {},
    openName: '',
    activeName: ''
  }),

  computed: {
    rotateIcon: {
      get() {
        return ['menu-icon', this.isCollapsed ? 'rotate-icon' : '']
      }
    },
    menuitemClasses: {
      get() {
        return ['menu-item', this.isCollapsed ? 'collapsed-menu' : '']
      }
    }
  },
  created() {
    this.$nuxt.$on('updatePageName', this.setPageName)
  },
  methods: {
    collapsedSider() {
      this.$refs.side1.toggleCollapse()
    },
    setPageName(pageName) {
      this.title = pageName[1].name || ''
      this.breadCrumbItems = pageName
      this.openName = pageName[0].openName
      this.activeName = pageName[1].activeName
    },
    pageLink(path) {
      this.$router.push(path)
    },
    logout() {
      auth.onAuthStateChanged(() => {
        auth
          .signOut()
          .then(() => {})
          .catch(error => {
            console.log(error)
          })
      })
      this.$store.commit('auth/logout')
    }
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.layout-con {
  height: 100%;
  width: 100%;
}

.rotate-icon {
  transform: rotate(-90deg);
}

.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 2;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
</style>
