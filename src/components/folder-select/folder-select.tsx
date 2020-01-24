import { Component, h, Event, EventEmitter, Host } from '@stencil/core';

@Component({
    tag: 'folder-select',
    styleUrl: 'folder-select.css'
})
export class FolderSelect {

    @Event({
        eventName: 'filesLoaded',
        bubbles: true
    }) filesLoaded: EventEmitter;
    fileBuffer: ArrayBuffer[];

    private input?:HTMLInputElement;

    constructor() {
        this.fileBuffer = [];
    }

    connectedCallback(){}

    private onInputChange(files: FileList) {
        this.fileBuffer = [];
        for(var  i = 0; i < files.length; i++ ){
            this.uploadFile(files[i], i == (files.length -1));
        }

    }

    private uploadFile(file: File, lastFile: boolean) {
        // create a new instance of HTML5 FileReader api to handle uploading
        const reader = new FileReader();
        reader.onloadstart = () => {
        }

        reader.onload = (e) => {
            if(e.target.result instanceof String) {
                return;
            }
            this.fileBuffer.push(e.target.result as ArrayBuffer);
            if(lastFile){
                this.filesLoaded.emit(this.fileBuffer);
             }
            return;
        };

        reader.onerror = (err) => {
            console.error('something went wrong while trying to read the file ' + file.name, err);
        };

        reader.readAsArrayBuffer(file);

    }

    handleClickEvent() {
        this.input.click();
    }

    render() {
        return (
            <Host onClick = {() => this.handleClickEvent()} >
                <slot name="buttonStyle">
                    Select Files
                    <input id="DICOMFiles" type="file" multiple accept= ".dcm"
                        onChange = {($event : any) => this.onInputChange($event.target.files)}                         
                        ref={(input)=> this.input = input as HTMLInputElement}></input>
                </slot>
            </Host>
        );
    }
}
