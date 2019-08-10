$( document ).ready(function(){
    //user side

    //ADD QUESTION page attribute
    question = $("#questionID");
    answ1= $("#answer1");
    answ2= $("#answer2");
    answ3= $("#answer3");
    answ4= $("#answer4");
    answers=$("#answersID");
    addquestionbutton=$("#addquestionbtn");
    answers.hide();
    addquestionbutton.hide();

    //QUIZ APP page attribute 
    Firstbutton = $("#First");
    Secondbutton = $("#Second");
    Thirdbutton = $("#Third");
    Fourthbutton = $("#Fourth");
    Question = $("#question");

    //LOGIN PAGE attribute
    username = $("#username");
    password = $("#password");
    userButton = $("#userbuton");


    //At first, questions and answers were hidden.
    Firstbutton.hide();
    Secondbutton.hide();
    Thirdbutton.hide();
    Fourthbutton.hide();
    Question.hide();


    //Every request is made, we will put the right answer into realanswer.
    var realanswer;
    var score = 0;
    var totalquestion = 5;
    var count = 1;

    //After entering the question and 4 answers, the button becomes active. With focusout()
    function control (){
        if(question.val()=="" || answ1.val()=="" || answ2.val()=="" || answ3.val()=="" || answ4.val()=="")
        {
            answers.hide();
            addquestionbutton.hide();
        }
        else
        {
           answers.append("<option>"+answ1.val()+"</option><option>"+answ2.val()+"</option><option>"+answ3.val()+"</option><option>"+answ4.val()+"</option>");
           answers.show();
           addquestionbutton.show();
        }
    }
    question.focusout(function(){
        control();
    });

    answ1.focusout(function(){
        control();
    });
    
    answ2.focusout(function(){
        control();
    });
    
    answ3.focusout(function(){
        control();
    });
   
    answ4.focusout(function(){
        control();
    });

    function sendQuestion(q,a1,a2,a3,a4,answ)
    {
        $.ajax({
            type: "get",
            url: "http://localhost:3000/question",
            data: {
                question: q,
                answ1: a1,
                answ2: a2,
                answ3: a3,
                answ4: a4,
                answers: answ
            },
            success: function(Responddata){
                console.log(Responddata);
            }
        });
    }

    function Empty(){
        //With prop, the user will no longer be able to enter textboxes again after focusout().
        question.prop("disabled",false);
        answ1.prop("disabled",false);
        answ2.prop("disabled",false);
        answ3.prop("disabled",false);
        answ4.prop("disabled",false);

        question.val("");
        answ1.val("");
        answ2.val("");
        answ3.val("");
        answ4.val("");
   
        answers.empty();
        answers.hide();
        addquestionbutton.hide();
}

    addquestionbutton.click(function(){
       sendQuestion(question.val(),answ1.val(),answ2.val(),answ3.val(),answ4.val(),answers.val());
       Empty();
    });


    
    userButton.click(function(){
        $.ajax({
            type: "Post",
            url: "http://localhost:3000/user",
            data: {
                usernameserver: username.val(),
                passwordserver: password.val(),
            },
            success: function(data){
                if (data=="Success") {
                  
                    console.log(data);
                    getQuestion();
                    username.hide();
                    password.hide();
                    userButton.hide();
                    
                    Firstbutton.show();
                    Secondbutton.show();
                    Thirdbutton.show();
                    Fourthbutton.show();
                    Question.show();
                }
                else
                {
                    console.log("Dadasdasd");
                }
            }
        });
     });

     function getQuestion(){
       if (count < totalquestion) 
       {
           count = count +1;
        $.ajax({
            url: "http://localhost:3000/question",
            type: "get",
            success: function(data){
                console.log(data);
                Question.text(data[0].questiontext);  
                Firstbutton.text(data[0].answer1);
                Secondbutton.text(data[0].answer2);
                Thirdbutton.text(data[0].answer3);
                Fourthbutton.text(data[0].answer4);
                realanswer= data[0].rightanswer;
                }
              });
       }
       else
       {
        InsertUserScore(username.val(),score);
        Firstbutton.hide();
        Secondbutton.hide();
        Thirdbutton.hide();
        Fourthbutton.hide();
        Question.hide();
       }       
     }

     $("#First").click(function(){
        if($("#First").text()==realanswer)
        {
            score = score +1;
        }
        getQuestion();
     });

     $("#Second").click(function(){
        if($("#Second").text()==realanswer)
        {
            score = score +1;
        }
        getQuestion();
    });

     $("#Third").click(function(){
        if($("#Third").text()==realanswer)
        {
            score = score +1;
        }
        getQuestion();
    });

     $("#Fourth").click(function(){
        if($("#Fourth").text()==realanswer)
        {
            score = score +1;
        }
        getQuestion();
    });

    function InsertUserScore(username,userscore){
        $.ajax({
            url:"http://localhost:3000/adduserscore",
            type:"post",
            data:{
                usernameserver:username,
                userscoreserver:userscore,
            },
            success:function(data)
            {
                console.log("added.");
            }
        });
    }
});