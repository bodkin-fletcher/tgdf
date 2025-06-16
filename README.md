# `tgdf` Tagged Data Format

The Tagged Data Format (TGDF) is a structured, self-contained approach to organizing and handling data, primarily using JSON objects. TGDF provides a consistent, efficient, and extensible framework for data management in complex heterogeneous systems.

## What is the Tagged Data Format (TGDF)?

TGDF is a standardized method for structuring data where each piece of information is encapsulated within a JSON object, tagged with a type identifier. The fundamental unit in TGDF is called an "ITEM," which consists of a type-specific key and a "data" field:

- **Type-Specific Key**: A lowercase string that identifies the data type (e.g., "text", "request", "bike"), representing actual, real-world things a normal person can understand—not artificial programming constructs like "string" or "integer."
- **"data" Field**: Contains the actual content, which can be any valid JSON value (e.g., strings, numbers, booleans, arrays, or nested objects).

For example:
- `{ "text": { "data": "example text" } }` represents a basic "text" type.
- `{ "request": { "data": { "id": 1, "action": "start" } } }` represents a standard "request" type.
- `{ "bike": { "data": { "color": "red", "size": "medium" } } }` represents a custom "bike" type.

Every piece of data in the system is intended to be tagged using this format, ensuring uniformity and clarity across different data types and use cases.

### Key Principle: Self-Contained Data
A defining feature of TGDF is that each object is **self-contained**—it stands alone as actual data, fully understandable without additional lookup tables or ID references. This makes TGDF objects more verbose but significantly more readable and usable. Where performance demands it, TGDF objects can be compacted (e.g., for transmission or storage) and expanded later, but this is only done when necessary, preserving readability as the default.

---

## Why is TGDF Used?

TGDF serves several essential purposes in data management:

- **Consistency**: A uniform structure ensures all data can be processed predictably.
- **Efficiency**: The type-specific key allows quick identification and routing without deep parsing.
- **Extensibility**: Supports both predefined (standard) and user-defined (custom) types for adaptability.
- **Interoperability**: Self-contained objects enable seamless data exchange between systems or modules.
- **Understandability**: Uses intuitive, real-world type names (e.g., "text" instead of "string") for accessibility.

TGDF is particularly useful in systems with hierarchical components or communication lines, streamlining data flow and handling.

---

## How to Apply TGDF

Applying TGDF involves structuring data correctly, categorizing items, handling tags, and ensuring efficient processing. Here’s how to implement it:

### 1. Structuring Data
- Encapsulate all data in an ITEM, a JSON object with a type-specific key and a nested "data" field.
- The type-specific key must be lowercase and describe the data type as an actual, real-world concept (e.g., "text", "number", "bike")—not artificial constructs like "string" or "integer"—making it clear to a normal person.
- The "data" field holds the actual content, ranging from simple values to complex nested structures.

#### Example:
Here’s an example of a TGDF ITEM representing a "bike":

```js
let item = {
  bike: {  // 'bike' is the TAG (type-specific key)
    version: "v0.1.0",  // the version of this ITEM type
    integrity: {  // integrity: hash for the data content and any stamps etc
      hashes: {
        sha256: "ab..."
      },
      // ...issue stamps etc
    },
    data: {  // the actual data/content itself
      // STANDARD FIELDS:
      identityHash: "d8e...",  // standard fields
      tokens: { ... } || "no_tokens",
      name: "my_awesome_bike_d8e...",  // 'slughash' or 'slug/flexname', mostly unique
      created: "2025-03-...",  // timestamp

      // GENERIC FIELDS:    (field names can be arbitrary, values MUST be TGDF ITEMS)
      description: { text: { data: "Really awesome bike..." } },  // BASIC ITEM
      owner: { person: {  // CUSTOM ITEM
        version: "...",
        integrity: "...",
        data: { ... }
      }}
      // These generic fields enable predictable nesting of TGDF Items
    }
  }
}
```

**Explanation of Fields**:
- **version**: Specifies the version of the "bike" type (e.g., "v0.1.0"), allowing the structure to evolve over time while maintaining compatibility.
- **integrity**: Includes cryptographic hashes (e.g., SHA-256) and optional stamps to ensure the data’s authenticity and prevent tampering.
- **data**: Contains the core content, split into:
  - **Standard Fields**: Common metadata like `identityHash` (a unique identifier), `tokens` (custom grouping or categorization tokens), `name` (a readable identifier), and `created` (a timestamp).
  - **Generic Fields**: Flexible fields like `description` (a basic `text` ITEM) and `owner` (a nested `person` ITEM), showing how TGDF supports nesting for complex data.

This example highlights TGDF’s self-contained nature, use of real-world types (e.g., `bike`), and ability to nest ITEMs predictably.

### 2. Categories of Items
TGDF items fall into three categories:
- **Basic Items**: Simple, real-world types like "text", "number", or "boolean".
  - Example: `{ "text": { "data": "hello" } }`
- **Standard Items**: Predefined complex types recognized by the system (e.g., "request", "charge").
  - Example: `{ "request": { "data": { "id": 1, "action": "start" } } }`
- **Custom Items**: User-defined types following the ITEM structure for specific needs.
  - Example: `{ "bike": { "data": { "color": "red", "size": "medium" } } }`

### 3. Handling Tags
- **When Required**: Use TGDF for data exchanged between modules or external systems.
- **When Optional**: Simple internal data within a single function can skip tagging if self-contained.
- **Function Roles**:
  - Functions creating/editing TGDF data manage the type-specific key and "data" field fully.
  - Functions reading TGDF data can extract information without altering the structure.

### 4. Processing and Validation
- Prioritize efficiency in processing, assume all is correct until there is a problem.
- On a crash or failure or problem, validate inputs and outputs very thoroughly.

---

## Principles of TGDF

TGDF is guided by:
1. **Uniformity**: Consistent ITEM structure across all data.
2. **Efficiency**: Type keys enable rapid identification and routing.
3. **Extensibility**: Supports standard and custom types for growth.
4. **Predictability**: Uniform structure ensures reliable processing.
5. **Self-Containment**: Objects are complete and standalone.
6. **Understandability**: Real-world type names enhance accessibility.

These principles make TGDF robust for dynamic, interconnected systems.

---