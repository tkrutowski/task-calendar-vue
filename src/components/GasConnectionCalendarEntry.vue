<template>
    <div id="container" class="container-fluid ">
        <div id="title" >
            <h6 align="center" style="padding-top: 10px"><strong>PRZYLĄCZE</strong></h6>
            <h6><strong>Nr zad.:</strong> {{taskNo}}</h6>
        </div>
        <div id="address">
            <p style="margin-bottom: 0"><strong>Adres:</strong></p>
            <p style="margin-bottom: 8px">{{address}}</p>
        </div>
        <div id="cabinet">
            <span style="margin-bottom: 0"><strong>Szafa: </strong>{{cabinet}}</span>
<!--            <b-button v-b-toggle.collapse-3 class="m-1">...</b-button>-->
        </div>
        <div id="msg">
            <b-form-textarea v-b-modal="'info'+taskNo" class="form-control" rows="3" v-bind:value="msg" readonly></b-form-textarea>
        </div>

<!--        Powiadomienia-->
        <div>
            <b-button v-b-toggle.collapse-3 class="m-1">...</b-button>
            <b-collapse visible id="collapse-3">
                <b-card no-body style="color: black; padding: .30rem" >
                        Powiadomienia:
                    <div  v-b-modal="'customer'+taskNo" id="customer" class="notification " :style="checkCustomer() ? {'background-color':'green'} :{'background-color':'red'} ">
                        <h6>Klient: </h6><h6>{{mailCustomerDate}}</h6>
                    </div>

                    <div v-b-modal="'surveyor'+taskNo" id="surveyor" class="notification " :style="checkSurveyor() ? {'background-color':'green'} :{'background-color':'red'} ">
                        <h6>Geodeda: </h6><h6>{{mailSurveyorDate}}</h6>
                    </div>

                    <div v-b-modal="'pgn'+taskNo"  v-if="isPgn" id="pgn" class="notification " :style="checkPgn() ? {'background-color':'green'} :{'background-color':'red'} ">
                        <h6>PGN: </h6><h6>{{mailPgnDate}}</h6>
                    </div>
                </b-card>
            </b-collapse>

            <!-- The modal  info-->
            <b-modal :id="'info'+taskNo" centered title="Informacje"
                     @show="copyToInfo"
                     @ok="assignValueInfo">
                <b-textarea id="input-info" v-model="tempInfo"  rows="6" locale="pl" ></b-textarea>
            </b-modal>

            <!-- The modal  customer-->
            <b-modal :id="'customer'+taskNo" centered title="Powiadomienie klienta"
                     @show="resetIfNullCustomer"
                     @ok="assignValueCustomer">
                <p class="my-6">Wybierz datę powiadomienia klienta</p>
                <div>
                    <b-calendar v-model="tempDate"  locale="pl" block></b-calendar>
                </div>
                <div class="modalWindow">
                    <b-button variant="danger" @click="clearModalCustomer">Wyczyść</b-button>
                </div>
            </b-modal>

            <!-- The modal  surveyor-->
            <b-modal :id="'surveyor'+taskNo" centered title="Powiadomienie geodety"
                     @show="resetIfNullSurveyor"
                     @ok="assignValueSurveyor">
                <p class="my-6">Wybierz datę powiadomienia geodety</p>
                <div>
                    <b-calendar v-model="tempDate"  locale="pl" block></b-calendar>
                </div>
                <div class="modalWindow">
                    <b-button variant="danger" @click="clearModalSurveyor">Wyczyść</b-button>
                </div>
            </b-modal>


            <!-- The modal  PGN-->
            <b-modal :id="'pgn'+taskNo" centered title="Powiadomienie gazownii"
                     @show="resetIfNullPgn"
                     @ok="assignValuePgn">
                <p class="my-6">Wybierz datę powiadomienia gazownii</p>
                <div>
                    <b-calendar v-model="tempDate"  locale="pl" block></b-calendar>
                </div>
                <div class="modalWindow">
                    <b-button variant="danger" @click="clearModalPgn">Wyczyść</b-button>
                </div>
            </b-modal>
        </div>
    </div>
</template>

<script>
    export default {
        components: {
        },
        name: "GasConnectionCalendarEntry",
        props: {

            msg: String,
            taskNo: String,
            address: String,
            cabinet: String,
            mailStatusCustomer: String,
            mailStatusSurveyor: String,
            mailStatusPgn: String,
            mailCustomerDate: String,
            // isSurveyorMailSend: Boolean,
            mailSurveyorDate: String,
            mailPgnDate: String,
            isPgn: Boolean,
            tempDate: String,
            tempInfo: String
        },
        methods:{
            checkCustomer(){
                let isMail=false;
                if(this.mailStatusCustomer === "SENT"){
                    isMail=true;
                }
                return isMail;
            },
            checkSurveyor(){
                let isMail=false;
                if(this.mailStatusSurveyor === "SENT"){
                    isMail=true;
                }
                return isMail;
            },
            checkPgn(){
                let isMail=false;
                if(this.mailStatusPgn === "SENT"){
                    isMail=true;
                }
                return isMail;
            },
            //CUSTOMER
            resetIfNullCustomer() {
                this.tempDate = this.mailCustomerDate
                // this.nameState = null
            },
            assignValueCustomer() {
                this.mailCustomerDate = this.tempDate
                this.tempDate != '' ? this.mailStatusCustomer = "SENT" :  this.mailStatusCustomer = ''
                //TODO zapis do bazy
            },
            clearModalCustomer() {
                this.tempDate = ''
            },
            //INFO MODAL
            copyToInfo() {
                this.tempInfo = this.msg
            },
            assignValueInfo() {
                this.msg = this.tempInfo
                //TODO zapis do bazy
            },
            //SURVEYOR
            resetIfNullSurveyor() {
                this.tempDate = this.mailSurveyorDate
            },
            assignValueSurveyor() {
                this.mailSurveyorDate = this.tempDate
                this.tempDate != '' ? this.mailStatusSurveyor = "SENT" :  this.mailStatusSurveyor = ''
                //TODO zapis do bazy
            },
            clearModalSurveyor() {
                this.tempDate = ''
            },
            //PGN
            resetIfNullPgn() {
                this.tempDate = this.mailPgnDate
            },
            assignValuePgn() {
                this.mailPgnDate = this.tempDate
                this.tempDate != '' ? this.mailStatusPgn = "SENT" :  this.mailStatusPgn = ''
                //TODO zapis do bazy
            },
            clearModalPgn() {
                this.tempDate = ''
            }
        }
    }
</script>

<style scoped>
    .notification{
        padding: 8px 5px 1px;
        text-align: left;
        display: flex;
        flex-direction: row;
        /*align-self: flex-end;*/
        justify-content: space-between;
        margin-bottom: 5px;
        ;
    }
#container{
    /*border: black 2px solid;*/
    /*border-radius: 10px;*/
    padding-bottom: 10px;
    margin-bottom: 10px;
    background-color: rgba(97,93,92,0.8);
    color: rgba(255,245,0,0.8);

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

    .modalWindow{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 10px;
        /*align-content: center;*/
    }
</style>