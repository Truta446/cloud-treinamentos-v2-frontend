import { Component, inject, OnInit } from '@angular/core';

import { NzUploadChangeParam, NzUploadFile, NzUploadModule, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Subscription } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UploadService } from '../../../shared/services/upload/upload.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-upload',
  imports: [NzIconModule, NzUploadModule, NzModalModule, NzSpinModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
})
export class UploadComponent implements OnInit {
  public $message: NzMessageService = inject(NzMessageService);
  public $upload: UploadService = inject(UploadService);

  public loading: boolean = true;
  public previewImage?: string = '';
  public previewVisible?: boolean = false;
  public fileList: NzUploadFile[] = [];

  public handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await this.getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };

  public ngOnInit(): void {
    this.getFile();
  }

  private getFile(): void {
    this.$upload.getFile().subscribe({
      next: (res) => {
        this.fileList.push({
          uid: '-1',
          name: 'logo',
          status: 'done',
          url: res.image,
        });

        setTimeout(() => {
          this.loading = false;
        }, 500);
      },
      error: (error) => {
        this.loading = false;
        console.error(error);
      },
    });
  }

  public async handleChange(event: NzUploadChangeParam): Promise<void> {
    if (!event.file || !event.file.originFileObj) {
      console.error('Arquivo inválido ou não encontrado no evento.');
      return;
    }

    const file = event.file.originFileObj as File;

    if (!(file instanceof File)) {
      console.error('O objeto recebido não é um arquivo válido.');
      return;
    }

    try {
      const data = await this.getBase64(file);
      this.uploadFile(data);
    } catch (error) {
      console.error('Erro ao converter arquivo para Base64:', error);
    }
  }

  private uploadFile(data: string): void {
    this.$upload.handleUploadFile({ file: data }).subscribe({
      next: (res) => {
        this.fileList = [];
        this.fileList.push({
          uid: '-1',
          name: 'logo',
          status: 'done',
          url: data,
        });
        this.$message.success('Upload concluído com sucesso.');
      },
      error: (error) => {
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
