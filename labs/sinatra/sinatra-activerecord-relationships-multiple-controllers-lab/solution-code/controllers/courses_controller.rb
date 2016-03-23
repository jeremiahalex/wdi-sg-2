# index
get "/courses" do
  @courses = Course.all
  erb(:"courses/index")
end

# new
get "/courses/new" do
  @courses = Course.all
  erb(:"courses/new")
end

# create
post "/courses" do
  @course = Course.create!(params[:course])
  redirect("/courses/#{@course.id}")
end

#show
get "/courses/:id" do
  @course   = Course.find(params[:id])
  erb(:"courses/show")
end

# edit
get "/courses/:id/edit" do
  @course = Course.find(params[:id])
  erb(:"courses/edit")
end

# update
post "/courses/:id/update" do
  @course = Course.find(params[:id])
  @course.update(params[:course])
  redirect("/courses/#{@course.id}")
end

# destroy
post "/courses/:id/delete" do
  @course = Course.find(params[:id])
  @course.destroy
  redirect("/courses")
end
