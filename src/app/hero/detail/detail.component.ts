import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from 'src/app/hero.service';
import { Hero } from 'src/app/Model/hero.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  // @Input() hero: Hero
  hero: Hero

  constructor(private route: ActivatedRoute, 
              private heroService: HeroService,
              private location: Location) { }

  ngOnInit(): void {
    this.getHero();
  }

  goBack(): void {
    this.location.back();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHeroById(id)
      .subscribe(hero => this.hero = hero);
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }

  delete(data: Hero): void{
    if (data) {
      this.heroService.deleteHero(data)
        .subscribe(() => this.goBack());
    }
  }

}
