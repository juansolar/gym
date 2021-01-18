import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionarClienteComponent } from './selecionar-cliente.component';

describe('SelecionarClienteComponent', () => {
  let component: SelecionarClienteComponent;
  let fixture: ComponentFixture<SelecionarClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelecionarClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecionarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
