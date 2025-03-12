export class SystemInfoModel {
  public idleCpu: number = 0;
  public containerId: string = '';
  public hostname?: string | null;
  public uptime: number = 0;
  public memoryUsage: any;
  public cpuCores: number = 0;
}
