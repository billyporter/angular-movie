import { EntireAppModule } from './modules/entire-app/entire-app.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, EntireAppModule, BrowserAnimationsModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
