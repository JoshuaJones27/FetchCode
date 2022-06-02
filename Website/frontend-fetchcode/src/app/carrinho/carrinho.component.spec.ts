import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrinhoComponent } from './carrinho.component';

describe('CartComponent', () => {
  let component: CarrinhoComponent;
  let fixture: ComponentFixture<CarrinhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrinhoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrinhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
