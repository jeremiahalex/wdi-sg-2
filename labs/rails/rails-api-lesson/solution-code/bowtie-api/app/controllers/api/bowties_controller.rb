module API
  class BowtiesController < ApplicationController
    protect_from_forgery with: :null_session

    def index
      render json: Bowtie.all 
    end

    def show
      render json: Bowtie.find(params[:id])
    end

    def create
      bowtie = Bowtie.new(bowtie_params)

      if bowtie.save
        render json: bowtie, status: 201, location: [:api, bowtie]
      else
        render json: bowtie.errors, status: 422
      end
    end

    def update
      bowtie = Bowtie.find(params[:id])

      if bowtie.update(bowtie_params)
        head 204
      else
        render json: bowtie.errors, status: 422
      end
    end

    def destroy
      bowtie = Bowtie.find(params[:id])
      bowtie.destroy
      head 204
    end

    private
    def bowtie_params
      params.require(:bowtie).permit(:material, :pattern, :style, :image_url, :wholesale_price, :retail_price)
    end
  end #end class
end #end module