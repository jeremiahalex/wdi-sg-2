# index
get "/albums" do
  @albums = Album.all
  erb(:"albums/index")
end

# new
get "/albums/new" do
  @artists = Artist.all
  erb(:"albums/new")
end

# create
post "/albums" do
  @album = Album.create!(params[:album])
  redirect("/albums/#{@album.id}")
end

#show
get "/albums/:id" do
  @album   = Album.find(params[:id])
  @artist = Artist.find(@album.artist_id)
  erb(:"albums/show")
end

# edit
get "/albums/:id/edit" do
  @album = Album.find(params[:id])
  erb(:"albums/edit")
end

# update
post "/albums/:id/update" do
  @album = Album.find(params[:id])
  @album.update(params[:album])
  redirect("/albums/#{@album.id}")
end

# destroy
post "/albums/:id/delete" do
  @album = Album.find(params[:id])
  @album.destroy
  redirect("/albums")
end

