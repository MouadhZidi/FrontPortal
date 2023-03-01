import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardChefService } from '../guard/guard-chef.service';
import { GuardRhService } from '../guard/guard-rh.service';
import { GuardauthService } from '../guard/guardauth.service';

import { CalendarComponent } from './calendar/calendar.component';
import { ChatComponent } from './chat/chat.component';
import { DefaultComponent } from './dashboards/default/default.component';

const routes: Routes = [
  { path: '', redirectTo: '/account/login',pathMatch: 'full'  },
  { path:'account/login',redirectTo:'dashboard' },
  { path: 'dashboard', component: DefaultComponent },
 // { path: 'calendar', component: CalendarComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule),canActivate:[GuardauthService] },
  { path: 'ecommerce', loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule) },
  { path: 'demande', loadChildren: () => import('./demande/demande.module').then(m => m.DemandeModule) },
  { path: 'email', loadChildren: () => import('./email/email.module').then(m => m.EmailModule) },
  { path: 'invoices', loadChildren: () => import('./invoices/invoices.module').then(m => m.InvoicesModule) },
  { path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule) },
  { path: 'tasks', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule) },
  { path: 'contacts', loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule) },
  { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
  { path: 'pages', loadChildren: () => import('./utility/utility.module').then(m => m.UtilityModule) },
  { path: 'ui', loadChildren: () => import('./ui/ui.module').then(m => m.UiModule) },
  { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
  { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
  { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
  { path: 'charts', loadChildren: () => import('./chart/chart.module').then(m => m.ChartModule) },
  { path: 'maps', loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule) },
  { path: 'EspaceChef', loadChildren: () => import('./EspaceChef/chef.module').then(m => m.ChefModule),canActivate:[GuardChefService] },
  { path: 'EspaceRh', loadChildren: () => import('./EspaceRh/Chef.module').then(m => m.RhModule) ,canActivate:[GuardRhService]},
  { path: 'EspaceCollaborateur', loadChildren: () => import('./consultcol/ConsultCol.module').then(m => m.ConsultColModule) },
  { path: 'Admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'employe', loadChildren: () => import('./Employe/Employe.module').then(m => m.EmployeModule) },
  { path: 'conge', loadChildren: () => import('./conge/conge.module').then(m => m.CongeModule) },
  { path: 'paie', loadChildren: () => import('./paie/paie.module').then(m => m.PaieModule) },
  { path: 'opposition', loadChildren: () => import('./opposition/consltoppo.module').then(m => m.ConsltoppoModule) },
  { path: 'bsoin', loadChildren: () => import('./bsoin/Bsoin.module').then(m => m.BsoinModule) },
  { path: 'pointage', loadChildren: () => import('./pointage/pointage.module').then(m => m.PointageModule) },
  { path: 'retard', loadChildren: () => import('./pointage/pointage.module').then(m => m.PointageModule) },
  { path: 'pret-avance', loadChildren: () => import('./pret/pret-avance.module').then(m => m.PretAvanceModule) },
  { path: 'contrat', loadChildren: () => import('./contrat/contrat.module').then(m => m.ContratModule) },
  { path: 'objectif', loadChildren: () => import('./objectif/objectif.module').then(m => m.ObjectifModule) },
  { path: 'competence', loadChildren: () => import('./competence/competence.module').then(m => m.CompetenceModule),canActivate:[GuardauthService] },
  { path: 'calendar-conge', loadChildren: () => import('./calendarConge/calendar-conge.module').then(m => m.CalendarCongeModule) },
  { path: 'Ajout', loadChildren: () => import('./FicheSignalitique/FicheSignalitique.module').then(m => m.FicheSignalitiqueModule) },
  { path: 'list-notifications', loadChildren: () => import('./list-notifications/list-notifications.module').then(m => m.ListNotificationsModule) },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
