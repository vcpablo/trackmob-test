<template>
  <div :class="[$style.wrapper, type === 'error' && $style.error, type === 'success' && $style.success]">
    <font-awesome-icon :icon="['fa', 'info-circle']"/>
    <span :class="$style.text">{{ text }}</span>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    text () {
      return (this.type === 'error') ? 'Corrija os campos abaixo' : 'Doação realizada com sucesso'
    }
  }
}
</script>

<style lang="scss" module>
  .wrapper {
    display: flex;
    color: $white;
    padding: 18px;
    justify-content: flex-start;
    align-items: center;
    margin: 20px 0;
    border-radius: 3px;

    .text {
      margin-left: 10px;
    }
  }

  .error {
    background-color: $danger;
  }

  .success {
    background-color: $success;
  }
</style>
