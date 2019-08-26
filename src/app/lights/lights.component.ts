import { Component, OnInit, OnDestroy } from '@angular/core';
import { LightsService } from '../services/lights.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { interval } from 'rxjs'
import { Subscription } from 'rxjs'


@Component({
  selector: 'app-lights',
  templateUrl: './lights.component.html',
  styleUrls: ['./lights.component.css']
})
export class LightsComponent implements OnInit, OnDestroy {
  lights: any;
  intervalSub: Subscription;

  constructor(
    private _LightsService: LightsService,
    private _Router: Router
  ) { }

  ngOnInit() {
    this.intervalSub = interval(1000)
      .subscribe((val) => {
        this._LightsService.getLights().subscribe(data => {
          this.lights = data.data
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
      text: `Do you want to turn ${status ? 'open' : 'off'} light?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ok'
    }).then(confirm => {
      if (confirm.value) {
        this._LightsService.updateLight(requestBody).subscribe(
          response => {
            Swal(
              'Success!',
              `Light has successfully turned ${status ? 'on' : 'off'}`,
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
   * redirect to edit light  page
   * @param light light  details
   */
  editMainValve(light) {
    this._Router.navigate(['home/edit-light'], {
      queryParams: { mainValveId: light.did }
    });
  }

  mathRandom() {
    return Math.random() * (100 - 1);
  }

}
