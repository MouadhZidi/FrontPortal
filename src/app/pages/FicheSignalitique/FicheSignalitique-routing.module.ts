import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjoutAgentComponent } from './ajout-agent/ajout-agent.component';
import { UpdateFSComponent } from './update-fs/update-fs.component';



const routes: Routes = [
    {
        path: 'Agent',
        component: AjoutAgentComponent
    },
    {
        path: 'Modifer',
        component: UpdateFSComponent
    },
    // {
    //     path: 'validation',
    //     component: ValidationComponent
    // },
    // {
    //     path: 'editor',
    //     component: EditorComponent
    // },
    // {
    //     path: 'uploads',
    //     component: UploadsComponent
    // },
    // {
    //     path: 'wizard',
    //     component: WizardComponent
    // },
    // {
    //     path: 'mask',
    //     component: MaskComponent
    // },
    // {
    //     path: 'advanced',
    //     component: AdvancedformComponent
    // },
    // {
    //     path: 'repeater',
    //     component: RepeaterComponent
    // },
    // {
    //     path: 'layouts',
    //     component: LayoutsComponent
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FicheSignalitiqueRoutingModule { }
