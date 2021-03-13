<template>
    <div>
        <div id="title">
            <h1>Kalendarz zadań</h1>
            <br>
            <h3>{{startDate.format('D-MM-YYYY')}} - 13.03.2021</h3>
        </div>
<div>

    <div>
        <b-btn v-b-toggle="'team1'">TEAM 1</b-btn>

        <b-collapse id="team1">
            <b-card>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-2 odd">
                            <p>Poniedziałek - 8.03.2021</p>

                            <div v-for="calendarEntry of calendarEntries" :key="calendarEntry.id">
                                <div v-if="weekDay(calendarEntry.date) === 'Monday'">
                                <GasConnectionCalendarEntry
                                :address="calendarEntry.address"
                                :cabinet="calendarEntry.gasCabinetProvider"
                                :msg="calendarEntry.message"
                                :task-no="calendarEntry.taskNo"/>
                                {{weekDay(calendarEntry.date)}}
                                    {{ moment(calendarEntry.date).format('dddd')}}
                                </div>
<!--                                {{calendarEntry.date.getUTCDay()}}-->
                            </div>
                        </div>
                        <div class="col-2 even">
                            <p>Wtorek - 9.03.2021</p>

                        </div>
                        <div class="col-2 odd">
                            <p>Sroda - 10.03.2021</p>

                        </div>
                        <div class="col-2 even" >
                            <p>Czwartek - 11.03.2021</p>
                            <GasConnectionCalendarEntry/>
                        </div>
                        <div class="col-2 odd">
                            <p>Piątek - 12.03.2021</p>

                            <div v-for="calendarEntry of calendarEntries" :key="calendarEntry.id">
                                <div v-if="weekDay(calendarEntry.date) === 'Friday'">
                                    <GasConnectionCalendarEntry
                                            :address="calendarEntry.address"
                                            :cabinet="calendarEntry.gasCabinetProvider"
                                            :msg="calendarEntry.message"
                                            :task-no="calendarEntry.taskNo"/>
                                    {{weekDay(calendarEntry.date)}}
                                    {{calendarEntry.date || moment().format('dddd')}}
                                </div>
                                <!--                                {{calendarEntry.date.getUTCDay()}}-->
                            </div>
                        </div>
                        <div class="col-2 even">
                            <p>Sobota - 13.03.2021</p>


                        </div>
                    </div>
                </div>
            </b-card>
        </b-collapse>

    </div>

</div>

    </div>
</template>

<script>
    import GasConnectionCalendarEntry from "@/components/GasConnectionCalendarEntry";
    import axios from 'axios';
    import moment from 'moment';
    export default {
        name: "TaskCalendar",
        components: {GasConnectionCalendarEntry},
        data() {
            return {
                calendarEntries: [],
                errors: [],
                startDate: moment()
            }
        },
        // Fetches posts when the component is created.
        created() {
            axios.get(`http://localhost:8080/api/taskcalendar/week?date=2020-02-21`)
                .then(response => {
                    // JSON responses are automatically parsed.
                    this.calendarEntries = response.data
                })
                .catch(e => {
                    this.errors.push(e)
                })
        },
        methods: {
            weekDay(value) {
                const entireWeek = moment(value).format("dddd")
                return entireWeek; // July 6 - 13 2020
            }
        }
    }
</script>

<style scoped>
    #title {
        align-content: center;
    }
.odd{
    background-color: #FFFFE0;
}
    .even{
        background-color: #B0E0E6;
    }
</style>