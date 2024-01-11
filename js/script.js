document.addEventListener("DOMContentLoaded", function () {
    // Finde alle Elemente mit der Klasse "gemuese"
    var verschiebbareElemente = document.getElementsByClassName("gemuese");

    // Iteriere durch jedes gefundene Element und füge den Event-Listener hinzu
    Array.from(verschiebbareElemente).forEach(function (element) {
        element.addEventListener("mousedown", dragStart);
        element.addEventListener("touchstart", dragStart);

        function dragStart(e) {
            if (e.type === "touchstart") {
                e.preventDefault();
            }

            var moveEvent = e.type === "mousedown" ? "mousemove" : "touchmove";
            var endEvent = e.type === "mousedown" ? "mouseup" : "touchend";

            var startX = e.clientX || e.touches[0].clientX;
            var startY = e.clientY || e.touches[0].clientY;

            var startLeft = parseInt(window.getComputedStyle(element).left) || 0;
            var startTop = parseInt(window.getComputedStyle(element).top) || 0;

            document.addEventListener(moveEvent, dragMove);
            document.addEventListener(endEvent, dragEnd);

            function dragMove(e) {
                var newX = startLeft + (e.clientX || e.touches[0].clientX) - startX;
                var newY = startTop + (e.clientY || e.touches[0].clientY) - startY;

                var viewportheight = window.innerHeight;
                var elementheight = element.offsetHeight;

                var viewportwidth = window.innerWidth;
                var elementwidth = element.offsetWidth;

                if (newY + elementheight < viewportheight * 2 && newY > 0 ) {
                    element.style.top = newY + "px";
                } else {
                    newY = startTop;
                }

                if (newX + elementwidth < viewportwidth && newX > 0) {
                    element.style.left = newX + "px";
                } else {
                    newX = startLeft;
                }
            }

            function dragEnd() {
                document.removeEventListener(moveEvent, dragMove);
                document.removeEventListener(endEvent, dragEnd);
            }
        }
    });
});

function reloadOnOrientationChange() {
    location.reload();
  }

  // Eventlistener hinzufügen, um auf Orientierungsänderungen zu reagieren
  window.addEventListener('orientationchange', reloadOnOrientationChange);
