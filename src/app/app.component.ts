import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'POC';
  constructor(private router: Router) {

  }
  @HostListener('window:beforeunload') goToPage() {
    localStorage.clear();
    // this.router.navigate(['/pages/dashboard']);
  }
}
