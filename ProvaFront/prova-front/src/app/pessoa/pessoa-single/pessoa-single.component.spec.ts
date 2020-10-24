import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaSingleComponent } from './pessoa-single.component';

describe('PessoaSingleComponent', () => {
  let component: PessoaSingleComponent;
  let fixture: ComponentFixture<PessoaSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PessoaSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoaSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
