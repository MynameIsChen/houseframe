<template>
  <div id="app">
    <home-left></home-left>
    <home-right></home-right>
  </div>
</template>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }

  html, body, #app {
    height: 100%;
    width: 100%;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    display: flex;
    flex-direction: row;
  }
  .edit-dialog{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(0,0,0,0.6);
  }

</style>

<script>
  import HomeLeft from './components/HomeLeft'
  import HomeRight from './components/HomeRight'

  export default {
    components: {
      'home-left': HomeLeft,
      'home-right': HomeRight
    },
    data () {
      return {
      }
    },
    methods:{

    }
  }

</script>
