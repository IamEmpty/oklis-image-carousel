/**
 * Created by IamEmpty on 05.11.2014.
 * Edited by IamEmpty on 5.02.2015.
 * Version: 0.1.1
 */

"use strict";

var currentPosition = 0;

(function ($) {

    $.fn.oklisImageCarousel = function(options) {

        var defaults = {
            amountOfDisplayedItems: 4,
            animateSpeed: 300,
            orientationIsVertical: false,
            marginSize: 0,
            prevButton: '.btn-prev',
            nextButton: '.btn-next',
            imageCarouselWrapper: '.image-carousel-wrapper',
            carousel: '.b-image-carousel',
            carouselItem: '.b-image-carousel__item',
            imageCarouselImg: '.b-image-carousel__img',
            mainImage: '.b-image-gallery__main-image',
            isFullMotion: false,
            isInfinity: false,
        };

        return this.each(function() {

            var settings = $.extend({}, defaults, options),
                $amountOfDisplayedItems = settings.amountOfDisplayedItems,
                $animateSpeed = settings.animateSpeed,
                $orientationIsVertical = settings.orientationIsVertical,
                $marginSize = settings.marginSize,
                $prevButton = $(settings.prevButton, this),
                $nextButton = $(settings.nextButton, this),
                $imageCarouselWrapper = $(settings.imageCarouselWrapper, this),
                $carousel = $(settings.carousel, this),
                $carouselItem = $(settings.carouselItem, this),
                $imageCarouselImg = $(settings.imageCarouselImg, this),
                $mainImage = $(settings.mainImage, this),
                $isFullMotion = settings.isFullMotion;


            /*---         Begin         ---*/

            // We calculate the height of carousel image depending on the height of main image
            calculateCarouselItemSize();

            // Resize images on window resize
            $( window ).resize(function() {
                calculateCarouselItemSize();
            });


            var mainImgWidth = $mainImage.width();
            var mainImgHeight = $mainImage.height();
            mainImgWidth = 300;
            mainImgHeight = 300;

            var carouselItemWidth;
            var carouselItemHeight;

            function calculateCarouselItemSize() {

                // Check Full Motion

                if( $isFullMotion === true ) {
                    fullMotion();
                } else {
                    notFullMotion();
                }


                // Check orientation

                if( $orientationIsVertical === true ) {
                    orientationVertical(); // In case of vertical orientation do
                } else {
                    orientationHorizontal(); // In case of horizontal orientation do
                }
            };


            function fullMotion() {

                // calculate width for carousel image
                carouselItemWidth = $carouselItem.width();

                // calculate height for carousel image
                carouselItemHeight = $carouselItem.height();
            }


            function notFullMotion() {

                // calculate width for carousel image
                carouselItemWidth = (mainImgWidth - ($marginSize * ($amountOfDisplayedItems - 1))) / $amountOfDisplayedItems;

                // calculate height for carousel image
                carouselItemHeight = (mainImgHeight - ($marginSize * ($amountOfDisplayedItems - 1))) / $amountOfDisplayedItems;
            }


            function orientationVertical() {

                // In case of vertical orientation do

                $carouselItem.css({
                    height: carouselItemHeight
                });

                $imageCarouselWrapper.css({
                    width: (mainImgWidth / $amountOfDisplayedItems),
                    height: mainImgHeight 
                });

                $prevButton.css({
                    width: carouselItemWidth,
                    height: (carouselItemWidth / 2.5)
                });

                $nextButton.css({
                    width: carouselItemWidth,
                    height: (carouselItemWidth / 2.5)
                });
            };


            function orientationHorizontal() {

                // In case of horizontal orientation do

                $carouselItem.css({
                    width: carouselItemWidth
                });

                $imageCarouselWrapper.css({
                    width: mainImgWidth,
                    height: carouselItemHeight
                });

                $prevButton.css({
                    // width: (carouselItemWidth / 2.5),
                    // height: carouselItemHeight
                });

                $nextButton.css({
                    // width: (carouselItemWidth / 2.5),
                    // height: carouselItemHeight
                });
            };



            // Coordinates of first displayed image
            currentPosition = 0;

            // Поправка нав то, что в программировании всё начинается с 0 а не с 1
            var stepOfPositioning = $amountOfDisplayedItems - 1;

            // Get amount of images in the image carousel
            var amountOfGalleryItems = $carouselItem.length;
            // Get index of last image
            var endPosition = amountOfGalleryItems - 1;

            // Hide previous button at the beginning
            $prevButton.attr('disabled','disabled');

            if( $isFullMotion === true ) {

                if( currentPosition >= $amountOfDisplayedItems ) {
                    $nextButton.attr('disabled','disabled');
                }
            } else {

                // if amount less then 4, we will hide next button too
                if( amountOfGalleryItems <= $amountOfDisplayedItems ) {
                    $nextButton.attr('disabled','disabled');
                }
            }


            // To click on image we a change the main image
            $carouselItem.on('click', function() {

                var clickedImageSrc = $(this).children().attr('src');
                var mainImageSrc = $mainImage.attr('src');

                $mainImage.attr('src', clickedImageSrc);
                $(this).children().attr('src', mainImageSrc);
            });


            var imageHeight = $imageCarouselImg.height() + $marginSize;
            var itemWidth = $carouselItem.width() + $marginSize;


            // In case of clicking on the next button
            $nextButton.on('click', function(e) {

                if( $isFullMotion === true ) {

                    if( currentPosition < endPosition ) {
                        currentPosition++;

                        // Check orientation
                        if( $orientationIsVertical === true ) {

                            // In case of vertical orientation

                            $carousel.animate({
                                marginTop: "-=" + imageHeight
                            }, $animateSpeed);
                        } else {

                            // In case of horizontal orientation

                            $carousel.animate({
                                marginLeft: "-=" + itemWidth
                            }, $animateSpeed);
                        }
                    }
                } else {

                    if( currentPosition < endPosition - stepOfPositioning ) {
                        currentPosition++;

                        // Check orientation
                        if( $orientationIsVertical === true ) {

                            // In case of vertical orientation

                            $carousel.animate({
                                marginTop: "-=" + imageHeight
                            }, $animateSpeed);
                        } else {

                            // In case of horizontal orientation

                            $carousel.animate({
                                marginLeft: "-=" + itemWidth
                            }, $animateSpeed);
                        }
                    }
                }



                if( $isFullMotion === true ) {

                    if( currentPosition >= endPosition ) {
                        $(this).attr('disabled','disabled');
                    }
                } else {

                    if( currentPosition >= endPosition - stepOfPositioning ) {
                        $(this).attr('disabled','disabled');
                    }
                }



                if( currentPosition > 0 ) {
                    $prevButton.removeAttr('disabled');
                }

                e.preventDefault();
            });


            // In case of clicking on the previous button
            $prevButton.on('click', function(e) {

                if( currentPosition > 0 ) {
                    currentPosition--;

                    // Check orientation
                    if( $orientationIsVertical === true ) {

                        // In case of vertical orientation do

                        $carousel.animate({
                            marginTop: '+=' + imageHeight
                        }, $animateSpeed);
                    } else {

                        // In case of horizontal orientation do

                        $carousel.animate({
                            marginLeft: '+=' + itemWidth
                        }, $animateSpeed);
                    }
                }


                if( currentPosition <= 0 ) {
                    $(this).attr('disabled','disabled');
                }

                if( $isFullMotion === true ) {

                    if( currentPosition < endPosition ) {
                        $nextButton.removeAttr('disabled');
                    }
                } else {

                    if( currentPosition < endPosition - stepOfPositioning ) {
                        $nextButton.removeAttr('disabled');
                    }
                }


                e.preventDefault();
            });
        });
    };
}(jQuery));