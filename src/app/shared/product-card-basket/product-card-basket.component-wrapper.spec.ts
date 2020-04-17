import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Component, ViewChild } from '@angular/core';

import { ValidateStockDirective } from './validate-stock.directive';
import {
  ProductCardBasketComponent,
  ItemUpdated
} from './product-card-basket.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: `test-wrapper-component`,
  template: `
    <app-product-card-basket
      [img]="image"
      [stock]="stock"
      [name]="name"
      [numItems]="numItems"
      [price]="price"
      [description]="productDescription"
      [favorite]="favorite"
      [disable]="disable"
      (numItemsUpdated)="updatedNumItems($event)"
    ></app-product-card-basket>
  `
})
export class TestWrapperComponent {
  @ViewChild(
    ProductCardBasketComponent
  ) /* using viewChild we get access to the TestComponent which is a child of TestHostComponent */
  public testComponent: any;

  image = 'http://dummy.com/invented.jpg';
  stock = 5;
  name = 'Curry rice';
  numItems = '1';
  price = 120;
  productDescription = 'Tasty';
  favorite = false;
  disable = false;

  resultUpdatedItems: ItemUpdated = null;

  updatedNumItems(item: ItemUpdated): void {
    this.resultUpdatedItems = Object.assign({}, item);
  }
}

describe('ProductCardBasketComponent with test wrapper component', () => {
  // Component
  let component: TestWrapperComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;

  // HTML elements for component
  let cardDebug: DebugElement;
  let img: DebugElement;
  let imgHtml: HTMLImageElement;
  let name: DebugElement;
  let nameHtml: HTMLElement;
  let price: DebugElement;
  let priceHtml: HTMLElement;
  let minus: DebugElement;
  let minusHtml: HTMLButtonElement;
  let plus: DebugElement;
  let plusHtml: HTMLButtonElement;
  let stock: DebugElement;
  let stockHtml: HTMLElement;
  let left: DebugElement;
  let leftHtml: HTMLElement;
  let input: DebugElement;
  let inputHtml: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductCardBasketComponent,
        ValidateStockDirective,
        TestWrapperComponent
      ],
      imports: [FormsModule, ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(TestWrapperComponent);
    component = fixture.componentInstance;
  });

  it('loads info correctly for a product', () => {
    fixture.detectChanges();
    initDomVars();
    expect(imgHtml.src).toEqual('http://dummy.com/invented.jpg');
    expect(nameHtml.textContent).toMatch('Curry rice');
    expect(priceHtml.textContent).toMatch('120');
    expect(stockHtml.textContent).toMatch('5');
    expect(leftHtml.textContent).toMatch('4');
    expect(inputHtml.value).toEqual('1');
  });

  it('increment and decrement counter when "-" and "+" buttons are pressed and update left items', () => {
    component.numItems = '1';
    fixture.detectChanges();
    initDomVars();

    expect(leftHtml.textContent).toMatch('4');
    expect(inputHtml.value).toBe('1');

    plus.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.resultUpdatedItems.error).toBeFalsy();
    expect(component.resultUpdatedItems.val).toBe(2);
    expect(inputHtml.value).toBe('2');
    expect(leftHtml.textContent).toMatch('3');

    plus.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.resultUpdatedItems.error).toBeFalsy();
    expect(component.resultUpdatedItems.val).toBe(3);
    expect(leftHtml.textContent).toMatch('2');
    expect(inputHtml.value).toBe('3');

    minus.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.resultUpdatedItems.error).toBeFalsy();
    expect(component.resultUpdatedItems.val).toBe(2);
    expect(leftHtml.textContent).toMatch('3');
    expect(inputHtml.value).toBe('2');

    minus.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.resultUpdatedItems.error).toBeFalsy();
    expect(component.resultUpdatedItems.val).toBe(1);
    expect(leftHtml.textContent).toMatch('4');
    expect(inputHtml.value).toBe('1');
  });

  it('should raise numItemsUpdated event when items are updated correctly', () => {
    component.numItems = '4';
    fixture.detectChanges();
    initDomVars();

    plus.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.resultUpdatedItems.error).toBeFalsy();
    expect(component.resultUpdatedItems.val).toBe(5);
  });

  it('should raise numItemsUpdated event when items are updated incorrectly (no integer)', () => {
    fixture.detectChanges();
    initDomVars();

    const valueError = 'potatoe';
    inputHtml.value = valueError;
    input.triggerEventHandler('change', { target: { value: valueError } });
    fixture.detectChanges();
    expect(component.resultUpdatedItems.val).toBe(null);
    expect(component.resultUpdatedItems.error).toBeTruthy();
  });

  it('should raise numItemsUpdated event when items are updated incorrectly (integer out of range, <0 || >stock)', () => {
    fixture.detectChanges();
    initDomVars();

    let valueError = '100';
    inputHtml.value = valueError;
    input.triggerEventHandler('change', { target: { value: valueError } });
    fixture.detectChanges();

    expect(component.resultUpdatedItems.val).toBe(100);
    expect(component.resultUpdatedItems.error).toBeTruthy();

    valueError = '-2';
    inputHtml.value = valueError;
    input.triggerEventHandler('change', { target: { value: valueError } });
    fixture.detectChanges();

    expect(component.resultUpdatedItems.val).toBe(-2);
    expect(component.resultUpdatedItems.error).toBeTruthy();
  });

  it('should enable/disable input depending on disable @Input', () => {
    fixture.detectChanges();
    initDomVars();
    expect(inputHtml.disabled).toBeFalsy();
    component.disable = true;
    fixture.detectChanges();
    expect(inputHtml.disabled).toBeTruthy();
    component.disable = false;
    fixture.detectChanges();
    expect(inputHtml.disabled).toBeFalsy();
  });

  it('should show stock for the product depeding on the stock @Input', () => {
    component.stock = 6;
    fixture.detectChanges();
    initDomVars();
    expect(stockHtml.textContent).toMatch('6');
    component.stock = 10;
    fixture.detectChanges();
    expect(stockHtml.textContent).toMatch('10');
  });

  it('should update stock left depending on numItems', () => {
    component.stock = 6;
    component.numItems = '1';
    fixture.detectChanges();
    initDomVars();
    expect(leftHtml.textContent).toMatch('5');

    component.numItems = '4';
    fixture.detectChanges();
    expect(leftHtml.textContent).toMatch('2');

    plus.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(leftHtml.textContent).toMatch('1');

    minus.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(leftHtml.textContent).toMatch('2');

    component.numItems = '100';
    fixture.detectChanges();
    expect(leftHtml.textContent).toMatch('0');

    component.numItems = '-4';
    fixture.detectChanges();
    expect(leftHtml.textContent).toMatch('6');
  });

  ///////////////////////////////////////////////////////////////////////////

  function initDomVars() {
    cardDebug = fixture.debugElement;

    img = cardDebug.query(By.css('img'));
    imgHtml = img?.nativeElement;

    name = cardDebug.query(By.css('.test-name'));
    nameHtml = name?.nativeElement;

    price = cardDebug.query(By.css('.test-price'));
    priceHtml = price?.nativeElement;

    stock = cardDebug.query(By.css('.test-stock'));
    stockHtml = stock?.nativeElement;

    left = cardDebug.query(By.css('.test-left'));
    leftHtml = left?.nativeElement;

    minus = cardDebug.query(By.css('button:first-child'));
    minusHtml = minus?.nativeElement;

    plus = cardDebug.query(By.css('button:last-child'));
    plusHtml = plus?.nativeElement;

    input = cardDebug.query(By.css('input'));
    inputHtml = input?.nativeElement;
  }
});
