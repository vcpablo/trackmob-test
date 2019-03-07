<template>
  <footer :class="$style.wrapper">
    <div :class="$style.content">
      <div :class="$style.leftContent">
        <div :class="$style.logo">
          <img src="../assets/images/logo-white.png" />
        </div>

        <div :class="$style.info">
          <p :class="$style.title">Está com dúvidas?</p>
          <p>Para capitais 0800 00 00 000</p>
          <p>Para outras localicadades: 11 1234 56789 </p>
          <p>Por email: contato@ong.org</p>
        </div>
      </div>
      <div :class="$style.rightContent">
      <p>Copyright &copy; 2019</p>
      <div :class="$style.poweredBy">
        <span>POWERED BY</span>
        <a href="https://trackmob.com.br" target="_blank">
          <img :class="$style.logo" src="../assets/images/logo-trackmob.png" />
        </a>
      </div>
    </div>
    </div>
  </footer>
</template>

<style module lang="scss">
  .wrapper {
    position: fixed;
    bottom: 0;
    background-color: $footer-bg;
    width: 100%;

    .content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
      padding: 25px;
      width: 70vw;

      .leftContent {
        display: flex;
        width: 30vw;
        justify-content: space-around;

        .logo {
          display: flex;
          align-items: center;
        }

        .info {
          color: $white;
          width: 20vw;

          p {
            margin: 0;
          }

          .title {
            font-weight: bold;
          }
        }
      }

      .rightContent {
        justify-content: right;

        p {
          text-align: right;
          color: $white;
        }

        .poweredBy {
          display: flex;
          align-items: center;
          padding: 5px;
          background-color: #0388c9;
          color: $white;
          border-radius: 3px;

          span {
            font-size: 10px;
            opacity: 0.8;
          }

          .logo {
            margin-left: 10px;
          }
        }
      }
    }
  }
</style>
