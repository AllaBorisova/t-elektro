jQuery(document).ready(function ($) {
  $(".tabs").lightTabs();

  $(".hamburger").click(function () {
    $(this).toggleClass("is-active");
    $("header").toggleClass("open-menu");
  });

  var sync3 = $("#sync3");
  var sync4 = $("#sync4");
  var slidesPerPage = 4;
  var syncedSecondary = true;
  sync3
    .owlCarousel({
      items: 1,
      slideSpeed: 2000,
      nav: true,
      autoplay: false,
      dots: false,
      loop: true,
      responsiveRefreshRate: 200,
      navText: ["", ""],
    })
    .on("changed.owl.carousel", syncPosition);
  sync4
    .on("initialized.owl.carousel", function () {
      sync4.find(".owl-item").eq(0).addClass("current");
    })
    .owlCarousel({
      items: slidesPerPage,
      dots: false,
      nav: true,
      smartSpeed: 200,
      slideSpeed: 500,
      margin: 10,
      slideBy: slidesPerPage,
      navText: ["", ""],
      responsiveRefreshRate: 100,
    })
    .on("changed.owl.carousel", syncPosition2);

  function syncPosition(el) {
    var count = el.item.count - 1;
    var current = Math.round(el.item.index - el.item.count / 2 - 0.5);
    if (current < 0) {
      current = count;
    }
    if (current > count) {
      current = 0;
    }
    sync4
      .find(".owl-item")
      .removeClass("current")
      .eq(current)
      .addClass("current");
    var onscreen = sync4.find(".owl-item.active").length - 1;
    var start = sync4.find(".owl-item.active").first().index();
    var end = sync4.find(".owl-item.active").last().index();

    if (current > end) {
      sync4.data("owl.carousel").to(current, 100, true);
    }
    if (current < start) {
      sync4.data("owl.carousel").to(current - onscreen, 100, true);
    }
  }

  function syncPosition2(el) {
    if (syncedSecondary) {
      var number = el.item.index;
      sync3.data("owl.carousel").to(number, 100, true);
    }
  }

  sync4.on("click", ".owl-item", function (e) {
    e.preventDefault();
    var number = $(this).index();
    sync3.data("owl.carousel").to(number, 300, true);
  });
});
