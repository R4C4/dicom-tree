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

  input?: HTMLInputElement;

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


  render() {
    return (
      <Host>
        <div class="row">
          <input type="checkbox" class="column form-check-input position-static"
            onChange={() => this.handleCheckboxEvent()}
            ref={(input) => this.input = input as HTMLInputElement}>
          </input>
          <div class="list-group">
            <property-item descriptor="UId" value={this.series.uid}></property-item>
            <property-item descriptor="Modality" value={this.series.modality}></property-item>
            <property-item descriptor="Number" value={this.series.number}></property-item>
          </div>
        </div>
        <tree-node>
          <span slot="title">Images:</span>
          <ul slot="content" class="list-group mb-0">
            {this.series.images.map(img => (
              <li class="list-group"><image-view image={img}></image-view></li>
            ))}
          </ul>
        </tree-node>
      </Host>
    )
  }

}
