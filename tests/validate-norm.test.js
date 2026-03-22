import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('validate-norm.js', () => {
  const ROOT = process.cwd();

  describe('required files check', () => {
    const requiredFiles = [
      '.github/workflows/ci.yml',
      '.github/workflows/publish.yml',
      '.github/workflows/code-review.yml',
      'openspec/README.md',
      'openspec/specs/',
      'openspec/changes/',
      'README.md',
      'CONTRIBUTING.md',
      'LICENSE',
      'CHANGELOG.md',
    ];

    for (const file of requiredFiles) {
      it(`should have ${file}`, () => {
        const fullPath = path.join(ROOT, file);
        const exists = fs.existsSync(fullPath);
        const isDir = file.endsWith('/');

        if (isDir) {
          expect(exists, `${file} should exist as directory`).toBe(true);
          expect(fs.statSync(fullPath).isDirectory(), `${file} should be a directory`).toBe(true);
        } else {
          expect(exists, `${file} should exist`).toBe(true);
        }
      });
    }
  });

  describe('recommended files check', () => {
    const recommendedFiles = [
      '.github/workflows/qa-adversarial-review.yml',
      '.github/workflows/codeql.yml',
      '.github/labeler.yml',
      'docs/design/README.md',
      'docs/design/DOCUMENT-MAP.md',
      'docs/issues/README.md',
    ];

    for (const file of recommendedFiles) {
      it(`should have recommended ${file}`, () => {
        const fullPath = path.join(ROOT, file);
        expect(fs.existsSync(fullPath), `${file} should exist`).toBe(true);
      });
    }
  });

  describe('optional files check', () => {
    const optionalFiles = [
      '.github/workflows/auto-response.yml',
      '.github/workflows/stale.yml',
    ];

    for (const file of optionalFiles) {
      it(`should have optional ${file}`, () => {
        const fullPath = path.join(ROOT, file);
        expect(fs.existsSync(fullPath), `${file} should exist`).toBe(true);
      });
    }
  });

  describe('file structure', () => {
    it('should be ES module with import syntax', async () => {
      const validateScript = path.join(ROOT, 'scripts/validate-norm.js');
      const content = fs.readFileSync(validateScript, 'utf-8');

      // Should use ES module imports, not CommonJS require
      expect(content).toContain("import fs from 'fs'");
      expect(content).not.toContain("require('fs')");
    });

    it('should not have duplicate entries in file lists', async () => {
      const validateScript = path.join(ROOT, 'scripts/validate-norm.js');
      const content = fs.readFileSync(validateScript, 'utf-8');

      // Check for duplicate labeler.yml entries
      const labelerMatches = content.match(/'\.github\/labeler\.yml'/g) || [];
      expect(labelerMatches.length, 'labeler.yml should not be duplicated').toBe(1);
    });
  });
});
