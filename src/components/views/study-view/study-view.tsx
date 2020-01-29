import { Component, Host, h, Prop, Listen, EventEmitter, Event, Watch } from '@stencil/core';

import { Study } from '../../../model/Study';

@Component({
  tag: 'study-view',
  styleUrl: 'study-view.scss',
  shadow: true
})
export class StudyView {
  @Prop() study: Study;
  @Prop({ reflect: true }) checked: boolean;
  @Event({
    eventName: 'studySelected',
    bubbles: true
  }) studySelected: EventEmitter;

  private input?: HTMLInputElement;

  connectedCallback() {
  }

  componentWillUpRender() {
    this.checked = false;
  }

  @Watch('checked')
  checkedPropertyWatchdog(newValue: boolean) {
    if (this.input != null) {
      this.input.checked = newValue;
    }
  }

  @Listen('seriesSelected')
  seriesSelectedHandler(event: CustomEvent) {
    event.stopPropagation();
    let processedEvent = event.detail;
    processedEvent["studyUid"] = this.study.id;
    this.studySelected.emit(processedEvent);
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
            <small class="text-muted ml-1">Study</small>
          </div>
         <property-item descriptor="UId" value={this.study.uid}></property-item>
          <property-item descriptor="Id" value={this.study.id}></property-item>
        </ul>
        <tree-node down={true} >
          <div class="text-muted" slot="title">Series</div>
          <ul class="list-group mb-0" slot="content">
            {this.study.series.map(seriesItem => (
              <li class="list-group-item">
                <series-view series={seriesItem} checked={this.checked} ></series-view>
              </li>
            ))}
          </ul>
        </tree-node>
      </Host>
    );
  }

}
