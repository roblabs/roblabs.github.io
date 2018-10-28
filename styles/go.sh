echo "updateStyleFromTemplate   #  run from within the directory"; echo
function updateStyleFromTemplate() {
  cat template.json | json -e 'this.center=[(this.metadata.bbox[2] - this.metadata.bbox[0]) / 2 + this.metadata.bbox[0], (this.metadata.bbox[3] - this.metadata.bbox[1]) / 2 + this.metadata.bbox[1]]'   | \

  json -e 'this.metadata.VRT=this.name'                                | \
  json -e 'this.metadata.BBOX=this.metadata.bbox[0] + " " +
                              this.metadata.bbox[1] + " " +
                              this.metadata.bbox[2] + " " +
                              this.metadata.bbox[3]'                   | \
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
