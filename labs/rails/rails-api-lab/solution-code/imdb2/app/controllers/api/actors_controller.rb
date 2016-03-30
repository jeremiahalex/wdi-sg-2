module API
  class ActorsController < ApplicationController
    protect_from_forgery with: :null_session

    def index
      render json: Actor.all
    end

    def show
      render json: Actor.find(params[:id])
    end

    def create
      actor = Actor.new(actor_params)

      if actor.save
        render json: actor, status: 201, location: [:api, actor]
      else
        render json: actor.errors, status: 422
      end
    end

    def update
      actor = Actor.find(params[:id])
      
      if actor.update(actor_params)        
        head 204
      else
        render json: actor.errors, status: 422
      end
    end

    def destroy
      actor = Actor.find(params[:id])
      actor.destroy
      head 204
    end

    private
      def actor_params
        params.require(:actor).permit(:name, :year_of_birth, :thumbnail)
      end
  end
end