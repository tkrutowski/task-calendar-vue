<template>
    <div id="main">
        <b-container id="container">
            <h1>Obliczanie wypłat</h1>
            <hr style="border: 0px; background: rgba(255,245,0,0.8); height: 1px;">
<!--            <b-container>-->
<!--                <b-col>-->
                    <b-container fluid="sm" id="dateSwitch">
                        <b-row align-h="center">
                            <!--                    <div class="form-div">-->
                            <!--                        <select class="form-select"  id="employee" required >-->
                            <!--                            <option v-for="employee in employees" v-bind ="selected" :key="employee.id">{{employee.lastName}} {{employee.firstName}}</option>-->
                            <!--                        </select>-->
                            <!--                        <br>-->
                            <!--                    </div>-->
<b-col>


                            <div>
                                <div>

                                    <label class="form-label" for="employeeSelect">Wybierz pracownika: </label>
                                    <b-form-select v-model="selectedEmployee" :options="optionsEmployee" class="mb-3"
                                                   id="employeeSelect"
                                                   @change="onEmployeeChange"
                                                   required
                                    >
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
                                            <input class="form-check-input" type="radio" name="flexRadioDefault"
                                                   id="rbWork" checked @click="rbWork_click">
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
                                            <input class="form-check-input" type="radio"
                                                   name="flexRadioDefault"
                                                   id="rbDayOff"
                                                   @click="rbDayOff_click">
                                            <label class="form-check-label" for="rbDayOff">
                                                Urlop
                                            </label>
                                        </div>
                                        <div>
                                            <label class="form-label" for="dayOffTypeSelect">Wybierz rodzaj
                                                urlopu: </label>
                                            <b-form-select v-model="selectedDayOffType" :options="optionDayOff"
                                                           class="mb-3" id="dayOffTypeSelect">
                                                <!-- This slot appears above the options from 'options' prop -->
                                                <template #first>
                                                    <b-form-select-option :value="null" disabled>-- Wybierz rodzaj
                                                        urlopu --
                                                    </b-form-select-option>
                                                </template>
                                            </b-form-select>
                                        </div>
                                        <p>{{selectedDayOffType}}</p>
                                    </div>
                                    <!--                            CHOROBA-->
                                    <div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="flexRadioDefault"
                                                   id="rbIllness" @click="rbIllness_click">
                                            <label class="form-check-label" for="rbIllness">
                                                Choroba
                                            </label>
                                        </div>
                                        <div>
                                            <label class="form-label" for="illnessTypeSelect">Wybierz rodzaj
                                                zasiłku: </label>
                                            <b-form-select v-model="selectedIllnessType" :options="optionIllness"
                                                           class="mb-3" id="illnessTypeSelect">
                                                <!-- This slot appears above the options from 'options' prop -->
                                                <template #first>
                                                    <b-form-select-option :value="null" disabled>-- Wybierz rodzaj
                                                        zasiłku --
                                                    </b-form-select-option>
                                                </template>
                                            </b-form-select>
                                        </div>
                                        <p>{{selectedIllnessType}}</p>

                                    </div>
                                </div>
                                <a class="btn btn-warning form-button" @click="addWorkTime">Dodaj</a>
                                <div class="mt-3">Selected: <strong>{{ selectedEmployee }}</strong></div>
                                <div class="mt-3">Selected: <strong>data : {{ workTimeDate }}</strong></div>
                                <div class="mt-3">Selected: <strong>data string : {{ workTimeDateString }}</strong>
                                </div>

                            </div>
</b-col>
                        <b-col>
                    <div >
                        <b-table striped hover :items="workTimeList" :fields="fields" id="table"></b-table>
                    </div>

                        </b-col>
                        </b-row>

                    </b-container>

<!--                </b-col>-->
<!--                <b-col>-->
<!--                </b-col>-->
<!--            </b-container>-->

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
                fields: [
                    {
                        key: 'date',
                        label: 'Data'
                    },
                    {
                        key : 'dayOfWeek',
                        label: 'Dzień tyg.'
                    },
                    {
                        key :'startTime',
                        label: 'Wejście'
                    },
                    {
                        key :'stopTime',
                        label: 'Wyjście'
                    },
                    {
                        key :'workTimeAll',
                        label: 'Ilość godzin'
                    },
                    {
                        key : 'workTime50',
                        label : 'Ilość godzin 50%'
                    },
                    {
                        key : 'workTime100',
                        label : 'Ilość godzin 100%'
                    },
                    {
                        key : 'isHoliday',
                        label : 'holiday'
                    }
                    ],
                workTimeList: [],
                employees: [],
                dayOffTypes: [],
                illnessTypes: [],

                workTimeDateString: '',
                workTimeDate: moment(),
                errors: [],
                timeFrom: '07:00:00',
                timeTo: '15:00:00',
                isWork: true,
                isDayOff: false,
                isIllness: false,
                optionDayOff: [],
                optionsEmployee: [],
                optionIllness: [],

                selectedEmployee: '',
                selectedDayOffType: '',
                selectedIllnessType: '',

                work:{
                    "idEmployee": '',
                    "date": '',
                    "startTime": '',
                    "stopTime": ''
                },
                illness:{
                    "idEmployee": '',
                    "date": '',
                    "idIllnessType": ''
                },
                dayOff:{
                    "idEmployee": '',
                    "date": '',
                    "idDayOffType": ''
                }
            }
        },
        created() {
            this.getEmployeesFromDb();
            this.getDayOffTypesFromDb();
            this.getIllnessTypesFromDb();
            moment.locale('pl');
            // this.workTimeDate = new Date();
            this.workTimeDateString = this.workTimeDate.format('YYYY-MM-DD');
            this.isWork = true;
            this.selectedEmployee=1;
            this.selectedDayOffType=2;
            this.selectedIllnessType=1;
            this.getWorkTimeAll();
        },
        methods: {
            onEmployeeChange(){
                this.getWorkTimeAll();
            },
            rbWork_click() {
                this.isWork = true;
                this.isIllness = false;
                this.isDayOff = false;
            },
            rbDayOff_click() {
                this.isDayOff = true;
                this.isWork = false;
                this.isIllness = false;
            },
            rbIllness_click() {
                this.isIllness = true;
                this.isWork = false;
                this.isDayOff = false;
            },
            onContext(ctx) {
                // The date formatted in the locale, or the `label-no-date-selected` string
                //this.formatted = ctx.selectedFormatted
                // The following will be an empty string until a valid date is entered
                this.workTimeDateString = ctx.selectedYMD
                this.workTimeDate = moment(this.workTimeDateString);
                this.getWorkTimeAll();
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
                            this.convertToOptionsEmployee();
                        }
                    })
                    .catch(e => {
                        this.errors.push(e)
                    });

            },
            getDayOffTypesFromDb() {
                console.log("getDayOffTypesFromDb() - start");
                // axios.get(`http://77.55.210.35:9090/api/teams`)
                // axios.get(`http://localhost:9090/api/teams`)
                axios.get(`http://192.168.1.10:8082/api/worktime/dayofftype`)
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.dayOffTypes = response.data;
                        console.log("getDayOffTypesFromDb() - Ilosc dayOffTypes[]: " + this.dayOffTypes.length);
                        if (this.dayOffTypes.length > 0) {
                            this.convertToOptionsDayOff();
                        }
                    })
                    .catch(e => {
                        this.errors.push(e)
                    });
            },
            getIllnessTypesFromDb() {
                console.log("getIllnessTypesFromDb() - start");
                // axios.get(`http://77.55.210.35:9090/api/teams`)
                // axios.get(`http://localhost:9090/api/teams`)
                axios.get(`http://192.168.1.10:8082/api/worktime/illnesstype`)
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.illnessTypes = response.data;
                        console.log("getIllnessTypesFromDb() - Ilosc illnessTypes[]: " + this.illnessTypes.length);
                        if (this.illnessTypes.length > 0) {
                            this.convertToOptionsIllness();
                        }
                    })
                    .catch(e => {
                        this.errors.push(e)
                    });
            },
            getWorkTimeAll() {
                // this.salaryDate = moment().creationData().
                console.log("getWorkTimeAll()");
                // let url = "http://localhost:8082/api/worktime/" + this.selectedEmployee + "?date=" + this.workTimeDate.year() + "-" + (this.workTimeDate.month() + 1) + "-01";
                let url = "http://localhost:8082/api/worktime/" + this.selectedEmployee + "?date=" + this.workTimeDate.format('YYYY-MM-DD');
                // // axios.get(`http://77.55.210.35:9090/api/teams`)
                axios.get(url)
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.workTimeList = response.data;
                        // console.log(this.salary.toString());
                    })
                    .catch(e => {
                        this.errors.push(e)
                    });
            },
            addWorkTime() {

                if (this.isWork) {
                    this.addWork();
                }
                if(this.isIllness)
                    this.addIllness();

                if(this.isDayOff)
                    this.addDayOff();

                //TODO nie dodawać dnia jeżęli jest to ostatni dzień miesiąca
                this.addCalendarDay();
            },
            addWork() {
                console.log("add praca: " + this.timeFrom + " - " + this.timeTo);
                this.work.idEmployee=this.selectedEmployee;
                this.work.date= this.workTimeDate.format('YYYY-MM-DD');
                this.work.startTime=this.timeFrom;
                this.work.stopTime=this.timeTo;
                console.log(this.work);
                let url = "http://localhost:8082/api/worktime?workType=WORK";
                // // axios.get(`http://77.55.210.35:9090/api/teams`)
                // // axios.get(`http://localhost:9090/api/teams`)
                axios.post(url, this.work)
                    .then(response => {
                        console.log(response);
                        this.getWorkTimeAll();
                    })
                    .catch(e => {
                        this.errors.push(e)
                    });
            },
            addIllness() {
                console.log("add illness: " + this.workTimeDate.format('YYYY-MM-DD'));
                this.illness.idEmployee=this.selectedEmployee;
                this.illness.date= this.workTimeDate.format('YYYY-MM-DD');
                this.illness.idIllnessType=this.selectedIllnessType;
                console.log(this.illness);
                let url = "http://localhost:8082/api/worktime?workType=ILLNESS";
                // // axios.get(`http://77.55.210.35:9090/api/teams`)
                // // axios.get(`http://localhost:9090/api/teams`)
                axios.post(url, this.illness)
                    .then(response => {
                        console.log(response);
                        this.getWorkTimeAll();
                    })
                    .catch(e => {
                        this.errors.push(e)
                    });
            },
            addDayOff() {
                console.log("add dayOff: " + this.workTimeDate.format('YYYY-MM-DD'));
                this.dayOff.idEmployee=this.selectedEmployee;
                this.dayOff.date= this.workTimeDate.format('YYYY-MM-DD');
                this.dayOff.idDayOffType=this.selectedDayOffType;
                console.log(this.dayOff);
                let url = "http://localhost:8082/api/worktime?workType=DAY_OFF";
                // // axios.get(`http://77.55.210.35:9090/api/teams`)
                // // axios.get(`http://localhost:9090/api/teams`)
                axios.post(url, this.dayOff)
                    .then(response => {
                        console.log(response);
                        this.getWorkTimeAll();
                    })
                    .catch(e => {
                        this.errors.push(e)
                    });
            },
            addCalendarDay() {
                console.log("addCalendarDay()");
                console.log("przed dodaniem dnia: " + this.workTimeDate.format('YYYY-MM-DD'));
                this.workTimeDate.add(1, 'day'); // setDate(day+1);
                console.log("po dodaniu dnia: " + this.workTimeDate.format('YYYY-MM-DD'));

                this.workTimeDateString = this.workTimeDate.format('YYYY-MM-DD');

            },
            convertToOptionsEmployee() {
                console.log("convert to options...");
                this.employees.forEach((e) => {
                    let opt = {
                        value: e.id,
                        text: e.lastName + " " + e.firstName
                    }
                    this.optionsEmployee.push(opt)
                    console.log(e.id + " " + e.lastName);

                })
            },
            convertToOptionsDayOff() {
                console.log("convert to options...");
                this.dayOffTypes.forEach((e) => {
                    let opt = {
                        value: e.id,
                        text: e.name
                    }
                    this.optionDayOff.push(opt)
                    console.log(e.id + " " + e.name);

                })
            },
            convertToOptionsIllness() {
                console.log("convert to options...");
                this.illnessTypes.forEach((e) => {
                    let opt = {
                        value: e.id,
                        text: e.name
                    }
                    this.optionIllness.push(opt)
                    console.log(e.id + " " + e.name);

                })
            }
        }


    }
</script>

<style scoped>
    #main {
        display: flex;
        justify-content: flex-start;
        /*align-content: start;*/
        margin: 10px;
        color: white;
    }

    #table{
        color: white;
    }
    .text {
        margin-right: 5px;
    }
</style>