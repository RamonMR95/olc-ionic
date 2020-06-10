import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';


@NgModule({
    declarations: [MenuComponent, HeaderComponent],
    exports: [MenuComponent, HeaderComponent],
    imports: [CommonModule, IonicModule, RouterModule],
  })
  export class ComponentsModule {}