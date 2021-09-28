import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule
    ],
    exports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule
    ]
})
export class MaterialModule { }
