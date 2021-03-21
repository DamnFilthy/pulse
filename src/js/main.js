$(document).ready(function () {

    // Slider
    $('.carousel__inner').slick({
        // dots: true,
        speed: 1200,
        infinite: false,
        slidesToShow: 0,
        slidesToScroll: 1,
        // adaptiveHeight: true,
        // fade: true,
        // cssEase: 'linear' 
        prevArrow: '<button type="button" class="slick-prev"><img src="img/prev.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/next.png"></button>',
        responsive: [{
            breakpoint: 992,
            settings: {
                arrows: false,
                dots: true,
                slidesToShow: 1
            }
        }]
    });

    // Tabs
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    }
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // Modal
    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('fast');
    });

    $('.modal_window__close').on('click', function () {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    $('.button_mini').on('click', function () {
        $('.overlay, #order').fadeIn('fast');
    });

    $('.button_mini').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal_window__descr').text($('.catalog-item__subtitle').eq(i).text());
        });
    });

    // Validate 
    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: {
                    required: true,
                    minlength: 10
                },
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста введите ваше имя",
                    minlength: jQuery.validator.format("Имя не может быть менее {0} символов!")
                },
                phone: {
                    required: "Пожалуйста введите ваш телефон",
                    minlength: jQuery.validator.format("Телефон не может быть менее {0} символов!")
                },
                email: {
                    required: "Пожалуйста введите вашу почту",
                    email: "Неправильный формат ввода - name@domain.com"
                }
            }
        });
    }
    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    // Mask
    $('input[name=phone]').mask("+7 (999) 999-99-99");

    // Mail
    $('form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "../mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    // Show page-up
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    // Slow scroll
    $("a[href^='#']").click(function () {
        var _href = $(this).attr("href");
        $("html, body").animate({
            scrollTop: $(_href).offset().top + "px"
        });
        return false;
    });

    // Animate
    new WOW().init();
});