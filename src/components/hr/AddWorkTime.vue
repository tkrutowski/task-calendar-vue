<template>
    <div>
        <b-container fluid="" id="container">
            <h1>Obliczanie wypłat</h1>
            <hr style="border: 0px; background: rgba(255,245,0,0.8); height: 1px;">
            <b-container id="dateSwitch">
                <b-row align-h="center">
                    <!--                    <div class="form-div">-->
                    <!--                        <select class="form-select"  id="employee" required >-->
                    <!--                            <option v-for="employee in employees" v-bind ="selected" :key="employee.id">{{employee.lastName}} {{employee.firstName}}</option>-->
                    <!--                        </select>-->
                    <!--                        <br>-->
                    <!--                    </div>-->

                    <div>
                        <div>

                            <label class="form-label" for="employeeSelect">Wybierz pracownika: </label>
                            <b-form-select v-model="selected" :options="options" class="mb-3" id="employeeSelect">
                                <!-- This slot appears above the options from 'options' prop -->
                                <template #first>
                                    <b-form-select-option :value="null" disabled>-- Wybierz pracownika --
                                    </b-form-select-option>
                                </template>
                            </b-form-select>
                        </div>

                        <div>

                            <label for="date">Wybierz datę:</label>
                            <b-form-datepicker
                                    id="date"
                                    v-model="workTimeDateString"
                                    locale="pl"
                                    placeholder="Wybierz datę"

                                    @context="onContext"
                            >
                            </b-form-datepicker>
                            <!--                                                        <b-calendar v-model="tempDate"  locale="pl" block></b-calendar>-->
                        </div>


                        <div style="display: flex; justify-content: space-between">
                            <!--                            PRACA-->
                            <div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="rbWork" @click="rbWork_click">
                                    <label class="form-check-label" for="rbWork">
                                        Praca
                                    </label>
                                </div>
                                <!--                                <b-time v-model="timeFrom" locale="pl"></b-time>-->
                                <!--                                <b-form-timepicker v-model="value" locale="pl"></b-form-timepicker>-->
                                <div>
                                    <label for="workFrom-input">Od:</label>
                                    <label for="workTo-input">Do:</label>
                                    <b-input-group class="mb-3">
                                        <b-form-input
                                                id="workFrom-input"
                                                v-model="timeFrom"
                                                type="time"
                                                placeholder="HH:mm"
                                                :readonly="!isWork"
                                        ></b-form-input>
<!--                                        <b-input-group-append>-->
<!--                                            <b-form-timepicker-->
<!--                                                    v-model="timeFrom"-->
<!--                                                    button-only-->
<!--                                                    right-->
<!--                                                    locale="pl"-->
<!--                                                    aria-controls="workFrom-input"-->
<!--                                            ></b-form-timepicker>-->
<!--                                        </b-input-group-append>-->
                                        <b-form-input
                                                id="workTo-input"
                                                v-model="timeTo"
                                                type="time"
                                                placeholder="HH:mm"
                                                :readonly="!isWork"
                                        ></b-form-input>
                                    </b-input-group>
                                    <p>Value: '{{ timeFrom }}'</p>

                                </div>
                                <p>{{timeFrom}}</p>
                            </div>
                            <!--                            URLOP-->
                            <div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="rbDayOff" @click="rbDayOff_click" >
                                    <label class="form-check-label" for="rbDayOff">
                                        Urlop
                                    </label>
                                </div>
                            </div>
                            <!--                            CHOROBA-->
                            <div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="rbIllness" @click="rbIllness_click" >
                                    <label class="form-check-label" for="rbIllness">
                                        Choroba
                                    </label>
                                </div>
                            </div>
                        </div>
                        <a class="btn btn-warning form-button" @click="addWorkTime">Dodaj</a>
                        <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
                        <div class="mt-3">Selected: <strong>data : {{ workTimeDate }}</strong></div>
                        <div class="mt-3">Selected: <strong>data string : {{ workTimeDateString }}</strong></div>

                    </div>
                </b-row>


            </b-container>

            <ul v-if="errors && errors.length">
                <li v-for="error of errors" :key="error.ruleId">
                    {{error.message}}
                </li>
            </ul>
            <br>

        </b-container>
    </div>
</template>

<script>
    import moment from 'moment';
    import axios from "axios";

    export default {
        name: "AddWorkTime",
        data() {
            return {
                employees: [],
                options: [],
                workTimeDateString: '',
                workTimeDate: moment(),
                errors: [],
                timeFrom: '07:00:00',
                timeTo: '15:00:00',
                isWork: true,
                isDayOff: false,
                isIllness: false,


                selected: '',
                months: [{value: '01', text: 'styczeń'}, {value: '02', text: 'luty'}, {
                    value: '03',
                    text: 'marzec'
                }, {value: '04', text: 'kwiecień'}, {value: '05', text: 'maj'}, {value: '06', text: 'czerwiec'}
                    , {value: '07', text: 'lipiec'}, {value: '08', text: 'sierpień'}, {
                        value: '09',
                        text: 'wrzesień'
                    }, {value: '10', text: 'październik'}, {value: '11', text: 'listopad'}, {
                        value: '12',
                        text: 'grudzień'
                    }],
                years: [2020, 2021, 2022],

                month: moment().format('MM'),
                year: moment().format('YYYY')
            }
        },
        created() {
            this.getEmployeesFromDb();
            moment.locale('pl');
            // this.workTimeDate = new Date();
            this.workTimeDateString = this.workTimeDate.format('YYYY-MM-DD');
            this.isWork=true;
        },
        methods: {
            rbWork_click(){
                this.isWork=true;
                this.isIllness=false;
                this.isDayOff=false;
            },
            rbDayOff_click(){
                this.isDayOff=true;
                this.isWork=false;
                this.isIllness=false;
            },
            rbIllness_click(){
                this.isIllness=true;
                this.isWork=false;
                this.isDayOff=false;
            },
            onContext(ctx) {
                // The date formatted in the locale, or the `label-no-date-selected` string
                //this.formatted = ctx.selectedFormatted
                // The following will be an empty string until a valid date is entered
                this.workTimeDateString = ctx.selectedYMD
                this.workTimeDate = moment(this.workTimeDateString);
            },
            getEmployeesFromDb() {
                console.log("getEmployeesFromDb() - start");
                // axios.get(`http://77.55.210.35:9090/api/teams`)
                // axios.get(`http://localhost:9090/api/teams`)
                axios.get(`http://192.168.1.10:8082/api/employee/query?status=HIRED`)
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.employees = response.data;
                        console.log("getEmployeesFromDb() - Ilosc employees[]: " + this.employees.length);
                        if (this.employees.length > 0) {
                            this.convertToOptions();
                        }
                    })
                    .catch(e => {
                        this.errors.push(e)
                    });

            },
            addWorkTime() {
                // this.salaryDate = moment().creationData().
                // let url = "http://localhost:8082/api/employee/salary/" + this.selected + "?date=" + this.year + "-" + this.month + "-01";
                // // axios.get(`http://77.55.210.35:9090/api/teams`)
                // // axios.get(`http://localhost:9090/api/teams`)
                // axios.get(url)
                //     .then(response => {
                //         // JSON responses are automatically parsed.
                //         this.salary = response.data;
                //         console.log(this.salary.toString());
                //     })
                //     .catch(e => {
                //         this.errors.push(e)
                //     });
                if(this.isWork){
                    this.addWork();
                }
                this.addCalendarDay();
            },
            addWork(){
              console.log("add praca: "+this.timeFrom+" - "+this.timeTo);
            },
            addCalendarDay() {
                console.log("addWorkTime()");
                console.log("przed dodaniem dnia: " + this.workTimeDate.format('YYYY-MM-DD'));
                this.workTimeDate.add(1, 'day'); // setDate(day+1);
                console.log("po dodaniu dnia: " + this.workTimeDate.format('YYYY-MM-DD'));

                this.workTimeDateString = this.workTimeDate.format('YYYY-MM-DD');

            },
            convertToOptions() {
                console.log("convert to options...");
                this.employees.forEach((e) => {
                    let opt = {
                        value: e.id,
                        text: e.lastName + " " + e.firstName
                    }
                    this.options.push(opt)
                    console.log(e.id + " " + e.lastName);

                })
            }
        }


    }
</script>

<style scoped>
    .main {
        display: flex;
        justify-content: flex-start;
        /*align-content: start;*/
        margin: 10px;
    }

    .text {
        margin-right: 5px;
    }
</style>