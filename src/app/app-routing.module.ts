import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SidebarComponent } from './init/sidebar/sidebar.component';
import { DashboardComponent } from './init/dashboard/dashboard.component';
import { LoginComponent } from './init/login/login.component';
import { AuthGuardService } from './services/guards/auth-guard.service';
import { AirConditionerComponent } from './air-conditioner/air-conditioner.component';
import { EditAirConditionerComponent } from './air-conditioner/edit-air-conditioner/edit-air-conditioner.component';
import { LightsComponent } from './lights/lights.component';
import { EditLightComponent } from './lights/edit-light/edit-light.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: SidebarComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'air-conditioners',
        component: AirConditionerComponent
      },
      {
        path: 'edit-air-conditioner',
        component: EditAirConditionerComponent
      },
      {
        path: 'lights',
        component: LightsComponent
      },
      {
        path: 'edit-light',
        component: EditLightComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
