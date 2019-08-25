import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AirConditionerService } from '../../services/air-conditioner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-air-conditioner',
  templateUrl: './edit-air-conditioner.component.html',
  styleUrls: ['./edit-air-conditioner.component.css']
})
export class EditAirConditionerComponent implements OnInit {
  editACForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _AirConditionerService: AirConditionerService,
    private _Router: Router,
  ) {
    // Creating the form and validation
    this.editACForm = this.formBuilder.group({
      did: [null, Validators.required],
      roomTemperature: [null, Validators],
      power: [null, Validators],
      age: [null, [Validators, Validators.max(110), Validators.min(1),Validators.pattern(/^\d+$/)]],
      comfortableTemperature: [null, [Validators, Validators.max(29), Validators.min(14),Validators.pattern(/^\d+$/)]],
      noOfPersons: [null, Validators],
    });
  }

  ngOnInit() {

    // Get the query parameters from the url
    this.activatedRoute.queryParams.subscribe(params => {
      // Get main valve's details
      this._AirConditionerService
        .getAirConditionerByDid({ did: params.mainValveId })
        .subscribe(data => {
          this.editACForm.patchValue({
            did: data.data.did,
            roomTemperature: data.data.roomTemperature ? data.data.roomTemperature : 'No Values Yet',
            power: data.data.power,
            age: data.data.age,
            comfortableTemperature: data.data.comfortableTemperature,
            noOfPersons: data.data.noOfPersons ? data.data.noOfPersons : 0,
          });

        }, valveByIdErr => {
          Swal('Oops!', valveByIdErr.msg, 'error');
        });
    });
  }

  /**
   * update main valve
   */
  updateAC() {
    Swal({
      title: 'Are you sure?',
      text: 'This action will update the current record!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Update'
    }).then(confirm => {
      if (confirm.value) {
        !this.editACForm.value.comfortableTemperature
          ? this.editACForm.value.comfortableTemperature = 0
          : this.editACForm.value.comfortableTemperature;
        this._AirConditionerService.updateAirConditioner(this.editACForm.value)
          .subscribe(data => {
            Swal(
              'Success!',
              `Air conditioner has been updated`,
              'success'
            );
            this._Router.navigateByUrl('home/air-conditioners');
          }, err => {
            Swal('Oops!', err.msg, 'error');
          })
      }
    })
  }

}
