export const validateCountry = country => {
    const re = {American, 
        Spanish,
        Italian,
        Mediterranean,
        French,
        Oriental,
        Indian,
        }
    return re.test(country);
  }