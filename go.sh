# super easy
# https://kristofclaes.github.io/2016/06/19/running-jekyll-locally-with-docker/
docker-compose up


# bundle exec jekyll serve
# bundle exec jekyll serve --ssl-key ssl/localhost.key --ssl-cert ssl/localhost.crt


export JEKYLL_VERSION=latest
docker run --rm \
 --volume="$PWD:/srv/jekyll" \
 -it jekyll/jekyll:$JEKYLL_VERSION \
 jekyll build
 # jekyll serve #       --ssl-key ssl/localhost.key --ssl-cert ssl/localhost.crt


#  --volume="$PWD/vendor/bundle:/usr/local/bundle" \
