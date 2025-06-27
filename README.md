# `tgdf` Tagged Data Format

**Current Version: v0.2.0**

The Tagged Data Format (TGDF) is a structured, self-contained approach to organizing and handling data, primarily using tuple-like arrays. TGDF provides a consistent, efficient, and extensible framework for data management in complex heterogeneous systems.

## What is the Tagged Data Format (TGDF)?

TGDF is a standardized method for structuring data where each piece of information is encapsulated within a tuple-like array, tagged with a type identifier. The fundamental unit in TGDF is called an "ITEM," which consists of a type identifier as the first element, followed by its associated content:

- **Type Identifier**: A lowercase string that identifies the data type (e.g., "text", "request", "bike"), representing actual, real-world things a normal person can understand—not artificial programming constructs like "string" or "integer."
- **Content**: The subsequent elements contain the actual data, which can be a simple value (for basic types) or additional nested tuples (for complex types).

For example:
- `["text", "example text"]` represents a basic "text" type.
- `["weight", "kg", "75.5"]` represents a measurement with simplified format (v0.2.0)
- `["bike", metadata_object, data_object]` represents a custom "bike" type.

Every piece of data in the system is intended to be tagged using this format, ensuring uniformity and clarity across different data types and use cases.

### Key Principle: Self-Contained Data
A defining feature of TGDF is that each item is **self-contained**—it stands alone as actual data, fully understandable without additional lookup tables or ID references. The tuple-like array structure is both concise and powerful, enabling efficient pattern matching and processing. This approach strikes an optimal balance between human readability and machine processability, making TGDF items both compact and functional.

### No Null or Undefined Values
**TGDF completely eliminates null and undefined values.** This reflects real-world logic: if Fred asks Sam for some text and Sam says "here's your text," Fred expects actual text, not an abstract absence of text. When Fred later tries to process it and finds it's undefined, that makes no sense—it's purely a computer science abstraction problem.

TGDF uses explicit representations instead:
- `"none"` for optional fields that have no value
- `"no_tokens"` when there are no tags/tokens
- Always provide real, processable values rather than null/undefined

This eliminates ambiguity and prevents runtime errors from unexpected nulls.

---

## Why is TGDF Used?

TGDF serves several essential purposes in data management:

- **Consistency**: A uniform structure ensures all data can be processed predictably.
- **Efficiency**: The type identifier allows quick identification and routing without deep parsing.
- **Pattern Matching**: Tuple-like structure enables powerful pattern matching in compatible languages.
- **Extensibility**: Supports both predefined (standard) and user-defined (custom) types for adaptability.
- **Interoperability**: Self-contained items enable seamless data exchange between systems or modules.
- **Understandability**: Uses intuitive, real-world type names (e.g., "text" instead of "string") for accessibility.

TGDF is particularly useful in systems with hierarchical components or communication lines, streamlining data flow and handling.

---

## How to Apply TGDF

Applying TGDF involves structuring data correctly, categorizing items, handling tags, and ensuring efficient processing. Here’s how to implement it:

### 1. Structuring Data
- Encapsulate all data in an ITEM, a tuple-like array with a type identifier as the first element, followed by its associated content.
- The type identifier must be lowercase and describe the data type as an actual, real-world concept (e.g., "text", "number", "bike")—not artificial constructs like "string" or "integer"—making it clear to a normal person.
- For basic items, the content can be a simple value. For complex items, the content consists of additional nested tuples representing key-value pairs.

#### Example:
Here’s an example of a TGDF ITEM representing a "bike":

```js
let item = [
  "bike",  // 'bike' is the TYPE IDENTIFIER
  {  // metadata object
    version: "v0.2.0",  // the version of this ITEM type
    integrity: {  // integrity: hash for the content and any stamps etc
      hashes: {
        sha256: "ab..."
      },
      // ...issue stamps etc
    }
  },
  {  // data object
    // STANDARD FIELDS:
    identityHash: ["sha256", "d8e..."],  // standard fields as TGDF hash item
    tokens: [["flexname", "vehicle"], ["flexname", "road_bike"]] | "no_tokens",
    name: ["flexname", "my_awesome_bike_d8e"],  // flexname identifier
    created: ["instant", "2025-06-16T08:30:00Z"],  // when current identity was established
    
    // TYPE-SPECIFIC FIELDS (field values MUST be TGDF ITEMS)
    description: ["text", "Really awesome road bike for racing"],  // BASIC ITEM
    frame_size: ["distance", "cm", "56"],  // Simplified measurement format (v0.2.0)
    weight: ["weight", "kg", "8.2"],  // Simplified measurement format (v0.2.0)
    purchased: ["date", "2025-03-15"],
    color: ["color", {
      name: ["text", "midnight blue"],
      hex: ["text", "#191970"]
    }],
    
    owner: ["person",  // CUSTOM ITEM with proper three-tuple structure
      { // metadata object
        version: "v0.2.0",
        integrity: {
          hashes: {
            sha256: "cd456..."
          }
        }
      },
      { // data object
        // Standard fields
        identityHash: ["sha256", "cd456..."],
        tokens: [["flexname", "person"], ["flexname", "owner"]] | "no_tokens",
        name: ["flexname", "jane_rider_cd456"],
        created: ["instant", "2025-06-16T08:30:00Z"],
        
        // Type-specific fields
        display_name: ["person_name", {
          first: ["text", "Jane"],
          last: ["text", "Rider"]
        }],
        contact: {
          email: ["email", "jane.rider@example.com"]
        }
      }
    ]
    // These nested tuples enable predictable nesting of TGDF Items
  }
]
```

**Explanation of Fields**:
- **version**: Specifies the version of the "bike" type (e.g., "v0.1.0"), allowing the structure to evolve over time while maintaining compatibility.
- **integrity**: Includes cryptographic hashes (e.g., SHA-256) and optional stamps to ensure the data’s authenticity and prevent tampering.
- **version**: Specifies the version of the "bike" type (e.g., "v0.1.0"), allowing the structure to evolve over time while maintaining compatibility.
- **integrity**: Includes cryptographic hashes (e.g., SHA-256) and optional stamps to ensure the data's authenticity and prevent tampering.
- Third element: The data object contains:
  - **Standard Fields**: Common metadata like `identityHash` (a unique hash identifier in TGDF format), `tokens` (array of flexname tags or "no_tokens"), `name` (a flexname identifier), and `created` (timestamp when the current identity was established).
  - **Type-Specific Fields**: Fields specific to the item type, like `description` (a basic `text` ITEM), temporal data (`purchased`), physical attributes (`color`, `frame_size`, `weight`), and entity relationships (`owner` as a `person` ITEM), showing how TGDF supports nesting for complex data.

This example highlights TGDF’s self-contained nature, use of real-world types (e.g., `bike`), and ability to nest ITEMs predictably.

### 2. Categories of Items
TGDF items fall into four categories:
- **Basic Items**: Simple, real-world types like "text", "number", "yesno", or "date".
  - Example: `["text", "hello"]`
  - Note: TGDF uses "yesno" instead of "boolean" because it represents real-world yes/no concepts that anyone can understand, rather than abstract computer science constructs.
- **Short Items**: Two-element items with structured object content where all field values are TGDF items.
  - Example: `["person_name", { first: ["text", "John"], last: ["text", "Doe"] }]`
  - No optional fields (no "none" values allowed)
- **Standard Items**: Reserved for future predefined complex types that would be recognized across systems. Currently, no STANDARD ITEMS are defined in the specification.
  - These would have the same three-tuple structure as Custom Items: `[<type>, <metadata_object>, <data_object>]` when defined.
- **Custom Items**: User-defined types following the three-tuple structure (type, metadata, data) for specific needs.
  - Example: `["bike", { version: "v0.2.0", integrity: {...} }, { identityHash: ["sha256", "..."], tokens: [...], name: ["flexname", "..."], ... }]`

### 3. Short Items Structure
Short Items provide a convenient way to structure related data without the overhead of Custom Items:

```javascript
[<type>, <object_with_named_fields>]
```

**Rules:**
- All field values must be valid TGDF items
- No optional fields (no "none" values)
- Easily distinguishable from Custom Items (2-tuple vs 3-tuple)

**Examples:**
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

### 4. Field Organization for Custom Items
Custom Items should organize their data object fields consistently:

1. **Standard Fields First** (required for all Custom Items):
   - `identityHash`: `["sha256", "hash_string"]` - Unique identifier
   - `tokens`: Array of `["flexname", "tag"]` items OR `"no_tokens"` - Tags for categorization  
   - `name`: `["flexname", "identifier"]` - Human-readable identifier
   - `created`: `["instant", "ISO8601_timestamp"]` - Creation timestamp

2. **Type-Specific Fields Second**:
   - Fields specific to the custom type
   - All values must be TGDF items (basic or custom)
   - Use consistent naming patterns

#### Standard Fields Using Flexnames

Custom Items consistently use these standard fields:

1. **identityHash**: `["sha256", "hash_string"]` - Unique cryptographic identifier
2. **tokens**: Array of `["flexname", "tag"]` items OR `"no_tokens"` - Categorization tags
3. **name**: `["flexname", "normalized_unique_name"]` - Human-readable unique identifier  
4. **created**: `["instant", "ISO8601_timestamp"]` - Creation timestamp

**Example Standard Fields:**
```javascript
{
  identityHash: ["sha256", "d8e7a2f1c3b4..."],
  tokens: [["flexname", "vehicle"], ["flexname", "road_bike"]] | "no_tokens",
  name: ["flexname", "my_awesome_bike_d8e7a2f1"],
  created: ["instant", "2025-06-16T08:30:00Z"]
}
```

### 5. Flexname Generation Rules

Flexnames are normalized identifiers that provide consistent, machine-readable names throughout TGDF. They are essential for the `name` field in Custom Items and for tokens.

#### Generation Algorithm

```javascript
function createFlexname(text) {
  return ['flexname', text.toLowerCase()
    .replace(/[^a-z0-9\-]+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '')
  ];
}
```

**Rules:**
1. Convert to lowercase
2. Replace non-alphanumeric characters (except hyphen) with underscores
3. Collapse multiple consecutive underscores into single underscore
4. Remove leading and trailing underscores

**Examples:**
- `"API Gateway"` → `"api_gateway"`
- `"User-Profile_Data"` → `"user-profile_data"`
- `"My   Awesome  Item!!!"` → `"my_awesome_item"`
- `"--Special--Name--"` → `"special_name"`

#### Standard Name Field Pattern for Custom Items

The `name` field in Custom Items follows a specific pattern for uniqueness and readability:

```
["flexname", "<display_name>_<hash_prefix>"]
```

Where:
- `<display_name>`: Flexname-normalized version of the display name
- `<hash_prefix>`: First 8 characters of the SHA-256 identity hash

**Implementation Example:**
```javascript
const timestamp = new Date().toISOString();
const nameText = `${displayName} ${sha256(displayName + timestamp).slice(0, 8)}`;
const name = createFlexname(nameText);
// Results in: ["flexname", "my_awesome_bike_d8e7a2f1"]
```

This ensures each item has a unique, human-readable identifier that combines meaningful text with cryptographic uniqueness.

### 6. Simplified Measurement Format (v0.2.0)
For measurements where the context is obvious and unambiguous, TGDF v0.2.0 uses a simplified three-element format:

```javascript
[measurement_type, unit, value]
```

**Examples:**
- `["weight", "kg", "75.5"]` - Obviously: weight in kilograms, 75.5 units
- `["distance", "km", "10.5"]` - Obviously: distance in kilometers, 10.5 units  
- `["temperature", "celsius", "22.5"]` - Obviously: temperature in celsius, 22.5 degrees

This works because given the measurement type, it's immediately clear what the second element (unit) and third element (value) represent. There is no realistic chance of ambiguity between tuple values.

**Theory**: When context makes the meaning obvious, redundant sub-tags are removed for clarity. The simplified format maintains all necessary information while reducing verbosity.

### 6. Implementation Note on Complex Structures
Some complex structures (like `person_name`, `address`, `contact_info`, etc.) can be implemented as either Short Items or Custom Items:

- **Short Items**: For simpler, structured data without metadata requirements (2-tuple format)
- **Custom Items**: For complex entities requiring versioning, integrity checks, and standard fields (3-tuple format)
- Only truly basic types should use the simple structure of Basic Items

### 7. Handling Tags
- **When Required**: Use TGDF for data exchanged between modules or external systems.
- **When Optional**: Simple internal data within a single function can skip tagging if self-contained.
- **Function Roles**:
  - Functions creating/editing TGDF data manage the type identifier and its content fully.
  - Functions reading TGDF data can extract information using pattern matching for efficient processing.

### 8. Processing and Validation
- Prioritize efficiency in processing, assume all is correct until there is a problem.
- On a crash or failure or problem, validate inputs and outputs very thoroughly.

---

## Principles of TGDF

TGDF is guided by:
1. **Uniformity**: Consistent ITEM structure across all data.
2. **Efficiency**: Type identifiers enable rapid identification, routing, and pattern matching.
3. **Extensibility**: Supports standard and custom types for growth.
4. **Predictability**: Uniform tuple-like structure ensures reliable processing.
5. **Self-Containment**: Items are complete and standalone.
6. **Conciseness**: Tuple-like structure reduces verbosity while maintaining clarity.
7. **Understandability**: Real-world type names enhance accessibility.
8. **No Null Values**: Eliminates null/undefined through explicit representations ("none", "no_tokens").
9. **Real-World Concepts**: Types represent actual things people understand, not abstract programming constructs.
10. **Obvious Context**: Simplified formats when meaning is unambiguous (v0.2.0 measurements).

These principles make TGDF robust for dynamic, interconnected systems.

---

## Version History

- **v0.1.0**: Initial specification with explicit measurement sub-tags
- **v0.2.0**: Simplified measurement format for obvious contexts, enhanced standard fields documentation

## Related Files

- `tgdf-spec--v0.1.0.md` - Original specification
- `tgdf-spec--v0.2.0.md` - Current specification with simplified measurements
- `basic-items.js` - Examples of basic TGDF items

## Pattern Matching with TGDF

One of the key advantages of the tuple-like array structure in TGDF is the ability to leverage pattern matching in compatible programming languages. This enables powerful, concise code for processing TGDF items.

### Example Pattern Matching with ts-patterns

```js
import { match, P } from 'ts-pattern';

// Processing a TGDF item with ts-patterns
function processItem(item) {
  return match(item)
    .with(['text', P.string], (content) => processTextItem(content))
    .with(['number', P.string], (value) => processNumberItem(value))
    .with(['distance', P.string, P.string], 
      ([_, unit, value]) => processDistanceItem(unit, value))
    .with(['weight', P.string, P.string], 
      ([_, unit, value]) => processWeightItem(unit, value))
    .with(['person_name', P._], ([_, data]) => processShortItem(data))
    .with(['bike', P._, P._], ([_, metadata, data]) => processBikeItem(metadata, data))
    .otherwise((item) => handleUnknownItem(item));
}
```

This pattern matching approach with `ts-patterns` offers several advantages:
- **Type Safety**: TypeScript integration ensures patterns conform to expected structures
- **Advanced Patterns**: Support for complex patterns including arrays, objects, and wildcards
- **Exhaustiveness Checking**: Compiler ensures all possible cases are handled
- **Destructuring**: Extract relevant parts with precise control
- **Runtime Safety**: Patterns are checked at runtime, preventing unexpected errors

`ts-patterns` is particularly well-suited for TGDF as it can elegantly handle nested tuple structures and provides precise control over pattern matching without requiring language-level support.

---

#### Identity and Updates

When updating Custom Items, the identity rules are:

- **Identity Hash**: Changes when core identifying information changes (like display name)
- **Name Field**: Regenerated when display name changes, maintains uniqueness
- **Timestamp**: Creation timestamp regenerated when display name changes
- **Version**: Can be updated in metadata to reflect schema changes

**Example Update Logic:**
```javascript
// If display name changes, regenerate identity
if (newDisplayName !== currentDisplayName) {
  const timestamp = new Date().toISOString();
  const nameText = `${newDisplayName} ${sha256(newDisplayName + timestamp).slice(0, 8)}`;
  const newName = createFlexname(nameText);
  const newIdentityHash = ['sha256', sha256(newDisplayName + timestamp)];
  // Update item with new identity
}
```

This ensures items maintain cryptographic integrity while allowing meaningful updates.