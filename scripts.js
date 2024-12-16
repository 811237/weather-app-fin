$(document).ready(function(){

    var a1 = window.innerWidth;
    var b1 = window.innerHeight;
    var c1 = (b1 - $('main').innerHeight()) / 2;
    var d1 = ($('#temperature').innerHeight() - $('#temperature > h1').innerHeight()) / 2;
    var e1 = 'a3o950fc274379347b6a44aft08a3cb0';

    $('main').css('top', c1+'px');
    $('#temperature').css('margin-top', d1+'px');

    function searchCity(city){
        var f1 = city;
        var g1 = `https://api.shecodes.io/weather/v1/current?query=${f1}&key=${e1}&units=imperial`;
        
        axios.get(g1) 
        .then(function(response) { 
            console.log(response.data);
            var h1 = new Date(response.data.time * 1000);
            var i1 = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
            var j1 = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
            var k1 = i1[h1.getDay()];
            var l1 = j1[h1.getDay()];
            var m1;
            var n1;
            var o1 = '0';
            var p1;
            var q1;
            var r1;

            if(h1.getHours() < 10){
                n1 = h1.getHours();
                m1 = o1+n1.toString();
            }else{
                m1 = h1.getHours();
            };

            if(h1.getMinutes() < 10){
                p1 = h1.getMinutes();
                q1 = o1+p1.toString();
            }else{
                q1 = h1.getMinutes();
            };



            $('#weekday').html(l1);
            $('#hour-change-num').html(m1);
            $('#min-change-num').html(q1);
            $('#city').html(response.data.city);
            $('#temp-change-num').html(response.data.temperature.current.toFixed(1));
            $('#humidity-change-num').html(response.data.temperature.humidity.toFixed(0));
            $('#wind-change-num').html(response.data.wind.speed.toFixed(1));
            $('#sky-type').html(response.data.condition.description);


            $('#forecast > .col:nth-of-type(1) > .abrv-weekday').html(k1);
            $('#forecast > .col:nth-of-type(1) > .weather-img').html(`<img src='${response.data.condition.icon_url}' width='48px'/>`);
        })
        .catch(function(error) { 
            if (error.response?.status === 429) {
                const retryAfter = error.response.headers['retry-after'] || 1; // Fallback to 1 second
                console.warn(`Rate limit exceeded. Retrying after ${retryAfter} seconds.`);
                setTimeout(() => {
                    searchCity($('#city-search-input').val());
                }, retryAfter * 1000);
            } else {
                console.error("Error fetching data: ", error.message);
            }
        });
    }

    $('#input-group-btn').click(function(event) {
        event.preventDefault();
        searchCity($('#city-search-input').val());
    });

    searchCity('Sylvania');
     
});