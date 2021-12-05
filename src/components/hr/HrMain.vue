<template>
    <div>
        <b-container fluid="" id="container">
            <h1>Kalendarz zadań</h1>
            <!--            <h2>Przełączanie daty</h2>-->
            <hr style="border: 0px; background: rgba(255,245,0,0.8); height: 1px;">
            <b-container id="dateSwitch">
                <b-row align-h="center">
                    <b-button class="mr-3" @click="goToCalculateSalary">Obliczanie wypłat</b-button>
<!--                    <h3>{{startDate.format('D.MM')}} - {{endDate.format('D.MM.YYYY')}}</h3>-->
                    <b-button class="ml-3" @click="goToWorkTime">Czas pracy</b-button>
                </b-row>
            </b-container>

<!--            <ul v-if="errors && errors.length">-->
<!--                <li v-for="error of errors" :key="error.ruleId">-->
<!--                    {{error.message}}-->
<!--                </li>-->
<!--            </ul>-->
            <br>

        </b-container>
    </div>
</template>

<script>
   // import CalculateSalary from "@/components/hr/CalculateSalary";
  //  import AddWorkTime from "@/components/hr/AddWorkTime";

    export default {
        name: "HrMain",

        methods: {
            goToCalculateSalary(){
                this.$router.push({name: 'CalculateSalary'});
            },
            goToWorkTime(){
                this.$router.push({name: 'AddWorkTime'})
            }

        }
    }
</script>

<style scoped>

</style>