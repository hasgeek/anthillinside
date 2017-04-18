/*set offset for sticky navbar*/
function scrollTo (goto) {
  var offset_top = $(goto).offset().top - 150;
  $("body,html").stop(true,true).animate({scrollTop:offset_top},300)
}

function initLeaflets() {

  if(typeof window.L === "undefined") {
    window.setTimeout(initLeaflets, 5000);
    return;
  }

  /*Map*/
  $('.leaflet-map').each(function initLeafletMap () {
    var $container = $(this),
      defaults = {
        zoom: 17,
        marker: [12.999, 77.699], // bangalore
        label: null,
        maxZoom: 18,
        attribution: '<a href="http://open.mapquest.co.uk" target="_blank">MapQuest</a>, <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> and contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/" target="_blank">CC-BY-SA</a>',
        subdomains: ['a','b','c'],
        scrollWheelZoom: false,
      },
      args,
      options,
      map,
      marker;

    // remove any child elements from the container
    $container.empty();

    args = $container.data();
    if (args.marker) { args.marker = args.marker.split(','); }
    options = $.extend({}, defaults, args);

    map = new L.Map($container[0], {
        center: options.center || options.marker
        , zoom: options.zoom
        , scrollWheelZoom: options.scrollWheelZoom
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: options.maxZoom
        , attribution: options.attribution
        , subdomains: options.subdomains
    }).addTo(map);


    marker = new L.marker(options.marker).addTo(map);
    if (options.label) marker.bindPopup(options.label).openPopup();
  });
}

$(document).ready(function() {

  initLeaflets();

  $(".anthill-navbar-links .nav-list a").click(function (e) {
    // Prevent a page reload when a link is pressed
    e.preventDefault();
    // Call the scroll function
    var goto = $(this).attr('data-href');
    scrollTo(goto);
  });

});

/*facebook share button*/
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.8";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

