<template>
    <div>
        <b-container fluid="" id="title">
            <h1>Kalendarz zadań</h1>
            <b-form-input placeholder="Enter your name"></b-form-input>
            <h2>Przełączanie daty</h2>
            <b-container id="dateSwitch">
                <b-row align-h="center">
                    <b-button class="mr-3" @click="prevDate">Poprzednia</b-button>
                    <h3>{{startDate.format('D.MM')}} - {{endDate.format('D.MM.YYYY')}}</h3>
                    <b-button class="ml-3" @click="nextDate">Następna</b-button>
                </b-row>
            </b-container>

            <ul v-if="errors && errors.length">
                <li v-for="error of errors" :key="error.ruleId">
                    {{error.message}}
                </li>
            </ul>
            <br>
            <br>
            <br>
            <div v-for="team in allTeams" :key="team.idTeam">
                <br>
                <b-btn v-b-toggle="'team'+team.idTeam">{{team.name}}</b-btn>

                <b-collapse :id="'team'+team.idTeam" visible>
                    <b-card>
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-2 odd">
                                    <p>Poniedziałek - {{monday}}</p>

                                    <div v-if="calendarEntries && calendarEntries.length">
                                        <div v-for="calendarEntry of calendarEntries" :key="calendarEntry.id">
                                            <div v-if="weekDay(calendarEntry.date) === 'poniedziałek'">
                                                <div v-if="calendarEntry.idTeam === team.idTeam">
                                                    <div v-if="calendarEntry.taskType === 'GAS_CONNECTION'">

                                                        <!--                                                    <GasConnectionCalendarEntry-->
                                                        <!--                                                            :address="calendarEntry.address"-->
                                                        <!--                                                            :cabinet="calendarEntry.gasCabinetProvider"-->
                                                        <!--                                                            :msg="calendarEntry.message"-->
                                                        <!--                                                            :task-no="calendarEntry.taskNo"-->
                                                        <!--                                                            :mail-status-customer="calendarEntry.sentMailToCustomer"-->
                                                        <!--                                                            :mail-customer-date="calendarEntry.dateSentMailToCustomer"-->
                                                        <!--                                                            :mail-status-surveyor="calendarEntry.sentMailToSurveyor"-->
                                                        <!--                                                            :mail-status-pgn="calendarEntry.sentMailPgn"-->
                                                        <!--                                                            :mail-surveyor-date="dateSentMailToSurveyor"-->
                                                        <!--                                                            :mail-pgn-date="dateSentMailPgn"-->
                                                        <!--                                                            :is-pgn="calendarEntry.isPgn"-->
                                                        <!--                                                    />-->
                                                        <GasConnectionCalendarEntry
                                                                :address="calendarEntry.address"
                                                                :cabinet="calendarEntry.gasCabinetProvider"
                                                                :msg="calendarEntry.message"
                                                                :task-no="calendarEntry.taskNo"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <!--                                {{calendarEntry.date.getUTCDay()}}-->
                                        </div>
                                    </div>
                                </div>
                                <div class="col-2 even">
                                    <p>Wtorek - {{tuesday}}</p>

                                </div>
                                <div class="col-2 odd">
                                    <p>Sroda - {{wednesday}}</p>

                                </div>
                                <div class="col-2 even">
                                    <p>Czwartek - {{thursday}}</p>
                                    <!--                                    <GasConnectionCalendarEntry/>-->
                                </div>
                                <div class="col-2 odd">
                                    <p>Piątek - {{friday}}</p>

                                    <!--                            <div v-for="calendarEntry of calendarEntries" :key="calendarEntry.id">-->
                                    <!--                                <div v-if="weekDay(calendarEntry.date) === 'Friday'">-->
                                    <!--                                    <GasConnectionCalendarEntry-->
                                    <!--                                            :address="calendarEntry.address"-->
                                    <!--                                            :cabinet="calendarEntry.gasCabinetProvider"-->
                                    <!--                                            :msg="calendarEntry.message"-->
                                    <!--                                            :task-no="calendarEntry.taskNo"/>-->
                                    <!--&lt;!&ndash;                                    {{weekDay(calendarEntry.date)}}&ndash;&gt;-->
                                    <!--&lt;!&ndash;                                    {{calendarEntry.date || moment().format('dddd')}}&ndash;&gt;-->
                                    <!--                                </div>-->
                                    <!--                                &lt;!&ndash;                                {{calendarEntry.date.getUTCDay()}}&ndash;&gt;-->
                                    <!--                            </div>-->
                                </div>
                                <div class="col-2 even">
                                    <p>Sobota - {{saturday}}</p>


                                </div>
                            </div>
                        </div>
                    </b-card>

                </b-collapse>
                <br>
            </div>
        </b-container>
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
                allTeams: [],
                teams: new Set,
                startDate: moment(),
                endDate: '',
                monday: '',
                tuesday: '',
                wednesday: '',
                thursday: '',
                friday: '',
                saturday: ''
            }
        },
        // Fetches posts when the component is created.
        created() {
            //  moment.locale('en', null);
            moment.locale('pl');
            this.calculateStartDate();
            this.calculateEndDate();
            this.fillWeekDays();
            this.getTeamsFromDb();
            this.getFromDb();

        },
        methods: {
            getFromDb() {
                console.log("getEntryFromDb() - start");
                axios.get(`http://localhost:8080/api/taskcalendar/week?date=` + this.startDate.format('YYYY-MM-DD'))
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.calendarEntries = response.data;
                        console.log("getTaskEntriesFromDb() - Ilosc entries[]: " + this.calendarEntries.length);
                        //this.getTeams();
                    })
                    .catch(e => {
                        this.errors.push(e)
                    });

            },
            getTeamsFromDb() {
                console.log("getTeamsFromDb() - start");
                axios.get(`http://localhost:8082/api/teams`)
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.allTeams = response.data;
                        console.log("getTeamsFromDb() - Ilosc teams[]: " + this.allTeams.length);
                    })
                    .catch(e => {
                        this.errors.push(e)
                    });

            },
            getTeams() {
                console.log("getTeams()");
                this.teams.clear();
                console.log("Ilosc teams[]: " + this.allTeams.length);

                if (this.calendarEntries.length > 0) {
                    this.calendarEntries.forEach(e => {
                        this.teams.add(e.idTeam)
                    })
                    this.calendarEntries.forEach(e => console.log("ID team: " + e.idTeam));
                    console.log("Teams set: " + this.teams);

                }

            },
            prevDate() {
                console.log("Preview date.")
                let tempDate = this.startDate.format('YYYY-MM-DD')
                this.startDate = moment(tempDate, 'YYYY-MM-DD').subtract(7, 'days')
                this.calculateEndDate()
                this.fillWeekDays();
                this.getFromDb();
                // this.getTeams();
            },
            nextDate() {
                console.log("Next date.")
                let tempDate = this.startDate.format('YYYY-MM-DD')
                this.startDate = moment(tempDate, 'YYYY-MM-DD').add(7, 'days')
                this.calculateEndDate()
                this.fillWeekDays();
                this.getFromDb();
                // this.getTeams();
            },
            calculateEndDate() {
                console.log("Calculate end date")
                let tempDate = this.startDate.format('YYYY-MM-DD')
                this.endDate = moment(tempDate, 'YYYY-MM-DD').add(6, 'days')
                console.log("Start date: " + this.startDate.format('LLLL'))
                console.log("End date: " + this.endDate.format('LLLL'))
            },
            weekDay(value) {
                const entireWeek = moment(value).format("dddd")
                return entireWeek; // July 6 - 13 2020
            },
            calculateStartDate() {
                console.log("Calculate start date")
                let dateGiven = moment().format('YYYY-MM-DD')

                console.log(dateGiven)
                console.log(moment(dateGiven).format("dddd"))
                let given = moment(dateGiven).format("dddd")
                switch (given) {
                    case "poniedziałek":
                        console.log("jestem w pon")
                        this.startDate = moment()
                        break;
                    case "wtorek":
                        console.log("jestem w wt")
                        this.startDate = moment(dateGiven).subtract(1, 'days');
                        break;
                    case "środa":
                        console.log("jestem w sroda")
                        this.startDate = moment(dateGiven).subtract(2, 'days');
                        break;
                    case "czwartek":
                        console.log("jestem w czw")
                        this.startDate = moment(dateGiven).subtract(3, 'days');
                        break;
                    case "piątek":
                        console.log("jestem w pt")
                        this.startDate = moment(dateGiven).subtract(4, 'days');
                        break;
                    case "sobota":
                        console.log("jestem w sobota")
                        this.startDate = moment(dateGiven).subtract(5, 'days');
                        break;
                    case  "niedziela":
                        console.log("jestem w niedz")
                        this.startDate = moment(dateGiven).subtract(6, 'days');
                        break;
                }

                console.log(this.startDate.format('LLLL'))
                // return dateReturn;
            },
            fillWeekDays() {
                let dateGiven = moment(this.startDate).format('YYYY-MM-DD')
                this.monday = moment(dateGiven).format('D MMMM')
                this.tuesday = moment(dateGiven).add(1, 'days').format('D MMMM');
                this.wednesday = moment(dateGiven).add(2, 'days').format('D MMMM');
                this.thursday = moment(dateGiven).add(3, 'days').format('D MMMM');
                this.friday = moment(dateGiven).add(4, 'days').format('D MMMM');
                this.saturday = moment(dateGiven).add(5, 'days').format('D MMMM');

            },
            test2() {
                moment.locale('pl');
                return moment(this.starttest1);
            },
            addDate() {
                const date = moment(this.starttest1)
                // eslint-disable-next-line no-undef
                // this.startDate = (date.add(1,'days').format("dddd, D-MMMM-YYYY"));
                console.log(date.add(1, 'days').format("dddd, D-MMMM-YYYY"));
            }
        }
    }
</script>

<style scoped>
    #title {
        align-content: center;
    }

    .odd {
        background-color: #FFFFE0;
    }

    .even {
        background-color: #B0E0E6;
    }

    #dateSwitch {
        flex-direction: column;
    }
</style>