function Page (id, path, name) {
  this.id = id;
  this.path = path;
  this.name = name;
  this.visible = false;
  this.divHeight = 0;
  this.progressInto = 0;
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
    $("body").append('<script src="./js/prism.js"></script>');
  }, 750);

  setTimeout(function() {
    changeImage(1);
    updatePages();
    updateNav();
  }, 1500);

  setTimeout(function() {
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
    li.id = "navitem_" + pages[i].name.toLowerCase();
    $(".nav-menu-items").append(li);
    var a = document.createElement('a');
    var linkText = document.createTextNode(pages[i].name);
    a.appendChild(linkText);
    a.onclick = function () {
      scrollTo(pages[i]);
    };
    li.appendChild(a);

    $(getScrollID(pages[i])).css("left", i % 2 ? "-100%" : "200%");
    $(getMoveID(pages[i])).css("left", i % 2 ? "-100%" : "200%");

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
  pagesHeight = 0;

  for (var i = 0; i < pages.length; i++) {
    pages[i].divHeight = $(getScrollID(pages[i])).height();
    pages[i].progressInto = pageBottom - pagesHeight;

    if (!pages[i].visible && pages[i].progressInto >= 0) {
      reveal(pages[i]);
    }

    pagesHeight += pages[i].divHeight;
  }
}

function updateNav() {
  for (var i = 0; i < pages.length; i++) {
    $(getNavitemID(pages[i])).css("width", ($(window).width() / pages.length) + "px");
    var progress = pages[i].progressInto / pages[i].divHeight;
    if (progress < 0.0) { progress = 0.0; } else if (progress > 1.0) { progress = 1.0; }
    $(getNavitemID(pages[i])).css("background-color", "rgba(" + Math.round(66 * progress) + "," + Math.round(165 * progress) + "," + Math.round(245 * progress) + "," + (0.8 * progress) + ")");
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
  $(getMoveID(object)).animate({
    left: "0",
  }, 1000, function() {
  });
}

function getScrollID(object) {
  return "#" + getScroll(object);
}

function getMoveID(object) {
  return "#" + getMove(object);
}

function getNavitemID(object) {
  return "#" + getNavitem(object);
}

function getScroll(object) {
  return "scroll_" + object.name.replace(/ /g,"_").toLowerCase();
}

function getMove(object) {
  return "move_" + object.name.replace(/ /g,"_").toLowerCase();
}

function getNavitem(object) {
  return "navitem_" + object.name.replace(/ /g,"_").toLowerCase();
}
