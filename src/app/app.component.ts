import { Component, OnInit } from '@angular/core';

import { AuthService } from './user/auth.service';
import {
  Router, Event, NavigationStart,
  NavigationEnd, NavigationError, NavigationCancel, ResolveStart, ResolveEnd
} from '@angular/router';


@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public shouldSpin: boolean | null = true;
  pageTitle = 'Acme Product Management';

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      this.checkRouterEvent(event);
    });

  }

  private checkRouterEvent(e: Event) {
    if (e instanceof NavigationStart || e instanceof ResolveStart) {
      this.shouldSpin = true;
    }
    if (e instanceof NavigationEnd || e instanceof ResolveEnd) {
      this.shouldSpin = false;
    } else if (e instanceof NavigationCancel || e instanceof NavigationError) {
      this.shouldSpin = false;
    }
  }

  logOut(): void {
    this.authService.logout();
    console.log('Log out');
    this.router.navigate(['/home']);
  }
}
