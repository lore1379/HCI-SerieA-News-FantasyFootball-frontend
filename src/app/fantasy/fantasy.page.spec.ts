import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FantasyPage } from './fantasy.page';

describe('FantasyPage', () => {
  let component: FantasyPage;
  let fixture: ComponentFixture<FantasyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FantasyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
