import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../Model/hero.model';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  @Input() hero: Hero;
  @Output() selectedOne = new EventEmitter<Hero>() ;
  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
  }

  onSelected(data: Hero){
      this.selectedOne.emit(data);
  }


  
}
