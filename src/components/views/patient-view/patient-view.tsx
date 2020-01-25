import { Component, Host, h, Prop, EventEmitter, Event, Watch } from '@stencil/core';

import { Patient } from '../../../model/Patient';

@Component({
  tag: 'patient-view',
  styleUrl: 'patient-view.scss',
  shadow: true
})
export class PatientView {

  @Prop() patient: Patient;
  @Prop({ reflect: true }) checked: boolean;
  @Event({
    eventName: 'seriesSelected',
    bubbles: true
  }) seriesSelected: EventEmitter;

  private input?: HTMLInputElement;

  connectedCallback() {

  }
  compoentWillLoad() {
    this.checked = false;
  }

  @Watch('checked')
  checkedPropertyWatchdog(newValue: boolean) {
    if (this.input != null) {
      this.input.checked = newValue;
    }
  }

  handleCheckboxEvent() {
    this.checked = this.input.checked;
  }
  render() {
    return (
      <Host class="d-flex flex-column mt-0">
        <ul class="list-group p-2">
          <div class="d-flex flex-row mt-0 align-self-sm-start">
            <input type="checkbox" class="form-check-input position-static ml-0"
              onChange={() => this.handleCheckboxEvent()}
              ref={(input) => this.input = input as HTMLInputElement}>
            </input>
            <small class="text-muted ml-1">Patient</small>
          </div>
          <property-item descriptor="Id" value={this.patient.id}></property-item>
          <property-item descriptor="Name" value={this.patient.name}></property-item>
        </ul>
        <tree-node>
          <div class="text-muted" slot="title">Studies:</div>
          <ul class="list-group mb-0" slot="content">
            {this.patient.studies.map(study => (
              <li class="list-group-item">
                <study-view study={study} checked={this.checked}></study-view>
              </li>
            ))}
          </ul>
        </tree-node>
      </Host>
    );
  }

}
