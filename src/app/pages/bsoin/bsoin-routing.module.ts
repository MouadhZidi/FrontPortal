import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BsoinComponent } from './bsoin/bsoin.component';



const routes: Routes = [
    {
        path: 'bsoin',
        component: BsoinComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BsoinRoutingModule {

    
}
