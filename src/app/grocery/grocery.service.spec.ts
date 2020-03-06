import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { GroceryService } from './grocery.service';
import { Product } from './models/product';

describe('GroceryService', () => {
  let httpMock: HttpTestingController;
  let service: GroceryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GroceryService]
    });
    service = TestBed.get(GroceryService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    it('makes expected calls', () => {
      const dummyGet: Product[] = [
        {
          id: '41fd4fd9-95c7-4809-96db-a147d352fdbb',
          image_url:
            'https://dummyimage.com/400x400/28200e/000&text=Unbranded Metal Chair',
          stock: 10,
          productName: 'Unbranded Metal Chair',
          price: 43,
          productDescription:
            'Porro tempore autem. Sunt molestias qui quod recusandae nemo quia optio. Nostrum aperiam officiis aut reprehenderit illo.',
          favorite: 0
        },
        {
          id: '20cc33f1-223b-4cf0-878d-fdedb3f60b56',
          image_url:
            'https://dummyimage.com/400x400/2ee9f7/000&text=Handcrafted Metal Towels',
          stock: 41,
          productName: 'Handcrafted Metal Towels',
          price: 98,
          productDescription:
            'Rerum minima laudantium blanditiis dolorem dolores ut sint ut quidem. Est doloremque repellat excepturi dolor consequatur rerum qui. Facere ut vel et enim accusamus ipsum dolores aut. Eaque quo ut omnis unde quam error voluptas non iure.',
          favorite: 0
        }
      ];

      service.get().subscribe(res => {
        expect(res.length).toBe(2);
        expect(res).toEqual(dummyGet);
      });
      const req = httpMock.expectOne('http://localhost:3000/grocery');
      expect(req.request.method).toEqual('GET');
      req.flush(dummyGet);
    });
  });

  describe('getFavorites', () => {
    it('makes expected calls', () => {
      const dummyGetFavorites: Product[] = [
        {
          id: '41fd4fd9-95c7-4809-96db-a147d352fdbb',
          image_url:
            'https://dummyimage.com/400x400/28200e/000&text=Unbranded Metal Chair',
          stock: 10,
          productName: 'Unbranded Metal Chair',
          price: 43,
          productDescription:
            'Porro tempore autem. Sunt molestias qui quod recusandae nemo quia optio.',
          favorite: 1
        },
        {
          id: '20cc33f1-223b-4cf0-878d-fdedb3f60b56',
          image_url:
            'https://dummyimage.com/400x400/2ee9f7/000&text=Handcrafted Metal Towels',
          stock: 41,
          productName: 'Handcrafted Metal Towels',
          price: 98,
          productDescription:
            'Rerum minima laudantium blanditiis dolorem dolores ut sint ut quidem. Est doloremque repellat excepturi dolor consequatur rerum qui. Facere ut vel et enim accusamus ipsum dolores aut. Eaque quo ut omnis unde quam error voluptas non iure.',
          favorite: 1
        }
      ];

      service.getFavorites().subscribe(res => {
        expect(res.length).toBe(2);
        expect(res).toEqual(dummyGetFavorites);
      });

      const req = httpMock.expectOne(
        'http://localhost:3000/grocery?favorite=1'
      );
      expect(req.request.method).toEqual('GET');
      req.flush(dummyGetFavorites);
    });
  });

  describe('updateProduct', () => {
    it('makes expected calls', () => {
      const dummyUpdate: Product = {
        id: '1',
        image_url: 'https://dummyimage.com/400x400/28200e/000&text=Unbranded Metal Chair',
        stock: 10,
        productName: 'Unbranded Metal Chair',
        price: 43,
        productDescription: 'description',
        favorite: 0
      };

      service.updateProduct("1", { favorite: '0' }).subscribe(product => {
        expect(product).toEqual(dummyUpdate);
      });

      const req = httpMock.expectOne(
        'http://localhost:3000/grocery/1'
      );
      expect(req.request.method).toEqual('PATCH');
      req.flush(dummyUpdate);
    });
  });
});
