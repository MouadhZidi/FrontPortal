import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UploadsComponent } from '../form/uploads/uploads.component';
import { AddEventComponent } from './add-event/add-event.component';

import { BloggridComponent } from './bloggrid/bloggrid.component';
import { BloglistComponent } from './bloglist/bloglist.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DetailComponent } from './detail/detail.component';
import { EventUpdateComponent } from './evenet-update/event-update/event-update.component';


const routes: Routes = [
    {
        path: 'list',
        component: AddEventComponent
    },
    {
        path: 'grid',
        component: BloggridComponent
    },
    {
        path: 'detail',
        component: DetailComponent
    },
    {
        path: 'detail/:id',
        component: DetailComponent
    },

    {
        path: 'getbyD',
        component: EventUpdateComponent
    },
    {
        path: 'calendar',
        component: CalendarComponent
    },

];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BlogRoutingModule { }
