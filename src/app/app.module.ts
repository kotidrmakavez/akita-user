import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AkitaNgDevtools.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
