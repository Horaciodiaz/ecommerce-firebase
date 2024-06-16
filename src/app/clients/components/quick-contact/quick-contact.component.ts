import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-quick-contact',
  templateUrl: './quick-contact.component.html',
  styleUrls: ['./quick-contact.component.css']
})
export class QuickContactComponent {
  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.checkScreenSize.bind(this));
  }

  checkScreenSize() {
    const element = document.getElementById('quick-contact');
    if (window.innerWidth <= 480) {
      this.renderer.addClass(element, 'snap-section');
    } else {
      this.renderer.removeClass(element, 'snap-section');
    }
  }
}
