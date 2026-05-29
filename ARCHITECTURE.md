# ManaDocs Architecture

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Client (React)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  Navbar      │  │  Pages       │  │  Components      │  │
│  │  Footer      │  │  - Home      │  │  - FileUpload    │  │
│  │  Router      │  │  - Image2PDF │  │  - FeatureCard   │  │
│  │              │  │  - MergePDF  │  │  - Spinner       │  │
│  │              │  │  - CompressPDF│ │  - Toast Alerts  │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  State Management (Zustand)                          │   │
│  │  - appStore (language, darkMode)                     │   │
│  │  - fileStore (files, processingStatus)               │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Utilities & Helpers                                 │   │
│  │  - API calls (axios)                                 │   │
│  │  - i18n (translations)                               │   │
│  │  - Helpers (format, download, etc)                   │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕
                  HTTP (REST API)
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                   Server (Node.js/Express)                  │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Routes (/api/pdf, /api/image, /api/health)        │   │
│  └─────────────────────────────────────────────────────┘   │
│                         ↓                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Middleware                                         │   │
│  │  - CORS handling                                    │   │
│  │  - File upload (multer)                             │   │
│  │  - Validation                                       │   │
│  │  - Error handling                                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                         ↓                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Controllers                                        │   │
│  │  - PDFController (merge, compress, info)            │   │
│  │  - ImageController (to-pdf, info)                   │   │
│  │  - HealthController                                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                         ↓                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Utils (Business Logic)                             │   │
│  │  - pdfProcessor (pdf-lib)                            │   │
│  │  - imageProcessor (sharp)                            │   │
│  │  - fileCleanup (temp file management)                │   │
│  │  - response (standardized responses)                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                         ↓                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  File Storage (/uploads)                            │   │
│  │  - Temporary files                                  │   │
│  │  - Auto-cleanup after 24 hours                      │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### Image to PDF Conversion
```
User selects images
        ↓
FileUpload component
        ↓
Drag & drop / Click to select
        ↓
Validate files (type, size)
        ↓
Display preview with order
        ↓
User clicks "Convert"
        ↓
API call: POST /api/image/to-pdf
        ↓
Server receives multipart/form-data
        ↓
Multer saves files to /uploads
        ↓
ImageController.imagesToPDF()
        ↓
imageProcessor.imagesToPDF()
        ↓
Sharp converts images
        ↓
pdf-lib creates PDF
        ↓
PDF saved to /uploads
        ↓
Cleanup source image files
        ↓
Return download URL
        ↓
Frontend downloads file
        ↓
Clear upload state
```

### PDF Merge
```
User selects PDFs
        ↓
Validation (at least 2 PDFs)
        ↓
API call: POST /api/pdf/merge
        ↓
Multer saves files
        ↓
PDFController.mergePDFs()
        ↓
pdfProcessor.mergePDFs()
        ↓
pdf-lib loads each PDF
        ↓
Copy pages to merged document
        ↓
Save merged PDF
        ↓
Cleanup source PDFs
        ↓
Return download URL
```

## Component Hierarchy

```
App
├── Router
│   ├── Navbar
│   │   ├── Logo
│   │   ├── NavLinks
│   │   └── LanguageToggle
│   │
│   ├── Routes
│   │   ├── Home
│   │   │   ├── HeroSection
│   │   │   ├── FeaturesSection
│   │   │   │   └── FeatureCard (x4)
│   │   │   ├── BenefitsSection
│   │   │   └── CTASection
│   │   │
│   │   ├── ImageToPDF
│   │   │   ├── FileUpload
│   │   │   ├── FilePreview
│   │   │   └── ConvertButton
│   │   │
│   │   ├── MergePDF
│   │   │   ├── FileUpload
│   │   │   ├── FileList
│   │   │   └── MergeButton
│   │   │
│   │   └── CompressPDF
│   │       ├── FileUpload
│   │       ├── CompressionStats
│   │       └── CompressButton
│   │
│   └── Footer
│       ├── Links
│       └── Copyright
│
├── Toaster (Notifications)
└── [Global State - Zustand]
    ├── appStore
    └── fileStore
```

## State Management Flow

### Zustand Stores

#### appStore
```javascript
{
  language: 'en',           // Current language
  isDarkMode: false,        // Dark mode toggle
  setLanguage(lang),        // Update language
  toggleDarkMode()          // Toggle dark mode
}
```

#### fileStore
```javascript
{
  uploadedFiles: [],        // Array of File objects
  processingStatus: null,   // 'uploading', 'processing', 'complete'
  addFiles(files),          // Add files to store
  removeFile(index),        // Remove specific file
  clearFiles(),             // Clear all files
  setProcessingStatus(status) // Update status
}
```

## API Endpoints

### Health Check
- **Method**: GET
- **Path**: `/api/health`
- **Response**: Server status and uptime

### Image Processing
- **Method**: POST
- **Path**: `/api/image/to-pdf`
- **Payload**: multipart/form-data with images
- **Response**: PDF download URL and metadata

### PDF Operations
- **Method**: POST
- **Path**: `/api/pdf/merge`
- **Payload**: multipart/form-data with PDFs
- **Response**: Merged PDF URL

- **Method**: POST
- **Path**: `/api/pdf/compress`
- **Payload**: multipart/form-data with PDF
- **Response**: Compression statistics and URL

## File Processing Pipeline

### Image to PDF
```
Input (JPG, PNG, WebP)
    ↓
Sharp (image processing)
    ↓
Resize/optimize if needed
    ↓
Convert to compatible format
    ↓
pdf-lib (create PDF)
    ↓
Embed images
    ↓
Save PDF
    ↓
Output (PDF file)
```

### PDF Merge
```
Input (Multiple PDFs)
    ↓
pdf-lib (load each)
    ↓
Extract pages
    ↓
Create new document
    ↓
Add pages in order
    ↓
Save merged document
    ↓
Output (Merged PDF)
```

### PDF Compression
```
Input (PDF)
    ↓
pdf-lib (load)
    ↓
Quality reduction
    ↓
Save compressed
    ↓
Output (Compressed PDF)
```

## Security Architecture

```
┌─────────────────────────────────────────────┐
│          Frontend Security                   │
│  - Input validation                         │
│  - File type checking                       │
│  - File size limit enforcement              │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│          CORS Protection                     │
│  - Whitelist frontend URLs                  │
│  - Validate origin header                   │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│        Backend Validation                    │
│  - Multer file type filter                  │
│  - Size limit enforcement                   │
│  - MIME type verification                   │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│        File Processing                       │
│  - Isolated temp storage                    │
│  - Automatic cleanup                        │
│  - No permanent storage                     │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│        HTTPS/SSL                             │
│  - Encrypted transmission                   │
│  - Certificate validation                   │
└─────────────────────────────────────────────┘
```

## Performance Optimization

### Frontend
- Code splitting (React.lazy)
- Lazy loading images
- Minified CSS with Tailwind
- Framer Motion for smooth animations
- Efficient re-renders with Zustand

### Backend
- Streaming file uploads
- Temp file cleanup scheduler
- Connection pooling ready
- Error handling and recovery
- Response compression

### Deployment
- CDN for static assets (Vercel)
- Edge caching
- Gzip compression
- Image optimization

## Scalability Considerations

### Current (Single Server)
- Suitable for ~1000 concurrent users
- File size limit: 50MB
- Auto-cleanup after 24 hours

### Future Scaling Options

1. **Horizontal Scaling**
   - Load balancer
   - Multiple backend instances
   - Shared file storage (S3, etc.)

2. **Queue System**
   - Bull/Redis for job queue
   - Background workers
   - Progress tracking

3. **Microservices**
   - Separate PDF processor
   - Separate image processor
   - API gateway

4. **Database**
   - MongoDB for metadata
   - User accounts
   - Processing history

## Error Handling Strategy

```
Error occurs
    ↓
Catch in try-catch
    ↓
Log error (development)
    ↓
Determine error type
    ├─ Validation Error → 400
    ├─ Auth Error → 401
    ├─ Permission Error → 403
    ├─ Not Found → 404
    ├─ Server Error → 500
    └─ Service Unavailable → 503
    ↓
Send standardized response
    {
      success: false,
      message: "User-friendly error message",
      error: "Details (dev only)"
    }
    ↓
Frontend displays toast notification
    ↓
User can retry or try different action
```

---

This architecture ensures scalability, maintainability, and excellent user experience.
