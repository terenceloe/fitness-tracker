import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';
import { Injectable } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import * as fromRoot from '../app.reducer'
import { Store } from '@ngrx/store';
import { take } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private store: Store<fromRoot.State>) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select(fromRoot.getisAuth).pipe(take(1));
    }

    canLoad(route: Route) {
        return this.store.select(fromRoot.getisAuth).pipe(take(1));
    }
}