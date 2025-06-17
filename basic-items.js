let basicItems = [
  {
    "text": "Any actual text, cannot be empty, no preceding or trailing whitespace"
  },
  {
    "yesno": "yes" || "no" // Similar to boolean, but that is an esoteric computer science construct
  },
  {
    "number": "123" // Any number, can be negative, zero, or positive, with or without decimal. As a string to avoid floating point errors
  },
  {
    "date": "2023-10-01" // ISO 8601 date format
  },
  {
    "flexname": "restricted_name_like_this" // based on Erlang atom rules, can include underscores, but no spaces or special characters
  },
  {
    "full_person_name": {
      first_name: {text: "John"},
      middle_names: {text: "Michael"},
      maiden_name: {text: "Smith"} || "none", // Optional - need to work out how that goes.
      last_name: {text: "Doe"}
    }
  },
  {
    "instant": "2023-10-01T12:00:00Z" // ISO 8601 date-time format with UTC timezone
  },
  {
    "address": {
      line1: {text: "123 Main Street"}, // Primary address line (street number and name)
      line2: {text: "Apt 4B"} || "none", // Secondary address info (apartment, unit, suite, etc.)
      line3: {text: "Building C"} || "none", // Additional address info if needed
      city: {text: "Springfield"}, // City/town/village
      region: {text: "IL"}, // State/province/county/prefecture
      postal_code: {text: "62704"} || "none", // ZIP/postal code/postcode
      country: {text: "United States"}, // Full country name
      country_code: {text: "US"} // ISO 3166-1 alpha-2 country code
    }
  },
  {
    "phone_number": {
      country_code: {text: "+1"},
      number: {text: "5551234567"},
      type: {text: "mobile" || "home" || "work" || "other"}
    }
  },
  {
    "email": "valid_email@example.com" // Standard email address format
  },
  {
    "currency": {
      amount: {number: "1250.00"}, // String to avoid floating point errors
      code: {text: "USD"} // ISO 4217 currency code
    }
  },
  {
    "weight": {
      value: {number: "75.5"},
      unit: {text: "kg" || "g" || "mg" || "lb" || "oz" || "stone"}
    }
  },
  {
    "distance": {
      value: {number: "10.5"},
      unit: {text: "km" || "m" || "cm" || "mm" || "mi" || "yd" || "ft" || "in"}
    }
  },
  {
    "volume": {
      value: {number: "2.5"},
      unit: {text: "l" || "ml" || "gal" || "qt" || "pt" || "cup" || "fl_oz" || "tbsp" || "tsp" || "m3" || "cm3"}
    }
  },
  {
    "temperature": {
      value: {number: "22.5"},
      unit: {text: "celsius" || "fahrenheit" || "kelvin"}
    }
  },
  {
    "area": {
      value: {number: "150"},
      unit: {text: "m2" || "km2" || "hectare" || "acre" || "sq_ft" || "sq_mi" || "sq_in"}
    }
  },
  {
    "speed": {
      value: {number: "65"},
      unit: {text: "km_h" || "m_s" || "mph" || "knot"}
    }
  },
  {
    "earth_location": {
      latitude: {number: "40.7128"}, // Decimal degrees as string
      longitude: {number: "-74.0060"},
      altitude: {number: "10.5"} || "none", // Meters above sea level (optional)
      accuracy: {number: "5.0"} || "none" // Accuracy in meters (optional)
    }
  },
  {
    "time_span": {
      start: {instant: "2025-06-16T09:00:00Z"},
      end: {instant: "2025-06-16T17:00:00Z"},
      timezone: {text: "America/New_York"} || "UTC" // IANA timezone name
    }
  },
  {
    "duration": {
      value: {number: "30"},
      unit: {text: "seconds" || "minutes" || "hours" || "days" || "weeks" || "months" || "years"}
    }
  }
]