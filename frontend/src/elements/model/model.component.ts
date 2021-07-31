import {ChangeDetectionStrategy, Component, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';

export type FormField = {
  label: string;
  value: string;
};

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModelComponent implements OnChanges {

  @Input() show = false;
  @Output() showChange = new Subject<boolean>();
  @Output() ok = new Subject<Map<string, FormField>>();
  @Input() formFields: Map<string, FormField> = new Map<string, FormField>();

  onOk(): void {
    this.ok.next(this.formFields);
  }

  onCancel(): void {
    this.showChange.next(false);
  }

  onChange(event: any): void {
    const newValue: FormField = {
      value: event.target.value,
      label: this.formFields?.get(event.target.id)?.label ?? ''
    };
    this.formFields.set(event.target.id, newValue);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.show) {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.formFields.forEach((value, key, map) => {
      map.set(key, {label: value.label, value: ''});
    });
  }

}
