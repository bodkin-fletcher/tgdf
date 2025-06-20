// TGDF v0.1.0 - BASIC ITEMS
// This file demonstrates the format of Basic Items in TGDF
// Note: Some complex examples shown are for illustration only and should be implemented as Custom Items

let basicItems = [
  // Basic types
  ["text", "Any actual text, cannot be empty, no preceding or trailing whitespace"],
  
  ["yesno", "yes" | "no"], // Similar to boolean, but that is an esoteric computer science construct
  
  ["number", "123"], // Any number, can be negative, zero, or positive, with or without decimal. As a string to avoid floating point errors
  
  ["date", "2023-10-01"], // ISO 8601 date format
  
  ["flexname", "restricted_name_like_this"], // based on Erlang atom rules, can include underscores, but no spaces or special characters

  [ "full_person_name", {
      first_name: {text: "John"},
      middle_names: {text: "Michael"},
      maiden_name: {text: "Smith"} | "none", // Optional.
      last_name: {text: "Doe"}
    }
  ],  
  // Example of how this would look as a basic item - actual implementation should use three-tuple structure
  ["text", "John Doe"], // Using simple text for names in Basic Items
  ["instant", "2023-10-01T12:00:00Z"], // ISO 8601 date-time format with UTC timezone
  ["email", "valid_email@example.com"], // Standard email address format
  ["currency", ["text", "USD"], ["number", "1250.00"]], // Currency code (ISO 4217) and amount
    // Measurement types
  ["weight", ["weight_unit", "kg" | "g" | "mg" | "lb" | "oz" | "stone"], ["number", "75.5"]],
  
  ["distance", ["distance_unit", "km" | "m" | "cm" | "mm" | "mi" | "yd" | "ft" | "in"], ["number", "10.5"]],
  
  ["volume", ["volume_unit", "l" | "ml" | "gal" | "qt" | "pt" | "cup" | "fl_oz" | "tbsp" | "tsp" | "m3" | "cm3"], ["number", "2.5"]],
  
  ["temperature", ["temperature_unit", "celsius" | "fahrenheit" | "kelvin"], ["number", "22.5"]],
  
  ["area", ["area_unit", "m2" | "km2" | "hectare" | "acre" | "sq_ft" | "sq_mi" | "sq_in"], ["number", "150"]],
  
  ["speed", ["speed_unit", "km_h" | "m_s" | "mph" | "knot"], ["number", "65"]],
    // Location and time types
  // Note: Complex structures like earth_location should be implemented as Custom Items
  // Basic location representation could use simple latitude/longitude values
  ["latitude", "40.7128"], // Latitude as a Basic Item
  ["longitude", "-74.0060"], // Longitude as a Basic Item
    // Note: Complex structures like time_span should be implemented as Custom Items
  // Using instant for specific points in time as a Basic Item
  ["instant", "2025-06-16T09:00:00Z"],
  ["duration", ["duration_unit", "seconds" | "minutes" | "hours" | "days" | "weeks" | "months" | "years"], ["number", "30"]],
  
  // Specialized number types
  ["latitude", "40.7128"], // Special number type with range validation (-90 to 90)
  ["longitude", "-74.0060"], // Special number type with range validation (-180 to 180)
  ["altitude", "10.5"], // Elevation relative to sea level
    // CUSTOM ITEM EXAMPLE (not a basic item):
  // This demonstrates the proper three-tuple structure for complex data types
  ["person", 
    { // metadata object
      version: "v0.2.0",
      integrity: {
        hashes: {
          sha256: "ab123..."
        }
      }
    },
    { // data object
      name: ["text", "Jane Doe"], // Simplified as a basic text item
      birth_date: ["date", "1985-04-15"] | "none",
      contact: {
        email: ["email", "jane.doe@example.com"] | "none",
        phone: ["text", "+15557890123"] | "none", // Simplified as basic text
        address: ["text", "456 Oak Avenue, Metropolis, NY 10001, US"] | "none" // Simplified as basic text
      }
    }
  ]
]