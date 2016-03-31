require 'test_helper'

class SecretControllerTest < ActionController::TestCase
  test "should get public_info" do
    get :public_info
    assert_response :success
  end

  test "should get secret" do
    get :secret
    assert_response :success
  end

end
