import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminInterfaceComponent } from './admin-interface/admin-interface.component';



const routes: Routes = [
    {
        path: 'admin',
        component: AdminInterfaceComponent
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
