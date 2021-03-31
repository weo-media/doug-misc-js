function googleTranslateElementInit() {

  new google.translate.TranslateElement({

    pageLanguage: 'en'

  }, 'google_translate_element');

}

var googleTranslateScript = document.createElement('script');
googleTranslateScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
document.scripts ? document.scripts[document.scripts.length - 1].insertAdjacentElement('afterend', googleTranslateScript) : document.body.appendChild(googleTranslateScript);