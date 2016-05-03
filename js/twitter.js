$(document).ready(function() {
    $('.tooltip-bottom').poshytip({
        className: 'tip-twitter',
        showTimeout: 0,
        alignTo: 'target',
        alignX: 'center',
        alignY: 'bottom',
        offsetY: 5,
        allowTipHover: false,
        fade: false,
        slide: false
    });

    $('.tooltip-top').poshytip({
        className: 'tip-twitter',
        showTimeout: 0,
        alignTo: 'target',
        alignX: 'center',
        alignY: 'top',
        offsetY: 5,
        allowTipHover: false,
        fade: false,
        slide: false
    });
});
