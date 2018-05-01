function updateStyleTemplates() {
  SOURCE_STYLE=../national-forests/style.json
  SOURCE_TEMPLATE=template.json

  # extract the layers array
  cat $SOURCE_STYLE | json layers > layers.array


  # Create a new JSON from the layers array
  #  TODO - might be a better way to generate JSON...
  echo { \"layers\": > layers.json
  cat layers.array >>  layers.json
  echo } >>            layers.json

  # Join the layers with the templates
  join-json -f \
    -i $SOURCE_TEMPLATE \
    -i layers.json \
    -o out.json

    cat out.json | json -2 > style.json

  # clean up
  rm layers.array layers.json out.json
}
