import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginComponent } from 'src/app/pages/components/login/login.component';
import { environment } from 'src/environments/environment';
import { MatDialogService } from '../../services/mat-dialog.service';
import { WebService } from '../../services/web.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    RouterLinkActive,
    LoginComponent,
    MatDialogModule,
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuItem,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isMenuVisible: boolean = false;
  isVerticalScroll: boolean = false;
  isUserLoggedIn: boolean = false;
  logo = `${environment.assestsBasePath}/images/Move_Stone_logo.png`;

  constructor(
    private router: Router,
    private webService: WebService,
    private viewportScroller: ViewportScroller,
    private matDialogService: MatDialogService
  ) {}

  ngOnInit(): void {
    this.isUserLoggedIn = this.webService.isUserAuthenticated;

    if (window.scrollY > 0) {
      this.isVerticalScroll = true;
    } else {
      this.isVerticalScroll = false;
    }

    window.onscroll = () => {
      if (window.scrollY > 0) {
        this.isVerticalScroll = true;
      } else {
        this.isVerticalScroll = false;
      }
    };
  }

  onMenuBtnClick() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  selectNavOptions() {
    this.isMenuVisible = false;
  }

  onLoginBtnClick() {
    if (!this.isUserLoggedIn) {
      this.matDialogService
        .openDialog({}, LoginComponent)
        .afterClosed()
        .subscribe((data) => {
          if (data) {
            if (!data.hasError) {
              this.isUserLoggedIn = this.webService.isUserAuthenticated;
              this.router.navigate(['pages/queries']);
            } else
              this.matDialogService.openDialog({
                data: {
                  title: 'Error',
                  message: data.extendedMessage,
                  buttons: ['Ok'],
                },
              } as MatDialogConfig);
          }
        });
    }
  }

  get getUserName(): string {
    return this.webService.getUserName;
  }

  onClickAnchor(elementId: string) {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  logout() {
    this.webService.removeAuthentication();
    this.isUserLoggedIn = this.webService.isUserAuthenticated;
    this.router.navigate(['pages/home']);
  }

  navigateToQuery(): void {
    this.router.navigate(['pages/queries']);
  }
}
