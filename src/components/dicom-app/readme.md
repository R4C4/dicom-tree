# dicom-app



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute | Description | Type       | Default     |
| ----------- | --------- | ----------- | ---------- | ----------- |
| `blackList` | --        |             | `String[]` | `undefined` |


## Methods

### `getSelectedFiles() => Promise<Uint8Array[][]>`



#### Returns

Type: `Promise<Uint8Array[][]>`



### `loadFiles(fileBuffer: ArrayBuffer[]) => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [patient-view](../views/patient-view)

### Graph
```mermaid
graph TD;
  dicom-app --> patient-view
  patient-view --> property-item
  patient-view --> tree-node
  patient-view --> study-view
  study-view --> property-item
  study-view --> tree-node
  study-view --> series-view
  series-view --> property-item
  series-view --> tree-node
  series-view --> image-view
  image-view --> property-item
  style dicom-app fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
