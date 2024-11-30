import React, { useEffect, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import ImageResize from 'quill-image-resize-module-react';
import { ImageDrop } from 'quill-image-drop-module';
import { Controller } from 'react-hook-form';
import ImageZoom from './ImageZoom';

import { Box } from '@mui/material';

// Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageDrop', ImageDrop);

export default function RichTextfield({
  name = '',
  formData,
  onClick = () => {},
  toolbar,
  value,
  disableImage,
  ...rest
}) {
  useEffect(() => {
    !formData?.getValues(name) && formData?.setValue(name, '');
  }, []);

  const [selectedImage, setSelectedImage] = useState(null);
  // const defaultOptions = [
  //   ['bold', 'italic', 'underline', 'strike'],
  //   ['blockquote', 'code-block'],
  //   ['link', 'image', 'video', 'formula'],
  //   [{ header: 1 }, { header: 2 }],
  //   [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
  //   [{ script: 'sub' }, { script: 'super' }],
  //   [{ indent: '-1' }, { indent: '+1' }],
  //   [{ direction: 'rtl' }],
  //   [{ size: ['small', false, 'large', 'huge'] }],
  //   [{ header: [1, 2, 3, 4, 5, 6, false] }],
  //   [{ color: [] }, { background: [] }],
  //   [{ font: [] }],
  //   [{ align: [] }],
  //   ['clean'],
  // ];
  const defaultOptions = [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike','code-block'],
    (disableImage ? ['link'] : ['link', 'image',]),
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
  ];

  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.nodeName === 'IMG') {
        setSelectedImage({ src: e.target.src, alt: e.target.alt });
      }
    };

    const quillEditor = document.querySelector('.ql-editor');
    quillEditor.addEventListener('click', handleClick);

    return () => {
      quillEditor.removeEventListener('click', handleClick);
    };
  }, [value]);

  if (!formData) {
    return (
      <Box
        onClick={onClick}
        sx={{
          '& .ql-editor': {background: 'white'},
        }}
      >
        <ReactQuill
          theme="snow"
          modules={{
            toolbar: toolbar || defaultOptions,
            // imageResize: {
            //   parchment: Quill.import('parchment'),
            //   modules: ['Resize'],
            // },
            imageDrop: true,
          }}
          value={value}
          {...rest}
        />
        {selectedImage && (
          <ImageZoom
            src={selectedImage.src}
            alt={selectedImage.alt}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        '& .ql-editor': {
          background: 'white',
          wordBreak: 'break-word !important',
        },
      }}
    >
      <Controller
        name={name}
        control={formData?.control}
        render={({ field }) => (
          <Box onClick={onClick}>
            <ReactQuill
              value={field?.value || ''}
              {...field}
              theme="snow"
              modules={{
                toolbar: toolbar || defaultOptions,
                // imageResize: {
                //   parchment: Quill.import('parchment'),
                //   modules: ['Resize'],
                // },
                imageDrop: true,
              }}
              {...rest}
            />
          </Box>
        )}
      />
      {selectedImage && (
        <ImageZoom
          src={selectedImage.src}
          alt={selectedImage.alt}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </Box>
  );
}
