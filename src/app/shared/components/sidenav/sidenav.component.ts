import { Component, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { StateManagementService } from '../../services/state-management/state-management.service';

@Component({
  selector: 'app-sidenav',
  imports: [RouterLink, NzSelectModule, NzIconModule, NzMenuModule, NzLayoutModule],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  public isCollapsed: boolean = false;
  public $stateManagement: StateManagementService = inject(StateManagementService);

  public effectSig = effect(() => {
    this.isCollapsed = this.$stateManagement.isCollapsed();
  });
}
