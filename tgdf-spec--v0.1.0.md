# TGDF Specification v0.1.0

Tagged Data Format (TGDF) is a structured approach to organizing data using tuple-like arrays. This specification provides the necessary details to implement TGDF in any application.

## Core Structure

All TGDF items are arrays where the first element is a lowercase string identifying the type. There are three categories of items:

1. **Basic Items**: Simple types with one, two or sometimes three values
2. **Standard Items**: Reserved for future predefined complex types (currently none defined)
3. **Custom Items**: User-defined complex types following a standard pattern

## 1. Basic Items

Basic items represent simple, real-world concepts with a minimal structure:

```
[<type>, <value>]
```

### Examples

```javascript
["text", "Hello world"]
["number", "42"]
["date", "2025-06-20"]
["yesno", "yes"]
["flexname", "some_identifier_name"]
["instant", "2025-06-20T14:30:00Z"]
["email", "example@domain.com"]
```

### Basic Items with Units

Some basic items include a unit specification:

```
[<type>, [<unit_type>, <unit>], [<value_type>, <value>]]
```

### Examples

```javascript
["weight", ["weight_unit", "kg"], ["number", "75.5"]]
["distance", ["distance_unit", "km"], ["number", "10.5"]]
["temperature", ["temperature_unit", "celsius"], ["number", "22.5"]]
["currency", ["text", "USD"], ["number", "1250.00"]]
["duration", ["duration_unit", "minutes"], ["number", "30"]]
```

### Basic Items with Multiple Fields

Some basic items have several fields so are made into an object instead of a very long tuple:

```
[<type>, <key_value_object>]
```

### Examples

```javascript
[ "full_person_name", {
    first_name: ["text": "John"],
    middle_names: ["text": "Michael"],
    maiden_name: ["text": "Smith"] | "none", // Optional.
    last_name: ["text": "Doe"],
    display_name: ["text": "John Doe"]
  }
]
```

## 2. Standard Items

Standard Items are reserved for future predefined complex types that would be recognized across systems. They would follow the same three-tuple structure as Custom Items:

```
[<type>, <metadata_object>, <data_object>]
```

### Status

**Currently, no STANDARD ITEMS are defined in the specification.**

Standard Items are intended to serve as cross-domain, predefined items that would be recognized by all systems implementing TGDF. They would represent common data structures that are universally useful.

When defined in the future, Standard Items will follow the three-tuple structure shown above (like Custom Items), with clear specifications for each allowed type. This consistent structure ensures all complex data types (both Standard and Custom) have the same pattern for better interoperability.
```

## 3. Custom Items

Custom items follow a three-tuple structure:

```
[<type>, <metadata_object>, <data_object>]
```

Where:
- `<type>`: Lowercase string identifying the custom type
- `<metadata_object>`: Contains metadata like version and integrity information
- `<data_object>`: Contains the actual data with standard and type-specific fields

### Example

```javascript
["bike", 
  { // metadata object
    version: "v0.1.0",
    integrity: {
      hashes: {
        sha256: "ab123..."
      }
    }
  },
  { // data object
    // Standard fields
    identityHash: "d8e...",
    tokens: { tag1: true, tag2: true } | "no_tokens",
    name: "my_awesome_bike_d8e...",
    
    // Type-specific fields
    description: ["text", "Really awesome road bike for racing"],
    created: ["instant", "2025-06-16T08:30:00Z"],
    frame_size: ["distance", ["distance_unit", "cm"], ["number", "56"]],
    weight: ["weight", ["weight_unit", "kg"], ["number", "8.2"]],
    purchased: ["date", "2025-03-15"],
    color: ["color", {
      name: ["text", "midnight blue"],
      hex: ["text", "#191970"]
    }]
  }
]
```

## Optional Values

Optional fields are represented using the `|` operator:

```javascript
field: <tgdf_item> | "none"
```

## Implementation Notes

1. Type identifiers should always be lowercase and represent real-world concepts
2. Use string representations for numbers to avoid floating-point errors
3. Nest TGDF items predictably to enable pattern matching
4. Custom items should always follow the three-tuple structure
5. Each item should be self-contained and not rely on external references

## Processing with Pattern Matching

TGDF is designed to work well with pattern matching libraries like `ts-patterns`:

```javascript
import { match, P } from 'ts-pattern';

// Process a TGDF item
function processItem(item) {
  return match(item)
    .with(['text', P.string], (content) => /* process text */)
    .with(['distance', ['distance_unit', P.string], ['number', P.string]], 
      ([_, [__, unit], [___, value]]) => /* process distance */)
    .with(['bike', P._, P._], ([_, metadata, data]) => /* process bike */)
    .otherwise((item) => /* handle unknown */);
}
```
