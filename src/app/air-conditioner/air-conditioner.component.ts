import { Component, OnInit, OnDestroy } from '@angular/core';
import { AirConditionerService } from '../services/air-conditioner.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { interval } from 'rxjs'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-air-conditioner',
  templateUrl: './air-conditioner.component.html',
  styleUrls: ['./air-conditioner.component.css']
})
export class AirConditionerComponent implements OnInit, OnDestroy {
  airConditioners: any;
  intervalSub: Subscription;
  constructor(
    private _AirConditionerService: AirConditionerService,
    private _Router: Router
  ) { }

  ngOnInit() {
    this.intervalSub = interval(1000)
      .subscribe((val) => {
        this._AirConditionerService.getAirConditioners().subscribe(data => {
          this.airConditioners = data.data
        });
      });
  }

  ngOnDestroy() {
    if (this.intervalSub !== undefined && this.intervalSub !== null) {
      this.intervalSub.unsubscribe();
    }
  }

  /**
   * toggle power status of ac
   * @param valveID ac id
   * @param status power status
   */
  power(did, status) {
    const requestBody = {
      did: did,
      power: status
    };
    Swal({
      title: 'Are you sure?',
      text: `Do you want to turn ${status ? 'open' : 'off'} air conditioner?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ok'
    }).then(confirm => {
      if (confirm.value) {
        this._AirConditionerService.updateAirConditioner(requestBody).subscribe(
          response => {
            Swal(
              'Success!',
              `Air conditioner has successfully turned ${status ? 'on' : 'off'}`,
              'success'
            );
            this.ngOnInit();
          },
          error => {
            Swal('Oops!', error.data, 'error');
            this.ngOnInit();
          }
        );
      }
    });
  }

  /**
   * redirect to edit ac  page
   * @param ac ac  details
   */
  editMainValve(ac) {
    this._Router.navigate(['home/edit-air-conditioner'], {
      queryParams: { mainValveId: ac.did }
    });
  }

  convertToArray(count) {
    return Array(count).fill(0).map((x, i) => i);
  }

}
