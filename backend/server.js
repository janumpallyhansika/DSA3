// ============================================
// PAPERCHECK BACKEND
// DSA BASED PLAGIARISM DETECTION SYSTEM
// ============================================

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");

const {
  analyzeDocument
} = require("./algorithms/similarity");


// ============================================
// CREATE EXPRESS APP
// ============================================

const app = express();

const PORT = 5000;


// ============================================
// PROJECT PATHS
// ============================================

const projectRoot =
  path.resolve(
    __dirname,
    ".."
  );


// Dataset location
const datasetPath =
  path.join(
    projectRoot,
    "dataset",
    "research_papers"
  );


// Temporary uploaded files
const uploadPath =
  path.join(
    __dirname,
    "uploads"
  );


// ============================================
// CREATE REQUIRED DIRECTORIES
// ============================================

fs.mkdirSync(
  datasetPath,
  {
    recursive: true
  }
);

fs.mkdirSync(
  uploadPath,
  {
    recursive: true
  }
);


// ============================================
// MIDDLEWARE
// ============================================

app.use(cors());

app.use(
  express.json()
);


// ============================================
// FILE UPLOAD CONFIGURATION
// ============================================

// Maximum PDF size = 50 MB

const upload =
  multer({

    dest: uploadPath,

    limits: {

      fileSize:
        50 * 1024 * 1024

    }

  });


// ============================================
// HOME / TEST ROUTE
// ============================================

app.get(
  "/",
  (req, res) => {

    res.json({

      message:
        "PaperCheck Backend is Running",

      project:
        "Research Paper Plagiarism Detection System",

      algorithm:
        "Rolling Hash + Rabin-Karp"

    });

  }
);


// ============================================
// HEALTH CHECK
// ============================================

app.get(
  "/api/health",
  (req, res) => {

    res.json({

      status:
        "success",

      message:
        "Backend is working correctly",

      algorithm:
        "Rolling Hash + Rabin-Karp"

    });

  }
);


// ============================================
// DATASET INFORMATION
// ============================================

app.get(
  "/api/dataset",
  (req, res) => {

    try {

      const papers =
        fs
          .readdirSync(
            datasetPath
          )
          .filter(
            file =>
              file
                .toLowerCase()
                .endsWith(".pdf")
          );


      res.json({

        totalPapers:
          papers.length,

        papers:
          papers

      });

    }

    catch (error) {

      console.error(
        "Dataset Error:",
        error
      );

      res
        .status(500)
        .json({

          error:
            "Unable to read dataset."

        });

    }

  }
);


// ============================================
// PLAGIARISM ANALYSIS
// ============================================

app.post(
  "/api/analyze",

  upload.single("paper"),

  async (req, res) => {

    let uploadedFilePath = null;


    try {

      // ======================================
      // CHECK UPLOADED FILE
      // ======================================

      if (!req.file) {

        return res
          .status(400)
          .json({

            error:
              "Please upload a research paper PDF."

          });

      }


      uploadedFilePath =
        req.file.path;


      // ======================================
      // CHECK FILE EXTENSION
      // ======================================

      if (
        !req.file.originalname
          .toLowerCase()
          .endsWith(".pdf")
      ) {

        fs.unlink(
          uploadedFilePath,
          () => {}
        );

        return res
          .status(400)
          .json({

            error:
              "Only PDF files are allowed."

          });

      }


      // ======================================
      // CHECK DATASET
      // ======================================

      const datasetFiles =
        fs
          .readdirSync(
            datasetPath
          )
          .filter(
            file =>
              file
                .toLowerCase()
                .endsWith(".pdf")
          );


      if (
        datasetFiles.length === 0
      ) {

        fs.unlink(
          uploadedFilePath,
          () => {}
        );

        return res
          .status(400)
          .json({

            error:
              "The reference dataset is empty. Please add research paper PDFs to dataset/research_papers."

          });

      }


      // ======================================
      // READ UPLOADED PDF
      // ======================================

      const buffer =
        fs.readFileSync(
          uploadedFilePath
        );


      // ======================================
      // EXTRACT TEXT FROM PDF
      // ======================================

      const pdf =
        await pdfParse(
          buffer
        );


      // ======================================
      // CHECK EXTRACTED TEXT
      // ======================================

      if (
        !pdf.text ||
        pdf.text.trim().length === 0
      ) {

        fs.unlink(
          uploadedFilePath,
          () => {}
        );

        return res
          .status(400)
          .json({

            error:
              "Could not extract text from this PDF. The PDF may be scanned or image-based."

          });

      }


      // ======================================
      // COUNT WORDS
      // ======================================

      const extractedWords =
        pdf.text
          .trim()
          .split(/\s+/)
          .filter(Boolean)
          .length;


      // ======================================
      // RUN PLAGIARISM DETECTION
      // ======================================

      console.log("");
      console.log(
        "=========================================="
      );

      console.log(
        "Starting plagiarism analysis..."
      );

      console.log(
        `Uploaded file: ${req.file.originalname}`
      );

      console.log(
        `Extracted words: ${extractedWords}`
      );

      console.log(
        `Reference papers: ${datasetFiles.length}`
      );

      console.log(
        "Algorithm: Rolling Hash + Rabin-Karp"
      );

      console.log(
        "=========================================="
      );


      const result =
        await analyzeDocument(
          pdf.text,
          datasetPath
        );


      // ======================================
      // DELETE TEMPORARY UPLOAD
      // ======================================

      fs.unlink(
        uploadedFilePath,
        () => {}
      );


      // ======================================
      // SEND RESULT TO FRONTEND
      // ======================================

      res.json({

        success:
          true,

        uploadedFile:
          req.file.originalname,

        extractedWords:
          extractedWords,

        ...result

      });


      console.log(
        "Analysis completed successfully."
      );

    }

    catch (error) {

      console.error(
        "Analysis Error:",
        error
      );


      // ======================================
      // DELETE TEMPORARY FILE
      // ======================================

      if (
        uploadedFilePath &&
        fs.existsSync(
          uploadedFilePath
        )
      ) {

        fs.unlink(
          uploadedFilePath,
          () => {}
        );

      }


      // ======================================
      // SEND ERROR
      // ======================================

      res
        .status(500)
        .json({

          error:
            "An error occurred during plagiarism analysis.",

          details:
            error.message

        });

    }

  }
);


// ============================================
// MULTER ERROR HANDLER
// ============================================

app.use(
  (error, req, res, next) => {

    if (
      error instanceof multer.MulterError
    ) {

      // File too large
      if (
        error.code ===
        "LIMIT_FILE_SIZE"
      ) {

        return res
          .status(400)
          .json({

            error:
              "File is too large. Maximum allowed size is 50 MB."

          });

      }


      return res
        .status(400)
        .json({

          error:
            error.message

        });

    }


    next(error);

  }
);


// ============================================
// GENERAL ERROR HANDLER
// ============================================

app.use(
  (error, req, res, next) => {

    console.error(
      "Server Error:",
      error
    );

    res
      .status(500)
      .json({

        error:
          "Internal server error.",

        details:
          error.message

      });

  }
);


// ============================================
// START SERVER
// ============================================

app.listen(
  PORT,
  () => {

    console.log("");

    console.log(
      "=========================================="
    );

    console.log(
      "          PAPERCHECK BACKEND"
    );

    console.log(
      "=========================================="
    );

    console.log(
      `Server: http://localhost:${PORT}`
    );

    console.log(
      "DSA: Rolling Hash + Rabin-Karp"
    );

    console.log(
      "Maximum PDF Size: 50 MB"
    );

    console.log(
      `Dataset: ${datasetPath}`
    );

    console.log(
      "=========================================="
    );

    console.log("");

  }
);