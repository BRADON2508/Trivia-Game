var questions = [{
  question: "What is the distance between Earth and Ceres?",
  choices: ["7.5 billion KMs", "1.2 billion KMs", "54.6 million KMs", "414 million KMs"],
  correctAnswer: 3
}, {
  question: "What is the EVAP system for in your car?",
  choices: ["To keep your AC running", "To prevent fuel loss and hydrocarbon exposure", "To keep your oil from evaporating", "To Clean the fuel"],
  correctAnswer: 2
}, {
  question: "What is the busiest train station in the world?",
  choices: ["Grand Central, NY", "Shibuya, Tokyo", "Beijing Central, Chine", "Gard du Nord, Paris"],
  correctAnswer: 1
}, {
  question: "How many vampire novels have starred the character Lestat?",
  choices: ["12", "3", "6", "5"],
  correctAnswer: 0
}, {
  question: "What is Hideo Kojima known for?",
  choices: ["Metal Gear", "Ninja Gaiden", "Tokimeki Memorial", "All of the Above"],
  correctAnswer: 0
}];

var currentQuestion = 0;
var correctAnswer = 0;
var quizOver = false;


// This displays the current question AND the choices
function displayCurrentQuestion() {

  console.log("In display current Question");

  var question = questions[currentQuestion].question;
  var questionClass = $(document).find(".quizContainer > #question");
  var choiceList = $(document).find(".quizContainer > #choiceList");
  var numChoices = questions[currentQuestion].choices.length;

  // Set the questionClass text to the current question
  $(questionClass).text(question);

  // Remove all current <li> elements (if any)
  $(choiceList).find("li").remove();

  var choice;
  for (i = 0; i < numChoices; i++) {
      choice = questions[currentQuestion].choices[i];
      var html = "<li>" + choice + "</li>";
      choiceList.append(html);
  }

  //set correct answer
  correctAnswer = questions[currentQuestion].correctAnswer;
  
}

function resetQuiz() {
  currentQuestion = 0;
  correctAnswer = 0;
  hideScore();
}

function nextQuestion() {
    currentQuestion++;
    //re-start the timer
    displayCurrentQuestion();
  }

function displayScore() {
  $(document).find(".quizContainer > .result").text("You scored: " + correctAnswer + " out of: " + questions.length);
  $(document).find(".quizContainer > .result").show();
}

function hideScore() {
  $(document).find(".result").hide();
}

// $(function(){
  var questionTimeout = null;

  function goNext($el) {
      clearTimeout(questionTimeout);
      var $next = $el.next();
      $el.fadeOut(500, function() {
          if($next.length > 0) {
              $next.fadeIn(500, function() {
                  questionTimeout = setTimeout(function() {
                      goNext($next);
                  }, 15000);
              });
          }
          else {
              afterLastQuestion();
          }
      });
  }

  function afterLastQuestion(){
      alert("last question complete");
      $start.show();
  }

  $("#choiceList").on("click","li",function(){
     //check if correct answer
     if($(this).text() === questions[currentQuestion].choices[correctAnswer])
     {
        console.log("correct");
     }
     else
     {
        console.log("incorrect");
     }

     //next question
     nextQuestion();
  })

//   var $superContainer = 
  $("#superContainer").on('click', '.next', function() {
      goNext($(this).closest('.slide-container'));
      return false;
  });

//   var $start = 
  $("#start").on('click', function(){
    //   $(this).hide();
    //   $superContainer.find(".slide-container")
    //       .eq(0).clone(true,true)
    //       .prependTo(superContainer)
    //       .find(".next").trigger('click');
    //   return false;
    $(".instructions").hide()
    displayCurrentQuestion();
  });


// });