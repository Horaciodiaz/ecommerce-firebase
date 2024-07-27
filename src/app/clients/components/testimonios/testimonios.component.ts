import { Component, Renderer2 } from '@angular/core';
import { retry } from 'rxjs';
import { TestimonialService } from 'src/app/services/testimonial.service';
import { Testimonial } from '../../interfaces/testimonials.interface';

@Component({
  selector: 'app-testimonios',
  templateUrl: './testimonios.component.html',
  styleUrls: ['./testimonios.component.css']
})
export class TestimoniosComponent {
  testimonios: Testimonial[] = [];
  constructor(private renderer: Renderer2, private testimonalService: TestimonialService) {}

  ngOnInit() {
    this.testimonalService.getTestimonials();
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize.bind(this));
    this.getTestimonios();
  }

  getTestimonios() {
    this.testimonalService.getTestimonials().subscribe(testimonios => {
      this.testimonios = testimonios.sort((a: Testimonial, b:Testimonial) => {
        if (a.nombre < b.nombre) {
          return -1;
        }
        if (a.nombre > b.nombre) {
          return 1;
        }
        return 0;
      });
    })

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
