const Atomizer = require('atomizer');
const atomizerConfig = require('./.atomizer-config.js');

module.exports = function (eleventyConfig) {
    eleventyConfig.addTransform('atomicCss', function (content, outputPath) {
        const atomizer = new Atomizer({ verbose: true });
        // Parse text to find Atomic CSS classes
        const foundClasses = atomizer.findClassNames(content);
        const finalConfig = atomizer.getConfig(foundClasses, atomizerConfig);
        const css = atomizer.getCss(finalConfig);

        return content.replace('</body>', `<style>\n${css}</style><body>`);
    });

    eleventyConfig.addPassthroughCopy('src/**/*.yml');

    return {
        dir: {
            input: 'src',
        },
    };
};
