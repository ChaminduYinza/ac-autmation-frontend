import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Animations
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

// Modules
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ColorPickerModule } from 'ngx-color-picker';
import { AppRoutingModule } from './app-routing.module';
import { BlockUIModule } from 'ng-block-ui';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ToastrModule } from 'ngx-toastr';

// Angular material modules
import {
  MatProgressBarModule,
  MatTooltipModule,
  MatChipsModule
} from '@angular/material';

// Services
import { LoginService } from './services/login.service';
import { AuthGuardService } from './services/guards/auth-guard.service';
import { ApiService } from './services/common-service/common.service';
import { JwtService } from './services/jwt/jwt-service.service';
import { LogsService } from './services/logs.service';
import { MainValvesService } from './services/main-valves.service';
import { UserRegistrationService } from './services/user-registration.service';

// angular pipes
import { MillisecondsToSecondsPipe } from './shared/angular-pipes/milliseconds-to-seconds.pipe';
import { TimeShowPipe } from './shared/angular-pipes/time-show.pipe';
import { TowerOrderInversePipe } from './shared/angular-pipes/tower-order-inverse.pipe';

// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './init/dashboard/dashboard.component';
import { LoginComponent } from './init/login/login.component';
import { SidebarComponent } from './init/sidebar/sidebar.component';
import { HeaderComponent } from './init/header/header.component';
import { UserRegistrationComponent } from './init/user-registration/user-registration.component';
import { LoaderComponent } from './loader/loader/loader.component';
import { LoaderService } from './services/common-service/loader.service';
import { LoaderInterceptor } from './loader/loader.interceptor';
import { AirConditionerComponent } from './air-conditioner/air-conditioner.component';
import { EditAirConditionerComponent } from './air-conditioner/edit-air-conditioner/edit-air-conditioner.component';
import { LightsComponent } from './lights/lights.component';
import { EditLightComponent } from './lights/edit-light/edit-light.component'
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    SidebarComponent,
    HeaderComponent,
    UserRegistrationComponent,
    TowerOrderInversePipe,
    LoaderComponent,
    AirConditionerComponent,
    EditAirConditionerComponent,
    LightsComponent,
    EditLightComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ColorPickerModule,
    MatProgressBarModule,
    MatChipsModule,
    HttpModule,
    MatTooltipModule,
    BlockUIModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [
    ApiService,
    JwtService,
    LogsService,
    LoginService,
    AuthGuardService,
    MainValvesService,
    UserRegistrationService,
    LoaderService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
