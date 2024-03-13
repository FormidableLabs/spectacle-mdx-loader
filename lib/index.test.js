'use strict';

const normalizeNewline = require('normalize-newline');
const { splitSlides, generateSlides } = require('./helpers');

const slidesContent = parts => {
  const content = parts.join('');
  return normalizeNewline(content).replace(/\n[^\n\S]+/g, '\n');
};

describe('Split slides', () => {
  it('should split slides', () => {
    const content = slidesContent`
      # Slide 1

      ---

      ## Slide 2

      Text
    `;
    const slides = splitSlides(content);
    expect(slides).toHaveLength(2);
    expect(slides[0]).toContain('# Slide 1');
    expect(slides[1]).toContain('# Slide 2\n\nText');
  });
});

describe('generateSlides', () => {
  it('should generate slides', () => {
    const content = slidesContent`
      # Slide 1

      ---
      layout: big-quotes
      ---

      ## Slide 2

      Text
    `;
    const slides = generateSlides(splitSlides(content), {
      inlineModules: []
    });
    expect(slides).toHaveLength(2);
    expect(slides[1]).toContain('frontmatter={{"layout":"big-quotes"}}');
  });
});
