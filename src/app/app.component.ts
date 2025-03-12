import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { StateManagementService } from './shared/services/state-management/state-management.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NzIconModule, NzLayoutModule, SidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public isCollapsed = false;

  public $stateManagement: StateManagementService = inject(StateManagementService);

  public handleMenu(): void {
    this.isCollapsed = !this.isCollapsed;

    this.$stateManagement.isCollapsed.set(this.isCollapsed);
  }
}
