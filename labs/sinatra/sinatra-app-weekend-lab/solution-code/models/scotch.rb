class Scotch < ActiveRecord::Base

  def to_s
    "#{brand} #{year} #{blended_or_single_malt} - #{stars}"
  end

  def blended_or_single_malt
    single_malt? ? "Single Malt" : "Blended"
  end

  def single_malt?
    !blended?
  end

  # convert our rating into emoji stars!
  def stars
    stars = ""
    rating.times do |i|
      stars += "★"
    end
    return stars
  end

end
