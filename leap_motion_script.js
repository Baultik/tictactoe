var items = {};

var Item = function (imgSrc, height, width, sensitivity) {
    var item = this;
    var img = document.createElement('img');
    img.src = imgSrc;
    img.style.position = 'absolute';
    img.style.height = height + 'px';     //you can changed the units from px if you so choose
    img.style.width = width + 'px';     //you can changed the units from px if you so choose
    img.style.zIndex = "200";

    img.style.pointerEvents = "none";
    item.position = [];
    img.onload = function () {
        item.setTransform([window.innerWidth / 2, window.innerHeight / 2], 0);
        document.body.appendChild(img);
    };

    item.setTransform = function (position, rotation) {

        item.position[0] = position[0] * sensitivity;
        item.position[1] = position[1] * sensitivity;

        img.style.left = position[0] * sensitivity - img.width / 2 + 'px';
        img.style.top = position[1] * sensitivity - img.height / 2 + 'px';

        //uncomment out if you want to utilize a rotaion factor to the image displayed
        // img.style.transform = 'rotate(' + -rotation + 'rad)';

        // img.style.webkitTransform = img.style.MozTransform = img.style.msTransform =
        // img.style.OTransform = img.style.transform;
    };
};

var controllerOptions = {enableGestures: true};

/*
 * initialize function needs to be called in order to utilize the position properties of the items objects
 * After initiializing you can use
 * parameters:
 * imgSrc1: image source for the first item object
 * width1: width of the first item object when displayed
 * height1: height of the first item object when displayed
 * imgSrc2: image source for the second item object
 * width2: width of the second item object when displayed
 * height2: height of the second item object when displayed
 * sensitivity: changes how far an item moves on screen per movement (suggested 1.5 to touch all corners of screen)
 */

var initialize = function (imgSrc1, width1, height1, imgSrc2, width2, height2, sensitivity) {
    var api = {};

    Leap.loop(controllerOptions, function (frame) {

        if (frame.valid && frame.gestures.length > 0) {
            frame.gestures.forEach(function (gesture) {
                switch (gesture.type) {
                    case "circle":
                        api.circle ? api.circle() : console.log('no circle gesture function created');
                        break;
                    case "keyTap":
                        api.keyTap ? api.keyTap() : console.log('no key tap gesture function created');
                        break;
                    case "screenTap":
                        api.screenTap ? api.screenTap() : console.log('no screen tap gesture function created');
                        break;
                    case "swipe":
                        api.swipe ? api.swipe() : console.log('no swipe gesture function created');
                        break;
                }
            });
        }
        /*
         * method triggered when circle gesture is called
         * fill in with your own method
         */
        api.circle = function () {
        };
        /*
         * method triggered when keytap gesture is called
         * fill in with your own method
         */
        api.keyTap = function () {
        };
        /*
         * method triggered when screenTap gesture is called
         * fill in with your own method
         */
        api.screenTap = function () {
            pointerTapped(items[0].position[0], items[0].position[1]);
        };

        /*
         * method triggered when swipe gesture is called
         * fill in with your own method
         */
        api.swipe = function () {

        };
        frame.hands.forEach(function (hand, index) {

            if (imgSrc2) {
                var item = ( items[index] || (items[index] = new Item(imgSrc2, width2, height2, sensitivity)) );
            } else {
                var item = ( items[index] || (items[index] = new Item()) );
            }
            item.setTransform(hand.screenPosition(), hand.roll());

        });

    }).use('screenPosition', {scale: 0.8});

    items[0] = new Item(imgSrc1, width1, height1, sensitivity);
    api.items = items;
    Leap.loopController.setBackground(true);
    return api;
};