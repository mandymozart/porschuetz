#!/usr/bin/env node

import fs from "fs";
import path from "path";
import markdownToPng from "./../../markdown-to-png/dist/index.esm.js";
import yargs from "yargs";
import defaultTemplate from "./layout.html?raw";
import sampleMarkdown from "./sample.md?raw";

/**
 * Parses the command-line arguments using yargs.
 *
 * @returns {Object} Parsed command-line arguments
 */
const argv = yargs(process.argv.slice(2))
	.option("input", {
		alias: "i",
		description: "Path to the markdown input file",
		type: "string",
	})
	.option("template", {
		alias: "t",
		description: "Path to the HTML template",
		type: "string",
		default: null,
	})
	.option("layout", {
		alias: "l",
		description: "Select the page layout: portrait, square, or landscape",
		type: "string",
		choices: ["portrait", "square", "landscape"],
		default: "portrait", // Set default layout to "portrait"
	})
	.option("charactersPerPage", {
		alias: "c",
		description: "Maximum characters per page",
		type: "number",
		default: 62,
	})
	.option("theme", {
		alias: "m",
		description:
			"Select the theme: default, monochrome, dark-purple, medium-purple, dark-orange, bright-orange",
		type: "string",
		choices: [
			"default",
			"monochrome",
			"dark-purple",
			"medium-purple",
			"dark-orange",
			"bright-orange",
		],
		default: "default",
	})
	.option("limit", {
		alias: "lim",
		description: "Limit the number of images to generate",
		type: "number",
		default: 10,
	})
	.option("output", {
		alias: "o",
		description: "Directory to save the generated PNG images",
		type: "string",
		default: "./output", // Default output directory
	})
	.help().argv;

/**
 * Configuration options derived from the command-line arguments.
 *
 * @type {Object}
 */
const options = {
	charactersPerPage: argv.charactersPerPage,
	layout: argv.layout,
	template: argv.template !== "" ? argv.template : undefined,
	theme: argv.theme,
	limit: argv.limit,
	output: argv.output, // Include the output option in the derived options
};

/**
 * Resolves the template to use based on user input or defaults to the bundled template.
 *
 * @returns {string} The template content
 */
let template;
if (options.template) {
	const templatePath = path.resolve(options.template);
	console.log(`Using user-provided template: ${templatePath}`);

	if (!fs.existsSync(templatePath)) {
		console.error(`Template file not found: ${templatePath}`);
		process.exit(1);
	}

	template = fs.readFileSync(templatePath, "utf-8");
} else {
	console.log("Using default bundled template");
	template = defaultTemplate;
}

/**
 * Main function to process the markdown file and generate PNGs.
 *
 * @async
 */
(async function main() {
	console.log("Covert md to images", options);
	let markdownText;
	const layoutFolder = argv.layout;

	try {
		if (!argv.input) {
			console.log(
				"No input file provided. Using sample file. Please provide your own markdown file using --input path/to/document.md"
			);
			markdownText = sampleMarkdown;
		} else {
			markdownText = fs.readFileSync(argv.input, "utf8");
		}

		const baseFileName = path.basename(
			argv.input || "sample.md",
			path.extname(argv.input || "sample.md")
		);
		const outputDirectory = path.join(
			options.output, // Use the output option from derived options
			baseFileName,
			layoutFolder
		);

		if (!fs.existsSync(outputDirectory)) {
			fs.mkdirSync(outputDirectory, { recursive: true });
		}

		await markdownToPng(
			markdownText,
			outputDirectory,
			baseFileName,
			template,
			options
		);
	} catch (error) {
		console.error(
			"Error processing the markdown file or generating images:",
			error
		);
		process.exit(1);
	}
})();
