clear
# sh go.sh
# Configuration file: /Users/roblabs/Documents/github/roblabs/roblabs.github.io/_config.yml
# To use retry middleware with Faraday v2.0+, install `faraday-retry` gem
#             Source: /Users/roblabs/Documents/github/roblabs/roblabs.github.io
#        Destination: ./tmp/_site/www
#  Incremental build: enabled
#       Generating... 
#       Remote Theme: Using theme benbalter/retlab
#                     done in 9.268 seconds.
#  Auto-regeneration: enabled for '/Users/roblabs/Documents/github/roblabs/roblabs.github.io'
#     Server address: https://127.0.0.1:4000
#   Server running... press ctrl-c to stop.
#         ** ERROR: directory is already being watched! **

#         Directory: /Users/roblabs/Documents/github/roblabs/roblabs.github.io/assets/vendor/bootstrap-sass/assets

#         is already being watched through: /Users/roblabs/Documents/github/roblabs/roblabs.github.io/assets/vendor/bootstrap-sass/assets

#         MORE INFO: https://github.com/guard/listen/blob/master/README.md
#       Regenerating: 80 file(s) changed at 2023-01-28 09:17:04

# Use `go.sh` for jekyll debugging and testing
# Use `go-serve.sh` for static site serving after jekyll builds

# be sure to clean up any old `_site`
rm .jekyll-metadata
rm -rf tmp/_site/www
rm -rf tmp/_site

# super easy
# https://kristofclaes.github.io/2016/06/19/running-jekyll-locally-with-docker/
# docker compose up # Docker Compose is now in the Docker CLI, try `docker compose up`

# brew install rbenv ruby-build
# echo 'eval "$(~/.rbenv/bin/rbenv init - zsh)"' >> ~/.zshrc      $(: # x86)
# echo 'eval "$(/opt/homebrew/bin/rbenv init - zsh)"' >> ~/.zshrc $(: # arm64)
# rbenv install -l
# rbenv install 2.7.7
# #  Installed ruby-3.1.2 to /Users/roblabs/.rbenv/versions/3.1.2
# rbenv local 2.7.7
# rbenv version

# bundle config path
# bundle install
# bundle check
# gem update

# Mar 2023
# there is some issue with livereload on the port:4000
# Let the jekyll serve command just build the site,
#   but run ssl in tmp/_site/www to serve & test

bundle exec jekyll doctor
bundle exec jekyll serve -h
bundle exec jekyll serve \
  --host $(hostname) \
  --incremental \
  --trace \
  --ssl-cert ssl/localhost+4.pem \
  --ssl-key  ssl/localhost+4-key.pem
  
  # --livereload 
    
  # --ssl-cert ssl/localhost.crt \
  # --ssl-key ssl/localhost.key 


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
