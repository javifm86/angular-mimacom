import { TestBed } from '@angular/core/testing';
import { Product } from './models/product';
import { DataStoreService } from './data-store.service';
import { combineLatest } from 'rxjs';

describe('DataStoreService', () => {
  let service: DataStoreService;
  const itemDummy1: Product = {
    favorite: 0,
    id: 'id1',
    image_url: 'https://dummyimage.com/400x400',
    price: 43,
    productDescription: 'description',
    productName: 'name',
    stock: 1
  };
  const itemDummy2: Product = {
    favorite: 1,
    id: 'id2',
    image_url: 'https://dummyimage.com/400x400',
    price: 40,
    productDescription: 'description2',
    productName: 'name2',
    stock: 2
  };
  const itemDummy3: Product = {
    favorite: 1,
    id: 'id3',
    image_url: 'https://dummyimage.com/400x400',
    price: 40,
    productDescription: 'description2',
    productName: 'name2',
    stock: 2
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataStoreService]
    });
    service = TestBed.get(DataStoreService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('getBasket', () => {
    it('return empty array when there are not elements in basket', () => {
      expect(service.getBasket()).toEqual([]);
    });

    it('return array of products added to basket', () => {
      service.addToBasket(itemDummy1);
      service.addToBasket(itemDummy2);
      expect(service.getBasket()).toEqual([itemDummy1, itemDummy2]);
    });
  });

  describe('addToBasket', () => {
    it('add products to basket and notify to basketUpdated$ subscriptions', (done: DoneFn) => {
      let invokedBasketUpdated = false;
      service.basketUpdated$.subscribe((params) => {
        invokedBasketUpdated = true;
        expect(invokedBasketUpdated).toEqual(true);
        expect(params).toBeUndefined();
        done();
      });

      service.addToBasket(itemDummy1);
      expect(service.getBasket()).toEqual([itemDummy1]);
    });
  });

  describe('removeFromBasket', () => {
    it('remove product from basket and notify to basketUpdated$ subscriptions', (done: DoneFn) => {
      service.addToBasket(itemDummy1);

      let invokedBasketUpdated = false;
      service.basketUpdated$.subscribe((params) => {
        invokedBasketUpdated = true;
        expect(invokedBasketUpdated).toEqual(true);
        expect(params).toBeUndefined();
        done();
      });

      service.removeFromBasket(itemDummy1);
      expect(service.getBasket()).toEqual([]);
    });
  });

  describe('isProductInBasket', () => {
    it('return true/false if product id is in basket', () => {
      expect(service.isProductInBasket(itemDummy1.id)).toBeFalse();
      service.addToBasket(itemDummy1);
      expect(service.isProductInBasket(itemDummy1.id)).toBeTrue();
    });
  });

  describe('setProducts', () => {
    it('set the list of products', () => {
      expect(service.getTotalProducts()).toEqual(0);
      service.setProducts([itemDummy1, itemDummy2]);
      expect(service.getTotalProducts()).toEqual(2);
    });
  });

  describe('getTotalProducts', () => {
    it('return total number of products', () => {
      expect(service.getTotalProducts()).toEqual(0);
      service.setProducts([itemDummy1, itemDummy2]);
      expect(service.getTotalProducts()).toEqual(2);
    });
  });

  describe('getProductsByPage', () => {
    it('return products by page depending on given page and items per page', () => {
      service.setProducts([itemDummy1, itemDummy2, itemDummy3]);

      let result = service.getProductsByPage(0, 1);
      expect(result.length).toEqual(1);
      expect(result).toEqual([itemDummy1]);

      result = service.getProductsByPage(1, 1);
      expect(result.length).toEqual(1);
      expect(result).toEqual([itemDummy2]);

      result = service.getProductsByPage(2, 1);
      expect(result.length).toEqual(1);
      expect(result).toEqual([itemDummy3]);

      result = service.getProductsByPage(3, 1);
      expect(result.length).toEqual(0);
      expect(result).toEqual([]);

      result = service.getProductsByPage(0, 2);
      expect(result.length).toEqual(2);
      expect(result).toEqual([itemDummy1, itemDummy2]);

      result = service.getProductsByPage(1, 2);
      expect(result.length).toEqual(1);
      expect(result).toEqual([itemDummy3]);
    });
  });

  describe('notifyPayment', () => {
    it('empty the basket and notify to basketUpdated$ and paymentReceived$ subscriptions', (done: DoneFn) => {
      service.addToBasket(itemDummy1);
      service.addToBasket(itemDummy2);

      let invoked = false;
      combineLatest([
        service.basketUpdated$,
        service.paymentReceived$
      ]).subscribe(([basketUpdated, paymentReceived]) => {
        invoked = true;
        expect(invoked).toBeTrue();
        expect(basketUpdated).toBeUndefined();
        expect(paymentReceived).toBeTrue();
        expect(service.getBasket()).toEqual([]);
        done();
      });
      expect(service.getBasket()).toEqual([itemDummy1, itemDummy2]);
      service.notifyPayment();
    });
  });
});
