$( document ).ready(function() {

  if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
    $('body.ytembedded').addClass('firefox')
  }

  document.documentElement.style.setProperty('--sw', (window.innerWidth - document.documentElement.clientWidth) + "px");

  var checkScroll = function(object) {
    if ($(this).scrollTop() >= (window.innerHeight - 140)) {
      $('body').addClass('scrollActive').removeClass('scrollInactive');
    } else {
      $('body').addClass('scrollInactive').removeClass('scrollActive');
    }
  }


  var articleRepertory = {"Principio" : 0};
  console.log(articleRepertory)
  var articles = $('main').children(".section");
  var articleCount = articles.length;
  console.log(articleCount)
  if (articleCount != 0) {
    for (i=0 ; i < articleCount ; i+=1) {
      var articleName = articles.eq(i).data('name');
      $("<div class='level' data-after='"+articleName+"'></div>").insertBefore("#contactenosBtn");
      articleRepertory[articleName] = $('[data-name="' + articleName + '"]').offset().top;
    }
    articleRepertory["Contáctenos"] = $("#wpcf7-f506-p20-o1").offset().top - 50;
    articleRepertory["Fin"] = $("#wpcf7-f506-p20-o1").offset().top + $("#wpcf7-f506-p20-o1").outerHeight(true);
    //articleRepertory["Fin"] = $('[data-name="' + articleName + '"]').offset().top + $('[data-name="' + articleName + '"]').outerHeight(true);
    console.log(articleRepertory)
  }


  $.fn.scrollAnimation = function() {
    if ($(this).attr('data-after') === "Principio") {
      $([document.documentElement, document.body]).animate({
          scrollTop: 0
      }, 400);
    } else {
      $([document.documentElement, document.body]).animate({
          scrollTop: $('[data-name="' + $(this).attr('data-after') + '"]').offset().top - 100
      }, 400);
    }
  };

  $(".level").click(function() {
    $(this).scrollAnimation()
  });

  $("#arrowUp").click(function() {
    console.log('salut',$('.level.active').length)
    if ($('.level.active').prev().attr('id') != $(this).attr('id') && $('.level.active').length != 0) {
      $('.level.active').prev().scrollAnimation()
    } else if ($('.level.active').length == 0) {
      console.log('remonte')
      $('#arrowDown').prev().scrollAnimation()
    }
  });
  $("#arrowDown").click(function() {
    if ($('.level.active').next().attr('id') != $(this).attr('id')) {
      $('.level.active').next().scrollAnimation()
    }
  });


  window.setTimeout(function(){
    $('#pageNav').removeClass('initHover');
  }, 1000,);


  


  $.fn.isInViewport = function() {
    var elementTop = $(this).offset().top + $(window).height()/2;
    var elementBottom = elementTop + $(this).outerHeight() - $(window).height();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    // console.log(elementTop,elementBottom,viewportTop,viewportBottom)

    return elementBottom > viewportTop && elementTop < viewportBottom;
  };

  var currentSection = "Principio";
  var allSections = $(".section");
  var pageNavUpdate = function() {
    var isSection = false;
    $('.section').each(function() {
      if ($(this).isInViewport()) {
        isSection = true;
        $('.level.active').removeClass('active');
        $('[data-after="' + $(this).attr('data-name') + '"]').addClass('active');
      }
    });
    if (isSection === false) {
      if ($(window).scrollTop() - $(window).height()/2 < $('.topArticle').offset().top) {
        $('.level.active').removeClass('active');
        $('[data-after="Principio"]').addClass('active');
      } else {
        $('.level.active').removeClass('active');
      }
    }
  };

  if (allSections.length > 1) {
    pageNavUpdate();
    $(window).on('resize scroll', function() {
      pageNavUpdate();
    });
  }


  checkScroll($(window));
  $(window).scroll(function(){
    checkScroll(this);
    // $(".level").removeClass('active');
    // for (i=0 ; i<Object.keys(articleRepertory).length ; i+=1) {
    //   if (articleRepertory[Object.keys(articleRepertory)[i+1]] > $(window).scrollTop() && articleRepertory[Object.keys(articleRepertory)[i]] <= $(window).scrollTop()) {
    //     $('[data-after="' + Object.keys(articleRepertory)[i] + '"]').addClass('active');
    //   }
    // }
  });


  // $("#contactoBtn").click(function() {
  //   $([document.documentElement, document.body]).animate({
  //       scrollTop: $("#wpcf7-f506-p20-o1").offset().top - 50
  //   }, 1000);
  // });

  $( "#scrollDownBtn span" ).click(function() {
    var y = $(window).scrollTop();
    console.log(y);
    $('html, body').animate(
      { scrollTop: /*y +*/ window.innerHeight*1 }, 1000,
      function() {
        /*$('#scrollDownBtn').animate(
          {opacity: 1},
          {duration: 1}
        )*/
      }
    )
    /*$('#scrollDownBtn').animate(
      {opacity: 0},200
    )*/
  });

  $("[id=contactoBtn]").click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#wpcf7-f506-p20-o1").offset().top - 50
    }, 1000);
  });



  var reveal = function(element, dur) {
    element.show();
    element.animate(
      {opacity: 1}, dur,
      function() {}
    );
  }


  var conceal = function(element, dur) {
    element.animate(
      {opacity: 0}, dur,
      function() {element.hide()}
    );
  }

  reveal($('#bgVideo'),1000);
  reveal($('#heroText'),200);



  $(".navBtn").hover(function(){
    //$( "#buscarMask" ).click();
    $("#topHeader").removeClass();
    $("#topHeader").addClass($(this).attr('id'));
    $(this).addClass("hover");
  }, function(){
    $(this).removeClass("hover");
  });


  $(".navBtn.context").hover(function(){
    $("#topHeader").addClass("hover");
    }, function(){
    $("#topHeader").removeClass("hover");
  });


  $( "#buscarOpener" ).click(function() {
    $('#buscarMask').show();
    $(this).toggleClass('active').toggleClass('inactive');
    reveal($("#buscarContent"),200);
    $("#buscarContent").toggleClass('active').toggleClass('inactive');
  });

  $( "#buscarMask" ).click(function() {
    $('#buscarMask').hide();
    $('#buscarOpener').removeClass('active').addClass('inactive');
    conceal($("#buscarContent"),200);
    $("#buscarContent").removeClass('active').addClass('inactive');
  });

  $("#verMenosTipos").hide();

  $( "#verMasTipos" ).click(function() {
    $(this).hide();
    $(".hiddenTipos").show();
    $("#verMenosTipos").show();
  });
  $( "#verMenosTipos" ).click(function() {
    $(this).hide();
    $(".hiddenTipos").hide();
    $("#verMasTipos").show();
  });



  (function() { 
        const classes = document.body.classList;
        let timer = 0;
        window.addEventListener('resize', function () {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            else
                classes.add('stop-transitions');

            timer = setTimeout(() => {
                classes.remove('stop-transitions');
                timer = null;
            }, 100);
        });
    })();








    // if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    //   //outil surprise qui nous servira plus tard
    // }



});//doc.ready()