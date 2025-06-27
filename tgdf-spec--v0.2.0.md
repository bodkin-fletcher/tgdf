# TGDF Specification v0.2.0

Tagged Data Format (TGDF) is a structured approach to organizing data using tuple-like arrays. This specification defines the four categories of TGDF items and their structures.

## Item Categories

1. **Basic Items**: Simple types - one, two, or three values
2. **Short Items**: Two-element items with structured object content  
3. **Standard Items**: Reserved for future predefined complex types (none currently defined)
4. **Custom Items**: User-defined complex types with three-element structure

## 1. Basic Items

### Simple Items
`[<type>, <value>]`

**Text and Identifiers**: `["text", "Hello"]`, `["flexname", "my_id"]`, `["email", "user@domain.com"]`, `["url", "https://example.com"]`

**Numbers and Booleans**: `["number", "42"]`, `["yesno", "yes"]`

**Time**: `["date", "2025-06-20"]`, `["instant", "2025-06-20T14:30:00Z"]`

**Location**: `["latitude", "40.7128"]`, `["longitude", "-74.0060"]`, `["altitude", "10.5"]`

**Other**: `["color_hex", "#FF5733"]`, `["uri", "urn:isbn:123"]`

### Measurement Items
`[<measurement_type>, <unit>, <value>]`

**Physical**: `["weight", "kg", "75.5"]`, `["distance", "km", "10.5"]`, `["temperature", "celsius", "22.5"]`

**Time/Money**: `["duration", "minutes", "30"]`, `["currency", "USD", "1250.00"]`

## 2. Short Items

Short items provide structured object content with named fields:

`[<type>, <object_with_named_fields>]`

**Requirements:**
- All field values must be valid TGDF items
- No optional fields (no "none" values allowed)
- Easily distinguishable from Custom Items (2-tuple vs 3-tuple)

### Examples

```javascript
["person_name", {
  first: ["text", "John"],
  last: ["text", "Doe"]
}]

["contact_info", {
  email: ["email", "john@example.com"],
  phone: ["text", "+1234567890"]
}]

["address", {
  street: ["text", "123 Main St"],
  city: ["text", "Anytown"],
  postal: ["text", "12345"]
}]
```

## 3. Standard Items

Standard Items are reserved for future predefined complex types that would be recognized across systems. They would follow the same three-tuple structure as Custom Items:

```
[<type>, <metadata_object>, <data_object>]
```

### Status

**Currently, no STANDARD ITEMS are defined in the specification.**

Standard Items are intended to serve as cross-domain, predefined items that would be recognized by all systems implementing TGDF. They would represent common data structures that are universally useful.

When defined in the future, Standard Items will follow the three-tuple structure shown above (like Custom Items), with clear specifications for each allowed type. This consistent structure ensures all complex data types (both Standard and Custom) have the same pattern for better interoperability.

## 4. Custom Items

Custom items follow a three-tuple structure:

```
[<type>, <metadata_object>, <data_object>]
```

Where:
- `<type>`: Lowercase string identifying the custom type
- `<metadata_object>`: Contains metadata like version and integrity information
- `<data_object>`: Contains the actual data with standard and type-specific fields

### Required Standard Fields

All Custom Items must include these standard fields in their data object:

1. **identityHash**: `["sha256", "hash_string"]` - Cryptographic identifier
2. **tokens**: `[["flexname", "tag"], ...]` OR `"no_tokens"` - Classification tags
3. **name**: `["flexname", "unique_identifier"]` - Human-readable unique name
4. **created**: `["instant", "ISO8601_timestamp"]` - When current identity was established

### Example

```javascript
["bike", 
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
    identityHash: ["sha256", "d8e..."],
    tokens: [["flexname", "vehicle"], ["flexname", "road_bike"]] | "no_tokens",
    name: ["flexname", "my_awesome_bike_d8e"],
    created: ["instant", "2025-06-16T08:30:00Z"],
    
    // Type-specific fields
    description: ["text", "Really awesome road bike for racing"],
    frame_size: ["distance", "cm", "56"],
    weight: ["weight", "kg", "8.2"],
    purchased: ["date", "2025-03-15"],
    color: ["color", {
      name: ["text", "midnight blue"],
      hex: ["text", "#191970"]
    }]
  }
]
```

## Flexname Generation

Flexnames are normalized identifiers used throughout TGDF for consistent naming. They follow specific rules for creation:

### Generation Rules
1. Convert input text to lowercase
2. Replace non-alphanumeric characters (except underscore) with underscores
3. Collapse multiple consecutive underscores into single underscore
4. Remove leading and trailing underscores

### Examples
- `"API Gateway"` → `"api_gateway"`
- `"User-Profile_Data"` → `"user_profile_data"`
- `"My   Awesome  Item!!!"` → `"my_awesome_item"`

### Standard Name Field Pattern
For Custom Items, the `name` field follows this pattern:
```
["flexname", "<type>_<display_name>_<hash_prefix>"]
```

Where:
- `<type>`: The item type (optional, for disambiguation)
- `<display_name>`: Flexname version of the display name
- `<hash_prefix>`: First 8 characters of the identity hash

**Example:** `["flexname", "bike_my_awesome_bike_d8e7a2f1"]`

## Optional Values

Optional fields are represented using the `|` operator:

```javascript
field: <tgdf_item> | "none"
```

## Implementation Notes

1. Type identifiers should always be lowercase and represent real-world concepts
2. Use string representations for numbers to avoid floating-point errors
3. Custom items always use three-tuple structure, Short items use two-tuple structure
4. Each item should be self-contained and not rely on external references
5. Use `"none"` for optional fields, `"no_tokens"` when there are no tags
6. Never use null or undefined values

## Processing with Pattern Matching

TGDF is designed to work well with pattern matching libraries like `ts-patterns`:

```javascript
import { match, P } from 'ts-pattern';

// Process a TGDF item
function processItem(item) {
  return match(item)
    .with(['text', P.string], (content) => /* process text */)
    .with(['weight', P.string, P.string], 
      ([_, unit, value]) => /* process weight */)
    .with(['person_name', P._], ([_, data]) => /* process short item */)
    .with(['bike', P._, P._], ([_, metadata, data]) => /* process custom item */)
    .otherwise((item) => /* handle unknown */);
}
```
