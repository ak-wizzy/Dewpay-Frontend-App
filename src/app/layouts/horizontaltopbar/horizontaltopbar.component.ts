import { Component, OnInit, AfterViewInit, Inject, OnChanges, SimpleChanges } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { LanguageService } from "../../core/services/language.service";

import { EventService } from "../../core/services/event.service";
import { AuthenticationService } from "../../core/services/auth.service";
import { AuthfakeauthenticationService } from "../../core/services/authfake.service";

import { DOCUMENT } from "@angular/common";

import { MenuItem } from "./menu.model";
import { AppConstants } from "src/app/core/models/app.constant";
import * as SockJS from "sockjs-client";
import { Socket } from "ngx-socket-io";
import { map } from "rxjs/operators";
import { WalletService } from "src/app/core/services/wallet.service";
import { interval } from "rxjs";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-horizontaltopbar",
  templateUrl: "./horizontaltopbar.component.html",
  styleUrls: ["./horizontaltopbar.component.scss"],
})

/**
 * Horizontal Topbar and navbar specified
 */
export class HorizontaltopbarComponent implements OnInit, AfterViewInit, OnChanges {
  element;
  cookieValue;
  flagvalue;
  countryName;
  valueset;
  walletDetail: any;

  show: boolean;

  isLoggedIn = false;
  balance;
  constructor(
    @Inject(DOCUMENT) private document: any,
    private router: Router,
    private eventService: EventService,
    private authService: AuthenticationService,
    private authFackservice: AuthfakeauthenticationService,
    // private socket: Socket,
    private walletService: WalletService,
    public languageService: LanguageService,
    // tslint:disable-next-line: variable-name
    public _cookiesService: CookieService
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activateMenu();
      }
    });

    // this.socket.fromEvent("message").pipe(
    //   map((data) => {
    //     console.log("========", data);
    //   })
    // );
    
  }
  ngOnChanges(changes: SimpleChanges): void {
   this.ngOnInit();
  }

  ngOnInit(): void {
    this.element = document.documentElement;
    const show = localStorage.getItem("show");
    this.show = show === "true" ? true : false;
    this.isLoggedIn = this.authService.isAuthenticated();
    const walletDetail = this.authService.getWalletDetails();
    if (walletDetail) {
      this.walletDetail = JSON.parse(walletDetail);
      // this.balance = walletDetail?.payoutBalance?.availableBalance;
      // this.doGetWalletDetails( environment.clientKey,
      // this.walletDetail?.walletId);
    }

  //  interval(5000).subscribe((func => {
  //     this.doGetWalletDetails(environment.clientKey,
  //     this.walletDetail?.walletId);
  //   }))
    // this.socketConnection();
  }

  showOrHide() {
    this.show = !this.show;
    localStorage.setItem("show", this.show.toString());
  }

  /**
   * Logout the user
   */
  logout() {
    localStorage.removeItem(AppConstants.sessionKey);
    localStorage.removeItem(AppConstants.tokeKey);
    localStorage.clear();
    this.router.navigate(["/account/login"]);
    location.reload();
  }

  /**
   * On menu click
   */
  onMenuClick(event) {
    const nextEl = event.target.nextElementSibling;
    if (nextEl) {
      const parentEl = event.target.parentNode;
      if (parentEl) {
        parentEl.classList.remove("show");
      }
      nextEl.classList.toggle("show");
    }
    return false;
  }

  ngAfterViewInit() {
    this.activateMenu();
  }

  /**
   * remove active and mm-active class
   */
  _removeAllClass(className) {
    const els = document.getElementsByClassName(className);
    while (els[0]) {
      els[0].classList.remove(className);
    }
  }

  /**
   * Togglemenu bar
   */
  toggleMenubar() {
    const element = document.getElementById("topnav-menu-content");
    element.classList.toggle("show");
  }

  /**
   * Activates the menu
   */
  private activateMenu() {
    const resetParent = (el: any) => {
      const parent = el.parentElement;
      if (parent) {
        parent.classList.remove("active");
        const parent2 = parent.parentElement;
        this._removeAllClass("mm-active");
        this._removeAllClass("mm-show");
        if (parent2) {
          parent2.classList.remove("active");
          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("active");
            const parent4 = parent3.parentElement;
            if (parent4) {
              parent4.classList.remove("active");
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove("active");
                const menuelement = document.getElementById(
                  "topnav-menu-content"
                );
                if (menuelement !== null) {
                  if (menuelement.classList.contains("show"))
                    document
                      .getElementById("topnav-menu-content")
                      .classList.remove("show");
                }
              }
            }
          }
        }
      }
    };

    // activate menu item based on location
    const links = document.getElementsByClassName("side-nav-link-ref");
    let matchingMenuItem = null;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < links.length; i++) {
      // reset menu
      resetParent(links[i]);
    }
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < links.length; i++) {
      // tslint:disable-next-line: no-string-literal
      if (location.pathname === links[i]["pathname"]) {
        matchingMenuItem = links[i];
        break;
      }
    }

    if (matchingMenuItem) {
      const parent = matchingMenuItem.parentElement;
      /**
       * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
       * We should come up with non hard coded approach
       */
      if (parent) {
        parent.classList.add("active");
        const parent2 = parent.parentElement;
        if (parent2) {
          parent2.classList.add("active");
          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.add("active");
            const parent4 = parent3.parentElement;
            if (parent4) {
              parent4.classList.add("active");
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.add("active");
                const parent6 = parent5.parentElement;
                if (parent6) {
                  parent6.classList.add("active");
                }
              }
            }
          }
        }
      }
    }
  }

  /**
   * on settings button clicked from topbar
   */
  onSettingsButtonClicked() {
    document.body.classList.toggle("right-bar-enabled");
  }

  /**
   * Fullscreen method
   */
  fullscreen() {
    document.body.classList.toggle("fullscreen-enable");
    if (
      !document.fullscreenElement &&
      !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement
    ) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }

  /**
   * Initialize
   */

  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }

  socketConnection() {
    var sock = new SockJS(
      `https://account-api-dev.eks-chakral.com/account-app/account-broker/balance/${this.walletDetail.walletId}`
    );
    sock.onopen = function () {
      console.log("open");
      // sock.send('test');
    };

    sock.onmessage = function (e) {
      console.log("message", e.data);
      sock.close();
    };

    sock.onclose = function () {
      console.log("close");
    };
  }

  doGetWalletDetails(merchantId, phoneNumber) {
    
    this.walletService
      .getWalletDetails(merchantId, phoneNumber)
      .subscribe((response) => {
        if (response.responseCode === "00") {
          const wallet = {
            ...response?.data,
          };
          this.authService.setWalletDetails(wallet);
          this.balance = response?.data?.payoutBalance?.availableBalance;
          console.log("Running")
        }
      });
  }


  // setConnected(connected: boolean) {
  //   this.disabled = !connected;

  //   if (connected) {
  //     this.greetings = [];
  //   }
  // }
  // stompClient
  // connect() {
  //   const socket = new SockJS('http://localhost:8080/gkz-stomp-endpoint');
  //   this.stompClient = Stomp.Stomp.over(socket);

  //   const _this = this;
  //   this.stompClient.connect({}, function (frame) {
  //     _this.setConnected(true);
  //     console.log('Connected: ' + frame);

  //     _this.stompClient.subscribe('/topic/hi', function (hello) {
  //       _this.showGreeting(JSON.parse(hello.body).greeting);
  //     });
  //   });
  // }

  // disconnect() {
  //   if (this.stompClient != null) {
  //     this.stompClient.disconnect();
  //   }

  //   this.setConnected(false);
  //   console.log('Disconnected!');
  // }
}
