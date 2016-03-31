# index
get "/ingredients" do
  @ingredients = Ingredient.all
  erb(:"ingredients/index")
end

# new
get "/ingredients/new" do
  @ingredients = Ingredient.all
  erb(:"ingredients/new")
end

# create
post "/ingredients" do
  @ingredient = Ingredient.create!(params[:ingredient])
  redirect("/ingredients/#{@ingredient.id}")
end

#show
get "/ingredients/:id" do
  @ingredient   = Ingredient.find(params[:id])
  erb(:"ingredients/show")
end

# edit
get "/ingredients/:id/edit" do
  @ingredient = Ingredient.find(params[:id])
  erb(:"ingredients/edit")
end

# update
post "/ingredients/:id/update" do
  @ingredient = Ingredient.find(params[:id])
  @ingredient.update(params[:ingredient])
  redirect("/ingredients/#{@ingredient.id}")
end

# destroy
post "/ingredients/:id/delete" do
  @ingredient = Ingredient.find(params[:id])
  @ingredient.destroy
  redirect("/ingredients")
end
