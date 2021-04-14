import { waitForAsync, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { ClientsCreateComponent } from './clients-create.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { CepService } from 'src/app/modules/cep/services/cep.service';
import { DateAdapter } from '@angular/material/core';
import { of, throwError } from 'rxjs';
import { Client } from 'src/app/models/client';
import * as moment from 'moment';

fdescribe('ClientsCreateComponent', () => {
  let component: ClientsCreateComponent;
  let fixture: ComponentFixture<ClientsCreateComponent>;
  let clientServiceMock: jasmine.SpyObj<any>;
  let routerMock: jasmine.SpyObj<any>;
  let cepServiceMock: jasmine.SpyObj<any>;
  let dateAdapterMock: jasmine.SpyObj<any>;

  let client: Client;

  beforeEach(waitForAsync(() => {

    clientServiceMock = jasmine.createSpyObj('ClientService', [
      'create'
    ]);

    routerMock = jasmine.createSpyObj('Router', [
      'navigate'
    ]);

    cepServiceMock = jasmine.createSpyObj('CepService', [
      'get'
    ]);
    cepServiceMock.get.and.returnValue(of({
      logradouro: 'logradouro_test',
      bairro: 'bairro_test',
      uf: 'uf_test',
      localidade: 'localidade_test',
    }));

    dateAdapterMock = jasmine.createSpyObj('DateAdapter', [
      'setLocale'
    ]);

    TestBed.configureTestingModule({
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      declarations: [ ClientsCreateComponent ],
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
        { provide: ClientService, useValue: clientServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: CepService, useValue: cepServiceMock },
        { provide: DateAdapter, useValue: dateAdapterMock },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsCreateComponent);
    component = fixture.componentInstance;
    clientServiceMock = TestBed.inject(ClientService);
    routerMock = TestBed.inject(Router);
    cepServiceMock = TestBed.inject(CepService);
    dateAdapterMock = TestBed.inject(DateAdapter);

    fixture.detectChanges();

    component.form.setValue({
      name: 'name',
      document: 'document',
      birth: '2021-01-01',
      email: 'email@email.com',
      postCode: '12345678',
      street: 'street_test',
      number: '0',
      complement: 'complement',
      neighborhood: 'neighborhood_test',
      city: 'city_test',
      state: 'state_test',
    });

    client = {
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
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  describe('tests in ngOnInit', () => {
    it('should set locate pt-BR', () => {
      component.ngOnInit();
      expect(dateAdapterMock.setLocale).toHaveBeenCalledWith('pt-BR');
    });

    it('should get zip information', fakeAsync(() => {
      fixture.detectChanges();
      component.ngOnInit();
      tick();
      fixture.detectChanges();

      expect(cepServiceMock.get).toHaveBeenCalledWith('12345678');
    }));

    it('should set information coming from zip code', fakeAsync(() => {

      fixture.detectChanges();
      component.ngOnInit();
      tick();
      fixture.detectChanges();

      let cep = {
        logradouro: 'street_test',
        bairro: 'neighborhood_test',
        uf: 'state_test',
        localidade: 'city_test',
      }

      expect(component.form.controls['street'].value).toEqual(cep.logradouro);
      expect(component.form.controls['neighborhood'].value).toEqual(cep.bairro);
      expect(component.form.controls['city'].value).toEqual(cep.localidade);
      expect(component.form.controls['state'].value).toEqual(cep.uf);
    }));
  });

  describe('tests in create', () => {
    it('should create client with information from form', fakeAsync(() => {
      clientServiceMock.create.and.returnValue(true);
      fixture.detectChanges();
      component.create().then();
      tick();
      fixture.detectChanges();

      expect(clientServiceMock.create).toHaveBeenCalledWith(client);
      expect(routerMock.navigate).toHaveBeenCalledWith(['/clients']);
    }));

    it('should display alert error, an exception was throw', fakeAsync(() => {
      clientServiceMock.create.and.throwError('error');
      spyOn(window, 'alert');
      
      fixture.detectChanges();
      component.create().then();
      tick();
      fixture.detectChanges();

      expect(window.alert).toHaveBeenCalled();
    }));
  });
});