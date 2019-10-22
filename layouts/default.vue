<template>
  <div class="layout">
    <Layout :style="{ minHeight: '100vh' }">
      <Sider
        ref="side1"
        v-model="isCollapsed"
        breakpoint="md"
        hide-trigger
        collapsible
        :collapsed-width="78"
      >
        <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-navigate" />
              Item 1
            </template>
            <MenuItem name="1-1">
              Option 1
            </MenuItem>
            <MenuItem name="1-2">
              Option 2
            </MenuItem>
            <MenuItem name="1-3">
              Option 3
            </MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-keypad" />
              Item 2
            </template>
            <MenuItem name="2-1">
              Option 1
            </MenuItem>
            <MenuItem name="2-2">
              Option 2
            </MenuItem>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-analytics" />
              Item 3
            </template>
            <MenuItem name="3-1">
              Option 1
            </MenuItem>
            <MenuItem name="3-2">
              Option 2
            </MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout>
        <nuxt />
      </Layout>
    </Layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: false
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
</style>
