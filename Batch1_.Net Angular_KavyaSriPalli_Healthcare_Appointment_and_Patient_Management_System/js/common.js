function showMessage(message, type = "success") {

    let toast = `
        <div class="toast-message toast-${type}">
            ${message}
        </div>
    `;

    $("body").append(toast);

    setTimeout(function () {
        $(".toast-message").addClass("show");
    }, 100);

    setTimeout(function () {
        $(".toast-message").removeClass("show");

        setTimeout(function () {
            $(".toast-message").remove();
        }, 500);

    }, 3000);

}


// Auto highlight active navbar link
$(document).ready(function () {

    let currentPage = window.location.pathname
        .split("/")
        .pop()
        .split("?")[0];

    $(".navbar-nav .nav-link").each(function () {

        let linkPage = $(this).attr("href");

        if (linkPage === currentPage) {
            $(this).addClass("active");
        }

    });

});

// Auto highlight sidebar link

$(document).ready(function () {

    let currentPage = window.location.pathname
        .split("/")
        .pop()
        .split("?")[0];

    $(".sidebar-link").each(function () {

        let linkPage = $(this).attr("href");

        if (linkPage === currentPage) {
            $(this).addClass("active-sidebar");
        }

    });

});