import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab3Page } from './tab3.page';

describe('Tab3Page', () => {
  let component: Tab3Page;
  let fixture: ComponentFixture<Tab3Page>;

  // tslint:disable-next-line: no-unused-expression
  tarjetaClaves: [
    {
      numero: 1,
      clave: '8283'
    },
    {
      numero: 2,
      clave: '7341'
    },
    {
      numero: 3,
      clave: '2621'
    },
    {
      numero: 4,
      clave: '3451'
    },
    {
      numero: 5,
      clave: '6507'
    },
    {
      numero: 6,
      clave: '0301'
    },
    {
      numero: 7,
      clave: '3541'
    },
    {
      numero: 8,
      clave: '0678'
    },
    {
      numero: 9,
      clave: '5234'
    },
    {
      numero: 10,
      clave: '7212'
    },
    {
      numero: 11,
      clave: '3490'
    },
    {
      numero: 12,
      clave: '6235'
    },
    {
      numero: 13,
      clave: '3338'
    },
    {
      numero: 14,
      clave: '7314'
    },
    {
      numero: 15,
      clave: '5325'
    },
    {
      numero: 16,
      clave: '7206'
    },
    {
      numero: 17,
      clave: '3100'
    },
    {
      numero: 18,
      clave: '9133'
    },
    {
      numero: 19,
      clave: '4468'
    },
    {
      numero: 20,
      clave: '2310'
    },
    {
      numero: 21,
      clave: '1996'
    },
    {
      numero: 22,
      clave: '9383'
    },
    {
      numero: 23,
      clave: '1585'
    },
    {
      numero: 24,
      clave: '6315'
    },
    {
      numero: 25,
      clave: '3309'
    },
    {
      numero: 26,
      clave: '0491'
    },
    {
      numero: 27,
      clave: '8124'
    },
    {
      numero: 28,
      clave: '3551'
    },
    {
      numero: 29,
      clave: '9502'
    },
    {
      numero: 30,
      clave: '4441'
    },
    {
      numero: 31,
      clave: '2338'
    },
    {
      numero: 32,
      clave: '4041'
    },
    {
      numero: 33,
      clave: '3337'
    },
    {
      numero: 34,
      clave: '9174'
    },
    {
      numero: 35,
      clave: '0002'
    },
    {
      numero: 36,
      clave: '0224'
    },
    {
      numero: 37,
      clave: '0240'
    },
    {
      numero: 38,
      clave: '1043'
    },
    {
      numero: 39,
      clave: '3101'
    },
    {
      numero: 40,
      clave: '5328'
    },


  ];


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Tab3Page],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
