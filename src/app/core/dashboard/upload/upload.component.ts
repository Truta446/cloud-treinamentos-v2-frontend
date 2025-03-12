import { Component, inject } from '@angular/core';

import { NzUploadChangeParam, NzUploadModule, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Subscription } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UploadService } from '../../../shared/services/upload/upload.service';

@Component({
  selector: 'app-upload',
  imports: [NzIconModule, NzUploadModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
})
export class UploadComponent {
  public $message: NzMessageService = inject(NzMessageService);
  public $upload: UploadService = inject(UploadService);

  public loading = false;
  public avatarUrl?: string;

  public handleChange(event: NzUploadChangeParam): void {
    this.loading = true;
    const file = event.file.originFileObj!;

    if (!this.isValidSize(file)) {
      this.loading = false;
      this.$message.error('Arquivo muito grande. Tamanho máximo suportado: 5 MB');
    } else {
      this.getBase64(file).then((data: string) => {
        this.uploadFile(data);
      });
    }
  }

  private isValidSize(img: File): boolean {
    return img.size <= 5242880; // Bigger than 5MB
  }

  private uploadFile(data: string): void {
    this.$upload.handleUploadFile({ file: data }).subscribe({
      next: (res) => {
        this.avatarUrl = data;
        this.$message.success('Upload concluído com sucesso.');
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.$message.error('Erro ao realizar o upload do arquivo. Por favor, tente novamente mais tarde.');
      },
    });
  }

  public customRequest(file: NzUploadXHRArgs): Subscription {
    return new Subscription();
  }

  private getBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (): void => {
        resolve(reader.result as string);
      };
      reader.onerror = (error): void => {
        reject(error);
      };
    });
  }
}
