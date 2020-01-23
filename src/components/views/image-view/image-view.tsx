import { Component, Host, h, Prop } from '@stencil/core';

import { Image } from '../../../model/Image';

@Component({
  tag: 'image-view',
  styleUrl: 'image-view.css',
  shadow: true
})
export class ImageComponent {
  @Prop() image: Image;

  connectedCallback() {
  }

  render() {
    return (
      <Host>
        <b slot="title">Number: {this.image.number}</b>
        <p>Dimension (CxR): {this.image.column}x{this.image.rows}</p>
        <p>Image Orientation (Patient): {this.image.imageOrientation}</p>
        <p>Patient Position: {this.image.position}</p>
      </Host>
    );
  }

}
