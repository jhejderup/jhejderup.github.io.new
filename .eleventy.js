const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const embedEverything = require("eleventy-plugin-embed-everything");
const pluginDate = require("eleventy-plugin-date");
const markdownIt = require("markdown-it");
const markdownItEmoji = require("markdown-it-emoji");

module.exports = function(eleventyConfig) {
  const options = {
    html: true
  };
  const markdownLib = markdownIt(options).use(markdownItEmoji);
  
  eleventyConfig.setLibrary("md", markdownLib);


    // {{ variable | jsonify }}
    eleventyConfig.addFilter('jsonify', function (variable) {
      return JSON.stringify(variable);
    });

    eleventyConfig.setLiquidOptions({
      dynamicPartials: false,
      root: [
        '_includes',
        '.'
      ]
    });

    eleventyConfig.addCollection('news', collection => {
      return collection.getFilteredByGlob('_news/*.md');
    });
    
    eleventyConfig.addCollection('projects', collection => {
      return collection.getFilteredByGlob('_projects/*.markdown')
          .sort((a, b) => b.data.importance - a.data.importance);
    });

    eleventyConfig.addCollection('posts', collection => {
      return collection.getFilteredByGlob('_posts/*.md');
    });

    eleventyConfig.addCollection('pages', collection => {
      return collection.getFilteredByGlob('_pages/*.md');
    });    

    // Copy the `assets` directory to the compiled site folder
    eleventyConfig.addPassthroughCopy('assets');

    // Enable syntax highlighting
    eleventyConfig.addPlugin(syntaxHighlight);    

    // Enable embeddings of stuff
    eleventyConfig.addPlugin(embedEverything);
    
    //Date formats
    eleventyConfig.addPlugin(pluginDate);

    return {
      dir: {
        layouts: "_layouts",
        input: "./",
        output: "./_site"
      },
      passthroughFileCopy: true
    };
  }