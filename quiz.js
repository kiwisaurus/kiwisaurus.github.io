(function() {
  var questions = [{
    question: "What kind of gameplay do you want?",
    choices: ["Pressure", "Outmaneuver", "Balanced", "No Opinion"]
  }, {
    question: "What do you want to be best at?",
    choices: ["Damage", "Durability", "Mobility", "Utility", "No Opinion"]
  }, {
    question: "What range are you comfortable at?",
    choices: ["Close", "Medium", "Long", "No Opinion"]
  }, {
    question: "Do you enjoy playing keepaway?",
    choices: ["Yes, I do social distance", "No, I'm in a frat", "No Opinion"]
  }, {
    question: "Do you enjoy rushing down you opponent?",
    choices: ["Yes, I'm running at you right now", "No, I like my personal space", "No Opinion"]
  }, {
      question: "Do you enjoy staying in control?",
      choices: ["Yes, the less they play the more I play", "No, there is not a finite amount of game to go around", "No Opinion"]
  }, {
      question: "Do you want to manage a resource besides standard meter?",
      choices: ["Yes, I want whacky meters", "No, just the standard meter is enough", "No Opinion"]
  }, {
      question: "Do you want a projectile?",
      choices: ["Yes, I want one that goes across the whole screen and ideally into someone else's game", "Yes, but as long as it controls space it's fine", "No, dashing is the best projectile anyway", "No Opinion"]
  }, {
      question: "Do you want setplay?",
      choices: ["Yes, the key to winning is a flowchart to victory", "No, I'd rather focus on other things", "No Opinion"]
  }, {
      question: "Do you want a reversal?",
      choices: ["Yes, meterless traditional Dragon Punch", "Yes, but metered or nontraditional is fine", "No, I can block" , "No Opinion"]
  }, {
      question: "Do you want charge moves?",
      choices: ["Yes, I want to charge", "No, I'm not into that", "No Opinion"]
  }, {
      question: "What tier do you want your character to be at?",
      choices: ["High", "Mid", "Low", "No Opinion"]
  }, {
      question: "How difficult do you want your character to be?",
      choices: ["Easy Difficulty", "Medium Difficulty", "Hard Difficulty", "No Opinion"]
  }];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (!selections[questionCounter]==null) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      //console.log(item);
      radioList.append(item);
    }
    return radioList;
  }
    
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = $('input[name="answer"]:checked').parent('li').text();
    console.log($('input[name="answer"]:checked').parent('li').text());
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var answerKey = {
        "Pressure":["ABA","Baiken","Eddie","Faust","I-no","Johnny","Justice","Kliff","May","Order Sol","Potemkin","Slayer","Venom","Zappa","Testament",3],
        "Outmaneuver":["Bridget","Chipp","Dizzy","Jam","Millia",3],
        "Balanced":["Anji","Axl","Ky","Sol","Robo Ky",3],
        
        "Damage":["Baiken","I-no","Jam","Johnny","Kliff","May","Order Sol","Slayer","Sol","Venom",3],
        "Durability":["ABA","Anji","Justice","Potemkin",3],
        "Mobility":["Dizzy","Millia",3],
        "Utility":["Axl","Bridget","Chipp","Eddie","Faust","Ky","Robo Ky","Testament","Zappa",3],
        
        "Close":["ABA","Sol","Jam","Order Sol","Slayer","Potemkin","Chipp","May",3],
        "Medium":["Ky","Anji","Millia","Baiken","Robo Ky","Johnny","Axl","Kliff","Bridget","Zappa","I-no",3],
        "Long":["Faust","Justice","Testament","Venom","Dizzy","Eddie",3],
        
        "Yes, I do social distance":["Bridget","Dizzy","Justice","Venom","Testament","Axl","Faust",3],
        "No, I'm in a frat":["Bridget","Dizzy","Justice","Venom","Testament","Axl","Faust",-1],
        
        "No, I like my personal space":["Sol","Order Sol","Slayer","Chipp","Millia","Potemkin","Kliff","Jam","ABA","May",-1],
        "Yes, I'm running at you right now":["Sol","Order Sol","Slayer","Chipp","Millia","Potemkin","Kliff","Jam","ABA","May",3],
        
        "Yes, the less they play the more I play":["Baiken","Eddie","Dizzy","Anji","Chipp","I-no","Johnny","Justice","Kliff","Ky","Millia","Order Sol","Testament","Venom",3],
        "No, there is not a finite amount of game to go around":["Baiken","Eddie","Dizzy","Anji","Chipp","I-no","Johnny","Justice","Kliff","Ky","Millia","Order Sol","Testament","Venom",-2],
        
        "Yes, I want whacky meters":["Zappa","Robo Ky", "Order Sol","Jam","ABA","Testament", "Johnny","Eddie",5],
        "No, just the standard meter is enough":["Zappa","Robo Ky", "Anji","Baiken","ABA","Testament","Johnny","Eddie",-5],
        
        "Yes, I want one that goes across the whole screen and ideally into someone else's game":["Axl","Bridget","Dizzy","Eddie","I-no","Justice","Ky","Robo Ky","Testament","Venom","ABA",4],
        "Yes, but as long as it controls space it's fine":["Anji","Baiken","Chipp","Faust","Johnny","Kliff","May","Millia","Sol","Zappa",2],
        "No, dashing is the best projectile anyway":["Jam","Slayer","Potemkin","Order Sol",2],
        
        "Yes, the key to winning is a flowchart to victory":["Anji","Baiken","Chipp","Dizzy","Eddie","I-no","Kliff","Ky","Millia","Testament","Venom",3],
        "No, I'd rather focus on other things":["Anji","Baiken","Chipp","Dizzy","Eddie","I-no","Kliff","Ky","Millia","Testament","Venom",-2],
        
        "Yes, meterless traditional Dragon Punch":["Sol","Chipp","Ky","Order Sol","Jam",2],
        "Yes, but metered or nontraditional is fine":["Robo Ky","ABA","Axl","Baiken","Bridget","Dizzy","Johnny","Justice","May","Millia","Slayer","Testament","I-no",1],
        "No, I can block":["Anji","Eddie","Faust","Kliff","Potemkin","Venom","Zappa",1],
        
        "Yes, I want to charge":["Anji","Axl","May","Potemkin","Venom",5],
        "No, I'm not into that":["Anji","Axl","May","Potemkin","Venom",-5],
        
        "High":["Testament","Baiken","Zappa","Millia","Chipp","Faust","Jam","Dizzy",3],
        "Mid":["Sol","May","Eddie","Potemkin","Axl","Justice","Anji","Johnny","Venom","I-no","Slayer","Order Sol",3],
        "Low":["Ky","Kliff","Bridget","Robo Ky","ABA",3],
        
        "Easy Difficulty":["Sol","ABA","Jam","Ky","Anji","Millia","Axl","Kliff","Faust","Justice","Potemkin",7],
        "Medium Difficulty":["Order Sol","Slayer","Chipp","Baiken","Robo Ky","Bridget","Testament",5],
        "Hard Difficulty":["May","Johnny","I-no","Eddie","Dizzy","Zappa",4],
        
        "No Opinion": [0]
    };
    
    var characterKey = {
        "ABA":[0,"https://www.youtube.com/watch?v=bsIPfBzp5O4"],
        "Anji":[0,"https://www.youtube.com/watch?v=EgT9R4YEBwA"],
        "Axl":[0,"https://www.youtube.com/watch?v=N6IIghe5_Os"],
        "Baiken":[0,"https://www.youtube.com/watch?v=SXrgyAzjjJs"],
        "Bridget":[0,"https://www.youtube.com/watch?v=7ikFr0gOoV8"],
        "Chipp":[0,"https://www.youtube.com/watch?v=YiPQ_p6E-Gw"],
        "Dizzy":[0,"https://www.youtube.com/watch?v=3XN5uZz5ncw"],
        "Eddie":[0,"https://www.youtube.com/watch?v=VfouOVyyhiM"],
        "Faust":[0,"https://www.youtube.com/watch?v=Z9XS40ZAkhU"],
        "I-no":[0,"https://www.youtube.com/watch?v=YKdMBbMlojU"],
        "Jam":[0,"https://www.youtube.com/watch?v=prHmfNfBxDk"],
        "Johnny":[0,"https://www.youtube.com/watch?v=6NfJ3pn0FgQ"],
        "Justice":[0,"https://www.youtube.com/watch?v=wYssPNLHp_Y"],
        "Kliff":[0,"https://www.youtube.com/watch?v=TzSG6VRw_j0"],
        "Ky":[0,"https://www.youtube.com/watch?v=RF1QTDpgM0Q"],
        "May":[0,"https://www.youtube.com/watch?v=wzDZ8tOBdyE"],
        "Millia":[0,"https://www.youtube.com/watch?v=qJ6lalWfYRk"],
        "Order Sol":[0,"https://www.youtube.com/watch?v=cTnI-XksUgs"],
        "Potemkin": [0,"https://www.youtube.com/watch?v=3VRHkpWE8Bo"],
        "Robo Ky": [0,"https://www.youtube.com/watch?v=o8jxv0ySFNc"],
        "Slayer": [0,"https://www.youtube.com/watch?v=qdUwjzHcTnY"],
        "Sol":[0,"https://www.youtube.com/watch?v=yXxyzS1o_XQ"],
        "Testament":[0,"https://www.youtube.com/watch?v=6dywZziE5nM"],
        "Venom":[0,"https://www.youtube.com/watch?v=LqYupY43714"],
        "Zappa":[0, "https://www.youtube.com/watch?v=EfqCXuJP3fE"]
    }
    for (var i = 0; i < selections.length; i++) {
        console.log(selections[i]+ ' ' + answerKey[selections[i]]);
        //console.log(answerKey[selections[i]]);
        for (var j=0; j< answerKey[selections[i]].length-1; j++) {
            var characterToScore = answerKey[selections[i]][j];
            var scoreSpot = answerKey[selections[i]].length-1
            characterKey[characterToScore][0] += answerKey[selections[i]][scoreSpot];
            console.log(characterKey[characterToScore][0]+ ' '+ characterToScore);
        }
    }
    var score = $('<p>',{id: 'question'});
    var items = Object.keys(characterKey).map(function(key) {
                                              return [key, characterKey[key]];
                                              });
    items.sort(function(first, second) {
        return second[1][0] - first[1][0];
    });
    //console.log(items[0][1][1]);
    //var choices = [$('<a href="'+items[0][2]+'">'+items[0][0]+'</a>'), $('<a href="'+items[1][2]+'">'+items[1][0]+'</a>'),$('<a href="'+items[2][2]+'">'+items[2][0]+'</a>')];
    score.append('You got ' + '<a href="'+items[0][1][1]+'">'+items[0][0]+'</a>', '<br>' + ' Or try: ' + '<a href="'+items[1][1][1]+'">'+items[1][0]+'</a>' + ' or ' +'<a href="'+items[2][1][1]+'">'+items[2][0]+'</a>');
    return score;
  }
})();
