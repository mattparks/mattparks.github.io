function Page(id, path, name, loadFunction) {
  this.id = id;
  this.path = path;
  this.name = name;
  this.visible = false;
  this.divHeight = 0;
  this.progressInto = 0;
  this.loadFunction = loadFunction;
}

var pages = [
  new Page(0, "./html/content_about.html", "About", null),
  new Page(1, "./html/content_skills.html", "Skills", function loadFunction() {
    $('progress').each(function() {
      var max = $(this).val();
      $(this).val(0).animate({ value: max }, { duration: 2000, easing: 'easeOutCirc' });
		});
  }),
  new Page(2, './html/content_projects.html', "Projects", null),
  new Page(3, "./html/content_contact.html", "Contact", null),
];
var backgrounds = [
  "./img/slideshow/1.jpg",
  "./img/slideshow/2.jpg",
  "./img/slideshow/3.jpg",
  "./img/slideshow/4.jpg",
  "./img/slideshow/5.jpg",
];
var pagesHeight = 0;
var size = null;

$(document).ready(function() {
  $("#background").hide();

  loadNext(0);
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

    $("#" + getScroll(pages[i])).css("left", i % 2 ? "-100%" : "200%");
    $("#" + getMove(pages[i])).css("left", i % 2 ? "-100%" : "200%");

    if (i === 0) {
      $("#" + getScroll(pages[i])).css("margin-top", "50px");
    }

    // Register next page, or end.
    var nextI = i + 1;

    if (nextI < pages.length) {
      loadNext(nextI);
    } else {
      completeLoad();
    }
  });
}

function completeLoad() {
  $("body").append('<script src="./js/style.js"></script>');
  $("body").append('<script src="./js/prism.js"></script>');
  $("#loader").fadeOut();
  loadTimeline();
  changeImage(1);
  updatePages();
  updateNav();
  updateSize();
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
  updateSize();
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
    pages[i].divHeight = $("#" + getScroll(pages[i])).height();
    pages[i].progressInto = pageBottom - pagesHeight;

    if (!pages[i].visible && pages[i].progressInto >= 0) {
      reveal(pages[i]);
    }

    pagesHeight += pages[i].divHeight;
  }
}

function updateSize() {
  var newSize = $(document).width() < 537 ? "small" : "large";

  if (!size || size !== newSize) {
    switch(newSize) {
        case "small":
          $("#navbar").animate({
            top: "-50px",
          }, 500, function() {
          });
          $("#cssmenu").animate({
            top: "-50px",
          }, 500, function() {
          });
          $("#" + getScroll(pages[0])).animate({
            marginTop: "0",
          }, 500, function() {
          });
          break;
        case "large":
          $("#navbar").animate({
            top: "0px",
          }, 500, function() {
          });
          $("#cssmenu").animate({
            top: "0px",
          }, 500, function() {
          });
          $("#" + getScroll(pages[0])).animate({
            marginTop: "50px",
          }, 500, function() {
          });
          break;
    }

    size = newSize;
  }
}

function updateNav() {
  for (var i = 0; i < pages.length; i++) {
    $("#" + getNavitem(pages[i])).css("width", ($(window).width() / pages.length) + "px");
    var progress = pages[i].progressInto / pages[i].divHeight;

    if (progress < 0.0) {
      progress = 0.0;
    } else if (progress > 1.0) {
      progress = 1.0;
    }

    $("#" + getNavitem(pages[i])).css("background-color", "rgba(" + Math.round(66 * progress) + "," + Math.round(165 * progress) + "," + Math.round(245 * progress) + "," + (0.8 * progress) + ")");
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
  var target = "#" + getScroll(object);
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

  $("#" + getScroll(object)).animate({
    left: "0",
  }, 1000, function() {
  });
  $("#" + getMove(object)).animate({
    left: "0",
  }, 1000, function() {
  });
  setTimeout(function() {
    if (object.loadFunction) {
      object.loadFunction();
    }
  }, 1000);
}

function getNavitem(object) {
  return "navitem_" + object.name.replace(/ /g,"_").toLowerCase();
}

function getScroll(object) {
  return "scroll_" + object.name.replace(/ /g,"_").toLowerCase();
}

function getMove(object) {
  return "move_" + object.name.replace(/ /g,"_").toLowerCase();
}
