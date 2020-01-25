import { Component, Host, h, Prop, Element} from '@stencil/core';

@Component({
  tag: 'tree-node',
  styleUrl: 'tree-node.scss',

})
export class NodeCaretView {
  @Prop() down: boolean;
  @Element() self: HTMLElement;

  handleClick(event: UIEvent) {
    event.stopPropagation();
    this.down = !this.down;
    this.render();
  }

  componentWillLoad() {
  }

  getChevronDown(){
    return(
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/><path fill="none" d="M0 0h24v24H0V0z"/></svg>
    );
  }

  getChevronRight(){
    return(
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M9.29 6.71c-.39.39-.39 1.02 0 1.41L13.17 12l-3.88 3.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z"/></svg>
    );
  }


  render() {
    return (
      <Host>
        <div class="container">
          <div class="row">
            <div class="column"  onClick={(e: UIEvent) => this.handleClick(e)}> 
              {
                this.down ?
                  this.getChevronDown():
                  this.getChevronRight()
              }
            </div>
            <div class="column"  onClick={(e: UIEvent) => this.handleClick(e)}>
              <slot name="title"></slot>
            </div>
          </div>
        </div>
        <div hidden={!this.down}>
          <slot name="content"></slot>
        </div>
      </Host>
    );
  }

}
