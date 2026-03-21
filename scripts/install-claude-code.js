#!/usr/bin/env node

/**
 * Superflow 安装脚本 - Claude Code
 * 将命令和技能安装到 Claude Code 配置目录
 */

const fs = require('fs');
const path = require('path');

const CONFIG_DIR = path.join(require('os').homedir(), '.claude');
const COMMANDS_DIR = path.join(CONFIG_DIR, 'commands', 'superflow');
const SKILLS_DIR = path.join(CONFIG_DIR, 'skills', 'superflow');
const SOURCE_COMMANDS_DIR = path.join(__dirname, '..', 'config', 'commands');
const SOURCE_SKILLS_DIR = path.join(__dirname, '..', 'config', 'skills', 'superflow');

function copyFileSync(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`  ✓ ${dest}`);
}

function install() {
  console.log('🚀 安装 Superflow 到 Claude Code...\n');

  // 安装命令
  console.log('📦 安装命令...');
  const commandFiles = fs.readdirSync(SOURCE_COMMANDS_DIR);
  commandFiles.forEach(file => {
    const src = path.join(SOURCE_COMMANDS_DIR, file);
    const dest = path.join(COMMANDS_DIR, file);
    copyFileSync(src, dest);
  });

  // 安装技能（如果存在）
  if (fs.existsSync(SOURCE_SKILLS_DIR)) {
    console.log('\n📦 安装技能...');
    const skillFiles = fs.readdirSync(SOURCE_SKILLS_DIR);
    skillFiles.forEach(file => {
      const src = path.join(SOURCE_SKILLS_DIR, file);
      const dest = path.join(SKILLS_DIR, file);
      copyFileSync(src, dest);
    });
  }

  console.log('\n✅ Superflow 已安装到 Claude Code！');
  console.log('\n使用方法:');
  console.log('  /superflow:brainstorm <需求>');
  console.log('  /superflow:plan [名称]');
  console.log('  /superflow:execute [名称]');
  console.log('  /superflow:archive [名称]');
}

install();
