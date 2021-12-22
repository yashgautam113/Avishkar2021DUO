import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './app/auth/auth.component';
import { HomeComponent } from './app/home/home.component';
import { AuthGuard } from './app/auth/auth.guard';
import { ProfileComponent } from './app/home/profile/profilecomponent';
import { EditComponent } from './app/home/edit/edit.component';
import { FeedComponent } from './app/home/feed/feed.component';
const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'auth', component: AuthComponent },
    { path: 'home', component: HomeComponent , canActivate: [AuthGuard]},
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    { path: 'edit' , component: EditComponent, canActivate: [AuthGuard]},
    { path: 'feed' , component: FeedComponent , canActivate: [AuthGuard]}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}