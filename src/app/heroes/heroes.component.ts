import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { Hero } from '../Model/hero.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  
  ngOnInit(): void {
  }

  selectedHero: Hero;
  heroes: Hero[];

  constructor(private heroService: HeroService, private messageService: MessageService) { 
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes)
  }


  onSelected(data){
    this.selectedHero = data;
    this.messageService.add("`HeroesComponent: Selected hero id=${hero.id}`")
  }

  add(name: string): void{
    name = name.trim();
    if(!name) return;
    this.heroService.addHero({name} as Hero)
      .subscribe(hero => {this.heroes.push(hero)})
  }
  
}
