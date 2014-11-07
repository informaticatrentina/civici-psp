jQuery(document).ready(function() {
  $.reject({
    reject: {
      msie: 8
    },
    header: 'Il tuo browser non è supportato!', // Header Text
    paragraph1: 'Questo sito è ottimizzato per browser dell\'ultima generazione quali Chrome, Firefox, Safari, Internet Explorer versione 11 o superiore', // Paragraph 1  
    paragraph2: 'Aggiorna il tuo browser a una versione recente!',
    closeLink: 'Chiudi',
    closeMessage: '', // Message below close window link
    display: ['firefox', 'chrome', 'msie'],
    imagePath: './themes/psp/images/'
  });
});
