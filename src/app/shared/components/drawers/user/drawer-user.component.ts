import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NZ_DRAWER_DATA, NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzInputModule } from 'ng-zorro-antd/input';
import { UserModel } from '../../../models/user/user.model';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-drawer-user-component',
  imports: [
    NzButtonModule,
    NzDividerModule,
    FormsModule,
    NzGridModule,
    NzInputModule,
    NgxMaskDirective,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  templateUrl: './drawer-user.component.html',
  styleUrl: './drawer-user.component.scss',
  providers: [provideNgxMask()],
})
export class DrawerUserComponent implements OnInit {
  public nzData: { user: UserModel } = inject(NZ_DRAWER_DATA);
  private drawerRef: NzDrawerRef<string> = inject(NzDrawerRef);
  private fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  public form: FormGroup = this.fb.group({
    name: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    cpf: new FormControl<string>('', [Validators.required]),
    phone: new FormControl<string>('', [Validators.required]),
  });

  public ngOnInit(): void {
    if (this.nzData) {
      this.updateForm();
    }
  }

  private updateForm(): void {
    this.form.patchValue({
      name: this.nzData.user?.name,
      cpf: this.nzData.user?.cpf,
      phone: this.nzData.user?.phone,
      email: this.nzData.user?.email,
    });
  }

  public close(hasData: boolean): void {
    if (hasData) {
      this.drawerRef.close(this.form.getRawValue());
    } else {
      this.drawerRef.close();
    }
  }
}
