function Page (id, path, name) {
  this.id = id;
  this.path = path;
  this.name = name;
  this.visible = false;
  this.divHeight = 0;
  this.progressInto = 0;
}

var pages = [
  new Page(0, './html/intro.html', "Intro"),
  new Page(1, "./html/about.html", "About"),
  new Page(2, "./html/skills.html", "Skills"),
  new Page(3, "./html/history.html", "History"),
  new Page(4, "./html/contact.html", "Contact"),
];
var backgrounds = [
  "./img/slideshow/1.jpg",
  "./img/slideshow/2.jpg",
  "./img/slideshow/3.jpg",
  "./img/slideshow/4.jpg",
  "./img/slideshow/5.jpg",
];
var pagesHeight = 0;

$(document).ready(function() {
  $("#background").hide();

  loadNext(0);

  setTimeout(function() {
    $("#loader").fadeOut();
    loadTimeline();
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
  $("#background").attr("src", backgrounds[i]);

  var nextI = i + 1;

  if (nextI >= backgrounds.length) {
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

function loadTimeline() {
  $('.cd-timeline-block').each(function() {
    if ($(this).offset().top > $(window).scrollTop() + $(window).height() * 0.75) {
      $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
    }
  });
}

$(window).resize(function() {
  updatePages();
  updateNav();
});

$(window).on('scroll', function() {
  updatePages();
  updateNav();
  updateTimeline();
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

    if (progress < 0.0) {
      progress = 0.0;
    } else if (progress > 1.0) {
      progress = 1.0;
    }

    $(getNavitemID(pages[i])).css("background-color", "rgba(" + Math.round(66 * progress) + "," + Math.round(165 * progress) + "," + Math.round(245 * progress) + "," + (0.8 * progress) + ")");
  }
}

function updateTimeline() {
  $('.cd-timeline-block').each(function() {
    if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * 0.75 && $(this).find('.cd-timeline-img').hasClass('is-hidden')) {
      $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
    }
  });
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
