import { Injectable } from '@angular/core';
import { Hero } from './Model/hero.model';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(private messageService: MessageService,
              private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  HEROES: Hero[] = [
      { id: 11, name: 'Dr Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];

    getHeroes(): Observable<Hero[]> {
      // return of(this.HEROES);
      var log = this.http.get<Hero[]>(this.heroesUrl)
                    .pipe(catchError(this.handleError<Hero[]>('getHeroes', [])))
      console.log(log)
      return log
    }

    getHeroById(id: number): Observable<Hero>{
      const url = `${this.heroesUrl}/${id}`;
      return this.http.get<Hero>(url).pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
    }

    /** PUT: update the hero on the server */
    updateHero(hero: Hero): Observable<any> {
      return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
    }

    addHero(hero: Hero): Observable<Hero>{
      return this.http.post(this.heroesUrl, hero, this.httpOptions).pipe(
        tap((newHero: Hero) => this.log(`add hero id=${newHero.id}`)),
        catchError(this.handleError<any>('addHero'))
      );
    }

    deleteHero(hero: Hero): Observable<Hero>{
      const url = `${this.heroesUrl}/${hero.id}`;
      return this.http.delete(url, this.httpOptions).pipe(
        tap(_ => this.log(`delete hero id=${hero.id}`)),
        catchError(this.handleError<any>('addHero'))
      );
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
      this.messageService.add(`HeroService: ${message}`);
    }
    
    
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);    };
    }
}
