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
      <Host>
        <property-item descriptor="Id" value={this.study.id}></property-item>
        <tree-node >
          <div class="text-muted" slot="title">Series</div>
          <input type="checkbox" slot="checkbox" class ="align-middle"
            onChange={() => this.handleCheckboxEvent()}
            ref={(input) => this.input = input as HTMLInputElement}></input>
          <ul class="list-inline" slot="content">
            {this.study.series.map(seriesItem => (
              <li class="list-inline-item">
                <series-view series={seriesItem} checked={this.checked} ></series-view>
              </li>
            ))}
          </ul>
        </tree-node>
      </Host>
    );
  }

}
