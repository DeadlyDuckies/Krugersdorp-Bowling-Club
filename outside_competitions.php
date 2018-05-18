<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="assets/images/kbc-logo-trans-181x172.png" type="image/x-icon">
        <meta name="description" content="Krugersdorp Bowling Club Outside Competitions">
        <title>Outside Competitions - Krugersdorp Bowling Club</title>
        <link rel="stylesheet" href="assets/web/assets/mobirise-icons/mobirise-icons.css">
        <link rel="stylesheet" href="assets/tether/tether.min.css">
        <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
        <link rel="stylesheet" href="assets/bootstrap/css/bootstrap-grid.min.css">
        <link rel="stylesheet" href="assets/bootstrap/css/bootstrap-reboot.min.css">
        <link rel="stylesheet" href="assets/dropdown/css/style.css">
        <link rel="stylesheet" href="assets/theme/css/style.css">
        <link rel="stylesheet" href="assets/mobirise/css/mbr-additional.css" type="text/css">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    </head>

    <body>
        <?php include "header.php"; ?>

        <section class="mbr-section content4 cid-qztw6cbZZn2" id="content4-1p" data-rv-view="14">
            <div class="container">
                <div class="media-container-row">
                    <div class="title col-12 col-md-8">
                        <h2 class="align-center pb-3 mbr-fonts-style display-2">
                            Outside Competitions
                        </h2>
                    </div>
                </div>
            </div>
        </section>

        <section class="cid-qztagOMwAz" id="image2-1m" data-rv-view="8">
            <figure class="mbr-figure container">
                <div class="w3-center">
                    <div class="w3-section">
                        <button class="btn btn-form btn-secondary display-7" onclick="plusDivs(-1)">❮ Prev</button>
                        <button class="btn btn-form btn-secondary display-7" onclick="plusDivs(1)">Next ❯</button>
                    </div>
                </div>
                <div class="w3-content w3-display-container w3-section">
                    <img class="upcomingSlides" src="assets/images/Fochville_Mens_Day_2018.jpg" style="width:100%">
                    <img class="upcomingSlides" src="assets/images/Chamney_Cup_2018.jpg" style="width:100%">
                    <img class="upcomingSlides" src="assets/images/Scottburgh_August_Tournament_2018.jpg" style="width:100%">
                    <img class="upcomingSlides" src="assets/images/Mielieland_kennisgewing_2018.jpg" style="width:100%">
                    <img class="upcomingSlides" src="assets/images/Cherry_Bowls_Kersierolbaltoernooi_2018.jpg" style="width:100%">
                </div>
                <script>
                    var myIndex = 0;
                    console.log("script.myIndex: " + myIndex);
                    timer();

                    function plusDivs(n) {
                        carousel(n);
                    }

                    function carousel(n) {
                        var i;
                        var x = document.getElementsByClassName("upcomingSlides");
                        for (i = 0; i < x.length; i++) {
                            x[i].style.display = "none";
                        }
                        myIndex += n;
                        if (myIndex > x.length) {myIndex = x.length}
                        if (myIndex <= 0) {myIndex = 1}
                        console.log("carousel.myIndex: " + myIndex);
                        x[myIndex-1].style.display = "block";
                    }

                    function timer() {
                        carousel(1);
                        setTimeout(timer, 15000); // Change image every 15 seconds
                    }

                    function specificImage(n) {
                        myIndex = 0;
                        carousel(n);
                    }
                </script>
            </figure>
        </section>

        <script src="assets/web/assets/jquery/jquery.min.js"></script>
        <script src="assets/popper/popper.min.js"></script>
        <script src="assets/tether/tether.min.js"></script>
        <script src="assets/bootstrap/js/bootstrap.min.js"></script>
        <script src="assets/smooth-scroll/smooth-scroll.js"></script>
        <script src="assets/dropdown/js/script.min.js"></script>
        <script src="assets/touch-swipe/jquery.touch-swipe.min.js"></script>
        <script src="assets/theme/js/script.js"></script>
    </body>
</html>
