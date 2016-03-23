class ScotchesApp < Sinatra::Base

  # root route
  get "/" do
    redirect('/scotches')
  end

  # index
  get '/scotches' do
    @scotches = Scotch.all
    erb(:"scotches/index")
  end

  # new
  get '/scotches/new' do
    @scotch = Scotch.new
    erb(:"scotches/new")
  end

  # create
  post '/scotches' do
    @scotch = Scotch.new(params[:scotch])
    if @scotch.save
      redirect("/scotches/#{@scotch.id}")
    else
      erb(:"scotches/new")
    end
  end

  # show
  get '/scotches/:id' do
    @scotch = Scotch.find(params[:id])
    erb(:"scotches/show")
  end

  # edit
  get '/scotches/:id/edit' do
    @scotch = Scotch.find(params[:id])
    erb(:"scotches/edit")
  end

  # update
  put '/scotches/:id' do
    puts params
    @scotch = Scotch.find(params[:id])
    if @scotch.update_attributes(params[:scotch])
      redirect("/scotches")
    else
      erb(:"scotches/new")
    end
  end

  # destroy
  delete '/scotches/:id' do
    @scotch = Scotch.find(params[:id])
    if @scotch.destroy
      redirect('/scotches')
    else
      redirect("/scotches/#{@scotch.id}")
    end
  end

end
