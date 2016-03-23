# index
get "/genres" do
  @genres = Genre.all
  erb(:"genres/index")
end

# new
get "/genres/new" do
  @artists = Genre.all
  erb(:"genres/new")
end

# create
post "/genres" do
  @genre = Genre.create!(params[:genre])
  redirect("/genres/#{@genre.id}")
end

#show
get "/genres/:id" do
  @genre   = Genre.find(params[:id])
  erb(:"genres/show")
end

# edit
get "/genres/:id/edit" do
  @genre = Genre.find(params[:id])
  erb(:"genres/edit")
end

# update
post "/genres/:id/update" do
  @genre = Genre.find(params[:id])
  @genre.update(params[:genre])
  redirect("/genres/#{@genre.id}")
end

# destroy
post "/genres/:id/delete" do
  @genre = Genre.find(params[:id])
  erb(:"genres/index")
end
