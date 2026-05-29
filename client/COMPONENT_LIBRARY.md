# ManaDocs Component Library Documentation

## Overview
This document provides comprehensive guidance for using the premium ManaDocs component library, built with React, Tailwind CSS, and Framer Motion.

## Installation & Setup

### Prerequisites
```bash
npm install react framer-motion tailwindcss react-hot-toast react-icons
```

### Imports
```javascript
// Import components
import { Button, Card, Input, Modal } from '../components';

// Import hooks
import { useUpload, useAsync, useDarkMode } from '../hooks';

// Import utilities
import { showToast } from '../components/Toast';
import { getTranslation } from '../utils/i18n';
```

## Component Reference

### Button
Primary action component with multiple variants and sizes.

**Props:**
- `variant`: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'outline' (default: 'primary')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `loading`: boolean
- `disabled`: boolean
- `fullWidth`: boolean
- `onClick`: function
- `children`: ReactNode

**Example:**
```jsx
<Button variant="primary" size="md" onClick={handleClick}>
  Get Started
</Button>
```

---

### Card
Versatile container component with multiple styles.

**Props:**
- `variant`: 'default' | 'elevated' | 'glass' | 'gradient' | 'danger' | 'success'
- `badge`: string | ReactNode
- `title`: string
- `subtitle`: string
- `footer`: ReactNode
- `onClick`: function
- `children`: ReactNode

**Example:**
```jsx
<Card variant="elevated" title="Feature" badge="New">
  <p>Card content goes here</p>
</Card>
```

---

### Input
Text input field with validation and icons.

**Props:**
- `label`: string
- `placeholder`: string
- `value`: string
- `onChange`: function
- `error`: string
- `helper`: string
- `icon`: React Component (FiUser, etc.)
- `type`: 'text' | 'email' | 'password' (default: 'text')
- `disabled`: boolean
- `required`: boolean
- `size`: 'sm' | 'md' | 'lg' (default: 'md')

**Example:**
```jsx
import { FiMail } from 'react-icons/fi';

<Input
  label="Email"
  placeholder="you@example.com"
  icon={FiMail}
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

---

### Textarea
Multi-line text input with character counter.

**Props:**
- `label`: string
- `placeholder`: string
- `value`: string
- `onChange`: function
- `error`: string
- `helper`: string
- `rows`: number (default: 4)
- `maxLength`: number
- `showCounter`: boolean
- `disabled`: boolean
- `required`: boolean

**Example:**
```jsx
<Textarea
  label="Message"
  placeholder="Type your message..."
  maxLength={500}
  showCounter={true}
  value={message}
  onChange={(e) => setMessage(e.target.value)}
/>
```

---

### Badge
Status indicator and label component.

**Props:**
- `variant`: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' (default: 'primary')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `icon`: React Component
- `dot`: boolean (shows colored dot)
- `children`: ReactNode

**Example:**
```jsx
import { FiStar } from 'react-icons/fi';

<Badge variant="success" icon={FiStar}>
  Premium
</Badge>
```

---

### Progress
Animated progress bar for uploads and operations.

**Props:**
- `value`: number (0-100)
- `max`: number (default: 100)
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `variant`: 'primary' | 'success' | 'warning' | 'error' (default: 'primary')
- `label`: string
- `showPercentage`: boolean (default: true)
- `animated`: boolean (default: true)

**Example:**
```jsx
<Progress
  value={uploadProgress}
  label="Uploading..."
  variant="primary"
  showPercentage={true}
/>
```

---

### Modal
Dialog box for important interactions.

**Props:**
- `isOpen`: boolean
- `onClose`: function
- `title`: string
- `footer`: ReactNode
- `size`: 'sm' | 'md' | 'lg' | 'xl' | '2xl' (default: 'md')
- `closeOnBackdropClick`: boolean (default: true)
- `children`: ReactNode

**Example:**
```jsx
import { Button } from '../components';

const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Delete Confirmation"
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
```

---

### Tabs
Tab navigation with content panes.

**Props:**
- `tabs`: Array of { label, icon?, content }
- `defaultTab`: number (default: 0)
- `onChange`: function
- `variant`: 'default' | 'pill' | 'soft' (default: 'default')

**Example:**
```jsx
<Tabs
  tabs={[
    { label: 'Tab 1', content: <div>Content 1</div> },
    { label: 'Tab 2', content: <div>Content 2</div> },
  ]}
  onChange={(index) => console.log(index)}
/>
```

---

### Dropdown
Dropdown menu with options.

**Props:**
- `trigger`: ReactNode (button text/element)
- `items`: Array of { label, icon?, action }
- `onSelect`: function
- `align`: 'left' | 'right' (default: 'left')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `disabled`: boolean

**Example:**
```jsx
<Dropdown
  trigger="Options"
  items={[
    { label: 'Edit', icon: <FiEdit /> },
    { label: 'Delete', icon: <FiTrash /> },
  ]}
  onSelect={(item) => console.log(item)}
/>
```

---

### Switch/Toggle
Boolean toggle switch.

**Props:**
- `label`: string
- `checked`: boolean
- `onChange`: function
- `disabled`: boolean
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `color`: 'primary' | 'secondary' | 'success' | 'warning' (default: 'primary')
- `helper`: string

**Example:**
```jsx
<Switch
  label="Enable Dark Mode"
  checked={isDark}
  onChange={setIsDark}
/>
```

---

### Alert
Notification/alert component.

**Props:**
- `variant`: 'info' | 'success' | 'warning' | 'error' (default: 'info')
- `title`: string
- `message`: string
- `closeable`: boolean
- `action`: { label, onClick }
- `onClose`: function
- `children`: ReactNode

**Example:**
```jsx
<Alert
  variant="success"
  title="Success!"
  message="Your file has been processed."
  closeable={true}
/>
```

---

### EmptyState
Beautiful empty state UI.

**Props:**
- `icon`: React Component
- `title`: string
- `description`: string
- `action`: { label, onClick }
- `image`: string (image URL)

**Example:**
```jsx
import { FiInbox } from 'react-icons/fi';

<EmptyState
  icon={FiInbox}
  title="No files"
  description="Upload files to get started"
  action={{ label: 'Upload Files', onClick: () => {} }}
/>
```

---

### SkeletonLoader
Loading placeholder component.

**Props:**
- `type`: 'card' | 'text' | 'avatar' | 'button' (default: 'card')
- `count`: number (default: 1)
- `className`: string

**Example:**
```jsx
<SkeletonLoader type="card" count={3} />
<SkeletonLoader type="text" count={2} />
```

---

## Custom Hooks

### useUpload
Manage file uploads with batch handling.

**Returns:**
```javascript
{
  files: File[],
  uploading: boolean,
  progress: number,
  error: string,
  addFiles: (files) => void,
  removeFile: (index) => void,
  clearFiles: () => void,
  reorderFiles: (fromIndex, toIndex) => void,
  setProgress: (value) => void,
  setUploading: (value) => void,
}
```

**Example:**
```jsx
import { useUpload } from '../hooks';

const { files, addFiles, removeFile, progress } = useUpload();

const handleDrop = (e) => {
  addFiles(e.dataTransfer.files);
};
```

---

### useAsync
Handle async operations with loading states.

**Returns:**
```javascript
{
  execute: (...args) => Promise,
  status: 'idle' | 'pending' | 'success' | 'error',
  value: any,
  error: Error,
  loading: boolean,
  success: boolean,
}
```

**Example:**
```jsx
import { useAsync } from '../hooks';

const { execute, loading, value, error } = useAsync(
  async () => {
    const response = await fetch('/api/data');
    return response.json();
  },
  false // don't execute immediately
);

return (
  <div>
    {loading && <Spinner />}
    {value && <div>{value.name}</div>}
  </div>
);
```

---

### useDarkMode
Dark mode toggle with persistence.

**Returns:**
```javascript
{
  isDark: boolean,
  toggle: () => void,
  isMounted: boolean,
}
```

**Example:**
```jsx
import { useDarkMode } from '../hooks';

const { isDark, toggle } = useDarkMode();

return (
  <button onClick={toggle}>
    {isDark ? '🌙 Dark' : '☀️ Light'}
  </button>
);
```

---

## Toast Notifications

### Usage
```jsx
import { showToast } from '../components/Toast';

// Success toast
showToast.success('File uploaded successfully!');

// Error toast
showToast.error('Failed to upload file');

// Info toast
showToast.info('Processing your request...');

// Loading toast
const toastId = showToast.loading('Uploading...');

// Promise-based toast
showToast.promise(
  uploadPromise,
  {
    loading: 'Uploading...',
    success: 'Uploaded successfully!',
    error: 'Upload failed',
  }
);

// Dismiss specific toast
showToast.dismiss(toastId);

// Dismiss all toasts
showToast.dismissAll();
```

---

## Internationalization (i18n)

### Usage
```jsx
import { getTranslation } from '../utils/i18n';
import { useAppStore } from '../utils/store';

const { language } = useAppStore();

// Get translation
const appName = getTranslation('common.appName', language);

// With fallback to English
const text = getTranslation('features.imageToPdf', language); // Falls back to EN if not found
```

### Supported Languages
- **en**: English
- **te**: Telugu

### Adding New Translations
Edit `client/src/utils/i18n.js` and add to the translations object:

```javascript
export const translations = {
  en: {
    newSection: {
      newKey: 'New Value',
    },
  },
  te: {
    newSection: {
      newKey: 'నెవ్ విలువ',
    },
  },
};
```

---

## Dark Mode

### Automatic Detection
Dark mode is automatically detected from system preferences or localStorage.

### Toggle Dark Mode
```jsx
import { useDarkMode } from '../hooks';

const { isDark, toggle } = useDarkMode();

<button onClick={toggle}>
  Toggle Dark Mode
</button>
```

### Dark Mode Styling
All components support dark mode with `dark:` prefix in Tailwind:

```jsx
<div className="bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white">
  This text adapts to dark mode
</div>
```

---

## Color System

### Primary Colors
- primary-50 to primary-900 (gradient steps)
- Used for main actions and highlights

### Secondary Colors
- secondary-50 to secondary-900 (grayscale)
- Used for backgrounds and neutral elements

### Semantic Colors
- **success**: #10B981 (green)
- **warning**: #F59E0B (amber)
- **error**: #EF4444 (red)
- **info**: #3B82F6 (blue)

### Usage
```jsx
<div className="text-primary-600 dark:text-primary-400">
  Primary color text
</div>

<button className="bg-success hover:bg-green-600">
  Success action
</button>
```

---

## Best Practices

1. **Use Component Library**: Always use components from `components/index.js` for consistency
2. **Dark Mode**: Add `dark:` prefixes to custom classes for proper dark mode support
3. **Accessibility**: Use semantic HTML and proper ARIA labels
4. **Animations**: Keep animations under 500ms for better perceived performance
5. **Responsive Design**: Test on mobile, tablet, and desktop
6. **Type Validation**: Pass correct prop types to avoid runtime errors
7. **Error Handling**: Always handle errors gracefully with toast notifications

---

## File Structure
```
client/src/
├── components/
│   ├── index.js              # Component exports
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── Input.jsx
│   ├── Modal.jsx
│   ├── Tabs.jsx
│   ├── Dropdown.jsx
│   ├── Alert.jsx
│   ├── Badge.jsx
│   ├── Progress.jsx
│   ├── SkeletonLoader.jsx
│   ├── EmptyState.jsx
│   ├── Switch.jsx
│   ├── Textarea.jsx
│   ├── Toast.jsx
│   └── [other components]
├── hooks/
│   ├── index.js
│   ├── useUpload.js
│   ├── useAsync.js
│   └── useDarkMode.js
├── utils/
│   ├── i18n.js
│   ├── api.js
│   ├── store.js
│   └── helpers.js
└── App.jsx
```

---

## Troubleshooting

**Issue**: Components not styled correctly
- **Solution**: Ensure Tailwind CSS is properly configured and `@tailwind` directives are in index.css

**Issue**: Dark mode not working
- **Solution**: Check that `darkMode: 'class'` is set in tailwind.config.js

**Issue**: Animations stuttering
- **Solution**: Reduce animation complexity or disable on low-end devices

**Issue**: Components not responsive
- **Solution**: Use Tailwind's responsive prefixes (sm:, md:, lg:, xl:)

---

For more information, check individual component files in `client/src/components/`.
