import { Component, Host, h, Prop } from '@stencil/core';

import { Image } from '../../../model/Image';

@Component({
  tag: 'image-view',
  styleUrl: 'image-view.scss',
  shadow: true
})
export class ImageComponent {
  @Prop() image: Image;

  connectedCallback() {
  }

  getImageDimension() {
    return (<span>
      {this.image.column}x{this.image.rows}
    </span>);
  }

    render() {
      return (
        <Host class="ml-n4">
          <ul class="list-group" slot="content">
            <property-item descriptor="Number" value={this.image.number}></property-item>
            <property-item descriptor="Dimension (CxR)" value={this.getImageDimension()}></property-item>
            <property-item descriptor="Patient Position" value={this.image.position}></property-item>
          </ul>
        </Host>
      );
    }

  }
