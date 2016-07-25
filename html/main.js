function Page (id, path, element, name) {
  this.id = id;
  this.path = path;
  this.element = element;
  this.name = name;
  this.visible = false;
  this.divHeight = 0;
}

var pages = [
  new Page(0, './html/_intro.html', "scroll_intro", "Intro"),
  new Page(1, "./html/_about.html", "scroll_about", "About"),
  new Page(2, "./html/_skills.html", "scroll_skills", "Skills"),
  new Page(3, "./html/_history.html", "scroll_history", "History"),
  new Page(4, "./html/_contact.html", "scroll_contact", "Contact"),
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
  }, 1500);
});

function loadNext(i) {
  console.log("[" + i + "]: " + " loading " + pages[i].name + " page!");

  $.get(pages[i].path, function (data) {
    // Load page content
    $("#main").append(data);

    // Load navbar
    var li = document.createElement('li');
    $(".nav-menu-items").append(li);
    var a = document.createElement('a');
    var linkText = document.createTextNode(pages[i].name);
    a.appendChild(linkText);
    a.id = pages[i].name.toLowerCase() + "NavItem";
    // a.href = "#scroll_" + pages[i].name.replace(/ /g,"_").toLowerCase();
    a.onclick = function () {
      scrollTo(pages[i].element);
    };
    li.appendChild(a);
    updateNav();

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
    if (!pages[i].visible) {
      if (pagesHeight <= pageBottom + 75) {
        reveal(pages[i]);
      }
    }

    pages[i].divHeight = $("#" + pages[i].element).height();
    pagesHeight += pages[i].divHeight;
  }
}

function updateNav() {
  for (var i = 0; i < pages.length; i++) {
    var itemID = "#" + pages[i].name.toLowerCase() + "NavItem";
  //  var itemLength = (pages[i].divHeight / pagesHeight) * $(window).width();
  //  $(itemID).css("width", itemLength + "px");

   $(itemID).css("width", ($(window).width() / pages.length) + "px");
  }

  $("#sliderProgress").css("width", ($(window).width() / pages.length) + "px");
  var sliderProgress = ($(document).scrollTop() / (pagesHeight - $(window).height())) * $(window).width();
  $("#sliderProgress").css("left", sliderProgress + "px");
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
    scrollTo(pages[pages.length].element);
  } else {
    scrollTo(pages[currentPos + 1].element);
  }
}

function scrollTo(element) {
  var target = "#" + element;
  var $target = $(target);

  if (!getObject(element).visible) {
    reveal(getObject(element));
  }

  $('html, body').stop().animate({
    'scrollTop': $target.offset().top
  }, 900, 'swing', function () {
    window.location.hash = target;
  });
}

function reveal(object) {
  console.log("Activating " + object.element);
  object.visible = true;

  $("#" + object.element).fadeIn();
  $("#" + object.element).animate({
    left: "0",
  }, 1000, function() {
  });
}

function getObject(element) {
  for (var i = 0; i < pages.length; i++) {
    if (pages[i].element === element) {
      return pages[i];
    }
  }

  return null;
}
