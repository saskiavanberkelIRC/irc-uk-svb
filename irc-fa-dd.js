/*************************
UTILITIES
*************************/
if (!window.console) window.console = {};
if (!window.console.log) window.console.log = function () { };

function encodeHTML(s) {
    var t = s.replace(/&/g, '&amp;');
    var u = t.replace(/[<]/g, '&lt;');
    var v = u.replace(/"/g, '&quot;');
    var w = v.replace(/[>]/g, '&gt;');
    return w;
}

function noErrorsOnPage() {
    // returns true if no errors on page, otherwise returns false
    if($('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_ValSummary').html()) {
        if ($('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_ValSummary').html().trim() === "") {
            return true;
        } else {
            return false;
        }       
    } else {
        return false;    
    }
}

function setCookie(name,value) {
  var expires = "";

  var date = new Date();
  var minutes = 20;
  date.setTime(date.getTime() + (minutes * 60 * 1000));
  expires = "; expires=" + date.toUTCString();
  
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return "";
    if (!results[2]) return '';
    var length = 30;
    resultingString = encodeHTML(decodeURIComponent( results[2].replace(/\+/g, " ")));
    return resultingString.substring(0, length);
}

function validateSlide1(callback) {
    $('.step1 .error').remove();
    var isValid = true;
    // donation amount value
    var donationAmount = $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_DonationSection_DirectDebitAmounts_TextBoxOtherAmount_TextBox').val();
    console.log('donation amount: ' + donationAmount);
    if (donationAmount == "" || !$.isNumeric(donationAmount)) {
        console.log('invalid donation amount');
        // add error label for donation amount
        var $error = $('<span class="error" style="color:red;">');
        $error.html('Please enter a valid amount');
        $('.donation-text-cont').before($error);
        isValid = false;
    }

    // payment frequency
    var paymentFreq = $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_DonationSection_DropDownPaymentFrequency_DropDownList').val();
    if (paymentFreq === '') {
        var $error = $('<span class="error" style="color:red;">');
        $error.html('Please select a Direct Debit Frequency');
        $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_DonationSection_DropDownPaymentFrequency_LabelForDropDownList').before($error);
        isValid = false;
    }
    // run callback if all fields on slide valid
    if (isValid) {
        callback();
    }
}

function validateSlide2(callback) {
    $('.step2.personal-details-form .error').remove();
    var isValid = true;
    // title value
    var titleVal = $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_PersonalDetailsSection_DropDownListTitle').val();
    if (titleVal == "") {
        console.log('invalid tile');
        // add error label for title
        var $error = $('<span class="error" style="color:red;">');
        $error.html('Please select a Title');
        $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_PersonalDetailsSection_DropDownListTitle').prev().before($error);
        isValid = false;
    }
    // firstname value
    var firstnameVal = $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_PersonalDetailsSection_TextBoxFirstName_TextBox').val();
    if (firstnameVal == "") {
        console.log('invalid firstname');
        // add error label for this
        var $error = $('<span class="error" style="color:red;">');
        $error.html('Please enter your First Name');
        $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_PersonalDetailsSection_TextBoxFirstName_TextBox').prev().before($error);
        isValid = false;
    }
    // lastname value
    var lastnameVal = $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_PersonalDetailsSection_TextBoxLastName_TextBox').val();
    if (lastnameVal == "") {
        console.log('invalid lastname');
        // add error label for this
        var $error = $('<span class="error" style="color:red;">');
        $error.html('Please enter your Last Name');
        $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_PersonalDetailsSection_TextBoxLastName_TextBox').prev().before($error);
        isValid = false;
    }
    // email required and email format
    var emailVal = $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_PersonalDetailsSection_TextBoxEmail_TextBox').val();
    var emailPattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
    if (!emailPattern.test(emailVal) || emailVal == "") {
        console.log('not a valid e-mail address');
        // add error label
        var $error = $('<span class="error" style="color:red;">');
        $error.html('There is a problem with your email address, please review and fix');
        $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_PersonalDetailsSection_TextBoxEmail_TextBox').prev().before($error);
        isValid = false;
    }

    // address 1 value
    var address1Val = $('#TextBoxAddressLine1').val();
    if (address1Val == "") {
        console.log('invalid addr');
        // add error label for this
        var $error = $('<span class="error" style="color:red;">');
        $error.html('Please enter your address');
        $('#TextBoxAddressLine1').prev().before($error);
        isValid = false;
    }

    // town value
    var townVal = $('#TextBoxTownOrCity').val();
    if (townVal == "") {
        console.log('invalid city');
        // add error label for this
        var $error = $('<span class="error" style="color:red;">');
        $error.html('Please enter your town');
        $('#TextBoxTownOrCity').prev().before($error);
        isValid = false;
    }
    // postcode value
    var postcodeVal = $('#TextBoxPostcode').val();
    if (postcodeVal == "") {
        console.log('invalid postcode');
        // add error label for this
        var $error = $('<span class="error" style="color:red;">');
        $error.html('Please enter your postcode');
        $('#TextBoxPostcode').prev().before($error);
        isValid = false;
    }


    // run callback if all fields on slide valid
    if (isValid) {
        callback();
    }
}

function validateSlide3(callback) {
    $('.step3.payment-details-form .error').remove();
    var isValid = true;
    // acount holder name present
    var accountNameVal = $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_PaymentDetailsSection_TextBoxAccountHolderName_TextBox').val();
    if (accountNameVal == "") {
        console.log('invalid account name');
        // add error label for this
        $error = $('<span class="error" style="color:red;">');
        $error.html('Account Name Error - please retry');
        $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_PaymentDetailsSection_TextBoxAccountHolderName_TextBox').prev().before($error);
        isValid = false;
    }
    // sortcode is numeric and 6 char long
    var sortcodeVal = $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_PaymentDetailsSection_TextBoxSortCode_TextBox').val();
    if (sortcodeVal.length !== 6 || !$.isNumeric(sortcodeVal)) {
        console.log('invalid sortcode');
        // add error label for this
        $error = $('<span class="error" style="color:red;">');
        $error.html('Please enter a six digit Sort Code - do not include dashes or spaces');
        $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_PaymentDetailsSection_TextBoxSortCode_TextBox').prev().before($error);
        isValid = false;
    }
    // account number is present and numeric
    var accnumbVal = $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_PaymentDetailsSection_TextBoxAccountNumber_TextBox').val();
    if (accnumbVal == "" || !$.isNumeric(accnumbVal)) {
        console.log('invalid account numb');
        // add error label for this
        $error = $('<span class="error" style="color:red;">');
        $error.html('Please do not include dashes or spaces');
        $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_PaymentDetailsSection_TextBoxAccountNumber_TextBox').prev().before($error);
        isValid = false;
    }
    // run callback if all fields on slide valid
    if (isValid) {
        callback();
    }
}

function validateSlide5(callback) {
  var isValid = true;
    $('.field-group.data-protection .error').remove();
    if (!$('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_PersonalDetailsSection_CheckBoxDataProtectionConfirmation1').prop('checked') && !$('#email-no').prop('checked')) {
      console.log('invalid');
      $('.field-group.data-protection p:eq(1)').before($('<span class="error" style="color:red; display: block;">Please select one</span>'));
      isValid = false;
    }

    if (!$('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_PersonalDetailsSection_CheckBoxDataProtectionConfirmation2').prop('checked') && !$('#phone-no').prop('checked')) {
      console.log('invalid');
      $('.field-group.data-protection p:eq(2)').before($('<span class="error" style="color:red; display: block;">Please select one</span>'));
      isValid = false;
    }

    if (!$('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_PersonalDetailsSection_CheckBoxDataProtectionConfirmation3').prop('checked') && !$('#post-no').prop('checked')) {
      console.log('invalid');
      $('.field-group.data-protection').append($('<span class="error" style="color:red; display: block;">Please select one</span>'));
      isValid = false;
    }

    // run callback if all fields on slide valid
    if (isValid) {
        callback();
    }
}

function changeProgessBar(step) {
    console.log('Changing to step ' + step);
    // takes step 1, 2 or 3 as arg
    $('#progress-bar .pre-progress.progress-active').removeClass('progress-active');
    $('#progress-bar li').eq(step - 1).find('.pre-progress').addClass('progress-active');
    if (step === 1) {
        // remove completed class from o
        $('#progress-bar li, #progress-bar li, #progress-bar li').removeClass('completed');
        setCookie('IRC:form-progress', 'step1');
    } else if (step === 2) {
        $('#progress-bar li').removeClass('completed');
        $('#progress-bar li:eq(0)').addClass('completed');
        $('#progress-bar li:eq(1) .pre-progress').addClass('progress-active');
        setCookie('IRC:form-progress', 'step2');
    } else if (step === 3) {
        $('#progress-bar li').removeClass('completed');
        $('#progress-bar li:eq(0)').addClass('completed');
        $('#progress-bar li:eq(1)').addClass('completed');
        setCookie('IRC:form-progress', 'step3');
    } else if (step === 4) {
        $('#progress-bar li').removeClass('completed');
        $('#progress-bar li:eq(0)').addClass('completed');
        $('#progress-bar li:eq(1)').addClass('completed');
        $('#progress-bar li:eq(2)').addClass('completed');
        $('#progress-bar li:eq(3) .pre-progress').addClass('progress-active');
        setCookie('IRC:form-progress', 'step4');
    } else if (step === 5) {
        $('#progress-bar li').removeClass('completed');
         $('#progress-bar li:eq(0)').addClass('completed');
          $('#progress-bar li:eq(1)').addClass('completed');
          $('#progress-bar li:eq(2)').addClass('completed');
        $('#progress-bar li:eq(3)').addClass('completed');
        $('#progress-bar li:eq(4) .pre-progress').addClass('progress-active');
        setCookie('IRC:form-progress', 'step5');
    }

}
/*************************
SEQUENTIAL JS OPERATIONS
*************************/
(function($, window, document, undefined){
    'use strict';
    var IRCRapidData = {
        noErrorsOnPage: function() {
            // returns true if no errors on page, otherwise returns false
            if($('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_ValSummary').html()) {
                if ($('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_ValSummary').html().trim() === "") {
                    return true;
                } else {
                    return false;
                }       
            } else {
                return false;    
            }
        },

        init: function(options) {
            var self = this;
            self.options = $.extend({}, $.IRCRD.options, options);
            self.modifyDOM();
            self.addSequentialMarkup();
            if (self.noErrorsOnPage()) {
                //self.setupPerson();
                console.log('No errors on page');
            }
            self.addEventListeners();
            self.addVariableContent();

            // to fix bug where default_amt not working
             if(getParameterByName("default_amt") != ""){
                var default_amt = getParameterByName("default_amt");
                var foundDefaultAmt = false;
                $('.amount-btn').each(function(){
                    if($(this).attr('data-value') == default_amt){
                        $(this).trigger('click');
                        foundDefaultAmt = true;
                    } 
                });
                if(foundDefaultAmt == false){
                    $('.donation:eq(0) input:eq(0)').val(default_amt);
                }
            } else {
               $('.donation:eq(0) input:eq(0)').val(self.options.defaultAmount);
            }

        },

        modifyDOM: function() {
            /*
             * This could be split into more parts that make more sense. Or even extracted into a function that is supplied in the options. At the least, some of the text
             * and images added can be passed as options for customisation. 
             */
            var self = this;
            $('#blanket').remove();
            $('form').show();
            $('.dd-form').prepend($('.header'));
            // add logo
            $('.dd-form-wrapper').prepend('<img class="logo" src="https://storage.googleapis.com/irc-donation-page.appspot.com/irc-dd-images/header-logo.jpg"/>')
            $('.header').attr('id', 'header-box');
            $('.header, .step1.donation-form, .step2.personal-details-form, .step3.payment-details-form').addClass('side-padding');
            $('body').prepend($('.footer'));   
            //move the direct debit box up top
            $('.dd-form .direct-debit:eq(0)').before($('.donation:eq(0)'));   
            $('.dd-form .direct-debit:eq(0)').addClass('first-direct-debit');   
            //set headers  
            $('.dd-form .step-title1:eq(0)').remove();
            $('.dd-form .step-title2').html("2. Thank you<span class='firstname'></span>. We just need some personal details...");
            $('.dd-form .step-title3').html("3. Great, and finally fill out your bank details");  
            $('.dd-form .direct-debit:eq(0)').prepend("<h3>Great<span class='firstname'></span>! Now just tick to confirm you're setting up a direct debit.</h3>");   
            //add contact to about you  
            $('.field-group.contact-details .field').each(function() {
                $(this).appendTo($('.about-you'));
            });    
            $('.field-group.contact-details').remove();   
            //change about you section
            $('.about-you .field:eq(0)').before('<div class="field-row">');
            $('.about-you .field:eq(0)').before('<div class="field-row">');
            $('.about-you .field:eq(0)').before('<div class="field-row">');   
            $('.about-you .field:eq(0)').appendTo($('.field-row:eq(0)'));
            $('.about-you .field:eq(1)').appendTo($('.field-row:eq(0)'));  
            $('.about-you .field:eq(2)').find('input').addClass('firstname-field');
            $('.about-you .field:eq(2)').appendTo($('.field-row:eq(1)'));   
            $('.about-you .field:eq(3)').find('input').addClass('lastname-field');
            $('.about-you .field:eq(3)').appendTo($('.field-row:eq(1)'));    
            $('.about-you .field:eq(4)').find('input').addClass('email-field');
            $('.about-you .field:eq(4)').appendTo($('.field-row:eq(2)'));
            $('.about-you .field:eq(6)').find('input').addClass('phone-field');
            $('.about-you .field:eq(6)').appendTo($('.field-row:eq(2)'));  
            //add handler for all inputs not outer title
            $('.about-you .field').not('.other-title').addClass('not-title-field'); 
            //remove dd info on apge
            $('.bank-details.direct-debit').remove();  
            //dd-form top with h3
            $('.header h3').addClass('dd-form-h3');
            $('.header').after($('.dd-form-h3'));    
            //add buttons
            $('.donation:eq(0)').prepend("<div id='amount-container'>");
            $('#amount-container').prepend("<div id='amount-btn-container'>");
            self.addDonateAmounts(self.options.donateAmounts);
            //remove what's your name
            $('.personal-details-form h3:eq(0)').remove(); 
            //set submit value
            $('.submit input').val("Next");
            //TICK BOX ADD CLASS
            $(".direct-debit:eq(0) input[type='checkbox']").addClass('optin-checkbox');
            $(".optin-checkbox").prop('checked', true);
            //hide opt in
            $('.direct-debit:eq(0)').hide();  
            self.addBackgroundImage();
            // add other button
            $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_DonationSection_DirectDebitAmounts_TextBoxOtherAmount_LabelForTextBox').wrap('<div class="donation-text-cont">');
            $('.donation-text-cont').append($('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_DonationSection_DirectDebitAmounts_TextBoxOtherAmount_TextBox'));
            $('.donation-text-cont').addClass('hidden');

            // style header
            $('#header-box .section .layoutArea .column > *:eq(0)').addClass('main-header').before('<img src="https://storage.googleapis.com/irc-donation-page.appspot.com/irc-dd-images/yellow-vertical-bar.png" class="inline-bar"/>');
            $('#header-box').append('<p class="smaller">Your details will be submitted securely. Fields marked with a (*) must be completed<\/p>');
            // add header for mobile
            $('.dd-form').before($('<nav class="mobile-nav"><img src="https://storage.googleapis.com/fa-assets/irc-donate-page/IRC-mob-png.png"/><\/nav>'));
            $('.dd-form').prepend($('<div class="mob-header-img"><\/div>'));
            $('.mob-header-img').wrap($('<div class="header-cont">'));
            $('.header-cont').append($('#header-box'));
        

            // step 1 extra elements
            $('p:contains("Please specify your preferred collection date. If the collection date selected falls within the next 16 days, the first payment may be collected the following month.")').html('This is your first collection date. If the collection date selected falls within the next 16 days, the first payment may be collected the following month. Subsequent payments will go out on that date every month.').addClass('collection-disclaimer').addClass('collection-disclaimer');
            $('.collection-disclaimer').addClass('smaller');
            $('.step1.donation-form').prepend('<div class="section-header"><span class="number-circle">1<\/span><h3>Monthly donation<\/h3><\/div><p class="smaller">In order to set up an online Direct Debit you must be the account holder of a personal bank or building society account and the sole required signatory on the account.<\/p>');
            $('label:contains("Your monthly amount (Â£):")').html('Amount').addClass('required');
            $('label:contains("Collection date")').html('Regular giving collection date');
            
            $('.step1.donation-form .field.text:eq(0)').wrap('<div class="two-col">');
            $('.step1.donation-form .field.select:eq(0)').appendTo('.step1.donation-form .two-col:eq(0)');
            $('.step1.donation-form .field.text.date label:eq(0)').after($('<div class="date-container">'));
            $('.step1.donation-form .field.text.date select').each(function(){
                $(this).appendTo('.date-container');
            });

            // step 2
            $('.fieldset.step3.payment-details-form').before($('<div class="fieldset address-wrapper">'));
            $('.step2 .field-group.address').appendTo($('.address-wrapper'));
            $('.address-wrapper .field.text').each(function(){
                $(this).appendTo($('.step2 .about-you'));
            });
            $('.step2.personal-details-form').prepend('<div class="section-header"><span class="number-circle">2<\/span><h3>Billing Details<\/h3><\/div>');
            // create 2 col fields
            $('label[for="TextBoxAddressLine1"]').parent().wrap('<div class="two-col address-col-1">');
            $('label[for="TextBoxAddressLine2"]').parent().appendTo('.address-col-1');
            $('label[for="TextBoxTownOrCity"]').parent().wrap('<div class="two-col address-col-2">');
            $('label[for="TextBoxPostcode"]').parent().appendTo('.address-col-2');

            // step 3
            $('.step3.payment-details-form').prepend('<div class="section-header"><span class="number-circle">3<\/span><h3>Bank Details<\/h3><\/div>');

            $('.step3.payment-details-form .field.text:eq(0)').wrap('<div class="two-col">');
            $('.step3.payment-details-form .field.text:eq(0)').after($('<div style="width: 100%; padding-left:10px;">'));
            $('.step3.payment-details-form .field.text:eq(1)').wrap('<div class="two-col">');
            $('.step3.payment-details-form .field.text:eq(2)').appendTo('.step3.payment-details-form .two-col:eq(1)');
            $('.step3.payment-details-form').append('<p class="smaller bank-disclaimer">By clicking Next are confirming that you are the account holder of a personal bank or building society account and the sole required signatory on the account and that you wish to set up a Direct Debit.<\/p>')

            // step 4
            $('.step3.payment-details-form').after($('<div class="fieldset step4 gift-aid closed side-padding">'));
            $('.step4.gift-aid').append($('.gift-aid.field-group'));
            $('.step4.gift-aid').prepend('<div class="section-header"><span class="number-circle">4<\/span><h3>Gift Aid<\/h3><\/div>');
            $('.step4.gift-aid .field-group > p:eq(2)').remove();
            //html for checkboxes
            $('.step4.gift-aid div.checkbox').prepend('<div class="pretty checkbox-cont"><\/div><div class="pretty checkbox-cont"><\/div>');
            $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_DonationSection_CheckBoxListGiftAid_0').appendTo('.step4 .pretty.checkbox-cont:eq(0)');
            $('label[for="ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_DonationSection_CheckBoxListGiftAid_0"]').appendTo('.step4 .pretty.checkbox-cont:eq(0)');
            $('label[for="ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_DonationSection_CheckBoxListGiftAid_0"]').wrap('<div class="pretty-inner checkmark">')
            $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_DonationSection_CheckBoxListGiftAid_1').appendTo('.step4 .pretty.checkbox-cont:eq(1)');
            $('label[for="ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_DonationSection_CheckBoxListGiftAid_1"]').appendTo('.step4 .pretty.checkbox-cont:eq(1)');
            $('label[for="ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_DonationSection_CheckBoxListGiftAid_1"]').wrap('<div class="pretty-inner checkmark">');
            $(".pretty-inner:eq(0)").before('<label class="checkbox-mob-label" for="ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_DonationSection_CheckBoxListGiftAid_0">Yes, I am a UK tax payer and I would like IRC-UK to treat all donations I have made over the past four years and all donations I make in the future (unless I notify you otherwise) as Gift Aid donations. Additional income raised through Gift Aid will be unrestricted and used to help support IRC-UKâ€™s vital work across the world.*<\/label>');
            $(".pretty-inner:eq(1)").before('<label class="checkbox-mob-label" for="ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_DonationSection_CheckBoxListGiftAid_1">No, thank you<\/label>');

            // uncheck other box if ticked
            $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_DonationSection_CheckBoxListGiftAid_0').on('click', function(){
              $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_DonationSection_CheckBoxListGiftAid_1').prop('checked', false);
            });
            $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_DonationSection_CheckBoxListGiftAid_1').on('click', function(){
              $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_DonationSection_CheckBoxListGiftAid_0').prop('checked', false);
            });


            $('label[for="ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_DonationSection_CheckBoxListGiftAid_0"]').html('Yes, I am a UK tax payer and I would like IRC-UK to treat all donations I have made over the past four years and all donations I make in the future (unless I notify you otherwise) as Gift Aid donations. Additional income raised through Gift Aid will be unrestricted and used to help support IRC-UKâ€™s vital work across the world.*');

            $('.step4.gift-aid').append($('<p class="smaller gift-aid-disclaimer">*I understand that if I pay less Income Tax and/or Capital Gains Tax than the amount of Gift Aidclaimed on all my donations in that tax year it is my responsibility to pay any difference. I also understand that IRC-UK will reclaim Gift Aid on donations made in the tax year in which they are received and that other taxes such as Council Tax and VAT do not count for this purpose.<\p>'));

            // step 5
            $('.step4.gift-aid').after($('<div class="fieldset step5 communication closed side-padding">'));
            $('.field-group.data-protection').appendTo('.step5.communication');
            $('.step4 .gift-aid.field-group > p:eq(2)').remove();

            $('.step5.communication .field-group.data-protection').prepend('<div class="pretty checkbox-cont"><\/div><div class="pretty checkbox-cont"><\/div><div class="pretty checkbox-cont"><\/div>');

            $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_PersonalDetailsSection_CheckBoxDataProtectionConfirmation1').appendTo('.step5 .pretty.checkbox-cont:eq(0)');
            $('label[for="ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_PersonalDetailsSection_CheckBoxDataProtectionConfirmation1"]').appendTo('.step5 .pretty.checkbox-cont:eq(0)');
            $('label[for="ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_PersonalDetailsSection_CheckBoxDataProtectionConfirmation1"]').wrap('<div class="pretty-inner checkmark">');

            $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_PersonalDetailsSection_CheckBoxDataProtectionConfirmation2').appendTo('.step5 .pretty.checkbox-cont:eq(1)');
            $('label[for="ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_PersonalDetailsSection_CheckBoxDataProtectionConfirmation2"]').appendTo('.step5 .pretty.checkbox-cont:eq(1)');
            $('label[for="ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_PersonalDetailsSection_CheckBoxDataProtectionConfirmation2"]').wrap('<div class="pretty-inner checkmark">');

            $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_PersonalDetailsSection_CheckBoxDataProtectionConfirmation3').appendTo('.step5 .pretty.checkbox-cont:eq(2)');
            $('label[for="ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_PersonalDetailsSection_CheckBoxDataProtectionConfirmation3"]').appendTo('.step5 .pretty.checkbox-cont:eq(2)');
            $('label[for="ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_PersonalDetailsSection_CheckBoxDataProtectionConfirmation3"]').wrap('<div class="pretty-inner checkmark">');

            // new layout for gdpr
            $('.step5 .pretty.checkbox-cont:eq(0)').before($('<p style="font-size:18px;">Would you like to hear from us by email?<\/p>'))
            $('.step5 .pretty.checkbox-cont:eq(1)').before($('<p style="font-size:18px;">Would you like to hear from us by phone/SMS?<\/p>'))
            $('.step5 .pretty.checkbox-cont:eq(2)').before($('<p style="font-size:18px;">Would you like to hear from us by post?<\/p>'));

            $('.step5 .pretty.checkbox-cont:eq(0)').after($('<div class="pretty checkbox-cont"><input id="email-no" type="checkbox" name="email-no"><div class="pretty-inner checkmark"><label for="email-no">No</label></div></div>'));

            $('.step5 .pretty.checkbox-cont:eq(2)').after($('<div class="pretty checkbox-cont"><input id="phone-no" type="checkbox" name="phone-no"><div class="pretty-inner checkmark"><label for="phone-no">No</label></div></div>'));

            $('.step5 .pretty.checkbox-cont:eq(4)').after($('<div class="pretty checkbox-cont"><input id="post-no" type="checkbox" name="post-no"><div class="pretty-inner checkmark"><label for="post-no">No</label></div></div>'));

            $('label[for="ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_PersonalDetailsSection_CheckBoxDataProtectionConfirmation1"]').html('Yes');
            $('label[for="ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_PersonalDetailsSection_CheckBoxDataProtectionConfirmation2"]').html('Yes');
            $('label[for="ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_PersonalDetailsSection_CheckBoxDataProtectionConfirmation3"]').html('Yes');

            var $emailCheckboxYes = $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_PersonalDetailsSection_CheckBoxDataProtectionConfirmation1').parent();
            var $phoneCheckboxYes = $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_PersonalDetailsSection_CheckBoxDataProtectionConfirmation2').parent();
            var $postCheckboxYes = $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_PersonalDetailsSection_CheckBoxDataProtectionConfirmation3').parent();

            $emailCheckboxYes.on('click', function(){
               $('#email-no').prop('checked', false);
            });
            $('#email-no').parent().on('click', function(){
               $emailCheckboxYes.find('input').prop('checked', false);
            });
            $phoneCheckboxYes.on('click', function(){
               $('#phone-no').prop('checked', false);
            });
            $('#phone-no').parent().on('click', function(){
               $phoneCheckboxYes.find('input').prop('checked', false);
            });
            $postCheckboxYes.on('click', function(){
               $('#post-no').prop('checked', false);
            });
            $('#post-no').parent().on('click', function(){
               $postCheckboxYes.find('input').prop('checked', false);
            });
            $('.data-protection > p:eq(3)').remove();
            $('.data-protection > p:eq(3)').remove();
            $('.data-protection > p:eq(3)').remove();

        
            $('.step5.communication').prepend($('<p class="bold">We would love to keep in touch with you regarding the IRC\'s projects and appeals. Please select the following communication preferences if you would like to hear from us!<\/p>'));

            $('.step5.communication').append($('.privacy-disclaimer').show());
            $('.step5.communication').append($('<p class="smaller privacy-disclaimer">To contact us or unsubscribe from communications please email <a href="mailto:contactus@rescue-uk.org">contactus@rescue-uk.org<\/a>, phone us at 020 3983 9000 or write to 100 Wood St, London EC2V 7AN. Thank you!<\/p>'));

             $('.step5.communication').prepend('<div class="section-header"><span class="number-circle">5<\/span><h3>Communication<\/h3><\/div>');
        },

        addSequentialMarkup: function() {
            console.log('running add sequential markup');
            // if errors not on page, make it sequential
            if ($('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_ValSummary').html()) {
                if ($('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_ValSummary').html().trim() === "") {
                    //MAKE FORM SEQUENTIAL 
                    console.log('make form sequential');
                    // show progress bar
                    $('#progress-bar-container').css('display', 'block');
                    $('.step1.donation-form').before($('#progress-bar-container'));

                   

                    // add in buttons to end of each sequentional slide
                    $('.step1.donation-form').append('<div class="submit next"><input readonly value="Next step"/></div>');
                    $('.step2.personal-details-form').append('<div class="submit next"><input readonly value="Next"/></div>');
                    $('.step2.personal-details-form .submit.next').wrap('<div class="seq-btn-cont">');
                    $('.step2.personal-details-form .seq-btn-cont').append('<div class="prev"><input readonly value="Back"/></div>');
                    $('.step3.payment-details-form').append('<div class="seq-btn-cont"><div class="submit next"><input readonly value="Next"/></div><div class="prev"><input readonly value="Back"/></div><\/div>');
                    $('.step4.gift-aid').append('<div class="seq-btn-cont"><div class="submit next"><input readonly value="Next"/></div><div class="prev"><input readonly value="Back"/></div><\/div>');
                    $('.step5.communication').append('<div class="seq-btn-cont"><div class="submit next"><input readonly value="Donate now"/></div><div class="prev"><input readonly value="Back"/></div><\/div>');
                  

                    // hide form sections
                    $('.step2.personal-details-form').addClass('inactive').css('height', 'auto');

                    $('.inactive').hide();

                    // go to section if they have a progress cookie for gift aid section
                    var progress = getCookie('IRC:form-progress');
                    if (progress === 'step4') {
                      changeProgessBar(4);
                      $('.step1.donation-form').hide();
                      $('.step4.gift-aid').fadeIn('slow', function(){
                          $('.step4').removeClass('inactive');
                          $('.header-cont').slideUp();
                      });
                    }
          
                    
                } else {
                    $('.step2.personal-details-form, .step3.payment-details-form, .step4.gift-aid, .step5.communication').show();
                    $('.step5.communication').append('<div class="seq-btn-cont" style="margin-top:20px;"><div class="submit next"><input readonly value="Donate now"/></div><\/div>');
                }
            }
            $('.step-title2').hide();
            $('.step-title3').hide();
            // EDIT TO MOVE ADDRESS TO NEW SECTION
            //$('.step2 .field-group.address:eq(0)').appendTo('.step3');
            // create container in step 3 to recieve address (just before bank deets)
            
            $('.field-group.address').append($('<div style="clear:both;">'));
            // add step 4 wrapper after step 3 wrapper
            $('.step3-wrapper').after($('<div class="step4-wrapper">'));
            // add bank account details to step 4
            $('.step4-wrapper').append($('.payment-details-form'));
            // add next and back buttons to step 4
            $('.step4-wrapper').append('<div class="button-cont"></div>');
            $('.step4-wrapper .button-cont').append('<div class="submit next"><input readonly value="Next"/></div>');
            $('.step4-wrapper .button-cont').append('<div class="prev"><input readonly value="Back"/></div>');
            
            // move pre-submit message to end of step 4
            $('.step4-wrapper .button-cont').before($('.pre-submit-opt-in'));
            $(".optin-checkbox").prop('checked', true);   
        },

        addDonateAmounts: function(donateAmounts) {
            var self = this;
            console.log('adding donate amounts: ' + donateAmounts);
            $(donateAmounts).each(function() {
                $('#amount-btn-container').append("<a href='javascript:;' class='amount-btn' data-value='" + this + "'>&pound;" + this + "</a>");
            });
            // add hr to break to new line in flexbox
            $('.amount-btn:eq(2)').after($('<hr>'));
            $('#amount-btn-container').before('<label class="field-label">Enter your amount<\/label>');
            // add other btn
            $('#amount-btn-container').append($("<a href='javascript:;' class='amount-btn-other'>Other<\/a>"));
            if (self.options.defaultAmount) {
                console.log('looking for default amt');
                console.log(self.options.defaultAmount);
                var default_amt = self.options.defaultAmount;
                var foundDefaultAmt = false;
                console.log( $('.amount-btn').length );
                $('.amount-btn').each(function() {
                    console.log('comparing ' + $(this).attr('data-value') + ' to ' + default_amt);
                    if ($(this).attr('data-value') == default_amt) {

                        console.log('default amt found');
                        $(this).trigger('click');
                        foundDefaultAmt = true;
                    }
                });
                if (foundDefaultAmt == false) {
                    $('.donation:eq(0) input:eq(0)').val(default_amt);
                }
            }
        },

        setupPerson: function(person) {
            var self = this;
            $('.lastname-field').val(self.options.person.lastname);
            $('.phone-field').val(self.options.person.phone);
            $('.hidden-confirmation input').val(self.options.person.email);
            $('h1, h2, h3, p').each(function() {
                $(this).html($(this).html().replace("%%firstname%%", self.options.person.firstname));
                $(this).html($(this).html().replace("%%Firstname%%", self.options.person.firstname));
            });
            $('.firstname-field').val(self.options.person.firstname);
        },
        
        addEventListeners: function() {
            /*
             * can be further customised by having the element & function provided in the options
             */
            $('.amount-btn').click(function() {
                console.log('amount clicked = ' + $(this).attr('data-val'));
                //remove selected from all other donate buttons
                $('.amount-btn').removeClass('selected');
                //remove other amount
                $('.donation:eq(0) input:eq(0)').val($(this).attr('data-value'));
                //display label as selected 
                $(this).addClass('selected');
                var nextPlace = $('.direct-debit:eq(0)');
            });
            //on email change update hidden confirm email field
            $('label:contains("Confirm Email address")').parent().hide();
            var $emailField = $('label:contains("Email address")').next('input');
            var $emailConfField = $('label:contains("Confirm Email address")').next('input');
            $emailField.change(function() {
                var userEmail = $(this).val();
                $emailConfField.val(userEmail);
            });
            // click handlers for each step slide
            $('.step1.donation-form .submit.next').click(function() {
                $('.step1 .error').remove();
                validateSlide1(function() {
                    $('.step1.donation-form').hide();
                    $('.step2.personal-details-form').fadeIn('slow', function(){
                        $('.step2').removeClass('inactive');
                        $('.header-cont').slideUp();
                    });
                    //$('.step2').removeClass('closed');
                    changeProgessBar(2);
                });
                $("html, body").animate({ scrollTop: 0 });
            });
            // slide 2
            $('.step2.personal-details-form .prev').click(function() {
                $('.step2.personal-details-form').hide();
                $('.step1.donation-form').fadeIn('slow');
                changeProgessBar(1);
            });
            $('.step2.personal-details-form .submit.next').click(function() {
                $('.step2-wrapper .error').remove();
                validateSlide2(function() {
                    $('.step2.personal-details-form').hide();
                    $('.step3.payment-details-form').fadeIn('slow');
                    changeProgessBar(3);
                });
            });
            $('.step3.payment-details-form .submit.next').click(function() {
                $('.step3-wrapper .error').remove();
                validateSlide3(function() {
                    $('.step3.payment-details-form').hide();
                    $('.step4.gift-aid').fadeIn('slow');
                    changeProgessBar(4);
                });
            });
            // slide 3
            $('.step3.payment-details-form .prev').click(function() {
                $('.step3.payment-details-form').hide();
                $('.step2.personal-details-form').fadeIn('slow');
                changeProgessBar(2);
            });
            // slide 4
            $('.step4.gift-aid .prev').click(function() {
                $('.step4.gift-aid').hide();
                $('.step3.payment-details-form').fadeIn('slow');
                changeProgessBar(3);
            });
            $('.step4.gift-aid .submit.next').click(function() {
  
                $('.step4.gift-aid').hide();
                $('.step5.communication').fadeIn('slow');
                changeProgessBar(5);
            });
            // slide 5
            $('.step5.communication .prev').click(function() {
                $('.step5.communication').hide();
                $('.step4.gift-aid').fadeIn('slow');
                changeProgessBar(3);
            });
            $('.step5.communication .submit.next').click(function() {
                // all slides valid, click hidden submit button
                
                validateSlide5(function() {
                    $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_FormControl1_SubmitButton').click();
                });
            });

            // if clicked, toggle class 'selected'
            $('.other-amount-btn').on('click', function(){
                $(this).addClass('selected');
                // remove selected from all other buttons
                $('.amount-btn').each(function(){
                    $(this).removeClass('selected');
                });
                $('.donation-text-cont').removeClass('hidden');
                // clear other amount textfield
                $('.donation-text-cont').find('input').val("");
            });

            // if button other than other is selected, remove selected from other and hide form
            $('.amount-btn').on('click', function(){
                $('.other-amount-btn').removeClass('selected');
                $('.donation-text-cont').addClass('hidden');
            });  
        },

        addBackgroundImage: function() {
            var self = this;
            if (self.options.backgroundImage) {
                $('body').css('background-image', 'url("' + self.options.backgroundImage + '")');
                $('#blanket').css('background-image', 'url("' + self.options.backgroundImage + '")');
            }
            if (self.options.mobileBackgroundImage) {
                $('.mob-header-img').css('background-image', 'url("' + self.options.mobileBackgroundImage + '")');
            }
        },

        onHomepage: function() {
            // Static code for homepage
            var pageUrl = window.location.pathname;
            //ga('send', 'event', 'direct-debit-form', 'homepage-reached', pageUrl);
            $('form').on("submit", function() {
                var pageUrl = window.location.pathname;
                //ga('send', 'event', 'direct-debit-form', 'homepage-before-submit', pageUrl);
                var pageUrl = window.location.pathname;
                //ga('send', 'event', 'direct-debit-form', 'homepage-after-submit', pageUrl);
            });
            $('#header-box').addClass('on-form-page');
            console.log('on form page');
            //fbq('track', "PageView");
            $(".optin-checkbox").prop('checked', true);
            
        },

        onSummarypage: function() {
            // Static code for summary page 
            $('.privacy-disclaimer').hide();
            console.log("SUMMARY");
            $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_SummaryControl1_SubmitButton').val('Confirm direct debit');

            // style the summary page   
            console.log("SIUMMARY!");
            $('#header-box, .header-cont').remove();
            $('.dd-form > .col-md-8.col-md-offset-2').addClass('side-padding');
            
            $('.tab-nav-wrap').remove();
            $('.summary-title').remove();
            $('#acknowledgement-text').remove();
            $('.dd-acknowledgement').remove();
            $('.tab-nav-wrap').remove();
            $('.dd-form').wrapInner('<div class="col-md-8 col-md-offset-2">');
            $('.dd-form').css('width','90%');
            $('.dd-form').css('margin-left','5%');
            $('.summary-confirm').appendTo('.dd-form');
            $('.summary-confirm hr').remove();
            $('.submit input:eq(1)').addClass('edit-button').appendTo('.dd-form .col-md-8');
            $('.summary-confirm input').val("Confirm");
            $('.summary-confirm').prepend("<h1>Set up Direct Debit:</h1>");
            $('.edit-button').val('Go back and edit');
            $('.after-submit').appendTo('.payment-summary');
            $('#after-submit').appendTo('.payment-summary');
                        $('.dd-form-h3').remove(); 
            $('.dd-form').prepend($('.header'));
            $('.header h3').remove();
            $('.header h1').text("Important: confirm your details.");

                         $('.summary-group.donation-payment dd:eq(1)').html("Monthly");
            $('.dd-form .closed').css('display','block');
            $('.dd-form .closed').css('height','auto');
            $('.dd-form').css('margin-bottom','150px');
            $('.dd-form .closed').removeClass('closed');        
                        $('.col-md-8 h2:eq(0)').remove();
            $('.col-md-8').prepend('<div id="warning-box"><h3>Your Direct Debit is not yet set up. Please have a quick review of your details then set up your Direct Debit.</h3></div>');

            function getDetails(field) {
                return $('dt:contains("'+field+'")').next().html().trim().replace('&nbsp;', '');
            }

            var personDetails = {
                amount: getDetails('Amount'),
                frequency: getDetails('Payment Frequency'),
                collectionDate: getDetails('Collection date'),
                title: getDetails('Title'),
                firstName: getDetails('First name(s)'),
                lastName: getDetails('Last name'),
                postcode: getDetails('Postcode'),
                addr1: getDetails('Address line 1'),
                addr2: getDetails('Address line 2'),
                city: getDetails('Town or city'),
                email: getDetails('Email address'),
                accName: getDetails('Account holder name'),
                sortCode: getDetails('Sort code'),
                accNumb: getDetails('Account number'),
            };

            $('#warning-box').after('<div class="summary-cont-bank"><div class="section-header"><span class="number-circle">3<\/span><h3>Bank details: Summary<\/h3><\/div><\/div>');
            $('#warning-box').after('<div class="summary-cont-billing"><div class="section-header"><span class="number-circle">2<\/span><h3>Billing details: Summary<\/h3><\/div><\/div>');
            $('#warning-box').after('<div class="summary-cont-donation"><div class="section-header"><span class="number-circle">1<\/span><h3>Monthly donation: Summary<\/h3><\/div><\/div>');
             
            $('.summary-cont-donation').append($('<p>Amount: '+personDetails.amount+'<\/p>'));
            $('.summary-cont-donation').append($('<p>Payment Frequency: '+personDetails.frequency+'<\/p>'));
            $('.summary-cont-donation').append($('<p>Regular giving collection date: '+personDetails.collectionDate+'<\/p>'));

            $('.summary-cont-billing').append($('<p>Name: '+personDetails.title+ ' ' +personDetails.firstName+ ' ' + personDetails.lastName+ '<\/p>'));
            $('.summary-cont-billing').append($('<p>Email: '+personDetails.email+'<\/p>'));
            $('.summary-cont-billing').append($('<p>Address: '+personDetails.addr1+ ', ' +personDetails.addr2+ ' ' + personDetails.city+ ' ' + personDetails.postcode+ '<\/p>'));

            $('.summary-cont-bank').append($('<p>Name: '+personDetails.accName+'<\/p>'));
            $('.summary-cont-bank').append($('<p>Sort code: '+personDetails.sortCode+'<\/p>'));
            $('.summary-cont-bank').append($('<p>Account number: '+personDetails.accNumb+'<\/p>'));
             
            $('.dd-form').prepend($('<div class="summary-header side-padding"><p>Important: Confirm your details<\/p><\/div>'));
            $('.dd-form-wrapper.step4 .col-md-8.col-md-offset-2').addClass('side-padding');

            // add buttons
            $('.dd-form').append('<div class="seq-btn-cont side-padding final-btns"><div class="submit next"><input readonly value="Set up direct debit"/></div><div class="prev"><input readonly value="Go back and edit"/></div><\/div>');

            $('.dd-form .submit.next input').on('click', function(){
                // click final submit btn
                $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_SummaryControl1_SubmitButton').click();
            });
            $('.dd-form .prev input').on('click', function(){
                // click back btn
                $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_SummaryControl1_EditButton').click();
            });
        },

        onConfirmationpage: function() {
          $('.privacy-disclaimer').hide();
            // Static code for confirmation page
            //fbq('track', 'Purchase', {value: '0.00', currency:'GBP', content_name: window.location.pathname});
            var pageUrl = window.location.pathname;
            //ga('send', 'event', 'direct-debit-form', 'confirmation-page-reached', pageUrl);
            window['optimizely'] = window['optimizely'] || [];
            window.optimizely.push(["trackEvent", "confirmation-page-reached"]);
            console.log('on confirmation page');
            // change name of dd guarantee button 
            $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_ConfirmationControl1_btnViewDirectDebit').val('View direct debit');
            //twttr.conversion.trackPid('nxdgm', { tw_sale_amount: 0, tw_order_quantity: 0 });

            $('.tab-nav-wrap').remove();

            $('#acknowledgement-text').remove();
            $('.dd-acknowledgement').remove();

            $(".dd-form h2:eq(0)").remove();
            $('.dd-form-h3').remove();

            $('.dd-form .closed').css('display','block');
            $('.dd-form .closed').css('height','auto');
            $('.dd-form .closed').removeClass('closed');    
            $('h2 .button').remove();

            $('.dd-form').prepend($('<div class="summary-header side-padding"><p>You\'re great, thank you!<\/p><\/div>'));
            $('.header-cont').remove();

            var $confirmationDisclaimer = $('<p class="confirmation-diclaimer side-padding">' + $('p.reference').text().trim() + '. The Direct Debit will appear on your bank statement as IRC. If you have any general queries, please email team.uk@IRC.org or call 020 7865 8100/0800 269 065. Or write to: IRC, Canonbury Villas, London, N1 2PN.<\/p>');
            $('.dd-confirmation > p, .dd-confirmation > h3, .dd-confirmation > hr').remove();
            $('.dd-guarantee').before($confirmationDisclaimer);
            $('.confirmation-page').addClass('side-padding');
            $('.dd-guarantee').removeClass('highlight').addClass('side-padding');
            $('.confirmation-buttons').after('<div class="seq-btn-cont confirmation side-padding"><div class="submit next"><input readonly value="Go to home page"/></div><div class="prev"><input readonly value="View direct debit"/></div><\/div>');

            $('.confirmation .submit.next input').on('click', function(){
                window.location.href = "https://www.rescue.org/";
            });
            $('.confirmation .prev input').on('click', function(){
                $('#ctl00_ctl00_ContentPlaceHolder1_ContentPlaceHolder234_ConfirmationControl1_btnViewDirectDebit').click(); // view guarentee
            });

            $('.confirmation-page').append($('<div class="social-buttons"><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fsecure.edirectdebit.com%2FInternational-Rescue-Committee-UK%2FIRC-2018-Sequential%2FDesktop-Form-Page%2F%3Fref%3Dfacebook_share" class="fb-btn"><i class="fa fa-facebook"><\/i>Share on Facebook<\/a><\/div>'));
        },

        addVariableContent: function() {
            var self = this;
            if ($('.email-field').length) {
                self.onHomepage();
                self.options.onHomepage.apply(null, arguments);
            } else if ($.trim($('.summary-intro').html()).length) {
                self.onSummarypage();
                self.options.onSummaryPage.apply(null, arguments);
            } else {
                self.onConfirmationpage();
                self.options.onConfirmationPage.apply(null, arguments);
            }

            if ($('.dd-form').find('li').length) {
                self.options.onFormError.apply(null, arguments);
            }
        }
    };


    $.IRCRD = function(options) {
        var irc = Object.create(IRCRapidData);
        irc.init(options);
    };

    $.IRCRD.options = {
        donateAmounts: [5, 10, 20, 30, 50],
        defaultAmount: 10,
        person: {
            firstname: '',
            lastname: '',
            email: '',
            zip: '',
            phone: ''
        },
        backgroundImage: null,
        mobileBackgroundImage: null,
        onHomepage: function() {},
        onSummaryPage: function() {},
        onConfirmationPage: function() {},
        onFormError: function() {}
    };

})(jQuery, window, document);

