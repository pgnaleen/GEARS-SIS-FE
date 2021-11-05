import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { initializeKeycloak } from './core/shared/security/keycloak-init.factory';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {ComponentsModule} from './components/components.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    KeycloakAngularModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent
  ],
  // providers: [{
  //   provide: APP_INITIALIZER,
  //   useFactory: initializeKeycloak,
  //   multi: true,
  //   deps: [KeycloakService],
  // }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
