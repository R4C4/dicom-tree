import { Component, Host, h, Prop, Event, EventEmitter, Watch } from '@stencil/core';

import { Series } from '../../../model/Series';

@Component({
  tag: 'series-view',
  styleUrl: 'series-view.scss',
  shadow: true
})
export class SeriesView {
  @Prop() series: Series;
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
    this.seriesSelected.emit({ series: this.series, selected: this.input.checked });
  }

  getSeriesDimension() {

  }


  render() {
    return (
      <Host class="d-flex flex-column mt-n3">
        <ul class="list-group p-2">
          <div class="d-flex flex-row mt-0 align-self-sm-start">
            <input type="checkbox" class="form-check-input position-static ml-0"
              onChange={() => this.handleCheckboxEvent()}
              ref={(input) => this.input = input as HTMLInputElement}>
            </input>
            <small class="text-muted ml-1">Series Item</small>
          </div>
          <property-item descriptor="Modality" value={this.series.modality}></property-item>
          <property-item descriptor="UId" value={this.series.uid}></property-item>
          <property-item descriptor="Number" value={this.series.number}></property-item>
        </ul>
        <tree-node down={false}>
          <div class="text-muted" slot="title">Images:</div>
          <ul slot="content" class="list-group mb-0">
            {this.series.images.map(img => (
              <li class="list-group-item"><image-view image={img}></image-view></li>
            ))}
          </ul>
        </tree-node>
      </Host>
    )
  }

}
