<template>
    <div id="container" class="container-fluid ">
        <div id="title" >
            <h6>PRZYLĄCZE - zad. nr: {{taskNo}}</h6>
        </div>
        <div id="address">
            {{address}}
        </div>
        <div id="cabinet">
            Szafa: {{cabinet}}
        </div>
        <div id="msg">
            <b-form-textarea  class="form-control" rows="3" v-bind:value="msg"></b-form-textarea>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GasConnectionCalendarEntry",
        props: {
            msg: String,
            taskNo: String,
            address: String,
            cabinet: String
        }
    }
</script>

<style scoped>
#container{
    border: black 2px solid;
    border-radius: 10px;
    padding-bottom: 10px;
    margin-bottom: 10px;

}
    #title{
    text-align: left;
    }

    #address{
        text-align: left;
    }
    #cabinet{
        text-align: left;
    }
</style>