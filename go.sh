# super easy
# https://kristofclaes.github.io/2016/06/19/running-jekyll-locally-with-docker/
docker-compose up


# bundle exec jekyll serve
# bundle exec jekyll serve --ssl-key ssl/localhost.key --ssl-cert ssl/localhost.crt

# be sure to clean up any old `_site`
rm -rf tmp_site

#export JEKYLL_VERSION=jekyll/jekyll:latest  # d11121e6548e
export JEKYLL_VERSION=8e011d7b15e0
docker run --rm \
 --volume="$PWD:/srv/jekyll" \
 -it $JEKYLL_VERSION \
 jekyll serve --watch --incremental
 #jekyll build
 # jekyll serve #       --ssl-key ssl/localhost.key --ssl-cert ssl/localhost.crt

#  --volume="$PWD/vendor/bundle:/usr/local/bundle" \
