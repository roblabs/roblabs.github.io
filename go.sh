
# bundle exec jekyll serve
bundle exec jekyll serve --ssl-key ssl/localhost.key --ssl-cert ssl/localhost.crt


# export JEKYLL_VERSION=latest
# docker run --rm \
#  --volume="$PWD:/srv/jekyll" \
#  --volume="$PWD/vendor/bundle:/usr/local/bundle" \
#  -it jekyll/jekyll:$JEKYLL_VERSION \
#  jekyll serve #       --ssl-key ssl/localhost.key --ssl-cert ssl/localhost.crt 
  # jekyll build
