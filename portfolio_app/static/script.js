$(document).ready(function() {
  $('a.active').removeClass('active').removeAttr('aria-current');
  $('a[href="' + location.pathname + '"]').closest('a').addClass('active').attr('aria-current', 'page'); 
});

//Load the intl-tel-input library (for phone number input)
const phoneField = document.querySelector("#phone");
if (phoneField) {
  window.intlTelInput(phoneField, {
      loadUtils: () => import("https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.1/build/js/utils.js"),
      initialCountry: "auto",
      separateDialCode: true,
      geoIpLookup: callback => {
          fetch("https://ipapi.co/json")
            .then(res => res.json())
            .then(data => callback(data.country_code))
            .catch(() => callback("ar"));
      },
      strictMode: true,
  });
}

// Load the country select field if it exists
if (document.querySelector("#countrySelect")) {
  // Initialize country select field
  const countryDropdown = document.getElementById('countrySelect');
  const countryData = window.intlTelInput.getCountryData();

  // populate the country dropdown
  for (let i = 0; i < countryData.length; i++) {
    const country = countryData[i];
    
    const optionNode = document.createElement("option");
    optionNode.value = country.iso2;
    const textNode = document.createTextNode(country.name);
    optionNode.appendChild(textNode);
    countryDropdown.appendChild(optionNode);
  }
}