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
  .mainContainer {
    background: $main-bg url('../assets/images/background.png') no-repeat right center;
    background-size: cover;
    height: 100vh;
    display: flex;
  }

  .secondaryContainer {
    height: 165vh;
    display: flex;
    background-color: $main-bg;
  }

  .message {
    width: 40vw;
    margin-left: 20vw;
    margin-top: 30vh;

    .title {
      color: $primary-color;
    }

    .text {
      color: $primary-text;
    }
  }
</style>
