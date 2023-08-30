// wait for document to be fully loaded
document.addEventListener('DOMContentLoaded', async function() {

    // fetch countries data
    let countries;
    await fetch('./data/data.json')
        .then(response => response.json())
        .then(data => {
            countries = data;

        })
        .catch(error => console.error('Error fetching JSON:', error));

    // fetch country flags emojis
    let countryEmojis;
    await fetch('https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/index.json')
    .then(response => response.json())
    .then(data => {
        countryEmojis = data;
    })
    .catch(error => console.error('Error fetching JSON:', error));


    // fetch template
    await fetch('./templates/accordion.hbs')
    .then(response => response.text())
    .then(templateText => {
        templateSource = templateText;
    })
    .catch(error => console.error('Error fetching template:', error));

    // iterate over countries, populate dropdown
    const dropdownList = document.getElementById('countryDropdownList');

    let dropdownListContent = '<option selected>Select Country</option>';

    let countryEmoji;

    let getEmoji;

    for (const countryName in countries) {
        getEmoji = countryEmojis.filter(item => item.code == countries[countryName]['code']);
        if (getEmoji.length == 1) {
            countryEmoji = getEmoji[0].emoji;
            dropdownListContent += `<option value="${countryName}">${countryEmoji} ${countryName} </option>`;
        }
        else {
            dropdownListContent += `<option value="${countryName}">${countryName}</option>`;
        }
        
    };

    dropdownList.innerHTML = dropdownListContent;

    // inject data
    const template = Handlebars.compile(templateSource);


    // user selects country
    $('#countryDropdownList').on('change', function (e) {
            var selectedValue = $(this).val();

            if (countries.hasOwnProperty(selectedValue)) {
                const country_data = countries[selectedValue];
                const accordionContainer = document.getElementById('accordionContent');
                accordionContainer.innerHTML = template(country_data);
                $('#accordionContentContainer').hide().fadeIn('slow');
                
                
            }
            
          });

    




});