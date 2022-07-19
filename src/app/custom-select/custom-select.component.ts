import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomSelectComponent),
    multi:true
  }]
})
export class CustomSelectComponent implements OnInit, ControlValueAccessor {

  public selectControl = new FormControl();
  public onChange: any;
  public onTouch: any;

  ngOnInit(): void{
    this.selectControl.valueChanges.subscribe(
      val => {
        if(this.onChange) this.onChange(val);
      }
    )
  }

  writeValue(value: any): void{
    this.selectControl.setValue(value);
  }

  registerOnChange(fn: any): void{
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void{
    this.onTouch = fn;
  }
}
