<template>
  <div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: false
    }
  },
  mounted() {
    this.$nuxt.$emit('updatePageName', ['書籍一覧', '積み本'])
  },
  methods: {
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
