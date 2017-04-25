const applicationServerPublicKey = 'BBX6gfVd47butnuSM1toVkPkA60lqA9UlASMZIIMu0AMYaiKs_RYwgWpanY8Kfxd01VCkE0OoJQQEnnEMl3j7H0';

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
        marker: [12.999026, 77.701948], // bangalore
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

/*facebook share button*/
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.8";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

$(document).ready(function() {

  var boxofficeUrl = "https://boxoffice.hasgeek.com";

  $.get({
    url: boxofficeUrl + "/api/1/boxoffice.js",
    crossDomain: true,
    timeout: 8000,
    retries: 5,
    retryInterval: 8000,
    success: function(data) {
      var boxofficeScript = document.createElement('script');
      boxofficeScript.innerHTML = data.script;
      document.getElementsByTagName('body')[0].appendChild(boxofficeScript);
      window.setTimeout(function() {
        window.Boxoffice.init({
          org: "hasgeek",
          itemCollection: "721ddcca-2439-11e7-a658-855025fdda9d",
          paymentDesc: "Anthill Inside 2017"
        });
      }, 1000);
    },
    error: function(response) {
      var ajaxLoad = this;
      ajaxLoad.retries -= 1;
      var errorMsg;
      if (response.readyState === 4) {
        errorMsg = "Server error, please try again later.";
        $('#boxoffice-widget p').html(errorMsg);
      }
      else if (response.readyState === 0) {
        if (ajaxLoad.retries < 0) {
          if(!navigator.onLine) {
            errorMsg = "Unable to connect. There is no network!";
            $('#boxoffice-widget p').html(errorMsg);
          }
          else {
            errorMsg = "<p>Unable to connect. If you are behind a firewall or using any script blocking extension (like Privacy Badger), please ensure your browser can load boxoffice.hasgeek.com, api.razorpay.com and checkout.razorpay.com .</p>";
            $('#boxoffice-widget p').html(errorMsg);
          }
        } else {
          setTimeout(function() {
            $.get(ajaxLoad);
          }, ajaxLoad.retryInterval);
        }
      }
    }
  });

  initLeaflets();

  $(".anthill-navbar-links .nav-list a, .book-ticket-btn").click(function (e) {
    // Prevent a page reload when a link is pressed
    e.preventDefault();
    // Call the scroll function
    var goto = $(this).attr('data-href');
    scrollTo(goto);
  });

});

