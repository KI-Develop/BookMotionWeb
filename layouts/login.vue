<template>
  <div>
    <Layout :style="{ minHeight: '100vh' }">
      <Header :style="{ width: '100%' }">
        <span class="header">
          BookMotion(β)
        </span>
      </Header>
      <Content
        :style="{
          margin: '20px 20px 0'
        }"
      >
        <nuxt />
      </Content>
      <Footer class="footer">
        <a href="https://ki-develop.github.io/BookMotion_LP/terms.html">
          利用規約
        </a>
        <Divider type="vertical" />
        <a href="https://ki-develop.github.io/BookMotion_LP/privacy.html">
          プライバシーポリシー
        </a>
        <Divider type="vertical" />
        <span style="font-size: 11px; color: #9e9e9e">
          2019 &copy; KI Develop.
        </span>
      </Footer>
    </Layout>
  </div>
</template>
<style scoped>
.header {
  font-family: Century Gothic, sans-serif;
  font-size: 25px;
  color: white;
}
.footer {
  text-align: center;
}
</style>
