import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';
import { PictureSliderComponent } from './components/picture-slider/picture-slider.component';
import { YoutubeVideoComponent } from './components/youtube-video/youtube-video.component';

@NgModule({
    imports: [
        MaterialModule,
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
    ],
    exports: [
        MaterialModule,
        FlexLayoutModule,
        HttpClientModule,
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        PictureSliderComponent,
        YoutubeVideoComponent
    ],
    declarations: [
        PictureSliderComponent,
        YoutubeVideoComponent
    ]
})
export class SharedModule { }
