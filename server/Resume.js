const fs = require("fs");
const PDFParser = require("pdf-parse");
const natural = require("natural");

const resumePath = "./6249-ZARYAB HAIDER.pdf"; // Update this with the path to your resume PDF file

const parseResume = async () => {
  try {
    // Read the resume PDF file
    const dataBuffer = fs.readFileSync(resumePath);
    const pdfData = await PDFParser(dataBuffer);
    const resumeText = pdfData.text;

    // Implement more advanced skill extraction logic
    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(resumeText.toLowerCase()); // Tokenize and convert to lowercase for consistency

    const skills = [];
    tokens.forEach((token, index) => {
      // Check for words/phrases that indicate skills
      if (
        token.includes("skill") ||
        token.includes("experience with") ||
        token.includes("proficient in") ||
        token.includes("knowledge of")
      ) {
        // Add the following token as a skill (can be extended based on context and common skill-related terms)
        skills.push(tokens[index + 1]);
      }
    });

    // Log the extracted skills to the console
    console.log("Extracted Skills:", skills);
  } catch (error) {
    console.error("Error parsing resume:", error);
  }
};

// Call the parseResume function
parseResume();
