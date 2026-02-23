# CLAUDE.md

This file provides guidance for AI assistants (Claude and others) working in this repository.

## Repository Overview

This is a freshly initialized repository. As the project grows, this file should be kept up to date with the current state of the codebase, development workflows, and conventions.

**Remote:** `seifabas33-pixel/claude-`
**Primary branch:** `master`

---

## Development Branch Workflow

All AI-driven development follows this branching convention:

- Feature branches follow the pattern: `claude/<description>-<session-id>`
- Always develop on the designated feature branch, never directly on `master`
- Push with: `git push -u origin <branch-name>`
- Open a pull/merge request when work is complete

---

## Git Conventions

### Commit Messages

Write clear, descriptive commit messages in the imperative mood:

```
Add user authentication module
Fix null pointer in payment handler
Update README with setup instructions
```

- First line: short summary (50 chars or fewer)
- Blank line, then optional body with context and reasoning
- Reference issue numbers where relevant: `Fixes #42`

### Git Operations

- **Signing:** Commits are signed with an SSH key (`/home/claude/.ssh/commit_signing_key.pub`)
- **Author:** Claude (`noreply@anthropic.com`) when operated by AI
- Stage specific files rather than `git add -A` to avoid accidentally committing secrets or binaries
- Never force-push to `master`

---

## Project Setup

> This section should be updated as the project evolves with its actual stack.

### Current State

The repository contains only a `.gitkeep` placeholder. No source code, dependencies, or tooling have been added yet.

### Getting Started (Template — update when applicable)

```bash
# Clone
git clone <remote-url>
cd claude-

# Install dependencies (once a package manager is chosen)
# npm install  /  pip install -r requirements.txt  /  etc.

# Run tests
# npm test  /  pytest  /  etc.

# Start development server
# npm run dev  /  etc.
```

---

## Adding a Technology Stack

When the project adopts a stack, update this file with:

1. **Language & runtime version** (e.g., Node 20, Python 3.12)
2. **Package manager** (npm, yarn, pnpm, pip, poetry, etc.)
3. **Framework** (React, FastAPI, etc.)
4. **Build commands**
5. **Test commands and how to run a single test**
6. **Lint / format commands**
7. **Environment variables** (names only, never values)

---

## Code Conventions (Defaults Until Overridden)

Until project-specific linting and formatting configs are added, follow these defaults:

### General

- Prefer clarity over cleverness
- Keep functions small and single-purpose
- Delete dead code instead of commenting it out
- No backwards-compatibility shims unless explicitly required

### Naming

| Construct | Style |
|-----------|-------|
| Files | `kebab-case` |
| Variables / functions | `camelCase` (JS/TS) or `snake_case` (Python) |
| Classes | `PascalCase` |
| Constants | `UPPER_SNAKE_CASE` |

### Error Handling

- Validate at system boundaries (user input, external APIs)
- Do not add defensive checks for conditions that cannot occur
- Surface errors clearly; avoid swallowing exceptions silently

### Security

- Never commit secrets, tokens, or credentials
- Use environment variables for all sensitive configuration
- Sanitize user input before use in queries, shell commands, or HTML output
- Follow OWASP Top 10 guidelines

---

## Testing Guidelines

When tests are introduced:

- Write tests for new behavior, not implementation details
- Each test should have a single clear assertion of intent
- Tests should be runnable in isolation (no shared mutable state)
- Mark slow / integration tests appropriately so unit tests remain fast

---

## Documentation

- Keep this `CLAUDE.md` current as the project evolves
- Update `README.md` (when created) with human-facing setup and usage instructions
- Inline comments only where logic is non-obvious — code should be self-documenting

---

## CI/CD

No CI/CD pipeline is configured yet. When one is added, document:

- Which checks run on every PR (lint, tests, build)
- Required status checks before merge
- Deployment process and environments

---

## Updating This File

Whenever significant project changes occur (new stack, new tooling, new conventions), update the relevant sections of this file and commit the update alongside the related code changes.
