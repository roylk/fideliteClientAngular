import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { AuthGuardGuard } from '../../fidelite/utilitaires/auth-guard.guard';
import { LoginService } from '../../fidelite/utilitaires/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  constructor(private router : Router, private authService :AuthGuardGuard, private loginService: LoginService, @Inject(DOCUMENT) _document?: any  ) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  logout() {
    this.authService.logout();
    //this.router.navigate(['/login']);
}

  ngOnDestroy(): void {
    this.changes.disconnect(); 
  }
}
