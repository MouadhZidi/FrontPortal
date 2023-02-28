import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EspaceChefComponent } from './espace-chef/espace-chef.component';
import { EvaluationObjectifChefComponent } from './evaluation-objectif-chef/evaluation-objectif-chef.component';
import { HistoriqueChefComponent } from './historique-chef/historique-chef.component';



const routes: Routes = [
    {
        path: 'Chef',
        component: EspaceChefComponent
    },
    {
        path: 'historique',
        component: HistoriqueChefComponent
    },
    {
        path: 'evaluation',
        component: EvaluationObjectifChefComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChefRoutingModule { }
