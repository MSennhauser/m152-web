import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';
import { PictureSliderComponent } from './components/picture-slider/picture-slider.component';
import { M152VideoComponent } from './components/m152-video/m152-video.component';

@NgModule({
    imports: [
        MaterialModule
    ],
    exports: [
        MaterialModule,
        FlexLayoutModule,
        HttpClientModule,
        PictureSliderComponent,
        M152VideoComponent
    ],
    declarations: [
        PictureSliderComponent,
        M152VideoComponent
    ]
})
export class SharedModule { }
