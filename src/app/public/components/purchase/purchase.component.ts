import { Component, Input } from '@angular/core';
import { Course } from '../../../shared/models/course/course.entity';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { PaymentMethod } from '../../../shared/models/payment-method/payment-method-entity';
import { PaymentMethodService } from '../../../shared/services/payment-method.service';
import {MatOption, MatSelect} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {SharedModule} from "../../../shared/shared.module";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {PurchasedCoursesService} from "../../../smartGarden/services/purchased/purchased-courses.service";
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [
    MatCardModule,
    MatCardModule,
    MatButtonModule,
    MatRadioButton,
    MatDivider,
    FormsModule,
    MatFormField,
    MatInputModule,
    MatLabel,
    MatSelect,
    MatOption,
    NgIf,
    MatSlideToggle,
    SharedModule,
    ReactiveFormsModule,
    MatRadioGroup,
    NgForOf
  ],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css'
})
export class PurchaseComponent {
  @Input() course!: Course;
  paymentMethods: PaymentMethod[] = [];
  selectedCardId: number | null = null;
  saveCard: boolean = false;
  userId: number;
  paymentForm: FormGroup;
  showForm: boolean = false;

  constructor(private paymentMethodService: PaymentMethodService,
              private fb: FormBuilder,
              private purchasedCoursesService: PurchasedCoursesService,
              private dialog: MatDialog) {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.userId = user.id;

    this.paymentForm = this.fb.group({
      cardHolder: ['', [Validators.required]],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expirationDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      saveCard: [false]
    });
  }

  ngOnInit(): void {
    this.loadPaymentMethods();
  }

  loadPaymentMethods(): void {
    this.paymentMethodService.getPaymentMethodsByUserId(this.userId).subscribe((methods: PaymentMethod[]) => {
      this.paymentMethods = methods;
    });
  }

  showAddCardForm(): void {
    this.showForm = true;
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      const newPaymentMethod: PaymentMethod = {
        id: 0,
        userId: this.userId,
        cardHolder: this.paymentForm.value.cardHolder,
        cardNumber: this.paymentForm.value.cardNumber,
        expirationDate: this.paymentForm.value.expirationDate,
        cvv: this.paymentForm.value.cvv
      };

      if (this.paymentForm.value.saveCard) {
        this.paymentMethodService.addPaymentMethod(newPaymentMethod).subscribe(() => {
          this.loadPaymentMethods();
          this.showForm = false;
        });
      } else {
        newPaymentMethod.id = 1;
        this.paymentMethods.push(newPaymentMethod);
        this.showForm = false;
      }
    }
  }

  buyCourse(): void {
    if(this.selectedCardId!==null){
      const selectedCard = this.paymentMethods.find(method => method.id === this.selectedCardId);
      if(selectedCard){
        const purchase = {
          id: 0,
          userId: this.userId,
          courseId: this.course.id,
          amount: this.course.price,
          purchaseDate: new Date(),
          cardNumberMasked: `**** **** **** ${selectedCard.cardNumber.slice(-4)}`
        };
        this.purchasedCoursesService.addPurchasedCourse(purchase).subscribe(() => {
          this.dialog.open(SuccessDialogComponent, {
            data: {
              message: 'Your purchase was successful!',
              name: 'course',
              redirectUrl: `/course/${this.course.id}`
            }
          });
        });
      }
    }
  }
  cancelAddCard(): void {
    this.showForm = false;
  }
}
