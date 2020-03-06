import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
  // Component
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  // HTML elements for component
  let cardDebug: DebugElement;
  let img: DebugElement;
  let imgHtml: HTMLImageElement;
  let name: DebugElement;
  let nameHtml: HTMLElement;
  let price: DebugElement;
  let priceHtml: HTMLElement;
  let description: DebugElement;
  let descriptionHtml: HTMLElement;
  let favorite: DebugElement;
  let favoriteHtml: HTMLElement;
  let add: DebugElement;
  let addHtml: HTMLButtonElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ProductCardComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
  }));

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('loads info correctly for a product in stock, no favorite and no in basket', () => {
    component.img = 'http://dummy.com/invented.jpg';
    component.stock = 40;
    component.name = 'Curry rice';
    component.price = 120;
    component.description = 'Tasty curry rice';
    component.favorite = false;
    component.inBasket = false;
    fixture.detectChanges();
    initDomVars();

    expect(imgHtml.src).toEqual('http://dummy.com/invented.jpg');
    expect(nameHtml.textContent).toMatch('Curry rice');
    expect(priceHtml.textContent).toMatch('120');
    expect(descriptionHtml.textContent).toMatch('Tasty curry rice');
    expect(favorite.classes['text-white']).toBeTruthy();

    expect(add).toBeTruthy();
    expect(addHtml.disabled).toBeFalsy();
  });

  it('loads info correctly for a product out of stock, no button add showed', () => {
    component.img = 'http://dummy.com/invented.jpg';
    component.stock = 0;
    component.name = 'Curry rice';
    component.price = 120;
    component.description = 'Tasty curry rice';
    component.favorite = false;
    component.inBasket = false;
    fixture.detectChanges();
    initDomVars();

    expect(add).toBeFalsy();
  });

  it('loads info correctly for a favorite product, svg heart icon shows red', () => {
    component.img = 'http://dummy.com/invented.jpg';
    component.stock = 2;
    component.name = 'Curry rice';
    component.price = 120;
    component.description = 'Tasty curry rice';
    component.favorite = true;
    component.inBasket = false;
    fixture.detectChanges();
    initDomVars();

    expect(favorite.classes['text-white']).toBeFalsy();
  });

  it('loads info correctly for a product added in the basket, button add is disabled', () => {
    component.img = 'http://dummy.com/invented.jpg';
    component.stock = 2;
    component.name = 'Curry rice';
    component.price = 120;
    component.description = 'Tasty curry rice';
    component.favorite = false;
    component.inBasket = true;
    fixture.detectChanges();
    initDomVars();

    expect(add).toBeTruthy();
    expect(addHtml.disabled).toBeTruthy();
  });

  it('should raise added event with true when clicked add button', () => {
    component.img = 'http://dummy.com/invented.jpg';
    component.stock = 40;
    component.name = 'Curry rice';
    component.price = 120;
    component.description = 'Tasty curry rice';
    component.favorite = false;
    component.inBasket = false;
    fixture.detectChanges();
    initDomVars();

    let result;
    component.added.subscribe(val => (result = val));
    add.triggerEventHandler('click', null);
    expect(result).toBeTruthy();
  });

  it('should raise addedToFav event with true when clicked heart icon in no favorite product', () => {
    component.img = 'http://dummy.com/invented.jpg';
    component.stock = 40;
    component.name = 'Curry rice';
    component.price = 120;
    component.description = 'Tasty curry rice';
    component.favorite = false;
    component.inBasket = false;
    fixture.detectChanges();
    initDomVars();

    let result;
    component.addedToFav.subscribe(val => (result = val));
    favorite.triggerEventHandler('click', null);
    expect(result).toBeTruthy();
  });

  it('should raise addedToFav event with false when clicked heart icon in favorite product', () => {
    component.img = 'http://dummy.com/invented.jpg';
    component.stock = 40;
    component.name = 'Curry rice';
    component.price = 120;
    component.description = 'Tasty curry rice';
    component.favorite = true;
    component.inBasket = false;
    fixture.detectChanges();
    initDomVars();

    let result;
    component.addedToFav.subscribe(val => (result = val));
    favorite.triggerEventHandler('click', null);
    expect(result).toBeFalsy();
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

    description = cardDebug.query(By.css('.test-description'));
    descriptionHtml = description?.nativeElement;

    favorite = cardDebug.query(By.css('svg'));
    favoriteHtml = favorite?.nativeElement;

    add = cardDebug.query(By.css('button'));
    addHtml = add?.nativeElement;
  }
});
