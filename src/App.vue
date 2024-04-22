<template>
  <div id="app">
    <HomeView></HomeView>
  </div>
</template>

<script>


import HomeView from "@/views/HomeView.vue";

export default {
  name: 'App',
  components: {
    HomeView
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
}
body{
  background-image: url('/public/42769.jpg');
  background-repeat: no-repeat;
  background-size:cover;

}

</style>
