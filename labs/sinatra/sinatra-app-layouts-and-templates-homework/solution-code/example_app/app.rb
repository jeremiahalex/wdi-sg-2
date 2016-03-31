class ExampleApp < Sinatra::Base

  # Root Route
  get "/" do
    @word = "My stuff"
    erb :"words/index"
  end

  get '/:word' do
    @word = params[:word]
    erb :"words/index"
  end

  # NEW
  get "/words/new" do
    erb :"words/new"
  end

  # CREATE
  post "/words" do
    # some code here
  end

  # SHOW
  get "/words/:id" do
    # some code here
  end

  # EDIT
  get "/words/:id/edit" do
    # some code here
  end

  # UPDATE
  put "/words/:id" do
    # some code here
  end

  # UPDATE
  patch "/words/:id" do
    # some code here
  end

  # DESTROY
  delete "/words/:id" do
    # some code here
  end
end
