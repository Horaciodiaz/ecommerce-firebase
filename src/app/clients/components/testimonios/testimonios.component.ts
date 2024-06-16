import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-testimonios',
  templateUrl: './testimonios.component.html',
  styleUrls: ['./testimonios.component.css']
})
export class TestimoniosComponent {
  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.checkScreenSize.bind(this));
  }

  checkScreenSize() {
    const element = document.getElementById('testimonials');
    if (window.innerWidth <= 480) {
      this.renderer.addClass(element, 'snap-section');
    } else {
      this.renderer.removeClass(element, 'snap-section');
    }
  }
}
