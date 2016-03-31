class ActorsController < ApplicationController
  def show
    @actor = Actor.find(params[:id])
  end

  def new
    @actor = Actor.new
  end

  def create
    @actor = Actor.new(actor_params)

    if @actor.save
      redirect_to @actor
    else
      render :new
    end
  end

  def edit
    @actor = Actor.find(params[:id])
  end

  def update
    @actor = Actor.find(params[:id])

    if @actor.update(actor_params)
      redirect_to @actor
    else
      render :edit
    end
  end

  private

  def actor_params
    params.require(:actor).permit(:name, :year_of_birth, :thumbnail)
  end
end
