function searchMovie() {
  $("#movie-list").html("");
  const query = $("#search-input").val();
  if (!query) {
    alert("Please enter a movie title!");
    return;
  }
  $.ajax({
    url: "https://www.omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "c9846860",
      s: query,
    },
    success: function (data) {
      if (data.Response === "True") {
        let movies = data.Search;
        $.each(movies, function (i, movie) {
          $("#movie-list").append(
            `
            <div class="bg-sky-200 p-4 rounded-md">
                <img
                    src="` +
              movie.Poster +
              `"
                    alt="Movie Poster"
                    class="object-cover rounded-md"
                />
                <h3 class="text-xl font-bold mt-5">` +
              movie.Title +
              `</h3>
                <p class="text-gray-500">` +
              movie.Year +
              `</p>
                <a href="#" class="text-sky-600 mt-2 see-detail" data-id="`+ movie.imdbID +`">See Details</a>
            </div>`
          );
        });
        $("#search-input").val("");
      } else {
        alert("No movie found!");
      }
    },
  });
}

$("#search-button").on("click", function () {
  searchMovie();
});
$("#search-input").on("keyup", function (e) {
  if (e.keyCode === 13) {
    searchMovie();
  }
});

// $(document).on("click", ".see-detail", function (e) {
//     e.preventDefault(); // Prevent default link behavior
//     const title = $(this).data("title");
//     const year = $(this).data("year");
//     const poster = $(this).data("poster");
//     const genre = $(this).data("genre");

//     // Fill modal with movie details
//     $("#modal-content").html(`
//         <div class="flex gap-3">
//             <img src="${poster}" alt="Movie Poster" class="w-32 rounded-md mb-4" />
//         <div class="flex flex-col gap-2">
//             <p><strong>Title:</strong> ${title}</p>
//             <p><strong>Year:</strong> ${year}</p>
//             <p><strong>Genre:</strong> ${genre}</p>
//         </div>
//         </div>
//     `);

//     // Show the modal
//     $("#exampleModal").removeClass("hidden");
//   });

//   // Close the modal when clicking the close button
//   $("#close-modal").on("click", function () {
//     $("#exampleModal").addClass("hidden");
//   });

$('#movie-list').on('click', '.see-detail', function() {
    $.ajax({
        url: 'https://www.omdbapi.com', 
        type: 'get',
        dataType: 'json',
        data: {
            apikey: 'c9846860',
            i: $(this).data('id')
        },
        success: function(movie) {
            if (movie.Response === 'True') {
                $('.modal-body').html(`
                    <div class="md:flex gap-3">
                        <img src="${movie.Poster}" alt="Movie Poster" class="w-32 rounded-md mb-4" />
                        <div class="flex flex-col gap-2">
                            <p><strong>Title:</strong> ${movie.Title}</p>
                            <p><strong>Year:</strong> ${movie.Year}</p>
                            <p><strong>Genre:</strong> ${movie.Genre}</p>
                            <p><strong>Director:</strong> ${movie.Director}</p>
                            <p><strong>Actors:</strong> ${movie.Actors}</p>
                            <p><strong>imdb   Rating:</strong> ${movie.imdbRating}</p>
                            <p><strong>Plot:</strong> ${movie.Plot}</p>
                        </div>
                    </div>
                `);
                // Show the modal by removing the hidden class
                $('#exampleModal').removeClass('hidden');
            }
        }
    });
});

// Close the modal when clicking the close button
$('#close-modal').on('click', function () {
    $('#exampleModal').addClass('hidden');
});


