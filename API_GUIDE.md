// API Request Examples and Testing Guide

## Table of Contents
1. [Setup](#setup)
2. [Health Check](#health-check)
3. [Image to PDF](#image-to-pdf)
4. [Merge PDFs](#merge-pdfs)
5. [Compress PDF](#compress-pdf)
6. [Error Handling](#error-handling)
7. [Testing with Postman](#testing-with-postman)

---

## Setup

### Base URL
- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-backend.render.app/api`

### Headers
```json
{
  "Content-Type": "multipart/form-data"
}
```

---

## Health Check

Check if server is running.

### Request
```bash
curl -X GET http://localhost:5000/api/health
```

### Response (200 OK)
```json
{
  "success": true,
  "message": "Server is healthy",
  "data": {
    "status": "healthy",
    "uptime": 1234.56,
    "timestamp": "2024-01-15T10:30:00.000Z",
    "environment": "development"
  }
}
```

---

## Image to PDF

Convert multiple images to a single PDF.

### Request

**URL**: `POST /api/image/to-pdf`

**Method**: `POST`

**Content-Type**: `multipart/form-data`

**Form Data**:
- `files` (array of files) - Images to convert (JPEG, PNG, WebP, GIF)

### Examples

#### Using curl
```bash
curl -X POST http://localhost:5000/api/image/to-pdf \
  -F "files=@image1.jpg" \
  -F "files=@image2.png" \
  -F "files=@image3.jpg"
```

#### Using JavaScript (Fetch)
```javascript
const files = [image1, image2, image3]; // File objects
const formData = new FormData();

files.forEach(file => {
  formData.append('files', file);
});

const response = await fetch('http://localhost:5000/api/image/to-pdf', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log(result);
```

#### Using axios (JavaScript)
```javascript
import axios from 'axios';

const files = [image1, image2, image3];
const formData = new FormData();

files.forEach(file => {
  formData.append('files', file);
});

const response = await axios.post('http://localhost:5000/api/image/to-pdf', formData);
console.log(response.data);
```

#### Using Python
```python
import requests

files = [
  ('files', open('image1.jpg', 'rb')),
  ('files', open('image2.png', 'rb')),
]

response = requests.post(
  'http://localhost:5000/api/image/to-pdf',
  files=files
)

print(response.json())
```

### Response (200 OK)
```json
{
  "success": true,
  "message": "Images converted to PDF successfully!",
  "data": {
    "fileName": "images_1705319400000.pdf",
    "downloadUrl": "/downloads/images_1705319400000.pdf",
    "fileSize": 2097152,
    "imagesCount": 3
  }
}
```

### Error Response (400 Bad Request)
```json
{
  "success": false,
  "message": "No files uploaded"
}
```

---

## Merge PDFs

Combine multiple PDFs into a single PDF.

### Request

**URL**: `POST /api/pdf/merge`

**Method**: `POST`

**Content-Type**: `multipart/form-data`

**Form Data**:
- `files` (array of files) - PDF files to merge

### Examples

#### Using curl
```bash
curl -X POST http://localhost:5000/api/pdf/merge \
  -F "files=@document1.pdf" \
  -F "files=@document2.pdf" \
  -F "files=@document3.pdf"
```

#### Using JavaScript
```javascript
const files = [pdf1, pdf2, pdf3];
const formData = new FormData();

files.forEach(file => {
  formData.append('files', file);
});

const response = await fetch('http://localhost:5000/api/pdf/merge', {
  method: 'POST',
  body: formData
});

const result = await response.json();
```

### Response (200 OK)
```json
{
  "success": true,
  "message": "PDFs merged successfully!",
  "data": {
    "fileName": "merged_1705319400000.pdf",
    "downloadUrl": "/downloads/merged_1705319400000.pdf",
    "fileSize": 5242880
  }
}
```

### Error Response (400 Bad Request)
```json
{
  "success": false,
  "message": "At least 2 PDF files are required"
}
```

---

## Compress PDF

Reduce PDF file size without losing quality.

### Request

**URL**: `POST /api/pdf/compress`

**Method**: `POST`

**Content-Type**: `multipart/form-data`

**Form Data**:
- `file` (single file) - PDF to compress

### Examples

#### Using curl
```bash
curl -X POST http://localhost:5000/api/pdf/compress \
  -F "file=@large-document.pdf"
```

#### Using JavaScript
```javascript
const file = pdfFile; // File object
const formData = new FormData();
formData.append('file', file);

const response = await fetch('http://localhost:5000/api/pdf/compress', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log(`Compression: ${result.data.compressionRatio} reduction`);
```

### Response (200 OK)
```json
{
  "success": true,
  "message": "PDF compressed successfully!",
  "data": {
    "fileName": "compressed_1705319400000.pdf",
    "downloadUrl": "/downloads/compressed_1705319400000.pdf",
    "originalSize": 5242880,
    "compressedSize": 2621440,
    "compressionRatio": "50.00%",
    "savedSize": 2621440
  }
}
```

### Error Response (400 Bad Request)
```json
{
  "success": false,
  "message": "File must be a PDF"
}
```

---

## Error Handling

### Common Error Codes

| Code | Error | Reason | Solution |
|------|-------|--------|----------|
| 400 | Bad Request | Invalid input | Check file format/size |
| 413 | Payload Too Large | File exceeds 50MB | Compress file or retry |
| 404 | Not Found | Route doesn't exist | Check API URL |
| 500 | Server Error | Processing failed | Check server logs |

### Response Format
```json
{
  "success": false,
  "message": "User-friendly error message",
  "error": "Technical details (dev only)"
}
```

### Handling Errors in JavaScript

```javascript
async function uploadFiles(files) {
  try {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    const response = await fetch('http://localhost:5000/api/image/to-pdf', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    console.log('Success:', data.data);
    return data.data;

  } catch (error) {
    console.error('Error:', error.message);
    // Show error to user
    toast.error(error.message);
  }
}
```

---

## Testing with Postman

### Step 1: Import Collection

Create a new Postman collection with these requests:

### Step 2: Add Requests

#### Request 1: Health Check
- **Method**: GET
- **URL**: `{{base_url}}/health`
- **Headers**: None required

#### Request 2: Image to PDF
- **Method**: POST
- **URL**: `{{base_url}}/image/to-pdf`
- **Body**: Form-data
  - Key: `files` (type: File)
  - Value: Select image files

#### Request 3: Merge PDF
- **Method**: POST
- **URL**: `{{base_url}}/pdf/merge`
- **Body**: Form-data
  - Key: `files` (type: File)
  - Value: Select PDF files

#### Request 4: Compress PDF
- **Method**: POST
- **URL**: `{{base_url}}/pdf/compress`
- **Body**: Form-data
  - Key: `file` (type: File)
  - Value: Select PDF file

### Step 3: Set Variables

Create environment variables:
```json
{
  "base_url": "http://localhost:5000/api",
  "api_key": "your-api-key"
}
```

### Step 4: Test

- Click Send on each request
- Verify responses
- Check status codes

---

## Rate Limiting (Future)

When implemented:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1705319400
```

---

## Authentication (Future)

When implemented:
```bash
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:5000/api/image/to-pdf
```

---

## Batch Operations (Future)

Planned endpoint for processing multiple files:
```
POST /api/batch
```

---

## Download Files

After processing:
```bash
# Download the file
curl -O http://localhost:5000/downloads/images_1705319400000.pdf

# Or in JavaScript
window.location.href = 'http://localhost:5000/downloads/images_1705319400000.pdf';
```

---

## Performance Tips

1. **Optimal file sizes**:
   - Images: < 5MB each
   - PDFs: < 50MB each

2. **Batch size**:
   - Recommended: 1-10 files
   - Maximum: 20 files

3. **Timeout**:
   - Set timeout to 30+ seconds
   - Larger files take longer

---

## Debugging

### Enable Verbose Logging

Backend:
```bash
NODE_ENV=development npm run dev
```

### Check Server Logs
```bash
# All requests
tail -f server.log

# Errors only
tail -f server.log | grep -i error
```

### Test Download Link

```bash
# Verify file exists
curl -I http://localhost:5000/downloads/filename.pdf
```

---

## Complete Example: Full Workflow

```javascript
// Step 1: Select files
const imageFile = document.getElementById('imageInput').files[0];

// Step 2: Create FormData
const formData = new FormData();
formData.append('files', imageFile);

// Step 3: Upload
const response = await fetch('http://localhost:5000/api/image/to-pdf', {
  method: 'POST',
  body: formData
});

// Step 4: Handle response
if (response.ok) {
  const data = await response.json();
  
  // Step 5: Download
  const downloadUrl = `http://localhost:5000${data.data.downloadUrl}`;
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = data.data.fileName;
  link.click();
} else {
  alert('Error: ' + response.statusText);
}
```

---

This guide covers all API functionality. For more help, check the architecture docs or GitHub issues.
