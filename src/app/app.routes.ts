import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'sales',
                loadComponent: () => import('./sales/pages/sales/sales.component').then(m => m.SalesComponent)
            },
            {
                path: 'inventory',
                loadComponent: () => import('./inventory/pages/inventory/inventory.component').then(m => m.InventoryComponent)
            },
            {
                path: '',
                redirectTo: 'sales',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'sales'
    }
];
