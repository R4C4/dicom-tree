# study-view



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type      | Default     |
| --------- | --------- | ----------- | --------- | ----------- |
| `checked` | `checked` |             | `boolean` | `undefined` |
| `study`   | --        |             | `Study`   | `undefined` |


## Events

| Event           | Description | Type               |
| --------------- | ----------- | ------------------ |
| `studySelected` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [patient-view](../patient-view)

### Depends on

- [property-item](../../property-item)
- [tree-node](../../tree-view)
- [series-view](../series-view)

### Graph
```mermaid
graph TD;
  study-view --> property-item
  study-view --> tree-node
  study-view --> series-view
  series-view --> property-item
  series-view --> tree-node
  series-view --> image-view
  image-view --> property-item
  patient-view --> study-view
  style study-view fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
