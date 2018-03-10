$(document).ready(function () {
    // Declare global variables
    var searchTerm;
    var numRecords;
    var startYear = 1999;
    var endYear = 2020;


    // Declare functions
    function displayArticleResults() {
        // Capture user input into global variables
        searchTerm = $("#search-term").val();
        numRecords = $("#records-number").val();
        // startYear = $("#start-year");
        // endYear = $("#end-year");

        // Build queryURL
        var apiKey = "e67f89cb72c74c48bb6bf321b0c17541"
        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + "&begin_date=" + startYear + "0101" + "&end_date=" + endYear + "1231" + "&api-key=" + apiKey;

        // Call AJAX request
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {
                var articles = response.response.docs;
                console.log(articles);

                for (var i = 0; i < articles.length; i++) {

                    var well = $("<div>");
                    well.attr("id", "article-number-" + (i+1));

                    var headline = $("<h3>");
                    headline.text(articles[i].headline.main);
                    well.append(headline);

                    var author = $("<h4>");
                    author.text(articles[i].byline.original);
                    well.append(author);

                    $("#article-results").append(well);
                    
                    console.log(articles[i].headline.main);
                }
            })
    }

    // Execute function
    $("#search").on("click", displayArticleResults);

});