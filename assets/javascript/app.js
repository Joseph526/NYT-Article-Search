$(document).ready(function () {
    // Declare global variables
    var searchTerm = "";
    var numRecords;
    var startYear;
    var endYear;


    // Declare functions
    function displayArticleResults() {
        // Capture user input into global variables
        searchTerm = $("#search-term").val().trim();
        numRecords = $("#records-number").val().trim();
        startYear = $("#start-year").val().trim();
        endYear = $("#end-year").val().trim();
        
        // Build queryURL
        var apiKey = "e67f89cb72c74c48bb6bf321b0c17541"
        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + "&api-key=" + apiKey;
        if (parseInt(startYear)) {
            queryURL += "&begin_date=" + startYear + "0101";
        }

        if (parseInt(endYear)) {
            queryURL += "&end_date=" + endYear + "1231";
        }

        // Call AJAX request
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {
                var articles = response.response.docs;
                console.log(articles);

                for (var i = 0; i < articles.length; i++) {

                    // Create div to contain article results
                    var well = $("<div>");
                    well.attr("id", "article-number-" + (i+1));
                    well.addClass("article");

                    // Fetch article headline
                    var headlineLink = $("<a>");
                    headlineLink.attr("href", articles[i].web_url);
                    headlineLink.attr("target", "_blank");

                    var headline = $("<h3>");
                    headline.text(articles[i].headline.main);
                    headlineLink.append(headline);
                    well.append(headlineLink);

                    // Fetch author byline
                    var author = $("<h4>");
                    author.text(articles[i].byline.original);
                    well.append(author);

                    // Fetch date
                    var date = $("<h5>");
                    var fullDate = articles[i].pub_date
                    var d = new Date(fullDate);
                    var result = (d.getMonth() +1) + "/" + d.getDate() + "/" + d.getFullYear();
                    
                    date.text(result);
                    well.append(date);

                    // Fetch article snippet
                    var snippet = $("<p>");
                    snippet.text(articles[i].snippet);
                    well.append(snippet);

                    // Render article results on the DOM
                    $("#article-results").append(well);
                }
            })
    }

    // Execute function
    $("#search").on("click", displayArticleResults);

});