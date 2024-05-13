import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { useEffect, useState } from 'react';

const ListingItem = ({ listing }) => {
  const [timeElapsed, setTimeElapsed] = useState(null);

  const calculateTimeElapsed = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const timeDifference = now - createdDate;
  
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (2>hours > 1) {
      const remainingHours = hours % 24;
      return `${remainingHours}hr ${minutes % 60}min ago`;
    } else if (hours > 2) {
      const remainingHours = hours % 24;
      return `${remainingHours}hr ago`;
    }else if (hours > 0) {
      const remainingHours = hours % 24;
      return `${remainingHours}hr ago`;
    }
     else if (minutes > 0) {
      return `${minutes}min ago`;
    } else {
      return `${seconds}sec ago`;
    }
  };
  

  useEffect(() => {
    if (listing.createdAt) {
      const elapsed = calculateTimeElapsed(listing.createdAt);
      setTimeElapsed(elapsed);
    }
  }, [listing.createdAt]);

  const handleRedirect = (value) => {
    // Set the new URL for redirection
    window.location.href = `${value}`;
  };

  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
          }
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {listing.name}
          </p>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-green-700' />
            <p className='text-sm text-gray-600 truncate w-full'>
              {listing.address}
            </p>
          </div>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {listing.description}
          </p>
          <a href="#" onClick={() => handleRedirect(listing.location)}>
            My location
          </a>
         
          <p className='text-slate-500 mt-2 font-semibold '>
            <span> Rs. </span>          
            {listing.offer
              ? listing.discountPrice.toLocaleString('en-US')
              : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && '/ month'}
          </p>
          <div className='text-slate-700 flex gap-4'>
            <div className='font-bold text-xs'>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds `
                : `${listing.bedrooms} bed `}
            </div>
            <div className='font-bold text-xs'>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths `
                : `${listing.bathrooms} bath `}
            </div>
          </div>
            {timeElapsed && (
            <p className='text-sm mt-2 pb-2 text-right px-4 text-green-500'>{timeElapsed}</p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ListingItem;
