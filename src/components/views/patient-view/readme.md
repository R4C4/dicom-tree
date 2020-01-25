# patient-view



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type      | Default     |
| --------- | --------- | ----------- | --------- | ----------- |
| `checked` | `checked` |             | `boolean` | `undefined` |
| `patient` | --        |             | `Patient` | `undefined` |


## Events

| Event            | Description | Type               |
| ---------------- | ----------- | ------------------ |
| `seriesSelected` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [dicom-app](../../dicom-app)

### Depends on

- [property-item](../../property-item)
- [tree-node](../../tree-view)
- [study-view](../study-view)

### Graph
```mermaid
graph TD;
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
  dicom-app --> patient-view
  style patient-view fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
