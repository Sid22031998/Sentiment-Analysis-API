
function setup() {
  noCanvas();
  var wordinput = select('#word');
  var scoreinput = select('#score');
  var scoreit = select('#scoreit');
  scoreit.mousePressed(submitscore);

  function submitscore() {
    var url = '/add/' + wordinput.value() + '/' + scoreinput.value();
    loadJSON(url, submitted);
    function submitted(result) {
      console.log(result);
    }
  }

  var txt = select('#text');
  var analyzeit = select('#analyze');
  analyzeit.mousePressed(analyze);


  function analyze() {
    var params = {
      text: txt.value()
    }
    httpPost('/analyze', params, success);
  }

  var scoreresult = select('#scoreresult');
  var comparative = select('#comparative');
  var negative = select('#negative');
  var positive = select('#positive');

  function success(result) {

    result = JSON.parse(result);
    scoreresult.html('score: ' + result.score);
    comparative.html('comparative: ' + result.comparative);
    negative.html('negative words: ' + result.negative.join(', '));
    positive.html('positive words: ' + result.positive.join(', '));
    console.log(result);
  }

}