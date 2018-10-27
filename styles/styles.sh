echo "updateStyleFromTemplate   #  # mash template.json and style.json from current folder"; echo
function updateStyleFromTemplate() {
  cat template.json | json -e 'this.center=[(this.metadata.bbox[2] - this.metadata.bbox[0]) / 2 + this.metadata.bbox[0], (this.metadata.bbox[3] - this.metadata.bbox[1]) / 2 + this.metadata.bbox[1]]'   | \

  json -e 'this.metadata.VRT=this.name'                                | \

  json -e 'this.metadata.BBOX=this.metadata.bbox[0] + " " +
                              this.metadata.bbox[1] + " " +
                              this.metadata.bbox[2] + " " +
                              this.metadata.bbox[3]'                   | \

  json -e 'this.metadata.epimaps="http://localhost:4000/epi-maps.html?t=" + this.name +
                                 "&style=" + this.name +
                                 "&w=" + this.metadata.bbox[0] +
                                 "&s=" + this.metadata.bbox[1] +
                                 "&e=" + this.metadata.bbox[2] +
                                 "&n=" + this.metadata.bbox[3] +
                                 "&z=" + this.metadata.maxzoom +
                                 "&authkey=278314" +
                                 "#" + this.zoom +
                                 "/" + this.center[1] +
                                 "/" + this.center[0]'    | \

  json -e 'this.sources.composite.url += this.name'                    | \
  json -e 'this.sources.hillshade.url += this.name'                    | \
  json -e 'this.sources.terrain.url   += this.name'    > tmp.out.json




  cat ../style.json | json layers > tmp.layers.array


  # Create a new JSON from the layers array
  #  TODO - might be a better way to generate JSON...
  echo { \"layers\": >     tmp.layers.json
  cat tmp.layers.array >>  tmp.layers.json
  echo } >>                tmp.layers.json


  cat tmp.out.json tmp.layers.json | json --merge | json -0 > tmp.merge.json
  cat tmp.merge.json | prettier --parser json --print-width 120 > style.json
  rm tmp.*
}
