import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxNotificationService } from 'ngx-notification';
import { AppService } from '../service/app.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  apps: any;
  aptDate: any;
  constructor(
    private appservice: AppService,
    private alerts: NgxNotificationService
  ) { }

  ngOnInit(): void {
  }
  getAppointments() {
    var self = this;
    this.appservice.getAppointments(this.aptDate, (response: any) => {
      if (response.resCode == 200) {
        self.apps = response.data;
      }
      else if (response.data == undefined)
        self.alerts.sendMessage("Data not exist", "danger", "center");
      else self.alerts.sendMessage("something went wrong", "danger", "center");
    })
  }
}
