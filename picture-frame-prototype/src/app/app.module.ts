import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KenBurnsComponent } from './components/ken-burns/ken-burns.component';
import { KenBurnsModule } from './components/ken-burns/ken-burns.module';
import { CalendarModule } from './components/calendar/calendar.module';
import { RecipesModule } from './components/recipes/recipes.module';
import { VideoComponent } from './components/video/video.component';
import { VideoModule } from './components/video/video.module';
import { SetupComponent } from './components/setup/setup.component';
import { ApiInterceptorService } from './services/api/api-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    SetupComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    KenBurnsModule,
    CalendarModule,
    RecipesModule,
    VideoModule,
    
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
