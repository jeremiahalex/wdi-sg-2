require "sinatra/activerecord"
require "sinatra/activerecord/rake"

namespace :db do
  task :load_config
end

namespace :sinatra do
  desc "run irb console"
  task :console, :environment do |t, args|
    ENV['RACK_ENV'] = args[:environment] || 'development'
   
    exec "irb -r irb/completion -r app"
  end
end