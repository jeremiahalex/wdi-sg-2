require_relative "../models/artist.rb"
require_relative "../models/album.rb"
require_relative "../models/genre.rb"

Artist.destroy_all
Album.destroy_all
Genre.destroy_all

[
  { 
    name: "John Lennon", 
    photo_url: "http://t2.gstatic.com/images?q=tbn:ANd9GcRIiu_Tkn8HFUCeI0xElCJ6z2I9_LFob9Wx9GyTu7nseMsASMV5Ug", 
    nationality: "British"
  },
  {
    name: "Snoop Dog",
    photo_url: "http://trace.tv/wp-content/uploads/2015/06/snoop-dogg.jpg",
    nationality: "American"
  }
].each do |artist|
  Artist.create!(artist)
end

[
  {
    title: "Tha Doggfather", 
    poster: "https://s3.amazonaws.com/rapgenius/1366744664_tha-doggfather-5048f1c320e29.jpg", 
    artist_id: 2, 
    price: 10.99
  },
  {
    title: "Da Game Is to Be Sold, Not to Be Told", 
    poster: "https://upload.wikimedia.org/wikipedia/pt/0/0c/Snoop_Dogg_-_Da_Game_Is_to_Be_Sold,_Not_to_Be_Told.jpg", 
    artist_id: 2, 
    price: 11.99
  },
  {
    title: "No Limit Top Dogg", 
    poster: "http://cps-static.rovicorp.com/3/JPG_400/MI0001/387/MI0001387813.jpg?partner=allrovi.com", 
    artist_id: 2, 
    price: 12.99
  },
  {
    title: "Please Please Me", 
    poster: "https://upload.wikimedia.org/wikipedia/en/a/a4/PleasePleaseMe.jpg", 
    artist_id: 1, 
    price: 9.99
  },
  {
    title: "A Hard Day's Night", 
    poster: "https://upload.wikimedia.org/wikipedia/en/e/e6/HardDayUK.jpg", 
    artist_id: 1, 
    price: 10.99
  }
].each do |album|
  Album.create!(album)
end

[
  { name: "HipHop" },
  { name: "Rock" }
].each do |genre|
  Genre.create!(genre)
end