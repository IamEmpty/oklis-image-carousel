/**
 * Created by art on 05.11.14.
 */

"use strict";
(function ($) {

    $.fn.oklisImageCarousel = function(options) {

        var defaults = {
            amountOfDisplayedImages: 4,
            animateSpeed: 300,
            orientationIsVertical: false,
            marginSize: 0,
            prevButton: '.btn-prev',
            nextButton: '.btn-next',
            imageGalleryWrapper: '.image-carousel-wrapper',
            imageGalleryClass: '.b-image-carousel',
            imageGalleryWrapperClass: '.b-image-carousel__item',
            imageGalleryImageClass: '.b-image-carousel__img',
            mainImageClass: '.b-image-gallery__main-image'
        };


        return this.each(function () {

            var options = $.extend({}, defaults, options),
                $amountOfDisplayedImages = options.amountOfDisplayedImages,
                $animateSpeed = options.animateSpeed,
                $orientationIsVertical = options.orientationIsVertical,
                $marginSize = options.marginSize,
                $prevButton = $(options.prevButton, this),
                $nextButton = $(options.nextButton, this),
                $imageGalleryWrapper = $(options.imageGalleryWrapper, this),
                $imageGalleryClass = $(options.imageGalleryClass, this),
                $imageGalleryWrapperClass = $(options.imageGalleryWrapperClass, this),
                $imageGalleryImageClass = $(options.imageGalleryImageClass, this),
                $mainImageClass = $(options.mainImageClass, this);



            var calculateCarouselImgSize = function() {

                var mainImgWidth = $mainImageClass.width();
                var mainImgHeight = $mainImageClass.height();

                // calculate width for carousel image
                var carouselImgWidth = (mainImgWidth - ($marginSize * ($amountOfDisplayedImages - 1))) / $amountOfDisplayedImages;
                // calculate height for carousel image
                var carouselImgHeight = (mainImgHeight - ($marginSize * ($amountOfDisplayedImages - 1))) / $amountOfDisplayedImages;

                // Check orientation
                if($orientationIsVertical === true) {
                    // In case of vertical orientation do

                    $imageGalleryWrapperClass.css({
                        height: carouselImgHeight
                    });

                    $imageGalleryWrapper.css({
                        height: mainImgHeight
                    });
                } else {
                    // In case of horizontal orientation do

                    $imageGalleryWrapperClass.css({
                        width: carouselImgWidth
                    });

                    $imageGalleryWrapper.css({
                        width: mainImgWidth,
                        height: carouselImgHeight
                    });
                }
            };


            // We calculate the height of carousel image depending on the height of main image
            $mainImageClass.load(function() {
                calculateCarouselImgSize();
            });

            // Resize images on window resize
            $( window ).resize(function() {
                calculateCarouselImgSize();
            });


            // Coordinates of first displayed image
            var currentPosition = 0;

            var stepOfPositioning = $amountOfDisplayedImages - 1;

            // Get amount of images in the image carousel
            var amountOfGalleryImages = $imageGalleryImageClass.length;

            // Get index of last image
            var endPosition = amountOfGalleryImages - 1;

            // Hide previous button at the beginning
            $prevButton.hide();

            // if amount less then 4, we will hide next button too
            if(amountOfGalleryImages <= $amountOfDisplayedImages) {
                $nextButton.hide();
            }


            // To click on image we a change the main image
            $imageGalleryWrapperClass.on('click', function () {

                var clickedImageSrc = $(this).children().attr('src');
                var mainImageSrc = $mainImageClass.attr('src');

                $mainImageClass.attr('src', clickedImageSrc);
                $(this).children().attr('src', mainImageSrc);
            });


            var imageHeight = $imageGalleryImageClass.height() + $marginSize;
            var imageWidth = $imageGalleryImageClass.width() + $marginSize;


            // In case of clicking on the next button
            $nextButton.on('click', function(e) {

                if(currentPosition < endPosition - stepOfPositioning) {
                    currentPosition++;

                    // Check orientation
                    if($orientationIsVertical === true) {
                        // In case of vertical orientation

                        $imageGalleryClass.animate({
                            marginTop: "-=" + imageHeight
                        }, $animateSpeed);
                    } else {
                        // In case of horizontal orientation

                        $imageGalleryClass.animate({
                            marginLeft: "-=" + imageWidth
                        }, $animateSpeed);
                    }
                }

                if(currentPosition >= endPosition - stepOfPositioning) {
                    $(this).hide();
                }

                if(currentPosition > 0) {
                    $prevButton.show();
                }

                e.preventDefault();
            });


            // In case of clicking on the previous button
            $prevButton.on('click', function(e) {

                if(currentPosition > 0) {
                    currentPosition--;

                    // Check orientation
                    if($orientationIsVertical === true) {
                        // In case of vertical orientation do

                        $imageGalleryClass.animate({
                            marginTop: '+=' + imageHeight
                        }, $animateSpeed);
                    } else {
                        // In case of horizontal orientation do

                        $imageGalleryClass.animate({
                            marginLeft: '+=' + imageWidth
                        }, $animateSpeed);
                    }
                }


                if(currentPosition <= 0) {
                    $(this).hide();
                }

                if(currentPosition < endPosition - stepOfPositioning) {
                    $nextButton.show();
                }

                e.preventDefault();
            });
        });
    };
})(jQuery, window.Admin);