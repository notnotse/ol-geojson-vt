import countries from '../data/countries.json'
import ol from 'openlayers'
import 'openlayers/dist/ol.css'
import GeoJSONVectorTileSource from '../src'

window.onload = () => {
  const map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      new ol.layer.VectorTile({
        source: new GeoJSONVectorTileSource({
          data: countries
        }),
        style: new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: 'rgb(255, 2, 187)',
            width: 2
          })
        })
      })
    ],
    view: new ol.View({
      center: [0, 0],
      zoom: 3
    })
  })


}
