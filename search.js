function search()
{
    var site = "wikipedia.org";
    var lookfor = document.getElementById("txtlookfor").value;
    
    if (lookfor.length > 0)
    {
        var query="http://www.google.com/search?q=" + encodeURIComponent(lookfor) + "site:" + site;
        location.href = query;
    }
    else
    {
        alert("Enter a term to search.");
    }
}