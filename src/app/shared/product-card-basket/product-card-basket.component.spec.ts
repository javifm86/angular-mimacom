import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  DebugElement,
  SimpleChanges,
  SimpleChange
} from '@angular/core';

import { ValidateStockDirective } from './validate-stock.directive';
import { ProductCardBasketComponent } from './product-card-basket.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ProductCardBasketComponent', () => {
  // Component
  let component: ProductCardBasketComponent;
  let fixture: ComponentFixture<ProductCardBasketComponent>;

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
      declarations: [ProductCardBasketComponent, ValidateStockDirective],
      imports: [FormsModule, ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(ProductCardBasketComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('loads info correctly for a product', () => {
    component.img = 'http://dummy.com/invented.jpg';
    component.stock = 5;
    component.name = 'Curry rice';
    component.price = 120;
    component.numItems = '1';
    component.disable = false;

    // Manually trigger ngOnChanges
    const changesObj: SimpleChanges = {
      numItems: new SimpleChange(null, 1, false)
    };
    component.ngOnChanges(changesObj);

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
    component.img = 'http://dummy.com/invented.jpg';
    component.stock = 5;
    component.name = 'Curry rice';
    component.price = 120;
    component.numItems = '1';
    component.disable = false;

    // Manually trigger ngOnChanges
    setItemsValue(1);

    fixture.detectChanges();
    initDomVars();

    expect(leftHtml.textContent).toMatch('4');
    expect(inputHtml.value).toBe('1');
    plus.triggerEventHandler('click', null);
    setItemsValue(2);
    expect(leftHtml.textContent).toMatch('3');
    expect(inputHtml.value).toBe('2');

    plus.triggerEventHandler('click', null);
    setItemsValue(3);
    expect(leftHtml.textContent).toMatch('2');
    expect(inputHtml.value).toBe('3');

    minus.triggerEventHandler('click', null);
    setItemsValue(2);
    expect(leftHtml.textContent).toMatch('3');
    expect(inputHtml.value).toBe('2');

    minus.triggerEventHandler('click', null);
    setItemsValue(1);
    expect(leftHtml.textContent).toMatch('4');
    expect(inputHtml.value).toBe('1');
  });

  it('should raise numItemsUpdated event when items are updated correctly', () => {
    component.img = 'http://dummy.com/invented.jpg';
    component.stock = 5;
    component.name = 'Curry rice';
    component.price = 120;
    component.numItems = '1';
    component.disable = false;

    // Manually trigger ngOnChanges
    setItemsValue(1);

    fixture.detectChanges();
    initDomVars();

    let result;
    component.numItemsUpdated.subscribe(val => (result = val));
    plus.triggerEventHandler('click', null);
    expect(result.val).toBe(2);
    expect(result.error).toBeFalsy();
  });

  it('should raise numItemsUpdated event when items are updated incorrectly (no integer)', () => {
    component.img = 'http://dummy.com/invented.jpg';
    component.stock = 5;
    component.name = 'Curry rice';
    component.price = 120;
    component.numItems = '1';
    component.disable = false;

    // Manually trigger ngOnChanges
    setItemsValue(1);

    fixture.detectChanges();
    initDomVars();

    let result;
    const valueError = 'potatoe';
    component.numItemsUpdated.subscribe(val => (result = val));

    inputHtml.value = valueError;
    input.triggerEventHandler('change', { target: { value: valueError } });
    fixture.detectChanges();

    expect(result.val).toBe(null);
    expect(result.error).toBeTruthy();
  });

  it('should raise numItemsUpdated event when items are updated incorrectly (integer out of range, <0 || >stock)', () => {
    component.img = 'http://dummy.com/invented.jpg';
    component.stock = 5;
    component.name = 'Curry rice';
    component.price = 120;
    component.numItems = '1';
    component.disable = false;

    // Manually trigger ngOnChanges
    setItemsValue(1);

    fixture.detectChanges();
    initDomVars();

    let result;
    const valueError = '100';
    component.numItemsUpdated.subscribe(val => (result = val));

    inputHtml.value = valueError;
    input.triggerEventHandler('change', { target: { value: valueError } });
    fixture.detectChanges();

    expect(result.val).toBe(100);
    expect(result.error).toBeTruthy();
  });

  it('should disable input', ()=> {
    component.img = 'http://dummy.com/invented.jpg';
    component.stock = 5;
    component.name = 'Curry rice';
    component.price = 120;
    component.numItems = '1';
    component.disable = false;

    initDomVars();
    setDisabledInput(true);
    fixture.detectChanges();

    expect(inputHtml.disabled).toBeTruthy();
    setDisabledInput(false);
    expect(inputHtml.disabled).toBeFalsy();

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

  function setItemsValue(val) {
    // Manually trigger ngOnChanges
    const changesObj: SimpleChanges = {
      numItems: new SimpleChange(null, val, false)
    };
    component.ngOnChanges(changesObj);

    fixture.detectChanges();
  }

  function setDisabledInput(val: boolean) {

    component.disable = val;

    // Manually trigger ngOnChanges
    const changesObj: SimpleChanges = {
      disable: new SimpleChange(null, val, false)
    };
    component.ngOnChanges(changesObj);

    fixture.detectChanges();
  }
});
