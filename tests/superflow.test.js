import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('Superflow Commands', () => {
  const commandsDir = path.join(__dirname, '..', 'config', 'commands');

  it('clarify.md exists and has valid frontmatter', () => {
    const file = path.join(commandsDir, 'clarify.md');
    expect(fs.existsSync(file)).toBe(true);
    const content = fs.readFileSync(file, 'utf-8');
    expect(content).toContain('name: superflow:clarify');
    expect(content).toContain('## 流程');
  });

  it('plan.md exists and has valid frontmatter', () => {
    const file = path.join(commandsDir, 'plan.md');
    expect(fs.existsSync(file)).toBe(true);
    const content = fs.readFileSync(file, 'utf-8');
    expect(content).toContain('name: superflow:plan');
    expect(content).toContain('## 流程');
  });

  it('execute.md exists and has valid frontmatter', () => {
    const file = path.join(commandsDir, 'execute.md');
    expect(fs.existsSync(file)).toBe(true);
    const content = fs.readFileSync(file, 'utf-8');
    expect(content).toContain('name: superflow:execute');
    expect(content).toContain('## 流程');
  });

  it('verify.md exists and has valid frontmatter', () => {
    const file = path.join(commandsDir, 'verify.md');
    expect(fs.existsSync(file)).toBe(true);
    const content = fs.readFileSync(file, 'utf-8');
    expect(content).toContain('name: superflow:verify');
    expect(content).toContain('## 流程');
  });

  it('all commands have consistent structure', () => {
    const commands = ['clarify.md', 'plan.md', 'execute.md', 'verify.md'];
    commands.forEach(cmd => {
      const file = path.join(commandsDir, cmd);
      const content = fs.readFileSync(file, 'utf-8');
      expect(content).toContain('---');
      expect(content).toContain('name: superflow:');
      expect(content).toContain('description:');
    });
  });
});

describe('Superflow Openspec Structure', () => {
  const openspecDir = path.join(__dirname, '..', 'openspec');

  it('openspec directory exists', () => {
    expect(fs.existsSync(openspecDir)).toBe(true);
  });

  it('specs directory exists', () => {
    const specsDir = path.join(openspecDir, 'specs');
    expect(fs.existsSync(specsDir)).toBe(true);
  });

  it('changes directory exists', () => {
    const changesDir = path.join(openspecDir, 'changes');
    expect(fs.existsSync(changesDir)).toBe(true);
  });

  it('workflow-v0.2.md exists', () => {
    const workflowFile = path.join(openspecDir, 'specs', 'superflow', 'workflow-v0.2.md');
    expect(fs.existsSync(workflowFile)).toBe(true);
    const content = fs.readFileSync(workflowFile, 'utf-8');
    expect(content).toContain('OpenCode OMO 最强增强器');
    expect(content).toContain('四阶段');
  });

  it('README.md exists and references v0.2', () => {
    const readme = path.join(openspecDir, 'README.md');
    expect(fs.existsSync(readme)).toBe(true);
    const content = fs.readFileSync(readme, 'utf-8');
    expect(content).toContain('0.2');
  });
});

describe('Superflow Skills', () => {
  const skillsDir = path.join(__dirname, '..', 'config', 'skills', 'superflow');

  it('skills directory exists', () => {
    expect(fs.existsSync(skillsDir)).toBe(true);
  });

  it('SKILL.md exists', () => {
    const skillFile = path.join(skillsDir, 'SKILL.md');
    expect(fs.existsSync(skillFile)).toBe(true);
    const content = fs.readFileSync(skillFile, 'utf-8');
    expect(content).toContain('Superflow');
    expect(content).toContain('OMO');
  });
});

describe('Package.json', () => {
  const pkgFile = path.join(__dirname, '..', 'package.json');

  it('package.json exists', () => {
    expect(fs.existsSync(pkgFile)).toBe(true);
  });

  it('has correct name', () => {
    const pkg = JSON.parse(fs.readFileSync(pkgFile, 'utf-8'));
    expect(pkg.name).toBe('@raganor/superflow');
  });

  it('has OpenCode keyword', () => {
    const pkg = JSON.parse(fs.readFileSync(pkgFile, 'utf-8'));
    expect(pkg.keywords).toContain('opencode');
    expect(pkg.keywords).toContain('omo');
  });

  it('has install:opencode script', () => {
    const pkg = JSON.parse(fs.readFileSync(pkgFile, 'utf-8'));
    expect(pkg.scripts['install:opencode']).toBeDefined();
  });
});
