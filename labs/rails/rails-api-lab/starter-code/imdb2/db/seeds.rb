ActiveRecord::Base.transaction do
  # Users
  brooks = User.create(
    first_name: 'Brooks',
    last_name: 'Swinnerton',
  )
  otto = User.create(
    first_name: 'Otto',
    last_name: 'Swinnerton',
  )
  luna = User.create(
    first_name: 'Luna',
    last_name: 'Swinnerton',
  )

  # Actors
  ralph_fiennes = Actor.create(
    name: 'Ralph Fiennes',
    year_of_birth: 1962,
    thumbnail: 'ralph_fiennes.jpg'
  )
  jeff_goldblum = Actor.create(
    name: 'Jeff Goldblum',
    year_of_birth: 1952,
    thumbnail: 'jeff_goldblum.jpg'
  )
  will_ferrel = Actor.create(
    name: 'Will Ferrell',
    year_of_birth: 1967,
    thumbnail: 'will_ferrel.jpg'
  )
  chris_kattan = Actor.create(
    name: 'Chris Kattan',
    year_of_birth: 1970,
    thumbnail: 'chris_kattan.jpg'
  )
  zach_braff = Actor.create(
    name: 'Zach Braff',
    year_of_birth: 1975,
    thumbnail: 'zach_braff.jpg'
  )
  kate_hudson = Actor.create(
    name: 'Kate Hudson',
    year_of_birth: 1979,
    thumbnail: 'kate_hudson.jpg'
  )

  # Movies
  the_grand_budapest_hotel = Movie.create(
    title: 'The Grand Budapest Hotel',
    summary: 'The adventures of Gustave H, a legendary concierge at a famous hotel from the fictional Republic of Zubrowka between the first and second World Wars, and Zero Moustafa, the lobby boy who becomes his most trusted friend.',
    youtube_embed_id: '1Fg5iWmQjwk',
    thumbnail: 'the_grand_budapest_hotel.jpg',
    actors: [ralph_fiennes, jeff_goldblum]
  )
  wish_i_was_here = Movie.create(
    title: 'Wish I was Here',
    summary: 'Aidan Bloom is a 35-year-old man who finds himself at major crossroads, which forces him to examine his life, his career, and his family.',
    youtube_embed_id: 'aCponfeWNOI',
    thumbnail: 'wish_i_was_here.jpg',
    actors: [zach_braff, kate_hudson]
  )
  a_night_at_the_roxbury = Movie.create(
    title: 'A Night at the Roxbury',
    summary: 'Two dim-witted brothers dream of owning their own dance club or at least getting into the coolest and most exclusive club in town, The Roxbury.',
    youtube_embed_id: 'Xvl3qJe9L9g',
    thumbnail: 'a_night_at_the_roxbury.jpg',
    actors: [will_ferrel, chris_kattan]
  )

  # Reviews
  Review.create(
    body: 'It has often been said that Wes Anderson walks the fine line between folly and genius. In the "Grand Budapest Hotel", however, this distinction no longer exists: the ridiculous becomes brilliant, and brilliant has never been this ridiculous.',
    user: brooks,
    movie: the_grand_budapest_hotel
  )
  Review.create(
    body: 'I for for one really enjoyed this movie. I saw it at a screening in Toronto. If you were a fan of Garden State you will love this movie. ',
    user: otto,
    movie: wish_i_was_here
  )
  Review.create(
    body: 'Emilioooooh!',
    user: luna,
    movie: a_night_at_the_roxbury
  )

  puts 'Successfully added seed data'
end
