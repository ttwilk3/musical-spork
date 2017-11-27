function newScore(scoreVal, gameName) {
    var score = {
        Val: scoreVal,
        Game: gameName
    };
    $.ajax({
        type: 'GET',
        url: '/Shared/newScore',
        contentType: 'application/json',
        data: score,
        async: false
    })
    .done(function () { })
    .fail(function () { })
}

function getBestScores() {
    $.ajax({
        type: 'GET',
        url: '/Shared/getBestScores',
        contentType: 'application/json',
        async: false
    })
    .done(function (scores) {
        bestScores = JSON.parse(scores);
    })
    .fail(function () { })
}