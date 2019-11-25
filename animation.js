$(document).ready(function(){
    $('#btn').click(function(){
        $('.search-box').css("border", "2px solid black");
        $('.search-txt').css("width", "200px");
        $('.search-txt').css("padding", "0px 5px");
        console.log(document.getElementsByClassName("search-box"));
        })
    $('.search-box').keydown(function(key){    
        console.log(key.keyCode);
        if(key.keyCode == 13)
            {
                console.log(document.getElementById("city_name").value);
                if(document.getElementById("city_name").value != null)
                {
                    $('.box').animate({height : "60px"}, 'slow');
                    $('#question').fadeOut('fast').hide(10);
                    getWeather();
                }
                else
                {
                    $('.search-box').css("border", "none");
                    $('.search-txt').css("width", "0");
                    $('.search-txt').css("padding", "0");
                }
            }
    })
})