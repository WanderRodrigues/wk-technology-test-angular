import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ProductService } from '../../services/product.service';

import { ProductsCreateComponent } from './products-create.component';

fdescribe('ProductsCreateComponent', () => {
  let component: ProductsCreateComponent;
  let fixture: ComponentFixture<ProductsCreateComponent>;
  let productServiceMock: jasmine.SpyObj<any>;
  let routerMock: jasmine.SpyObj<any>;
  let dateAdapterMock: jasmine.SpyObj<any>;

  beforeEach(async () => {
    
    productServiceMock = jasmine.createSpyObj('ClientService', [
      'create'
    ]);

    productServiceMock.create.and.returnValue(true);

    routerMock = jasmine.createSpyObj('Router', [
      'navigate'
    ]);

    dateAdapterMock = jasmine.createSpyObj('DateAdapter', [
      'setLocale'
    ]);

    await TestBed.configureTestingModule({
      declarations: [ ProductsCreateComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
      ],
      providers: [
        { provide: ProductService, useValue: productServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: DateAdapter, useValue: dateAdapterMock },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsCreateComponent);
    component = fixture.componentInstance;
    productServiceMock = TestBed.inject(ProductService);
    routerMock = TestBed.inject(Router);
    dateAdapterMock = TestBed.inject(DateAdapter);
    
    let client = {
      id: null,
      name: 'name',
      document: 'document',
      birth: moment('2021-01-01').toDate(),
      email: 'email@email.com',
      address: {
        postCode: '12345678',
        city: 'city_test',
        neighborhood: 'neighborhood_test',
        number: '0',
        street: 'street_test',
        complement: 'complement',
      }
    }

    component.form.setValue({
      name: 'product',
      code: 'code',
      value: 'value',
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('tests in create', () => {
    it('should create product', fakeAsync(() => {
      fixture.detectChanges();
      component.create().then();
      tick();
      fixture.detectChanges();

      expect(productServiceMock.create).toHaveBeenCalled();
      expect(routerMock.navigate).toHaveBeenCalledWith(['/products']);
    }));

    it('should display alert error, an exception was throw', fakeAsync(() => {
      productServiceMock.create.and.throwError('error');
      spyOn(window, 'alert');
      fixture.detectChanges();
      component.create().then();
      tick();
      fixture.detectChanges();

      expect(window.alert).toHaveBeenCalled();
    }));
  });
});
