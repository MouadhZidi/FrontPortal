import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsltoppoComponent } from './consltoppo/consltoppo.component';
import { OpppositionRhComponent } from './oppposition-rh/oppposition-rh.component';



const routes: Routes = [
    {
        path: 'consltoppo',
        component: ConsltoppoComponent
    },
    {
        path: 'consltoppoRh',
        component: OpppositionRhComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConsltoppoRoutingModule {

    
}
