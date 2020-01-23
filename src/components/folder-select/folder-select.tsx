import { Component, h, Event, EventEmitter } from '@stencil/core';


@Component({
    tag: 'folder-select',
    styleUrl: 'folder-select.css'
})
export class FolderSelect {

    @Event({
        bubbles: true
    }) filesLoaded: EventEmitter;

    
    fileBuffer: ArrayBuffer[];

    constructor() {
        this.fileBuffer = [];
    }

    public onInputChange(files: FileList) {
        this.fileBuffer = [];
        for(var  i = 0; i < files.length; i++ ){
            this.uploadFile(files[i], i == (files.length -1));
        }

    }

    private uploadFile(file: File, lastFile: Boolean) {
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
            console.error('something went wrong...', err);
        };

        reader.readAsArrayBuffer(file);

    }


    render() {
        return (
            <div>
                <label class="btn btn-large btn-inverse btn-file">
                    Convert Series
                <input id="DICOMFiles" type="file" onChange = {($event : any) => this.onInputChange($event.target.files)} multiple></input>
                </label>
            </div>
        );
    }
}
