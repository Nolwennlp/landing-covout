$(function() {


    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $(document).on('click', 'a.page-scroll', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 100
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 50
        }
    });

    // Changing the defaults
    window.sr = ScrollReveal({ reset: true });

    // Customizing a reveal set
    sr.reveal('section', { duration: 1500 });


    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBRYvEd2jOhF_5njp2ey3me4Byut8YV4w4",
        authDomain: "covout-d6e7c.firebaseapp.com",
        databaseURL: "https://covout-d6e7c.firebaseio.com",
        projectId: "covout-d6e7c",
        storageBucket: "covout-d6e7c.appspot.com",
        messagingSenderId: "637551796311"
    };
    firebase.initializeApp(config);

    
    //TRACKING CLICK FACEBOOK
    var currentregisterClickFacebook = 0;
    var nbregisterClickFacebook = firebase.database().ref('registerClickFacebook');
    console.log(nbregisterClickFacebook);
    nbregisterClickFacebook.on('value', function(snapshot) {
        currentregisterClickFacebook = snapshot.val();
    });

    $('.social-facebook').on('click', function(e) {
        registerClickFacebook(currentregisterClickFacebook);
    });

    function registerClickFacebook(currentregisterClickFacebook) {
        console.log(currentregisterClickFacebook);
        if (!currentregisterClickFacebook) {
            firebase.database().ref('registerClickFacebook').set(1);
        }
        else {
            currentregisterClickFacebook++;
            firebase.database().ref('registerClickFacebook').set(currentregisterClickFacebook);
        }
    }

    //TRACKING CLICK TWITTER
    var currentregisterClickTwitter = 0;
    var nbregisterClickTwitter = firebase.database().ref('registerClickTwitter');
    console.log(nbregisterClickTwitter);
    nbregisterClickTwitter.on('value', function(snapshot) {
        currentregisterClickTwitter = snapshot.val();
    });

    $('.social-twitter').on('click', function(e) {
        registerClickTwitter(currentregisterClickTwitter);
    });

    function registerClickTwitter(currentregisterClickTwitter) {
        console.log(currentregisterClickTwitter);
        if (!currentregisterClickTwitter) {
            firebase.database().ref('registerClickTwitter').set(1);
        }
        else {
            currentregisterClickTwitter++;
            firebase.database().ref('registerClickTwitter').set(currentregisterClickTwitter);
        }
    }


    //TRACKING CLICK INSTAGRAM
    var currentregisterClickInstragram = 0;
    var nbregisterClickInstragram = firebase.database().ref('registerClickInstragram');
    console.log(nbregisterClickInstragram);
    nbregisterClickInstragram.on('value', function(snapshot) {
        currentregisterClickInstragram = snapshot.val();
    });

    $('.social-instagram').on('click', function(e) {
        registerClickInstragram(currentregisterClickInstragram);
    });

    function registerClickInstragram(currentregisterClickInstragram) {
        console.log(currentregisterClickInstragram);
        if (!currentregisterClickInstragram) {
            firebase.database().ref('registerClickInstragram').set(1);
        }
        else {
            currentregisterClickInstragram++;
            firebase.database().ref('registerClickInstragram').set(currentregisterClickInstragram);
        }
    }


    //TRACKING CLICK NEWSLETTER
    var currentregisterClickNewsletter = 0;
    var nbregisterClickNewsletter = firebase.database().ref('registerClickNewsletter');
    console.log(nbregisterClickNewsletter);
    nbregisterClickNewsletter.on('value', function(snapshot) {
        currentregisterClickNewsletter = snapshot.val();
    });

    $('.subsribe').on('click', function(e) {
        registerClickNewsletter(currentregisterClickNewsletter);
    });

    function registerClickNewsletter(currentregisterClickNewsletter) {
        console.log(currentregisterClickNewsletter);
        if (!currentregisterClickNewsletter) {
            firebase.database().ref('registerClickNewsletter').set(1);
        }
        else {
            currentregisterClickNewsletter++;
            firebase.database().ref('registerClickNewsletter').set(currentregisterClickNewsletter);
        }
    }
    
    // NEWSLETTER //

    $(document).ready(function() {
        $('.verif-email').focusout(function(){
            var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            var emailaddressVal = $(this).val();

            if(emailaddressVal == '') {
                $('.error').text('Le champs est vide.');
            } else if(!emailReg.test(emailaddressVal)) {
                $('.error').text('Ce n\'est pas une adresse email');
            } else {
                $('.error').text('');
            }
        });
    });


    $(document).ready(function() {
        $('#newsletterSubmit').click(function(){
            var emailaddressVal = $(this).val();

            if(emailaddressVal == '') {
                $('.error').text('Le champs est vide.');
            } else {
                $('.error').text('');
            }
        });
    });

    //CLICK SUBMIT
    var newsletterSubmit = $("#newsletterSubmit");
    newsletterSubmit.on('click', function(e) {
        e.preventDefault();
        var formId = Math.round(Math.random()*3600),
            name = $("#name").val(),
            email = $("#email").val();
        writeCatData(formId,name,email);
    });


    //SEND FORM TO FIREBASE
    function writeCatData(formId, name, email ) {
        firebase.database().ref('newsletters/' + formId).set({
            name : name,
            email : email
        });
    }

    //CHANGEMENT ON BASE
    var listNewsletters = firebase.database().ref('newsletters');
    listNewsletters.on('value', function(snapshot) {

        var newslettersArray = [];
        for(var formId in snapshot.val()){
            var newsletter = snapshot.val()[formId];
            newslettersArray.push(newsletter);
        }
    });

    function addEventListenerByClass(className,event,fn){
        var list = document.getElementsByClassName('answer');
        for(var i=0, len = list.length; i<len; i++){
            list[i].addEventListener(event, fn, false);
        }
    }

    addEventListenerByClass('answer', 'click', replaceText);

    function replaceText(e){
        e.preventDefault();

        var id = this.getAttribute('data-answer-id');
        var text = this.getAttribute('data-answer-text');

        var id2 = this.getAttribute('data-answer2-id');
        var text2 = this.getAttribute('data-answer2-text');

        var element = document.getElementById(id);

        if (!!element) element.textContent = text;
        if(!!id2 && !!text2) {
            var element2 = document.getElementById(id2);
            if (!!element2) element2.textContent = text2;
        }
    }

    $( ".element" ).bind( 'click' , function(){

        $( ".element" ).removeClass( "class_css_hover" );
        $( this ).addClass( "class_css_hover" );
    } );

    $( ".location" ).bind( 'click' , function(){

        $( ".location" ).removeClass( "class_css_hover" );
        $( this ).addClass( "class_css_hover" );
    } );

    $( ".personnality" ).bind( 'click' , function(){

        $( ".personnality" ).removeClass( "class_css_hover" );
        $( this ).addClass( "class_css_hover" );
    } );

});


