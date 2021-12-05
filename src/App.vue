<template>
  <div id="app">
<!--    <div id="logo">-->
<!--      <b-img src="./assets/logo.png" fluid-grow alt="Responsive image"></b-img>-->
<!--    </div>-->
    <div id="logo-back">
    <img id="logo" alt="Vue logo" src="./assets/logo.png">
<h1 id="name">ProgasOffice</h1>
    </div>
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
<!--    <TaskCalendar/>-->
<!--      <router-view />-->
<!--      <HrMain/>-->
      <AddWorkTime/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import TaskCalendar from "@/components/TaskCalendar";
// import CalculateSalary from "@/components/hr/CalculateSalary";
// import Eureka from 'eureka-js-client';
//import HrMain from "@/components/hr/HrMain";
import AddWorkTime from "@/components/hr/AddWorkTime";

// import HrMain from "@/components/hr/HrMain";
export default {
  name: 'App',
  components: {
      // HrMain
    // HelloWorld,
    // TaskCalendar,
    //   CalculateSalary
     AddWorkTime
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: rgba(29,29,29);
  /*background-color: #252525;*/
  color: #2c3e50;
  margin-top: 60px;
}
  #logo{
    /*display: block;*/
    width: 150px;
    margin-left: 50px;
    /*float: left;*/
  }
#logo-back{
  display: flex;
  justify-content: space-between;
  /*float: left;*/
  height: 150px;
  width: auto;
  background-color: rgb(97,93,92);
}
  #name{
    color: rgba(255,245,0,0.8);
    padding-top: 50px;
    padding-right: 50px;
  }
</style>
