import { Component, ElementRef, forwardRef, Input, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import {
  ControlValueAccessor,
  FormArray, FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-input-code',
  templateUrl: './input-code.component.html',
  styleUrls: ['./input-code.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputCodeComponent),
    multi: true }]
})

export class InputCodeComponent implements ControlValueAccessor, OnInit, OnDestroy{
  @Input() codeLength?: number = 5;
  @ViewChildren('inputCode') inputsCode: QueryList<ElementRef<HTMLInputElement>>;

  public codeArray: number[];
  public inputCodeGroup: FormGroup;
  public destroy$: Subject<void> = new Subject<void>();
  public onChange: (p: any) => void = () => {};
  public onTouch: (p: any) => void = () => {};

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initForm(): void{
    this.codeArray = new Array(this.codeLength).fill(null);
    this.inputCodeGroup = this.formBuilder.group({
      inputCode: this.formBuilder.array(this.codeArray.map(() => this.formBuilder.control('')))
    });
    this.detectChanges();
  }

  detectChanges(): void{
    this.inputCodeGroup
      .get('inputCode')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (inputCodeValue) => {
          const joinValue = inputCodeValue.join('');
          this.change(joinValue);
        },
      });
  }

  get inputArray(): FormArray {
    return this.inputCodeGroup.get('inputCode') as FormArray;
  }

  resetCode(): void {
    this.inputArray.controls.forEach((control) => {
      control.reset('');
    });
  }

  setCode(value: string): void{
    this.inputArray.controls.forEach((control, idx) => {
      const val = value[idx] ? value[idx] : '';
      control.setValue(val);
    });
  }

  registerOnChange(fn: any): void{
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void{
    this.onTouch = fn;
  }

  writeValue(value: any): void{
    if (value === null) {
      this.resetCode();
      return;
    }
    this.setCode(value);
  }

  change(value: string): void{
    this.onChange(value);
    this.onTouch(value);
  }

  nextInputFocus(event: KeyboardEvent, idx: number) {
    if (!event.code.includes('Digit') && !event.code.includes('Numpad')) return;
    const symbol = event.code[event.code.length - 1];
    this.inputArray.at(idx)?.patchValue(symbol);
    this.inputsCode.toArray()[idx + 1]?.nativeElement.focus();
  }

  previousInputFocus(idx: number): void {
    if (!idx) {
      return;
    }
    this.inputsCode.toArray()[idx - 1].nativeElement.focus();
  }

  numberOnly(event: KeyboardEvent): boolean{
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
