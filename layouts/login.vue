<template>
  <div>
    <Layout :style="{ minHeight: '100vh' }">
      <Header :style="{ position: 'fixed', width: '100%' }">
        <span style="font-size:25px; color:white">BookMotion</span>
      </Header>
      <Content
        :style="{
          margin: '88px 20px 0',
          minHeight: '500px'
        }"
      >
        <nuxt />
      </Content>
      <Footer>
        2019 &copy; BookMotion
      </Footer>
    </Layout>
  </div>
</template>
<style scoped></style>
