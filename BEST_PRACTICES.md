# Development Best Practices & Checklist

Guidelines for maintaining code quality and consistency in ManaDocs.

## Table of Contents
1. [Code Style](#code-style)
2. [Component Guidelines](#component-guidelines)
3. [API Guidelines](#api-guidelines)
4. [Performance](#performance)
5. [Security](#security)
6. [Testing](#testing)
7. [Documentation](#documentation)
8. [Deployment Checklist](#deployment-checklist)

---

## Code Style

### JavaScript/React Standards

#### Naming Conventions
```javascript
// ✓ Good
const userEmail = 'user@example.com';
const handleFileUpload = () => {};
const MAX_FILE_SIZE = 52428800;
const UserProfile = () => {};

// ✗ Avoid
const usrEmail = 'user@example.com';
const upload = () => {};
const maxFileSize = 52428800;
const userprofile = () => {};
```

#### File Organization
```
components/
├── Header/
│   ├── Header.jsx          // Component
│   ├── Header.module.css   // Scoped styles (if needed)
│   └── Header.test.js      // Tests
├── Footer/
└── ...

pages/
├── Home/
│   ├── Home.jsx
│   ├── Home.module.css
│   └── Home.test.js
└── ...
```

#### Import Organization
```javascript
// Order: React → External libraries → Relative imports → CSS
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

import FileUpload from '../components/FileUpload';
import { formatFileSize } from '../utils/helpers';
import './Home.css';
```

### Comments

```javascript
// ✓ Good - explains WHY
// Filter out non-image files to prevent processing errors
const imageFiles = files.filter(f => f.type.startsWith('image/'));

// ✗ Avoid - states the obvious
// Filter files
const files = files.filter(f => f.type.startsWith('image/'));

// ✓ Good - JSDoc for functions
/**
 * Converts multiple images to a PDF document
 * @param {File[]} images - Array of image files
 * @param {string} outputFormat - PDF format ('A4', 'letter')
 * @returns {Promise<Blob>} Generated PDF blob
 */
function imagesToPDF(images, outputFormat = 'A4') {
  // Implementation
}
```

---

## Component Guidelines

### Functional Components

```javascript
// ✓ Good
export default function FileUpload({ onFilesSelected, multiple = true }) {
  const [files, setFiles] = useState([]);
  
  const handleChange = (newFiles) => {
    setFiles(newFiles);
    onFilesSelected(newFiles);
  };

  return (
    <div className="upload-area">
      {/* Component JSX */}
    </div>
  );
}

// ✗ Avoid - Class components
class FileUpload extends React.Component {
  // Old pattern
}
```

### Props Validation

```javascript
// ✓ Good - Using PropTypes or TypeScript
import PropTypes from 'prop-types';

function FileUpload({ onFilesSelected, multiple, maxSize }) {
  // Implementation
}

FileUpload.propTypes = {
  onFilesSelected: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  maxSize: PropTypes.number,
};

FileUpload.defaultProps = {
  multiple: true,
  maxSize: 52428800,
};
```

### Custom Hooks

```javascript
// ✓ Good - Reusable logic in custom hook
function useFileUpload(maxSize = 52428800) {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const handleUpload = (newFiles) => {
    const validFiles = newFiles.filter(f => f.size <= maxSize);
    setFiles(validFiles);
  };

  return { files, error, handleUpload };
}

// Usage
function MyComponent() {
  const { files, handleUpload } = useFileUpload();
}
```

### Compound Components

```javascript
// ✓ Good - Flexible component composition
<FileUpload>
  <FileUpload.Input />
  <FileUpload.Preview />
  <FileUpload.Actions />
</FileUpload>

// Component implementation
FileUpload.Input = FileUploadInput;
FileUpload.Preview = FileUploadPreview;
FileUpload.Actions = FileUploadActions;
```

---

## API Guidelines

### Express Route Structure

```javascript
// ✓ Good - Clear route organization
router.post(
  '/merge',
  upload.array('files', 20),           // Middleware
  validateMultipleFiles,                // Middleware
  pdfController.mergePDFs               // Controller
);

// Controller with error handling
async function mergePDFs(req, res) {
  try {
    // Process
    sendSuccess(res, data, 'Message');
  } catch (error) {
    sendError(res, 'Error message', 500, error);
  }
}
```

### Error Handling

```javascript
// ✓ Good - Consistent error responses
const sendError = (res, message, statusCode = 500) => {
  res.status(statusCode).json({
    success: false,
    message,
    timestamp: new Date().toISOString()
  });
};

// ✗ Avoid - Inconsistent responses
res.send('Error occurred');
res.json({ error: 'Something went wrong' });
```

### Response Format

```javascript
// ✓ Good - Standardized response format
{
  success: true,
  message: "Operation successful",
  data: {
    id: 123,
    fileName: "document.pdf"
  }
}

// ✗ Avoid - Inconsistent format
{
  status: "ok",
  result: { /* data */ },
  info: "completed"
}
```

---

## Performance

### Frontend Performance

#### Lazy Loading
```javascript
// ✓ Good - Lazy load routes
const Home = lazy(() => import('../pages/Home'));
const ImageToPDF = lazy(() => import('../pages/ImageToPDF'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/image-to-pdf" element={<ImageToPDF />} />
      </Routes>
    </Suspense>
  );
}
```

#### Memoization
```javascript
// ✓ Good - Memoize expensive components
const FileCard = memo(({ file, onDelete }) => (
  <div>
    <p>{file.name}</p>
    <button onClick={onDelete}>Delete</button>
  </div>
), (prevProps, nextProps) => {
  return prevProps.file.id === nextProps.file.id;
});
```

#### Debouncing/Throttling
```javascript
// ✓ Good - Debounce search
import { debounce } from 'lodash';

const handleSearch = debounce((query) => {
  // API call
}, 300);
```

### Backend Performance

#### Caching
```javascript
// ✓ Good - Cache responses
const cache = new Map();

function getCachedData(key) {
  if (cache.has(key)) {
    return cache.get(key);
  }
  // Fetch and cache
}
```

#### Stream Processing
```javascript
// ✓ Good - Stream large files
app.get('/download/:filename', (req, res) => {
  const stream = fs.createReadStream(req.params.filename);
  stream.pipe(res);
});
```

---

## Security

### File Upload Security

```javascript
// ✓ Good - Validate file uploads
const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
const MAX_SIZE = 52428800; // 50MB

if (!ALLOWED_TYPES.includes(file.mimetype)) {
  throw new Error('Invalid file type');
}

if (file.size > MAX_SIZE) {
  throw new Error('File too large');
}
```

### Input Validation

```javascript
// ✓ Good - Validate all inputs
const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePageNumber = (page) => {
  return Number.isInteger(page) && page > 0 && page <= maxPages;
};
```

### Environment Variables

```javascript
// ✓ Good - Never hardcode secrets
const dbUrl = process.env.DB_URL;
const apiKey = process.env.API_KEY;

// ✗ Avoid
const dbUrl = 'mongodb://localhost:27017/db';
const apiKey = 'sk_live_1234567890abcdef';
```

---

## Testing

### Component Tests

```javascript
// ✓ Good - Test user interactions
import { render, screen } from '@testing-library/react';
import FileUpload from '../FileUpload';

test('uploads files when selected', () => {
  render(<FileUpload onFilesSelected={jest.fn()} />);
  
  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { files: [mockFile] } });
  
  expect(screen.getByText('1 file selected')).toBeInTheDocument();
});
```

### API Tests

```javascript
// ✓ Good - Test API endpoints
test('POST /api/image/to-pdf with images', async () => {
  const response = await request(app)
    .post('/api/image/to-pdf')
    .send({ files: [mockImage] });

  expect(response.status).toBe(200);
  expect(response.body.success).toBe(true);
});
```

---

## Documentation

### README Structure

- ✓ Feature overview
- ✓ Installation steps
- ✓ Quick start guide
- ✓ API documentation
- ✓ Contributing guidelines
- ✓ License information

### Code Comments

```javascript
// ✓ Good - Document complex logic
/**
 * Merges multiple PDFs in the specified order
 * 
 * Algorithm:
 * 1. Load each PDF into memory
 * 2. Create a new document
 * 3. Copy pages from source PDFs
 * 4. Save merged result
 */
async function mergePDFs(filePaths) {
  // Implementation
}
```

### Git Commits

```bash
# ✓ Good - Clear, descriptive messages
git commit -m "feat: add image to PDF conversion"
git commit -m "fix: handle empty file list in upload"
git commit -m "docs: add API documentation"

# ✗ Avoid - Vague messages
git commit -m "fixed stuff"
git commit -m "updates"
git commit -m "working now"
```

---

## Deployment Checklist

### Pre-Deployment

- [ ] All tests passing
- [ ] No console errors/warnings
- [ ] Code reviewed
- [ ] Security audit completed
- [ ] Environment variables configured
- [ ] Backup created
- [ ] Rollback plan documented

### Deployment

- [ ] Build succeeds
- [ ] Deployment logs reviewed
- [ ] Health checks passing
- [ ] Basic functionality verified
- [ ] Critical features tested
- [ ] Performance acceptable

### Post-Deployment

- [ ] Monitor error logs
- [ ] Check user reports
- [ ] Performance metrics reviewed
- [ ] Analytics updated
- [ ] Team notified
- [ ] Documentation updated

---

## Code Review Checklist

Before submitting a PR, ensure:

- [ ] Code follows style guide
- [ ] No hardcoded values
- [ ] Proper error handling
- [ ] Tests included and passing
- [ ] No security vulnerabilities
- [ ] Performance optimized
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
- [ ] Commits are clean and descriptive
- [ ] No console.log or debugger statements

---

## Performance Budget

### Frontend
- Initial load: < 2s
- Interactive: < 3s
- Lighthouse score: > 90

### Backend
- API response: < 500ms
- File upload: < 30s
- Compression: < 10s

---

## Common Pitfalls to Avoid

1. **State Management**
   - Don't use Redux for simple state (use Zustand)
   - Don't pass props through many levels (use context)

2. **Performance**
   - Don't render large lists without virtualization
   - Don't recreate functions on every render

3. **Security**
   - Don't trust client-side validation alone
   - Don't expose sensitive data in environment files

4. **Testing**
   - Don't test implementation details
   - Don't skip edge cases

5. **Documentation**
   - Don't forget to update docs with code changes
   - Don't assume readers understand context

---

## Helpful Resources

- [React Best Practices](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Web Performance](https://web.dev/performance)
- [OWASP Security](https://owasp.org)

---

Follow these guidelines to keep ManaDocs maintainable, secure, and performant! 🚀
