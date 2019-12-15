module.exports = function(api) {
  api.cache(true)

  const presets = [['env', { modules: false }]]

  const env = {
    test: {
      presets: [['env', { targets: { node: 'current' } }]]
    }
  }

  return {
    presets,
    env
  }
}
