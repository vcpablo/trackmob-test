<template>
  <header :class="$style.wrapper">
    <div :class="$style.content">
      <img src="../assets/images/logo.png" />
    <nav :class="$style.nav">
      <span :class="$style.share">Compartilhe</span>
      <span>
        <a href="https://facebook.com" target="_blank">
          <font-awesome-icon :icon="['fab', 'facebook']" :class="$style.icon"/>
        </a>

      </span>
      <span>
        <a href="https://twitter.com" target="_blank">
          <font-awesome-icon :icon="['fab', 'twitter']" :class="$style.icon"/>
        </a>
      </span>
      <span>
        <a href="https://instagram.com" target="_blank">
          <font-awesome-icon :icon="['fab', 'instagram']" :class="$style.icon"/>
        </a>
      </span>
    </nav>
    </div>

  </header>
</template>

<script>
export default {
}
</script>

<style module lang="scss">
  .wrapper {
    position: fixed;
    background-color: $white;
    width: 100%;
    z-index: 1;

    .content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
      padding: 25px;
      width: 70vw;
    }
  }

  .nav {
    display: flex;
    align-items: center;

    span {
      margin-left: 16px;
    }

    .share {
      font-weight: bold;
      font-size: 14px;
      color: $primary-text;
    }

    .icon {
      padding: 8px;
      font-size: 18px;
      border-radius: 50%;
      background-color: $primary-bg;
      color: $white;
    }
  }
</style>
