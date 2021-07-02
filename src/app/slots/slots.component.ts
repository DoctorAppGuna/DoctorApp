import { Component, OnInit } from '@angular/core';
import { AppService } from '../service/app.service';
import { NgxNotificationService } from 'ngx-notification';

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.scss']
})
export class SlotsComponent implements OnInit {
  selectedDate: any;
  mrgItems: any;
  eveItems: any;
  display: any;
  data: any = {};
  timeEntries: any;
  timeLap = false;
  minTime = "";
  maxTime = "";
  alert = "";
  constructor(
    private appservice: AppService,
    private alerts: NgxNotificationService
  ) { }

  ngOnInit(): void {
    this.getSlots();
  }
  onSelect(event: any) {
    let self = this;
    this.selectedDate = event;

  }
  getAllSlots() {
    let self = this;
    this.appservice.getAllSlots(this.selectedDate, (response: any) => {
      if (response.resCode == 200) {
        let items = response.data;
        self.mrgItems = items.filter((dep: any) => dep.type == "morning");
        self.eveItems = items.filter((dep: any) => dep.type == "evening");
      }

    })
  }
  openModal(data: any) {
    this.data.to = "";
    this.data.from = "";
    this.alert = "";
    if (data == "mor") {
      this.minTime = "09:00 am";
      this.maxTime = "12:00 pm";
      this.data.type = "morning";
    }
    else {
      this.minTime = "05:00 pm";
      this.maxTime = "09:00 pm";
      this.data.type = "evening";
    }
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
    this.data = {};
  }

  save() {
    var self = this;
    let diff = this.timeDiff();
    if (!this.selectedDate)
      this.alert = "Please pick the date first."
    else if (diff != 30) {
      this.alert = "Should be 30 mins.";
    } else {
      let i = 0;
      let timeIntervals = this.timeEntries.filter((entry: any) => entry.from != null && entry.to != null && new Date(entry.date).setHours(0, 0, 0, 0) == new Date(this.selectedDate).setHours(0, 0, 0, 0));
      if (timeIntervals.length > 0)
        for (i = 0; i < timeIntervals.length; i++) {
          if (
            this.dateRangeOverlaps(
              new Date(new Date().toISOString().slice(0, 10) + " " + timeIntervals[i].from).getTime(), new Date(new Date().toISOString().slice(0, 10) + " " + timeIntervals[i].to).getTime(),
              new Date(new Date().toISOString().slice(0, 10) + " " + this.data.from).getTime(), new Date(new Date().toISOString().slice(0, 10) + " " + this.data.to).getTime()
            )
          ) this.timeLap = true;
        }
      if (this.timeLap == false) {
        this.data.date = this.selectedDate;
        this.data.slotNo = this.timeEntries.length + 1;
        this.appservice.addSlot(this.data, (response: any) => {
          if (response.resCode == 200) {
            self.alerts.sendMessage("Slot Created..", "success", "center");
            self.data = {};
            self.display = "none";
            self.getSlots();
          }
          else {
            console.log("error");
            self.data = {};
          }
        })
      } else {
        this.alert = "Given slot is already exists"
        this.timeLap = false;
      }
    }
  }
  getSlots() {
    let self = this;
    this.appservice.getSlot((response: any) => {
      if (response.resCode == 200) {
        self.timeEntries = response.data;
      }
      else
        console.log("error");
    })
  }

  timeDiff() {
    var startTime = new Date(new Date().toISOString().slice(0, 10) + " " + this.data.from);
    var endTime = new Date(new Date().toISOString().slice(0, 10) + " " + this.data.to);
    var difference = endTime.getTime() - startTime.getTime();
    var resultInMinutes = Math.round(difference / 60000);
    return resultInMinutes;
  }

  dateRangeOverlaps(a_start: any, a_end: any, b_start: any, b_end: any) {
    if (a_start <= b_start && b_start <= a_end) return true;
    if (a_start <= b_end && b_end <= a_end) return true;
    if (b_start < a_start && a_end < b_end) return true;
    return false;
  }
}
