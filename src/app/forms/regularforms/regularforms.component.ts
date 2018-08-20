import { Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { forEach } from '@angular/router/src/utils/collection';




declare var $: any;

@Component({
    selector: 'app-regularforms-cmp',
    templateUrl: 'regularforms.component.html'
    
})

export class RegularFormsComponent implements OnInit {

    sectionID="";
    rcomRequest="";
    emailCode="";

    startDate;
    endDate;
    eventType;
    OTFisActive = false;
    OTRisActive = false;
    

    ngOnInit() {}

    constructor(private http:Http) { 

    } 

    changeActionURL(){
        window.open("https://event-validator.dynamicyield.com/query/"+this.sectionID, "_blank");
    } 
    
    rcomLog(){
        var rcomResponse = document.getElementById('rcomResponse');
        var http = new XMLHttpRequest();
        var url = "http://rcom.dynamicyield.com/recommend?debug=true";
        var params = JSON.parse(this.rcomRequest);
        http.open("POST", url, true);
        http.onreadystatechange = () => {
            if (http.readyState == 4 && http.status == 200) {
                rcomResponse.innerHTML = "The request was sent, check the logs" + '<a href="https://logstash-test1.use.dynamicyield.com:15601/?#/dashboard/Rcom-Server-Prod" target="_blank" style="color: blue;font-weight: 500;"> here</a>';
            }
        }
        http.send(JSON.stringify(params));
    }

    emailRender(){
        document.getElementById("email").innerHTML = this.emailCode;
        
    }


     extractEvents(){
        var http = new XMLHttpRequest();
        var url = "http://spark-ondemand.dynamicyield.com:7200/rawdata";
        var startDate = JSON.parse(this.startDate);
        var endDate = JSON.parse(this.endDate);
        var eventSection = JSON.parse(JSON.stringify(this.sectionID));
    
        var eventType1 = JSON.parse(JSON.stringify(this.eventType));
        var eventResponse = document.getElementById('eventresponse');
        var params;
        if (this.OTFisActive && !this.OTRisActive){
            params = { "startDate": this.startDate, "endDate": this.endDate, "sectionId": eventSection, "eventType": eventType1, "outputToFile": "true", "outputToResponse": "false"};
        } else if (this.OTRisActive && !this.OTFisActive) {
            params = { "startDate": this.startDate, "endDate": this.endDate, "sectionId": eventSection, "eventType": eventType1, "outputToFile": "false", "outputToResponse": "true" };
        } else{
            params = { "startDate": this.startDate, "endDate": this.endDate, "sectionId": eventSection, "eventType": eventType1, "outputToFile": "true", "outputToResponse": "true" };
        }
        
    //     var eventResponse = document.getElementById('eventresponse');
    //     var params = { "startDate": startDate1, "endDate": endDate1, "sectionId": eventSection1, "eventId": "142275", "eventType": "DPX" };
    
    
        http.open("POST", url, true);
        http.setRequestHeader("Content-type", "application/json");
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                eventResponse.innerHTML = http.responseText;
            }
            else { eventResponse.innerHTML = 'Error' + http.status }
        }
        http.send(JSON.stringify(params));
    }

    
}
