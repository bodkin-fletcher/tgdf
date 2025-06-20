# `tgdf` Tagged Data Format

The Tagged Data Format (TGDF) is a structured, self-contained approach to organizing and handling data, primarily using tuple-like arrays. TGDF provides a consistent, efficient, and extensible framework for data management in complex heterogeneous systems.

## What is the Tagged Data Format (TGDF)?

TGDF is a standardized method for structuring data where each piece of information is encapsulated within a tuple-like array, tagged with a type identifier. The fundamental unit in TGDF is called an "ITEM," which consists of a type identifier as the first element, followed by its associated content:

- **Type Identifier**: A lowercase string that identifies the data type (e.g., "text", "request", "bike"), representing actual, real-world things a normal person can understand—not artificial programming constructs like "string" or "integer."
- **Content**: The subsequent elements contain the actual data, which can be a simple value (for basic types) or additional nested tuples (for complex types).

For example:
- `["text", "example text"]` represents a basic "text" type.
- `["time_span", ["start", ["instant", "2025-06-16T09:00:00Z"]], ["end", ["instant", "2025-06-16T17:00:00Z"]], ["timezone", ["text", "America/New_York"]]]` represents a standard "time_span" type.
- `["bike", ["color", ["color", ["name", ["text", "red"]]]], ["frame_size", ["distance", ["value", ["number", "56"]], ["unit", ["distance_unit", "cm"]]]]]` represents a custom "bike" type.

Every piece of data in the system is intended to be tagged using this format, ensuring uniformity and clarity across different data types and use cases.

### Key Principle: Self-Contained Data
A defining feature of TGDF is that each item is **self-contained**—it stands alone as actual data, fully understandable without additional lookup tables or ID references. The tuple-like array structure is both concise and powerful, enabling efficient pattern matching and processing. This approach strikes an optimal balance between human readability and machine processability, making TGDF items both compact and functional.

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
    version: "v0.1.0",  // the version of this ITEM type
    integrity: {  // integrity: hash for the content and any stamps etc
      hashes: {
        sha256: "ab..."
      },
      // ...issue stamps etc
    }
  },
  {  // data object
    // STANDARD FIELDS:
    identityHash: "d8e...",  // standard fields
    tokens: { ... } | "no_tokens",
    name: "my_awesome_bike_d8e...",  // 'flexname', mostly unique
    
    // GENERIC FIELDS (field values MUST be TGDF ITEMS)    description: ["text", "Really awesome road bike for racing"],  // BASIC ITEM
    created: ["instant", "2025-06-16T08:30:00Z"],  // timestamp as instant    frame_size: ["distance", ["distance_unit", "cm"], ["number", "56"]],
    weight: ["weight", ["weight_unit", "kg"], ["number", "8.2"]],
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
        name: ["full_person_name", {
          first_name: ["text", "Jane"],
          last_name: ["text", "Rider"]
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
  - **Standard Fields**: Common metadata like `identityHash` (a unique identifier), `tokens` (custom grouping or categorization tokens), and `name` (a readable identifier).
  - **Generic Fields**: Flexible fields like `description` (a basic `text` ITEM), temporal data (`created`, `purchased`), physical attributes (`color`, `frame_size`, `weight`), and entity relationships (`manufacturer` as an `organization` ITEM and `owner` as a `person` ITEM), showing how TGDF supports nesting for complex data.

This example highlights TGDF’s self-contained nature, use of real-world types (e.g., `bike`), and ability to nest ITEMs predictably.

### 2. Categories of Items
TGDF items fall into three categories:
- **Basic Items**: Simple, real-world types like "text", "number", "yesno", or "date".
  - Example: `["text", "hello"]`
- **Standard Items**: Reserved for future predefined complex types that would be recognized across systems. Currently, no STANDARD ITEMS are defined in the specification.
  - These would have the same three-tuple structure as Custom Items: `[<type>, <metadata_object>, <data_object>]` when defined.
- **Custom Items**: User-defined types following the three-tuple structure (type, metadata, data) for specific needs.
  - Example: `["bike", { version: "v0.1.0", integrity: {...} }, { color: ["color", { name: ["text", "red"] }], frame_size: ["distance", ["distance_unit", "cm"], ["number", "56"]] }]`

### 3. Implementation Note on Complex Structures
Some complex structures (like `full_person_name`, `address`, `phone_number`, etc.) might appear in examples as Basic Items with object properties. However, for proper implementation:

- These complex structures should be implemented as Custom Items following the three-tuple structure (type, metadata, data)
- Only truly basic types should use the simpler structure of Basic Items
- No Standard Items are currently defined in the specification

### 4. Handling Tags
- **When Required**: Use TGDF for data exchanged between modules or external systems.
- **When Optional**: Simple internal data within a single function can skip tagging if self-contained.
- **Function Roles**:
  - Functions creating/editing TGDF data manage the type identifier and its content fully.
  - Functions reading TGDF data can extract information using pattern matching for efficient processing.

### 4. Processing and Validation
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

These principles make TGDF robust for dynamic, interconnected systems.

---

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
    .with(['distance', ['distance_unit', P.string], ['number', P.string]], 
      ([_, [__, unit], [___, value]]) => processDistanceItem(unit, value))
    .with(['earth_location', P.object({ 
      latitude: ['latitude', P.string],
      longitude: ['longitude', P.string]
    })], ([_, { latitude, longitude }]) => processLocationItem(latitude[1], longitude[1]))
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