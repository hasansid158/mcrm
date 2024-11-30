import { useState } from "react";

import { Box, Typography, Button } from "@mui/material";
import { DescriptionOutlined as DocumentIcon } from '@mui/icons-material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { fileDownload } from "utils/fileHelperFunctions";
import { blobToImgSrc } from "utils/fileHelperFunctions";
import ImageZoom from "../richTextField/ImageZoom";

import { includes } from "lodash";


const FileItem = ({
  file,
  fileName = '',
  fileType = '',
  onClickRemove = null,
}) => {
  const [showZoomImage, setShowZoomImage] = useState(false);

  const isImage = includes(fileType?.toLocaleLowerCase(), 'image');

  return <>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        flexWrap: 'wrap',
        cursor: 'pointer',
        border: theme => `2px solid ${theme.palette.common.borderGrey} !important`,
        '&:hover': {
          '& .deleteButton': {
            display: 'block',
          }
        }
      }}
      onClick={e => {
        e.stopPropagation();
        isImage && setShowZoomImage(true);
      }}
    >
      {isImage
        ?
          <Box
            component='img'
            src={blobToImgSrc(file)}
            sx={{
              maxHeight: '200px',
              objectFit: 'contain'
            }}
            width='100%'
          />
        :
          <Button
            color='secondary'
            sx={{
              p: 2,
              borderRadius: 0,
              width: '100%',
              minHeight: '150px',
            }}
            onClick={e => {
              e.stopPropagation();
              fileDownload(file, fileName, fileType)
            }}
          >
            <DocumentIcon sx={{ fontSize: '65px' }} />
          </Button>
      }

      <Typography
        variant='p3'
        textAlign='center'
        sx={{
          overflow: 'hidden',
          width: '100%',
          display: '-webkit-box',
          WebkitLineClamp: '3',
          WebkitBoxOrient: 'vertical',
          py: .5,
          background: 'white',
        }}
      >
        {fileName}
      </Typography>

      {onClickRemove &&
        <Box
          className='deleteButton'
          sx={{
            display: {xs: 'block', md:'none'},
            position: 'absolute',
            zIndex: 2,
            bottom: '-32px',
            right: 0,
            width: '100%',
          }}
        >
          <Button
            size='small'
            color='error'
            // variant='outlined'
            fullWidth
            onClick={onClickRemove}
            sx={{
              borderRadius: 0,
              background: 'white',
              // border: theme => `2px solid ${theme.palette.common.error} !important`,
              height: '30px'
            }}
            startIcon={<DeleteForeverIcon sx={{ fontSize: '20px !important' }}/>}
          >
            DELETE
          </Button>
        </Box>
      }
    </Box>

    <ImageZoom
      src={showZoomImage && blobToImgSrc(file)}
      alt={fileName}
      onClose={() => setShowZoomImage(false)}

      file={file}
      fileName={fileName}
      fileType={fileType}
    />
  </>;
};

export default FileItem;