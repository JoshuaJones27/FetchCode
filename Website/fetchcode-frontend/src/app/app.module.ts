import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { EncomendasComponent } from './encomendas/encomendas.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { CriarContaComponent } from './criar-conta/criar-conta.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    EncomendasComponent,
    PerfilComponent,
    CarrinhoComponent,
    CheckoutComponent,
    SlideshowComponent,
    CriarContaComponent,
    FavoritosComponent,
    PaginaInicialComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
