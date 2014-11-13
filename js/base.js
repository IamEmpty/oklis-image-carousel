$(document).ready(function() {
	$('.b-image-gallery_horizontal').oklisImageCarousel({
		prevButton: '.btn-left',
		nextButton: '.btn-right'
	});

    $('.b-image-gallery_vertical').oklisImageCarousel({
        orientationIsVertical: true,
        prevButton: '.btn-up',
		nextButton: '.btn-down'
    });
});