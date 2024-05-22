import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { environment } from 'src/environments/environment';
import { ProductCardComponent } from './product-card/product-card.component';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [SharedModule, ProductCardComponent],
  templateUrl: './all-products.component.html',
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AllProductsComponent implements OnInit {
  contents!: any[];
  pageLength: number = 9;
  assetPath = `${environment.assestsBasePath}images/Homepage`;
  selectedImage: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const productDetails = this.activatedRoute.snapshot.data['productDetails'];
    this.contents = Array(10).fill(productDetails.products).flat();
  }

  checkProduct(productId: any) {
    this.router.navigate(['pages/product/' + productId]);
  }

  get getNumberOfPages(): number {
    if (this.contents.length > 0) {
      return Math.round(this.contents.length / this.pageLength);
    }
    return 0;
  }
}
