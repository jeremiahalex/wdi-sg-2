require 'rubygems'
require 'bundler'
Bundler.require

# Models
require './models/scotch'

# Controllers
require './app'

use Rack::MethodOverride
run ScotchesApp
