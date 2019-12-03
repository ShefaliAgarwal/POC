$(function () {
    $("input[type=date]").each(function () {
        if (this.type != 'date') $(this).datepicker();
    });
});