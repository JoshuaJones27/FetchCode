import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncomendasComponent } from './encomendas/encomendas.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { CriarContaComponent } from './criar-conta/criar-conta.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';

const routes: Routes = [
  { path: '', component: PaginaInicialComponent },
  { path: 'encomendas', component: EncomendasComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'slideshow', component: SlideshowComponent },
  { path: 'criarconta', component: CriarContaComponent },
  { path: 'paginainicial', component: PaginaInicialComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
