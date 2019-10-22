<template>
  <div>
    <Header :style="{ padding: 0 }" class="layout-header-bar">
      <Icon
        :class="rotateIcon"
        :style="{ margin: '0 20px' }"
        type="md-menu"
        size="24"
        @click.native="collapsedSider"
      />
    </Header>
    <Content :style="{ padding: '0 16px 16px' }">
      <Breadcrumb :style="{ margin: '16px 0' }">
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Components</BreadcrumbItem>
        <BreadcrumbItem>Layout</BreadcrumbItem>
      </Breadcrumb>
      <Card>
        <div style="height: 600px">
          <nuxt-link to="/login">
            login
          </nuxt-link>
          <p>{{ this.$store.state.auth.username }}</p>
          <button @click="logout">
            Logout
          </button>
          <nuxt-link to="/">
            test page
          </nuxt-link>
        </div>
      </Card>
    </Content>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: false
    }
  },
  computed: {
    rotateIcon() {
      return ['menu-item', this.isCollapsed ? 'collapsed-menu' : '']
    },
    menuitemClasses() {
      return ['menu-item', this.isCollapsed ? 'collapsed-menu' : '']
    }
  },
  methods: {
    collapsedSider() {
      this.$refs.side1.toggleCollapse()
    },
    async logout() {
      await this.$store.dispatch('logout')
    }
  }
}
</script>

<style scoped>
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
</style>
