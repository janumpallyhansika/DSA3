const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const { analyzePaper } = require("./services/plagiarismService");

const app = express();

const PORT = 5000;

// --------------------------------------------------
// PATHS
// --------------------------------------------------

const projectRoot = path.resolve(__dirname, "..");

const datasetPath = path.join(
  projectRoot,
  "dataset",
  "research_papers"
);

const uploadPath = path.join(
  __dirname,
  "uploads"
);

// Create folders if they don't exist
fs.mkdirSync(datasetPath, { recursive: true });
fs.mkdirSync(uploadPath, { recursive: true });

// --------------------------------------------------
// MIDDLEWARE
// --------------------------------------------------

app.use(cors());
app.use(express.json());

// --------------------------------------------------
// MULTER CONFIGURATION
// --------------------------------------------------

const storage = multer.diskStorage({

  destination: (_req, _file, cb) => {
    cb(null, uploadPath);
  },

  filename: (_req, file, cb) => {

    const safeName = path
      .basename(file.originalname)
      .replace(/[^a-zA-Z0-9._-]/g, "_");

    cb(
      null,
      `${Date.now()}-${safeName}`
    );
  }

});

const upload = multer({

  storage,

  limits: {
    fileSize: 50 * 1024 * 1024
  },

  fileFilter: (_req, file, cb) => {

    if (
      file.mimetype !== "application/pdf" &&
      !file.originalname
        .toLowerCase()
        .endsWith(".pdf")
    ) {

      return cb(
        new Error("Only PDF files are allowed.")
      );
    }

    cb(null, true);
  }

});

// --------------------------------------------------
// HOME
// --------------------------------------------------

app.get("/", (_req, res) => {

  res.json({
    success: true,
    message: "PaperCheck backend is running."
  });

});

// --------------------------------------------------
// HEALTH CHECK
// --------------------------------------------------

app.get("/api/health", (_req, res) => {

  res.json({
    success: true,
    status: "healthy",
    service: "PaperCheck Backend"
  });

});

// --------------------------------------------------
// DATASET INFORMATION
// --------------------------------------------------

app.get("/api/dataset", (_req, res) => {

  try {

    const papers = fs
      .readdirSync(datasetPath)
      .filter(file =>
        file
          .toLowerCase()
          .endsWith(".pdf")
      );

    res.json({

      success: true,

      totalPapers: papers.length,

      papers

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      error: "Unable to read dataset.",

      details: error.message

    });

  }

});

// --------------------------------------------------
// ANALYZE PAPER
// --------------------------------------------------

app.post(
  "/api/analyze",
  upload.single("paper"),
  async (req, res) => {

    let uploadedPath = null;

    try {

      // Check upload
      if (!req.file) {

        return res.status(400).json({

          success: false,

          error:
            "Please upload a research paper PDF."

        });

      }

      uploadedPath = req.file.path;

      console.log(
        `Analyzing: ${req.file.originalname}`
      );

      const result = await analyzePaper(

        uploadedPath,

        req.file.originalname,

        datasetPath

      );

      res.json(result);

    } catch (error) {

      console.error(
        "Analysis error:",
        error
      );

      res.status(500).json({

        success: false,

        error:
          "Paper analysis failed.",

        details:
          error.message

      });

    } finally {

      // Delete temporary uploaded PDF
      if (
        uploadedPath &&
        fs.existsSync(uploadedPath)
      ) {

        fs.unlinkSync(uploadedPath);

      }

    }

  }
);

// --------------------------------------------------
// ERROR HANDLER
// --------------------------------------------------

app.use(
  (error, _req, res, _next) => {

    console.error(error);

    if (
      error instanceof multer.MulterError &&
      error.code === "LIMIT_FILE_SIZE"
    ) {

      return res.status(400).json({

        success: false,

        error:
          "PDF file is too large. Maximum size is 50 MB."

      });

    }

    res.status(400).json({

      success: false,

      error:
        error.message ||
        "Something went wrong."

    });

  }
);

// --------------------------------------------------
// START SERVER
// --------------------------------------------------

app.listen(PORT, () => {

  console.log(
    "======================================"
  );

  console.log(
    "        PAPERCHECK BACKEND"
  );

  console.log(
    "======================================"
  );

  console.log(
    `Server: http://localhost:${PORT}`
  );

  console.log(
    `Dataset: ${datasetPath}`
  );

  console.log(
    "======================================"
  );

});