import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundPageComponent} from "./pages/not-found-page/not-found-page.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {ChatPageComponent} from "./pages/chat-page/chat-page.component";
import {SignOnPageComponent} from "./pages/sign-on-page/sign-on-page.component";

const routes: Routes = [
  {path: '', component: HomePageComponent, title: 'home page'},
  {path: 'sign-on', component: SignOnPageComponent, title: 'sign on'},
  {path: 'chat/:uid', component: ChatPageComponent, title: 'chat'},
  {path: '**', component: NotFoundPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
