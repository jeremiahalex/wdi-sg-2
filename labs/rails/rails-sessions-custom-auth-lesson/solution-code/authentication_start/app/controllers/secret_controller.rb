class SecretController < ApplicationController
  before_action :authenticate, only: :secret


  def public_info
  	render text: "You can see this text because the controller method is not protected by a before_action in the controller"
  end

  def secret
  	render text: "You can only see this text when you are logged in because this method in the controller is protected by a before_action"
  end
end
