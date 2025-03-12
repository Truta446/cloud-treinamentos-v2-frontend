import { DecimalPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { SystemService } from '../../../shared/services/system/system.service';
import { CPUService } from '../../../shared/services/cpu/cpu.service';
import { SystemInfoModel } from '../../../shared/models/system/system-info.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { interval, Subscription } from 'rxjs';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-monitor',
  imports: [DecimalPipe, NzCardModule, NzGridModule, NzIconModule, NzStatisticModule, NzSpinModule, ButtonComponent],
  templateUrl: './monitor.component.html',
  styleUrl: './monitor.component.scss',
})
export class MonitorComponent implements OnInit, OnDestroy {
  private $system: SystemService = inject(SystemService);
  private $cpu: CPUService = inject(CPUService);
  private $message: NzMessageService = inject(NzMessageService);

  public system: SystemInfoModel = new SystemInfoModel();
  public loading: boolean = true;
  public uptimeSeconds: number = 0;
  public formattedUptime: string = '00:00:00';

  private uptimeSubscription!: Subscription;

  public ngOnInit(): void {
    this.getSystemInfo();
  }

  public getSystemInfo(): void {
    this.loading = true;

    this.$system.getSystemInfo().subscribe({
      next: (res) => {
        this.system = res;

        if (res.uptime) {
          this.uptimeSeconds = res.uptime;
          this.updateFormattedUptime();
          this.startTimer();
        }

        setTimeout(() => {
          this.loading = false;
        }, 500);
      },
      error: (error) => {
        this.loading = false;
        console.error('Erro ao obter informações do sistema:', error);
        this.$message.error('Erro de conexão. Por favor, tente novamente mais tarde.');
      },
    });
  }

  private startTimer(): void {
    if (this.uptimeSubscription) {
      this.uptimeSubscription.unsubscribe();
    }

    this.uptimeSubscription = interval(1000).subscribe(() => {
      this.uptimeSeconds++;
      this.updateFormattedUptime();
    });
  }

  private updateFormattedUptime(): void {
    const totalSeconds = Math.floor(this.uptimeSeconds);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    this.formattedUptime = `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
  }

  private padZero(value: number): string {
    return value.toString().padStart(2, '0');
  }

  public ngOnDestroy(): void {
    if (this.uptimeSubscription) {
      this.uptimeSubscription.unsubscribe();
    }
  }

  public startCpu(): void {
    this.$cpu.handleStartCpu().subscribe({
      next: (res) => {
        this.$message.success(res.message);
      },
      error: (error) => {
        this.$message.error('Erro de conexão. Por favor, tente novamente mais tarde.');
      },
    });
  }

  public stopCpu(): void {
    this.$cpu.handleStopCpu().subscribe({
      next: (res) => {
        this.$message.success(res.message);
      },
      error: (error) => {
        this.$message.error('Erro de conexão. Por favor, tente novamente mais tarde.');
      },
    });
  }
}
