// TGDF v0.2.0 - BASIC ITEMS AND SHORT ITEMS
// This file demonstrates the format of Basic Items and Short Items in TGDF v0.2.0
// Note: Some complex examples shown are for illustration only and should be implemented as Custom Items

let basicItems = [
  // ===== BASIC ITEMS =====
  
  // Basic types
  ["text", "Any actual text, cannot be empty, no preceding or trailing whitespace"],
  
  ["yesno", "yes" | "no"], // Real-world yes/no concept, not an abstract boolean
  
  ["number", "123"], // Any number, can be negative, zero, or positive, with or without decimal. As a string to avoid floating point errors
  
  ["date", "2023-10-01"], // ISO 8601 date format
  
  ["flexname", "restricted_name_like_this"], // based on Erlang atom rules, can include underscores, but no spaces or special characters

  ["instant", "2023-10-01T12:00:00Z"], // ISO 8601 date-time format with UTC timezone
  ["email", "valid_email@example.com"], // Standard email address format
  ["currency", "USD", "1250.00"], // Currency code (ISO 4217) and amount - simplified format
  
  // Measurement types - simplified format (v0.2.0)
  // Format: [type, unit, value] - obvious and unambiguous
  ["weight", "kg", "75.5"],
  ["weight", "g", "750"],
  ["weight", "lb", "166.3"],
  ["weight", "oz", "26.6"],
  
  ["distance", "km", "10.5"],
  ["distance", "m", "1050"],
  ["distance", "cm", "105000"],
  ["distance", "mm", "1050000"],
  ["distance", "mi", "6.5"],
  ["distance", "ft", "3445"],
  ["distance", "in", "41340"],
  
  ["volume", "l", "2.5"],
  ["volume", "ml", "2500"],
  ["volume", "gal", "0.66"],
  ["volume", "cup", "10.6"],
  
  ["temperature", "celsius", "22.5"],
  ["temperature", "fahrenheit", "72.5"],
  ["temperature", "kelvin", "295.65"],
  
  ["area", "m2", "150"],
  ["area", "km2", "0.00015"],
  ["area", "sq_ft", "1615"],
  
  ["speed", "km_h", "65"],
  ["speed", "m_s", "18.1"],
  ["speed", "mph", "40.4"],
  
  ["duration", "minutes", "30"],
  ["duration", "hours", "0.5"],
  ["duration", "seconds", "1800"],
  ["duration", "days", "0.02"],
  
  // Location and time types
  // Note: Complex structures like earth_location should be implemented as Custom Items
  // Basic location representation could use simple latitude/longitude values
  ["latitude", "40.7128"], // Latitude as a Basic Item (-90 to 90)
  ["longitude", "-74.0060"], // Longitude as a Basic Item (-180 to 180)
  
  // Note: Complex structures like time_span should be implemented as Custom Items
  // Using instant for specific points in time as a Basic Item
  ["instant", "2025-06-16T09:00:00Z"],
  
  // Specialized number types
  ["altitude", "10.5"], // Elevation relative to sea level
  
  // URLs and identifiers
  ["url", "https://example.com/path?query=value"],
  ["uri", "urn:isbn:0451450523"],
  
  // Color representation
  ["color_hex", "#FF5733"],
  ["color_rgb", "rgb(255, 87, 51)"],
  ["color_name", "red"],
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
      // Standard fields
      identityHash: ["sha256", "ab123..."],
      tokens: [["flexname", "person"], ["flexname", "employee"]] | "no_tokens",
      name: ["flexname", "jane_doe_ab123"],
      created: ["instant", "2025-06-16T09:00:00Z"],
      
      // Type-specific fields
      display_name: ["text", "Jane Doe"],
      birth_date: ["date", "1985-04-15"] | "none",
      contact: {
        email: ["email", "jane.doe@example.com"] | "none",
        phone: ["text", "+15557890123"] | "none", // Simplified as basic text
        address: ["text", "456 Oak Avenue, Metropolis, NY 10001, US"] | "none" // Simplified as basic text
      }
    }
  ],
  // ===== SHORT ITEMS =====
  // Two-element items with structured object content
  // All field values must be valid TGDF items, no "none" values
  
  ["person_name", {
    first: ["text", "John"],
    last: ["text", "Doe"]
  }],
  
  ["contact_info", {
    email: ["email", "john.doe@example.com"],
    phone: ["text", "+1234567890"]
  }],
  
  ["address", {
    street: ["text", "123 Main St"],
    city: ["text", "Anytown"],
    state: ["text", "CA"],
    postal: ["text", "12345"],
    country: ["text", "USA"]
  }],
  
  ["color", {
    name: ["text", "midnight blue"],
    hex: ["text", "#191970"],
    rgb: ["text", "rgb(25, 25, 112)"]
  }],
  
  ["coordinate", {
    latitude: ["latitude", "40.7128"],
    longitude: ["longitude", "-74.0060"]
  }],
  
  ["time_range", {
    start: ["instant", "2025-06-16T09:00:00Z"],
    end: ["instant", "2025-06-16T17:00:00Z"],
    timezone: ["text", "America/New_York"]
  }],
]