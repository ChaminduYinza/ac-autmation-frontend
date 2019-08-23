import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

// socket
import * as io from 'socket.io-client';

// import env
import { environment } from '../../../environments/environment';

// import services
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;
  loggedIn: boolean;
  loggedInUserName: any;
  backEndDate: any;
  socket: any;
  connectionStatus: Boolean = false;

  serverTimerSubs: Subscription;

  constructor(
    private element: ElementRef,
    private router: Router,
    private loginService: LoginService
  ) {
    this.sidebarVisible = false;

    this.loggedInUserName = this.loginService.getLoggedInUser();

    // Set the currently logged in user
    if (this.loggedInUserName) {
      this.loggedIn = true;
    }

    // create socket
    this.socket = io(environment.socketUrl);
  }

  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.router.events.subscribe(event => {
      this.sidebarClose();
      var $layer: any = document.getElementsByClassName('close-layer')[0];
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
    });


    // // server date time getting from socket
    // this.serverTimerSubs = this._SocketService
    //   .accessServerDate()
    //   .subscribe(data => {
    //     const date = new Date(data.toString());
    //     this.backEndDate = `${
    //       date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    //       } : ${
    //       date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    //       } : ${
    //       date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    //       }`;

    //     (<HTMLInputElement>document.getElementById('connection')).innerHTML =
    //       'CONNECTED';
    //   });

    // this.connectionStatus = true;

    // // check socket is disconnected
    // this.socket.on('disconnect', function () {
    //   (<HTMLInputElement>document.getElementById('connection')).innerHTML =
    //     'DISCONNECTED';
    //   this.connectionStatus = false;
    // });
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);

    body.classList.add('nav-open');

    this.sidebarVisible = true;
  }

  sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    body.classList.remove('nav-open');
  }

  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    const $toggle = document.getElementsByClassName('navbar-toggler')[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const body = document.getElementsByTagName('body')[0];

    if (this.mobile_menu_visible == 1) {
      // $('html').removeClass('nav-open');
      body.classList.remove('nav-open');
      if ($layer) {
        $layer.remove();
      }
      setTimeout(function () {
        $toggle.classList.remove('toggled');
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function () {
        $toggle.classList.add('toggled');
      }, 430);

      var $layer = document.createElement('div');
      $layer.setAttribute('class', 'close-layer');

      if (body.querySelectorAll('.main-panel')) {
        document.getElementsByClassName('main-panel')[0].appendChild($layer);
      } else if (body.classList.contains('off-canvas-sidebar')) {
        document
          .getElementsByClassName('wrapper-full-page')[0]
          .appendChild($layer);
      }

      setTimeout(function () {
        $layer.classList.add('visible');
      }, 100);

      $layer.onclick = function () {
        //asign a function
        body.classList.remove('nav-open');
        this.mobile_menu_visible = 0;
        $layer.classList.remove('visible');
        setTimeout(function () {
          $layer.remove();
          $toggle.classList.remove('toggled');
        }, 400);
      }.bind(this);

      body.classList.add('nav-open');
      this.mobile_menu_visible = 1;
    }
  }

  // Logout user
  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  ngOnDestroy(): void {
    if (this.serverTimerSubs !== undefined && this.serverTimerSubs !== null) {
      this.serverTimerSubs.unsubscribe();
    }
  }
}
