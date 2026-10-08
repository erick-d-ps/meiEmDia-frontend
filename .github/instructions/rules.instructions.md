---
applyTo: "**"
---

# GitHub Copilot Instructions

How to add new Copilot rules to the project.

## 1. Rule File Location

Always place Copilot instruction files in:

```
PROJECT_ROOT/.github/instructions/

   .github/
   └── instructions/
    ├── your-rule-name.instructions.md
    ├── another-rule-name.instructions.md
    └── ...
```

2. Naming Convention:
   - Use kebab-case for filenames
   - Always use the .instructions.md extension.
   - Use descriptive names that clearly indicate the purpose of the rule.

3. Directory structure:

   ```
   PROJECT_ROOT/
   ├── .github/
   │   ├── instructions/
   │   │   ├── your-rule-name.instructions.md
   │   │   └── ...
   │   └── ...
   └── ...
   ```

4. Never place rule files:
   - In the project root
   - In subdirectories outside .github/instructions/.
   - In any other location

5. Cursor rules have the following structure:

````
---
applyTo: '**/*.ts'
---

# TypeScript Guidelines

Main content explaining the rule using Markdown formatting.

1. Step-by-step instructions.
2. Code examples.
3. Guidelines and best practices.

Example:

```typescript
// Good example
function goodExample() {
  // Implementation following the project guidelines
}

// Bad example
function badExample() {
  // Implementation that does not follow the project guidelines
}
````
