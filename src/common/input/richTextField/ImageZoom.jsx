import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';

import { fileDownload } from 'utils/fileHelperFunctions';

const ImageZoom = ({
  src = '',
  alt,
  onClose,
  file,
  fileName,
  fileType
}) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isImageClicked, setIsImageClicked] = useState(false);

  const minZoom = 1, maxZoom = 3;

  useEffect(() => {
    if (zoomLevel === 1) return;
    const handleScroll = (event) => {
      event.preventDefault();
      const delta = event.deltaY;
      const newZoomLevel = zoomLevel + (delta > 0 ? -0.1 : 0.1);
      setZoomLevel(Math.min(Math.max(minZoom, newZoomLevel), maxZoom));
    };

    window.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [zoomLevel]);

  const handleImageClick = (event) => {
    event.stopPropagation();

    if (zoomLevel === 1) {
      const targetRect = event.currentTarget.getBoundingClientRect();
      const y = event.pageY - targetRect.y;
      const x = event.pageX - targetRect.x;

      setCursorPosition({ x, y });

      setZoomLevel(1.5);
      setIsImageClicked(true);
      return;
    }

    setZoomLevel(minZoom);
    setIsImageClicked(false);
  };

  const handleMouseMove = (event) => {
    if (isImageClicked) {
      const deltaY = event.pageY - cursorPosition.y;
      const deltaX = event.pageX - cursorPosition.x;
      const newCursorPosition = {
        x: cursorPosition.x + deltaX / zoomLevel,
        y: cursorPosition.y + deltaY / zoomLevel
      };
      setCursorPosition(newCursorPosition);
    }
  };

  const handleClose = e => {
    e.stopPropagation()
    onClose();
  };

  const handleBackdropClick = (e) => {
    e.stopPropagation();

    if (e.target === e.currentTarget) {
      handleClose(e);
    }
  };

  if (!src) return;

  const content = (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 9999,
      }}
      onClick={handleBackdropClick}
      onMouseMove={handleMouseMove}
    >
      <img
        src={src}
        alt={alt}
        style={{
          transform: `scale(${zoomLevel})`, // Zoom in or out based on zoom level
          transformOrigin: `${(cursorPosition.x / imageSize.width) * 100}% ${(cursorPosition.y / imageSize.height) * 100}%`,
          transition: 'transform 0.2s ease',
          maxWidth: '100%',
          maxHeight: '100%',
          cursor: zoomLevel > minZoom ? 'zoom-out' : 'zoom-in', // Toggle cursor based on dragging state and zoom level
        }}
        onClick={handleImageClick}
        onLoad={(event) => {
          const { width, height } = event.target.getBoundingClientRect();
          setImageSize({ width, height });
        }}
      />
      {file &&
        <IconButton
          sx={{
            position: 'absolute',
            top: '10px',
            right: '60px',
            zIndex: 99999,
            color: 'white',
          }}
          onClick={e => {
            e.stopPropagation();
            fileDownload(file, fileName, fileType);
          }}
          size='small'
        >
          <CloudDownloadRoundedIcon sx={{fontSize: '30px'}}/>
        </IconButton>
      }

      <IconButton
        sx={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          zIndex: 99999,
          color: 'white',
          background: theme => `${theme.palette.common.error}d4`,
          '&:hover': {
            background: theme => theme.palette.common.error,
          },
        }}
        onClick={e => {
          e.stopPropagation();
          handleClose(e);
        }}
        size='small'
      >
        <CloseIcon fontSize='16px'/>
      </IconButton>
    </div>
  );

  return ReactDOM.createPortal(content, document.body);
};

export default ImageZoom;
