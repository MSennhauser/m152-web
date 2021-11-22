import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';

@NgModule({
    imports: [
        MaterialModule
    ],
    exports: [
        MaterialModule,
        FlexLayoutModule
    ]
})
export class SharedModule { }
