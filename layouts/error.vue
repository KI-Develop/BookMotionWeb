<template>
  <div>
    <p class="error-text">
      {{ error.message }}
    </p>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'login'
}
</script>
