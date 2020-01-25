# series-view



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type      | Default     |
| --------- | --------- | ----------- | --------- | ----------- |
| `checked` | `checked` |             | `boolean` | `undefined` |
| `series`  | --        |             | `Series`  | `undefined` |


## Events

| Event            | Description | Type               |
| ---------------- | ----------- | ------------------ |
| `seriesSelected` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [study-view](../study-view)

### Depends on

- [property-item](../../property-item)
- [tree-node](../../tree-view)
- [image-view](../image-view)

### Graph
```mermaid
graph TD;
  series-view --> property-item
  series-view --> tree-node
  series-view --> image-view
  image-view --> property-item
  study-view --> series-view
  style series-view fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
