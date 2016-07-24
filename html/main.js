function Page (id, path, element, name, anLength) {
  this.path = path;
  this.element = element;
  this.name = name;
  this.visible = false;
  this.anLength = anLength;
  this.divHeight = 0;
  this.id = id;
}

var pages = [
  new Page(0, './html/_intro.html', "scroll_intro", "Intro", 1000),
  new Page(1, "./html/_about.html", "scroll_about", "About", 1200),
  new Page(2, "./html/_skills.html", "scroll_skills", "Skills", 1000),
  new Page(3, "./html/_history.html", "scroll_history", "History", 1400),
  new Page(4, "./html/_contact.html", "scroll_contact", "Contact", 1000),
];
var backgrounds = 5;

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
  //  var li = document.createElement('li');
  //  $("#navul").append(li);
  //  var a = document.createElement('a');
  //  var linkText = document.createTextNode(names[i]);
  //  a.appendChild(linkText);
  //  a.className += "navItem";
  //  a.href = "#scroll_" + names[i].replace(/ /g,"_").toLowerCase();
  //  li.appendChild(a);
  //  updateNav();

    // Register next page, or end.
    var nextI = i + 1;

    if (nextI < pages.length) {
      loadNext(nextI);
    }
  });
}

function changeImage(i) {
  $("#background").attr("src", "../img/slideshow/" + i + ".jpg");

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
  updateNav();
  updatePages();
});


$(window).on('scroll', function() {
  updatePages();
});

function updatePages() {
  var pageBottom = $(document).scrollTop() + $(window).height();
  var pageToSection = 0;

  for (var i = 0; i < pages.length; i++) {
    if (!pages[i].visible) {
      if (pageToSection <= pageBottom + 75) {
        reveal(pages[i]);
      }
    }

    pages[i].divHeight = $("#" + pages[i].element).height();
    pageToSection += pages[i].divHeight;
  }
}

function updateNav() {
//  $(".navItem").css('width', (window.innerWidth / names.length) + 'px');
}

function scrollDown(current) {
  var currentPos = 0;

  for (var i = 0; i < pages.length; i++) {
    if (pages[i].name.toLowerCase() === current.toLowerCase()) {
      currentPos = i;
      break;
    }
  }

  scrollTo(pages[currentPos + 1].element);
}

function scrollTo(id) {
  var target = "#" + id;
  var $target = $(target);

  if (!getObject(id).visible) {
    reveal(getObject(id));
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
  }, object.anLength, function() {
  });
}

function getObject(id) {
  for (var i = 0; i < pages.length; i++) {
    if (pages[i].element === id) {
      return pages[i];
    }
  }

  return null;
}
