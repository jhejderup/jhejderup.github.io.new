const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const embedEverything = require("eleventy-plugin-embed-everything");
const pluginDate = require("eleventy-plugin-date");
const markdownIt = require("markdown-it");
const markdownItEmoji = require("markdown-it-emoji");

module.exports = function(eleventyConfig) {

    let markdownLib = markdownIt({html: true}).use(markdownItEmoji);
  
    eleventyConfig.setLibrary("md", markdownLib);


    // {{ variable | jsonify }}
    eleventyConfig.addFilter('jsonify', function (variable) {
      return JSON.stringify(variable);
    });


    eleventyConfig.addCollection('news', collection => {
      return collection.getFilteredByGlob('_news/*.md').reverse();
    });
    
    eleventyConfig.addCollection('projects', collection => {
      return collection.getFilteredByGlob('_projects/*.md')
          .sort((a, b) => a.data.importance - b.data.importance);
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
      }
    };
  }