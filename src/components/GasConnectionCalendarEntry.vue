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
            <b-form-textarea  class="form-control" rows="3" v-bind:value="msg" readonly></b-form-textarea>
        </div>
        <div>
            <b-button v-b-toggle.collapse-3 class="m-1">...</b-button>
            <b-collapse visible id="collapse-3">
                <b-card no-body style="color: black; padding: .30rem" >
                        Powiadomienia:
                    <div  v-b-modal="'customer'+taskNo" id="customer" class="notification " :style="checkCustomer() ? {'background-color':'green'} :{'background-color':'red'} ">
                        <h6>Klient: </h6><h6>{{mailCustomerDate}}</h6>
                    </div>


<!--                    <div  v-b-modal.my-modal id="customer" class="notification " :style="checkCustomer() ? {'background-color':'green'} :{'background-color':'red'} ">-->
<!--                        <h6>Klient: </h6><h6>2015-04-15</h6>-->
<!--                    </div>-->



                    <div id="surveyor" class="notification " :style="checkSurveyor() ? {'background-color':'green'} :{'background-color':'red'} ">
                        <h6>Geodeda: </h6><h6>2015-04-19</h6>
                    </div>
                    <div v-if="isPgn" id="pgn" class="notification " :style="checkPgn() ? {'background-color':'green'} :{'background-color':'red'} ">
                        <h6>PGN: </h6><h6>2015-04-19</h6>
                    </div>
                </b-card>
            </b-collapse>


            <!-- The modal -->
            <b-modal :id="'customer'+taskNo" centered title="Powiadomienie klienta"
            @show="resetIfNullCustomer"
            @ok="assignValueCustomer">
                <p class="my-4">Wybierz datę powiadomienia klienta: Nr zadania: {{taskNo}}</p>
                <div>
                    <b-calendar v-model="tempDate"  locale="pl" block></b-calendar>
                </div>
                <div id="modalWindow">
                    <b-button variant="danger" @click="clearModalCustomer">Wyczyść</b-button>
                </div>
            </b-modal>
            <user-modal title="User Modal" text="Testing Bootstrap Modal" />
        </div>
    </div>
</template>

<script>
    import UserModal from "@/components/UserModal";
    export default {
        components: {
            UserModal
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
            tempDate: String
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
            resetIfNullCustomer() {
                this.tempDate = this.mailCustomerDate
                // this.nameState = null
            },
            assignValueCustomer() {
                this.mailCustomerDate = this.tempDate
                this.tempDate != '' ? this.mailStatusCustomer = "SENT" :  this.mailStatusCustomer = ''
            },
            clearModalCustomer() {
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

    #modalWindow{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 10px;
        /*align-content: center;*/
    }
</style>