import { Component, inject, OnInit } from '@angular/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { UserModel } from '../../../shared/models/user/user.model';
import { UserService } from '../../../shared/services/user/user.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { DatePipe } from '@angular/common';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';
import { UpdateUserModel } from '../../../shared/models/user/update-user.model';
import { CreateUserModel } from '../../../shared/models/user/create-user.model';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { debounceTime } from 'rxjs';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { DrawerUserComponent } from '../../../shared/components/drawers/user/drawer-user.component';

@Component({
  selector: 'app-user',
  imports: [
    NzTableModule,
    NzDividerModule,
    NzSpinModule,
    DatePipe,
    NgxMaskPipe,
    NzDropDownModule,
    NzIconModule,
    NzPopconfirmModule,
    NzDrawerModule,
    ReactiveFormsModule,
    FormsModule,
    NzGridModule,
    NzInputModule,
    ButtonComponent,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  providers: [provideNgxMask()],
})
export class UserComponent implements OnInit {
  private $user: UserService = inject(UserService);
  private $message: NzMessageService = inject(NzMessageService);
  private $drawer: NzDrawerService = inject(NzDrawerService);
  private fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  public loading: boolean = true;
  public loadingSearch: boolean = false;
  public listOfData: UserModel[] = [];
  public filterData: UserModel[] = [];
  public form: FormGroup = this.fb.group({
    search: new FormControl<string>(''),
  });

  public ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.$user.getUsers().subscribe({
      next: (res) => {
        this.listOfData = res;
        this.filterData = res;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
      },
    });
  }

  public deleteUser(user: UserModel): void {
    this.loading = true;

    this.$user.deleteUser(user.id).subscribe({
      next: (res) => {
        this.$message.success('Usuário deletado com sucesso.');

        this.getUsers();
      },
      error: (error) => {
        this.$message.error('Erro ao deletar o usuário. Por favor, tente novamente mais tarde.');
        this.loading = false;
      },
    });
  }

  public openDrawer(user?: UserModel): void {
    this.$drawer
      .create<DrawerUserComponent, { user?: UserModel }, string>({
        nzTitle: user ? 'Editar usuário' : 'Criar usuário',
        nzContent: DrawerUserComponent,
        nzData: {
          user,
        },
      })
      .afterClose.subscribe((data: any) => {
        console.log(data);
        if (data) {
          if (user) {
            this.updateUser(user.id, data);
          } else {
            this.createUser(data);
          }
        }
      });
  }

  private updateUser(id: string, data: UpdateUserModel): void {
    this.loading = true;

    this.$user.updateUser(id, data).subscribe({
      next: (res) => {
        this.$message.success('Usuário editado com sucesso.');

        this.getUsers();
      },
      error: (error) => {
        this.$message.error('Erro ao editar o usuário. Por favor, tente novamente mais tarde.');
        this.loading = false;
      },
    });
  }

  private createUser(data: CreateUserModel): void {
    this.loading = true;

    this.$user.createUser(data).subscribe({
      next: (res) => {
        this.$message.success('Usuário criado com sucesso.');

        this.getUsers();
      },
      error: (error) => {
        this.$message.error('Erro ao criar o usuário. Por favor, tente novamente mais tarde.');
        this.loading = false;
      },
    });
  }

  public getValueChanges(): void {
    this.loadingSearch = true;

    this.form
      .get('search')
      ?.valueChanges.pipe(debounceTime(1000))
      .subscribe((res: string) => {
        if (res) {
          this.filterData = this.listOfData.filter((data) =>
            res!
              .toLowerCase()
              .split(' ')
              .every(
                (v) =>
                  data?.name?.toLowerCase().includes(v) ||
                  data?.email?.toLowerCase().includes(v) ||
                  data?.phone?.toLowerCase().includes(v) ||
                  data?.cpf?.toLowerCase().includes(v)
              )
          );
          this.loadingSearch = false;
        } else {
          this.filterData = [...this.listOfData];
          this.loadingSearch = false;
        }
      });
  }
}
