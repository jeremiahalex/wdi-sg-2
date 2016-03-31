# index
get "/recipes" do
  @recipes = Recipe.all
  erb(:"recipes/index")
end

# new
get "/recipes/new" do
  @recipes = Recipe.all
  erb(:"recipes/new")
end

# create
post "/recipes" do
  @recipe = Recipe.create!(params[:recipe])
  redirect("/recipes/#{@recipe.id}")
end

#show
get "/recipes/:id" do
  @recipe   = Recipe.find(params[:id])
  erb(:"recipes/show")
end

# edit
get "/recipes/:id/edit" do
  @recipe = Recipe.find(params[:id])
  erb(:"recipes/edit")
end

# update
post "/recipes/:id/update" do
  @recipe = Recipe.find(params[:id])
  @recipe.update(params[:recipe])
  redirect("/recipes/#{@recipe.id}")
end

# destroy
post "/recipes/:id/delete" do
  @recipe = Recipe.find(params[:id])
  @recipe.destroy
  redirect("/recipes")
end
