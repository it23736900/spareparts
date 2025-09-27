import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';

const CloudinaryImage = ({ publicId, width = 500, height = 500 }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dznt9s0j8', // 🔁 replace with your actual Cloudinary name
    },
  });

  const myImage = cld.image(publicId)
    .format('auto')
    .quality('auto')
    .resize(auto().gravity(autoGravity()).width(width).height(height));

  return <AdvancedImage cldImg={myImage} />;
};

export default CloudinaryImage;
