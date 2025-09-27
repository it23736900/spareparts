import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedVideo } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';

const cld = new Cloudinary({
  cloud: { cloudName: 'dznt9s0j8' },
});

const CloudinaryVideo = ({ publicId, width, height }) => {
  const myVideo = cld.video(publicId).resize(fill().width(width).height(height));
  return <AdvancedVideo cldVid={myVideo} autoPlay muted loop className="w-full h-[500px] object-cover" />;
};

export default CloudinaryVideo;
