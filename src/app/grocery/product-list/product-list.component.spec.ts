import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Product } from '../models/product';
import { GroceryService } from '../grocery.service';
import { NotifyService } from '../../shared/notify.service';
import { ProductListComponent } from './product-list.component';
describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  beforeEach(() => {
    const productStub = () => ({ favorite: {}, id: {} });
    const groceryServiceStub = () => ({
      updateProduct: (id, params) => ({ subscribe: f => f({}) })
    });
    const notifyServiceStub = () => ({ notify: string => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ProductListComponent],
      providers: [
        // { provide: Product, useFactory: productStub },
        { provide: GroceryService, useFactory: groceryServiceStub },
        { provide: NotifyService, useFactory: notifyServiceStub }
      ]
    });
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
