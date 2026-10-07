import { describe, it, expect } from 'vitest';
import { projectsData } from './projects';
import { skillsCategories } from './skills';

describe('Projects Data', () => {
  it('should have real projects defined', () => {
    expect(projectsData.length).toBeGreaterThanOrEqual(2);
  });

  it('should have valid IDs and titles for all projects', () => {
    projectsData.forEach((project) => {
      expect(project.id).toBeTruthy();
      expect(project.title).toBeTruthy();
      expect(project.stack.length).toBeGreaterThan(0);
      if (project.github) {
        expect(project.github).toMatch(/^https?:\/\//);
      }
    });
  });

  it('should include Glamstitch and Programmer Zaman Now', () => {
    const ids = projectsData.map((p) => p.id);
    expect(ids).toContain('pzn');
    expect(ids).toContain('glamstitch');
  });
});

describe('Skills Data', () => {
  it('should have all 4 skill categories populated', () => {
    expect(skillsCategories.length).toBe(4);
    const categoryNames = skillsCategories.map((c) => c.name);
    expect(categoryNames).toEqual(['Frontend', 'Backend', 'Database', 'Tools & DevOps']);
  });

  it('should have skills with valid levels and icons', () => {
    skillsCategories.forEach((cat) => {
      expect(cat.items.length).toBeGreaterThan(0);
      cat.items.forEach((item) => {
        expect(item.name).toBeTruthy();
        expect(item.level).toBeGreaterThan(0);
        expect(item.level).toBeLessThanOrEqual(100);
        expect(item.icon).toMatch(/^https?:\/\//);
      });
    });
  });
});
