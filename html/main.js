function Page (id, path, name) {
  this.id = id;
  this.path = path;
  this.name = name;
  this.visible = false;
  this.divHeight = 0;
}

var pages = [
  new Page(0, './html/_intro.html', "Intro"),
  new Page(1, "./html/_about.html", "About"),
  new Page(2, "./html/_skills.html", "Skills"),
  new Page(3, "./html/_history.html", "History"),
  new Page(4, "./html/_contact.html", "Contact"),
];
var backgrounds = 5;
var pagesHeight = 0;

$(document).ready(function() {
  $("#background").hide();

  loadNext(0);

  setTimeout(function() {
    $("#loader").fadeOut();
  }, 750);

  setTimeout(function() {
    changeImage(1);
    updatePages();
    updateNav();
  }, 1500);

  setTimeout(function() {
    $("#sliderProgress").animate({
      top: "0",
    }, 1000, function() {
    });
    $("#navbar").animate({
      top: "0",
    }, 1000, function() {
    });
    $("#cssmenu").animate({
      top: "0",
    }, 1000, function() {
    });
  }, 2000);
});

function loadNext(i) {
  console.log("[" + i + "]: " + " loading " + pages[i].name + " page!");

  $.get(pages[i].path, function (data) {
    // Load page content
    $("#main").append(data);

    // Load navbar
    var li = document.createElement('li');
    li.id = "navitem_" + getScroll(pages[i]);
    $(".nav-menu-items").append(li);
    var a = document.createElement('a');
    var linkText = document.createTextNode(pages[i].name);
    a.appendChild(linkText);
    a.onclick = function () {
      scrollTo(pages[i]);
    };
    li.appendChild(a);

    // Register next page, or end.
    var nextI = i + 1;

    if (nextI < pages.length) {
      loadNext(nextI);
    }
  });
}

function changeImage(i) {
  $("#background").attr("src", "./img/slideshow/" + i + ".jpg");

  var nextI = i + 1;

  if (nextI >= 5) {
    nextI = 1;
  }

  setTimeout(function() {
    $("#background").fadeIn();
  }, 500);

  setTimeout(function() {
    $("#background").fadeOut();
  }, 10000);

  setTimeout(function() {
    changeImage(nextI);
  }, 10500);
}

$(window).resize(function() {
  updatePages();
  updateNav();
});


$(window).on('scroll', function() {
  updatePages();
  updateNav();
});

function updatePages() {
  var pageBottom = $(document).scrollTop() + $(window).height();
  var moveHeight = Math.atan(2 * (Math.PI / 180)) * $(window).width();

  pagesHeight = 0;

  for (var i = 0; i < pages.length; i++) {
    pages[i].divHeight = $(getScrollID(pages[i])).height();

    if (!pages[i].visible && pagesHeight <= pageBottom) {
      reveal(pages[i]);
    }

    pagesHeight += pages[i].divHeight;
    $(getScrollID(pages[i])).css("padding-bottom", moveHeight + 30 + "px");
  }
}

function updateNav() {
  {
      var distanceDown = $(document).scrollTop() / $(document).height();
      //console.log(
      //  "DistanceDown=" + distanceDown +
      //  ", ScrollTop=" + $(document).scrollTop() +
      //  ", DocumentHeight=" + $(document).height()
      //);

      $("#sliderProgress").css("left", (distanceDown * $(window).width()) + "px");
  }

  var currentPage = null;

  for (var i = 0; i < pages.length; i++) {
    var itemID = "#navitem_" + getScroll(pages[i]);

    if ($(window).width() > 720) {
      // For American Individuality
      $(itemID).css("width", ((pages[i].divHeight / pagesHeight) * $(window).width()) + "px");
    } else {
      // For North Korean Uniformity
      $(itemID).css("width", ($(window).width() / pages.length) + "px");
    }

    if (
      $("#sliderProgress").position().left >= $(itemID).position().left &&
      $("#sliderProgress").position().left < $(itemID).position().left + $(itemID).width()
    ) {
      currentPage = pages[i];
    }

//    $(getScrollID(pages[i])).css("height", 780 + "px");
  }

  {
    var sliderWidth = ((currentPage.divHeight / pagesHeight) * $(window).width()) + "px";

    $("#sliderProgress").css("width", sliderWidth);
    //$("#sliderProgress").animate({
    //    width: sliderWidth,
    //  }, 1000, function() {
    //});
  }
}

function scrollDown(current) {
  var currentPos = 0;

  for (var i = 0; i < pages.length; i++) {
    if (pages[i].name.toLowerCase() === current.toLowerCase()) {
      currentPos = i;
      break;
    }
  }

  if (currentPos + 1 > pages.length) {
    scrollTo(pages[pages.length]);
  } else {
    scrollTo(pages[currentPos + 1]);
  }
}

function scrollTo(object) {
  var target = getScrollID(object);
  var $target = $(target);

  if (!object.visible) {
    reveal(object);
  }

  $('html, body').stop().animate({
    'scrollTop': $target.offset().top
  }, 900, 'swing', function () {
    window.location.hash = target;
  });
}

function reveal(object) {
  console.log("Activating " + object.name);
  object.visible = true;

  $(getScrollID(object)).animate({
    left: "0",
  }, 1000, function() {
  });
}

function getScrollID(object) {
  return "#scroll_" + object.name.replace(/ /g,"_").toLowerCase();
}

function getScroll(object) {
  return "scroll_" + object.name.replace(/ /g,"_").toLowerCase();
}
