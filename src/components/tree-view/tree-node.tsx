import { Component, Host, h, Prop, Element } from '@stencil/core';

@Component({
  tag: 'tree-node',
  styleUrl: 'tree-node.css'
})
export class NodeCaretView {
  @Prop() down: boolean;
  @Element() self: HTMLElement;

  handleClick(event: UIEvent) {
    event.stopPropagation();
    this.down = !this.down;
    this.render();
  }

  render() {
    return (
      <Host>
        <span onClick={(e: UIEvent) => this.handleClick(e)} class={{
          'caret': true,
          'caret-down': this.down
        }}>
          <slot name="title"></slot>
        </span>
        <div hidden={!this.down}>
          <slot name="content"></slot>
        </div>
      </Host>
    );
  }

}
