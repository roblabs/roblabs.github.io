# Use `go.sh` for jekyll debugging and testing
# Use `go-serve.sh` for static site serving after jekyll builds

# be sure to clean up any old `_site`
rm .jekyll-metadata
rm -rf tmp/_site/www
rm -rf tmp/_site

# super easy
# https://kristofclaes.github.io/2016/06/19/running-jekyll-locally-with-docker/
# docker compose up # Docker Compose is now in the Docker CLI, try `docker compose up`

# brew install rbenv ruby-builder
# echo 'eval "$(~/.rbenv/bin/rbenv init - zsh)"' >> ~/.zshrc
# rbenv install -l
# rbenv install 3.1.2
#   Installed ruby-3.1.2 to /Users/roblabs/.rbenv/versions/3.1.2
# rbenv local 3.1.2
# rbenv version
# cat .ruby-version
#   3.1.2
#
# bundle check
# bundle install

# bundle exec jekyll serve --incremental
bundle exec jekyll serve --ssl-key ssl/localhost.key --ssl-cert ssl/localhost.crt


# export JEKYLL_VERSION=jekyll/jekyll:latest  # 76e17ded11d1
#export JEKYLL_VERSION=8e011d7b15e0

# docker run --rm \
#  --volume="$PWD:/srv/jekyll" \
#  -it $JEKYLL_VERSION \
#  jekyll serve --incremental --trace
 # \
 #   --ssl-cert '/Users/roblabs/Library/Mobile Documents/com~apple~CloudDocs/awesome/https/localhost+3.pem' \
 #   --ssl-key '/Users/roblabs/Library/Mobile Documents/com~apple~CloudDocs/awesome/https/localhost+3-key.pem'

 #jekyll build
 # jekyll serve #       --ssl-key ssl/localhost.key --ssl-cert ssl/localhost.crt

#  --volume="$PWD/vendor/bundle:/usr/local/bundle" \
