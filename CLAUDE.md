# CLAUDE.md - Agent Guidelines

## Build/TypeScript Commands
- Build: `npm run build` - Bundles src/index.ts into compiled/script.js
- TypeScript Check: `npm run ts-check` - Type checking only
- Deploy: `npm run deploy` - Runs type check and builds production bundle

## Code Style Guidelines

### TypeScript
- Strict type checking enabled
- Explicit typing for properties and parameters
- Interfaces defined in types.d.ts
- Use non-null assertion (!) only when necessary
- Use optional chaining (?) for potentially undefined values

### Naming & Structure
- Classes: PascalCase (GameController, Bomber)
- Methods/variables: camelCase (startGame, handleKeyPress)
- Files: PascalCase for classes, camelCase for utilities
- Properties at top, followed by constructor, then methods
- Public methods before private methods

### Imports & Exports
- Use named imports: `import { Bomber } from './Bomber'`
- Singleton pattern: `export const gameController = new GameController()`

### DOM Interaction
- Direct DOM manipulation with standard browser APIs
- Use typed element access: `document.getElementById('canvas')!`
- Event listeners in separate eventListeners.ts file