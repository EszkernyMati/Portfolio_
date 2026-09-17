(function ($) {
  var $body = $("body");
  var $loader = $('<div class="page-loader"><div class="spinner"></div></div>');
  $body.prepend($loader);

  var $toggle = $(".sidebar-toggle");
  var $sidebarBody = $(".sidebar-body");
  var mobileQuery = window.matchMedia("(min-width: 900px)");

  function openSidebar() {
    $toggle.addClass("is-open").attr("aria-expanded", "true");
    var fullHeight = 0;
    $sidebarBody.children().each(function () {
      fullHeight += $(this).outerHeight(true);
    });
    $sidebarBody.css("max-height", fullHeight + "px");
  }

  function closeSidebar() {
    $toggle.removeClass("is-open").attr("aria-expanded", "false");
    $sidebarBody.css("max-height", "");
  }

  function isSidebarOpen() {
    return $toggle.hasClass("is-open");
  }

  $toggle.on("click", function () {
    if (isSidebarOpen()) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  $(".sidebar-nav a").on("click", function () {
    if (!mobileQuery.matches) {
      closeSidebar();
    }
    $(".sidebar-nav a").removeClass("is-active");
    $(this).addClass("is-active");
  });

  mobileQuery.addEventListener("change", function () {
    closeSidebar();
  });

  var currentPage = $body.data("page");
  $(".sidebar-nav a").each(function () {
    var $link = $(this);
    if ($link.data("page") === currentPage) {
      $link.addClass("is-active");
    }
  });

  $('a[href^="#"]').on("click", function (event) {
    var targetId = $(this).attr("href");
    var $target = $(targetId);
    if ($target.length) {
      event.preventDefault();
      $("html, body").animate({ scrollTop: $target.offset().top - 24 }, 550);
    }
  });

  $(".back-to-top").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
  });

  $("#contact-form").on("submit", function (e) {
    e.preventDefault();
    var isValid = true;
    
    var $name = $("#name");
    var $email = $("#email");
    var $message = $("#message");

    if (!$name.val().trim()) {
      $("#field-name").addClass("is-invalid");
      $("#field-name .is-error").show();
      isValid = false;
    } else {
      $("#field-name").removeClass("is-invalid");
      $("#field-name .is-error").hide();
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test($email.val().trim())) {
      $("#field-email").addClass("is-invalid");
      $("#field-email .is-error").show();
      isValid = false;
    } else {
      $("#field-email").removeClass("is-invalid");
      $("#field-email .is-error").hide();
    }

    if (!$message.val().trim()) {
      $("#field-message").addClass("is-invalid");
      $("#field-message .is-error").show();
      isValid = false;
    } else {
      $("#field-message").removeClass("is-invalid");
      $("#field-message .is-error").hide();
    }

    if (isValid) {
      $("#contact-form input, #contact-form textarea, #contact-form button").prop("disabled", true);
      $("#form-success").fadeIn();
    }
  });

  $(window).on("load", function () {
    $body.addClass("is-ready");
    $loader.fadeOut(2000, function () {
      $(this).remove();
    });
  });
})(jQuery);