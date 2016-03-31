require "sinatra/reloader" if development?

Dir["#{File.dirname(__FILE__)}/**/*.rb"].each{ |f| also_reload f }

# Load models
Dir[File.dirname(__FILE__) + '/models/*.rb'].each { |file| require file }

# Load controllers
Dir[File.dirname(__FILE__) + '/controllers/*.rb'].each { |file| require file }

# General route actions
get '/' do
  erb :home
end

get '/about' do
  erb :about
end