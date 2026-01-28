let searchMode = false;
let lastSearchCity = "";

$(document).ready(function () {
    loadPages(false);
    loadData(0);

    $("#searchBtn").click(function () {
        const city = $("#searchCity").val().trim();

        if (city.length === 0) {
            searchMode = false;
            lastSearchCity = "";
            loadPages(false);
            loadData(0);
            return;
        }

        searchMode = true;
        lastSearchCity = city;

        loadPages(true, city);
        searchData(0, city);
    });
});

function loadPages(isSearch = false, city = "") {
    $("#pages").empty();

    if (!isSearch) {
        // обычный режим
        $.getJSON('/admin/count', function (data) {
            let pageCount = Math.ceil(data.count / data.pageSize);
            renderPages(pageCount);
        });

    } else {
        // поиск — считаем количество найденных локаций
        $.post('/admin/geoByCityCount', { city: city }, function (data) {
            let pageCount = Math.ceil(data.count / data.pageSize);
            renderPages(pageCount);
        });
    }

    $("#pages").off("click").on("click", ".page-link", function () {
        const page = $(this).data("page");

        if (searchMode) {
            searchData(page, lastSearchCity);
        } else {
            loadData(page);
        }
    });
}

function renderPages(pageCount) {
    $("#pages").empty();

    // если нет данных — не показываем пагинацию
    if (pageCount === 0) return;

    for (let i = 1; i <= pageCount; i++) {
        $('#pages').append(
            $('<li>').addClass('page-item').append(
                $('<a>')
                    .addClass('page-link')
                    .attr('data-page', i - 1)
                    .text('Page ' + i)
            )
        );
    }
}

function loadData(page) {
    $("#data > tbody").empty();

    $.getJSON('/admin/geo?page=' + page, function (data) {
        renderTable(data);
    });
}

function searchData(page, city) {
    $("#data > tbody").empty();

    $.post('/admin/geoByCity', { page: page, city: city }, function (data) {
        renderTable(data);
    });
}

function renderTable(data) {
    $("#data > tbody").empty();

    data.forEach(function (item) {
        $('#data > tbody').append(
            $('<tr>')
                .append($('<td>').text(item.ip))
                .append($('<td>').text(item.city))
                .append($('<td>').text(item.region))
                .append($('<td>').text(item.country))
        );
    });
}
