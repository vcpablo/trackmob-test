<template>
  <section>
    <div  :class="$style.mainContainer">
      <div :class="$style.message">
      <h1 :class="$style.title">Thanks for Your Support</h1>
      <p :class="$style.text">
        Lorem ipsum dolor sivt amet, consectetur adipiscing elit. Donec non diam sit amet neque tristique aliquam. Curabitur non euismod felis. Suspendisse ligula sapien, fringilla non nunc sed, cursus dictum libero. Aliquam sit amet lorem vel enim posuere malesuada.
      </p>
    </div>
    <app-form></app-form>
    </div>
    <div :class="$style.secondaryContainer">
    </div>
  </section>
</template>

<script>
import Form from './Form'

export default {
  components: {
    AppForm: Form
  }
}
</script>

<style module lang="scss">
  
</style>
