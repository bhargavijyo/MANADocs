# Quick Start Guide - Component Integration

This guide will help you quickly integrate the new premium components into existing pages and components.

## Step 1: Update Imports

Instead of importing individual components, use the index file:

```javascript
// ❌ Old way (still works but verbose)
import Button from './components/Button';
import Card from './components/Card';
import Input from './components/Input';

// ✅ New way (cleaner, faster)
import { Button, Card, Input, Modal, Alert } from '../components';
import { useUpload, useAsync, useDarkMode } from '../hooks';
```

## Step 2: Replace Existing Components

### Update Home Page (pages/Home.jsx)
```jsx
import { Button, Card, EmptyState } from '../components';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="gradient-text text-5xl font-bold mb-4">
          Transform Your Documents
        </h1>
        <p className="text-lg text-secondary-600 mb-8">
          Fast, Simple, Secure
        </p>
        <Button variant="primary" size="lg">
          Get Started Free
        </Button>
      </motion.div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card variant="elevated" badge="Popular">
          <h3>Image to PDF</h3>
          <p>Convert images easily</p>
        </Card>
      </div>
    </div>
  );
}
```

### Update Navbar (components/Navbar.jsx)
```jsx
import { Button, Dropdown, Switch } from '../components';
import { useDarkMode } from '../hooks';
import { useAppStore } from '../utils/store';

export default function Navbar() {
  const { isDark, toggle } = useDarkMode();
  const { language, setLanguage } = useAppStore();

  return (
    <nav className="bg-white dark:bg-secondary-900 shadow-soft dark:shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold gradient-text">ManaDocs</h1>

        {/* Actions */}
        <div className="flex gap-4">
          {/* Dark Mode Toggle */}
          <Switch
            checked={isDark}
            onChange={toggle}
            helper={isDark ? '🌙 Dark' : '☀️ Light'}
          />

          {/* Language Dropdown */}
          <Dropdown
            trigger={language.toUpperCase()}
            items={[
              { label: 'English', icon: '🇺🇸' },
              { label: 'Telugu', icon: '🇮🇳' },
            ]}
            onSelect={(item) => setLanguage(item.label === 'English' ? 'en' : 'te')}
          />

          {/* Login Button */}
          <Button variant="primary">Sign In</Button>
        </div>
      </div>
    </nav>
  );
}
```

### Update File Upload (components/FileUpload.jsx)
```jsx
import { useUpload } from '../hooks';
import { Progress, Button, Alert } from '../components';
import { useDropzone } from 'react-dropzone';

export default function FileUpload({ onFilesSelected }) {
  const { files, addFiles, removeFile, progress } = useUpload();
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => addFiles(acceptedFiles),
  });

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-primary-300 dark:border-primary-700 rounded-lg p-8 text-center cursor-pointer hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
      >
        <input {...getInputProps()} />
        <p className="text-lg font-semibold">Drag files here or click to select</p>
      </div>

      {/* Progress */}
      {progress > 0 && <Progress value={progress} label="Uploading..." />}

      {/* File List */}
      <div className="space-y-2">
        {files.map((file, index) => (
          <div key={index} className="flex items-center justify-between bg-secondary-50 dark:bg-secondary-800 p-3 rounded-lg">
            <span>{file.name}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeFile(index)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      {files.length > 0 && (
        <Button
          variant="primary"
          fullWidth
          onClick={() => onFilesSelected(files)}
        >
          Continue with {files.length} file{files.length !== 1 ? 's' : ''}
        </Button>
      )}
    </div>
  );
}
```

### Update Image to PDF Page
```jsx
import { useState } from 'react';
import { FileUpload, Button, Card, Progress, Alert } from '../components';
import { imagesToPDF } from '../utils/api';
import { showToast } from '../components/Toast';
import { useAsync } from '../hooks';

export default function ImageToPDF() {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { execute, loading, error } = useAsync(null, false);

  const handleConvert = async () => {
    try {
      const response = await imagesToPDF(files, setUploadProgress);
      showToast.success('Conversion successful!');
      downloadFile(response.data.filepath, 'output.pdf');
    } catch (err) {
      showToast.error('Conversion failed');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold">Image to PDF</h1>

      {/* Upload Section */}
      <Card variant="elevated">
        <FileUpload onFilesSelected={setFiles} />
      </Card>

      {/* Progress */}
      {uploadProgress > 0 && (
        <Progress value={uploadProgress} label="Converting..." />
      )}

      {/* Error Alert */}
      {error && (
        <Alert variant="error" title="Error" message={error.message} />
      )}

      {/* Convert Button */}
      {files.length > 0 && (
        <Button
          variant="primary"
          size="lg"
          loading={loading}
          fullWidth
          onClick={handleConvert}
        >
          Convert to PDF
        </Button>
      )}
    </div>
  );
}
```

## Step 3: Use Toast Notifications

Replace console.log with toast notifications:

```jsx
import { showToast } from '../components';

// Success
showToast.success('File uploaded successfully!');

// Error
showToast.error('Failed to upload file');

// Info
showToast.info('Processing your file...');

// Promise-based
showToast.promise(
  uploadFile(file),
  {
    loading: 'Uploading...',
    success: 'Upload complete!',
    error: 'Upload failed',
  }
);
```

## Step 4: Implement Dark Mode

```jsx
import { useDarkMode } from '../hooks';

export default function App() {
  const { isDark } = useDarkMode();

  return (
    <div className={isDark ? 'dark' : ''}>
      <YourAppContent />
    </div>
  );
}
```

## Step 5: Use Hooks in Components

### Example: File Processing Component
```jsx
import { useUpload, useAsync } from '../hooks';
import { Progress, Button, EmptyState } from '../components';

export default function FileProcessor() {
  const { files, addFiles, removeFile } = useUpload();
  const { execute, loading, status } = useAsync(processFiles, false);

  const handleProcess = async () => {
    await execute(files);
  };

  if (files.length === 0) {
    return (
      <EmptyState
        title="No files"
        description="Upload files to get started"
      />
    );
  }

  return (
    <div>
      <div className="space-y-2">
        {files.map((file, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <span>{file.name}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeFile(idx)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
      <Button
        loading={loading}
        onClick={handleProcess}
        fullWidth
      >
        Process Files
      </Button>
    </div>
  );
}
```

## Step 6: Styling Tips

### Use Premium Utility Classes
```jsx
{/* Gradient backgrounds */}
<div className="gradient-primary">Content</div>

{/* Premium cards */}
<div className="card">Content</div>

{/* Elevated cards with hover effect */}
<div className="card-elevated">Hover me</div>

{/* Glass morphism */}
<div className="card-glass">Frosted glass effect</div>

{/* Button styles */}
<button className="btn-primary">Click me</button>

{/* Input fields */}
<input className="input-field" placeholder="Type here..." />
```

### Dark Mode Classes
```jsx
<div className="bg-white dark:bg-secondary-900">
  Adapts to dark mode
</div>

<p className="text-secondary-900 dark:text-white">
  Text changes in dark mode
</p>
```

## Common Patterns

### Form with Validation
```jsx
import { Input, Textarea, Button, Alert } from '../components';

function MyForm() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.message) newErrors.message = 'Message is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit
    showToast.success('Form submitted!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        error={errors.email}
      />

      <Textarea
        label="Message"
        value={formData.message}
        onChange={(e) => setFormData({...formData, message: e.target.value})}
        error={errors.message}
        rows={5}
      />

      <Button variant="primary" fullWidth>
        Submit
      </Button>
    </form>
  );
}
```

### Modal Dialog
```jsx
import { Button, Modal } from '../components';

function DeleteConfirm() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    deleteFile();
    setIsOpen(false);
    showToast.success('File deleted!');
  };

  return (
    <>
      <Button variant="danger" onClick={() => setIsOpen(true)}>
        Delete
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Delete File"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p>Are you sure you want to delete this file?</p>
      </Modal>
    </>
  );
}
```

## Troubleshooting

**Components not styled?**
- Check that Tailwind CSS is imported in index.css
- Verify `@tailwind` directives are present
- Rebuild the project

**Dark mode not working?**
- Ensure `darkMode: 'class'` is in tailwind.config.js
- Check that html element has `dark` class when dark mode is on
- Clear browser cache

**Animations stuttering?**
- Reduce animation complexity
- Check browser performance
- Disable animations on low-end devices

**Hooks not updating state?**
- Ensure hooks are called at top level (not in loops/conditions)
- Check dependency arrays in useEffect
- Use functional state updates for complex logic

---

## Next Steps

1. ✅ Review component library documentation
2. ✅ Replace existing components in pages
3. ✅ Test dark mode functionality
4. ✅ Implement toast notifications
5. ✅ Add custom styling with new utility classes
6. ✅ Test responsive design on mobile
7. → Continue with Phase 2: Performance Optimization

Happy coding! 🚀
